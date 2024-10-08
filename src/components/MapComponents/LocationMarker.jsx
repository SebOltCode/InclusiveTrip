import React, { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";

const LocationMarker = () => {
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>
        {position.lat}, {position.lng}
      </Popup>
    </Marker>
  );
};

export default LocationMarker;

[
  {
    id: "1",
    name: "hospital",
    icon: "faHospital",
    iconColor: "red",
    description: "",
    selected: "t",
    createdAt: "2024-08-31 07:03:36.024+00",
    updatedAt: "2024-08-31 07:03:36.024+00",
  },
  {
    id: "2",
    name: "clinic",
    icon: "faHospital",
    iconColor: "red",
    description: "",
    selected: "t",
    createdAt: "2024-08-31 07:03:43.879+00",
    updatedAt: "2024-08-31 07:03:43.879+00",
  },
  {
    id: "3",
    name: "school",
    icon: "faSchool",
    iconColor: "blue",
    description: "",
    selected: "t",
    createdAt: "2024-08-31 07:04:36.548+00",
    updatedAt: "2024-08-31 07:04:36.548+00",
  },
  {
    id: "4",
    name: "restaurant",
    icon: "faUtensils",
    iconColor: "green",
    description: "",
    selected: "t",
    createdAt: "2024-08-31 07:05:03.01+00",
    updatedAt: "2024-08-31 07:05:03.01+00",
  },
];
