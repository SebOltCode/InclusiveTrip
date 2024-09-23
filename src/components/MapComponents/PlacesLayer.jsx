import React, { useEffect, useState } from "react";

import { useMap } from "react-leaflet";
import PlaceMarker from "./PlaceMarker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactDOMServer from 'react-dom/server';


import * as icons from '@fortawesome/free-solid-svg-icons';

const iconMap = Object.fromEntries(
    Object.entries(icons).map(([key, icon]) => [key.toLowerCase(), icon])
);

const createIcon = (selectedCategory) => {
    const icon = iconMap[selectedCategory.icon.toLowerCase()] || icons.faCoffee;
    return new L.DivIcon({
        className: 'leaflet-div-icon',
        html: ReactDOMServer.renderToString(
            <div style={{ fontSize: '26px', color: selectedCategory.iconColor }}>
                <FontAwesomeIcon icon={icon} />
            </div>
        ),
    });
};


const PlacesLayer = ({ selectedCategory }) => {

    const [places, setPlaces] = useState([]);
    const [icon, setIcon] = useState([]);
    const map = useMap();

    useEffect(() => {
        if (!selectedCategory) {
            return;
        }
        const PlaceIcon = createIcon(selectedCategory);
        setIcon(PlaceIcon);
        const fetchAndSetPlaces = async () => {
            const bounds = map.getBounds();
            const bbox = `${bounds.getSouth()},${bounds.getWest()},${bounds.getNorth()},${bounds.getEast()}`;

            const [placeData] = await Promise.all([
                fetchPlaces(bbox, selectedCategory.tag, selectedCategory.searchName),
            ]);

            setPlaces(placeData);
        };

        fetchAndSetPlaces();
        map.on('moveend', fetchAndSetPlaces);
        return () => {
            map.off('moveend', fetchAndSetPlaces);
        };

    }, [selectedCategory, map]);

    return (
        <>
            {places.map((place) => (
                <PlaceMarker key={place.id} place={place} placeIcon={icon} category={selectedCategory} />
            ))}
        </>
    );
};

const fetchPlaces = async (bbox, tag, amenity) => {
    const overpassUrl = "https://overpass-api.de/api/interpreter";
    const query = `
      [out:json];
      node["${tag}"="${amenity}"](${bbox});
      out body;
    `;

    //     const query = `
    //     [out:json];
    //     node["${tag}"="${amenity}"](${bbox});
    //     out;
    //     way["${tag}"="${amenity}"](${bbox});
    //     out center;
    //     relation["${tag}"="${amenity}"](${bbox});
    //     out center;
    // `;
    // const query = `
    // [out:json];
    // node["${tag}"="${amenity}"](${bbox});
    // out ;
    // `;

    const response = await fetch(`${overpassUrl}?data=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.elements.map((element) => ({
        id: element.id,
        lat: element.lat,
        lon: element.lon,
        name: element.tags.name,
    }));
};
export default PlacesLayer;