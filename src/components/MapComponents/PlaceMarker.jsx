import { Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { createRatingUrl, ratingsUrl } from "../../utils/placeUrl";

const PlaceMarker = function ({ place, placeIcon, category }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const namedPlace = { ...place, name: place.name || t("placeMarker.unnamed_place") };

  return (
    <Marker position={[place.lat, place.lon]} icon={placeIcon}>
      <Popup>
        <h1>{namedPlace.name}</h1>
        <div className="flex">
          <button
            className="btn  bg-[#FFD700] border border-[#2C2C2C] rounded-lg p-2 h-8 min-h-2 m-2"
            onClick={() => navigate(ratingsUrl(namedPlace, category.id))}
          >
            {t("placeMarker.ratings")}
          </button>
          <button
            className="btn bg-[#FFD700] border border-[#2C2C2C] rounded-lg p-2 h-8 min-h-2 m-2"
            onClick={() => navigate(createRatingUrl(namedPlace, category.id))}
          >
            {t("placeMarker.create_rating")}
          </button>
        </div>
      </Popup>
    </Marker>
  );
};

export default PlaceMarker;
