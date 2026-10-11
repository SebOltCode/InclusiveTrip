import { useEffect, useMemo, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactDOMServer from "react-dom/server";
import {
  faCamera,
  faCoffee,
  faFilm,
  faHospital,
  faLandmark,
  faMugHot,
  faSchool,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import PlaceMarker from "./PlaceMarker";

const OVERPASS_URL = "https://overpass-api.de/api/interpreter";
// Wait until the user stops panning/zooming before querying Overpass (rate limits)
const MOVE_DEBOUNCE_MS = 600;
// Only OSM-style identifiers are allowed in the query
const SAFE_OSM_VALUE = /^[a-z0-9_:]+$/i;

// Only icons used by place categories are bundled (importing all icons adds >1 MB).
// Add new icons here when a category uses one.
const iconMap = Object.fromEntries(
  Object.entries({
    faCamera,
    faCoffee,
    faFilm,
    faHospital,
    faLandmark,
    faMugHot,
    faSchool,
    faUtensils,
  }).map(([key, icon]) => [key.toLowerCase(), icon])
);

const createIcon = (category) => {
  const icon = iconMap[category.icon?.toLowerCase()] || faCoffee;
  return new L.DivIcon({
    className: "leaflet-div-icon",
    html: ReactDOMServer.renderToString(
      <div style={{ fontSize: "26px", color: category.iconColor }}>
        <FontAwesomeIcon icon={icon} />
      </div>
    ),
  });
};

const fetchPlaces = async (bbox, tag, value, signal) => {
  if (!SAFE_OSM_VALUE.test(tag) || !SAFE_OSM_VALUE.test(value)) return [];
  const query = `
      [out:json][timeout:25];
      node["${tag}"="${value}"](${bbox});
      out body;
    `;
  const response = await fetch(`${OVERPASS_URL}?data=${encodeURIComponent(query)}`, { signal });
  if (!response.ok) throw new Error(`Overpass request failed: ${response.status}`);
  const data = await response.json();
  return data.elements.map((element) => ({
    id: element.id,
    lat: element.lat,
    lon: element.lon,
    name: element.tags?.name,
  }));
};

const PlacesLayer = ({ selectedCategory }) => {
  const [places, setPlaces] = useState([]);
  const map = useMap();
  const icon = useMemo(
    () => (selectedCategory ? createIcon(selectedCategory) : null),
    [selectedCategory]
  );

  useEffect(() => {
    if (!selectedCategory) {
      return;
    }
    let controller;
    let timeoutId;

    const loadPlaces = async () => {
      controller?.abort();
      controller = new AbortController();
      const bounds = map.getBounds();
      const bbox = `${bounds.getSouth()},${bounds.getWest()},${bounds.getNorth()},${bounds.getEast()}`;
      try {
        const placeData = await fetchPlaces(
          bbox,
          selectedCategory.tag,
          selectedCategory.searchName,
          controller.signal
        );
        setPlaces(placeData);
      } catch (error) {
        if (error.name !== "AbortError") console.error("Error loading places:", error);
      }
    };

    const onMoveEnd = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(loadPlaces, MOVE_DEBOUNCE_MS);
    };

    loadPlaces();
    map.on("moveend", onMoveEnd);
    return () => {
      clearTimeout(timeoutId);
      controller?.abort();
      map.off("moveend", onMoveEnd);
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

export default PlacesLayer;
