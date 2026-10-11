import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const NavigateMap = ({ selectedCity }) => {
    const map = useMap();

    useEffect(() => {
        if (selectedCity) {
            const coord = selectedCity.coord;
            map.setView([coord[1], coord[0]]);
        }
    }, [selectedCity, map]);

    return null;
}

export default NavigateMap;