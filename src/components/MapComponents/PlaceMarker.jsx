
import { Marker, Popup } from "react-leaflet";

import { useNavigate } from "react-router-dom";

const PlaceMarker = function ({ place, placeIcon, category }) {
    const navigate = useNavigate();

    const handleMarkerClick = (position) => {

    };

    const handleCreateRate = (place) => {
        navigate(`/create`, { state: { place: place, category: category } });
    };

    const handleRatinsClick = (place) => {
        navigate(`/ratings`, { state: { place: place, category: category } });
    };


    return (
        <Marker
            key={place.id}
            position={[place.lat, place.lon]}
            icon={placeIcon}
            eventHandlers={{
                click: () => handleMarkerClick([place.lat, place.lon]),
            }}
        >
            <Popup>
                <h1>{place.name}</h1>
                <div className="flex">
                    <button className="btn  bg-[#FFD700] border border-[#2C2C2C] rounded-lg p-2 h-8 min-h-2 m-2"
                        onClick={() => handleRatinsClick(place)}>Bewertungen</button>
                    <button className="btn bg-[#FFD700] border border-[#2C2C2C] rounded-lg p-2 h-8 min-h-2 m-2"
                        onClick={() => handleCreateRate(place)}>Bewertung abgeben</button>
                </div>

            </Popup>
        </Marker>
    );
};

export default PlaceMarker;