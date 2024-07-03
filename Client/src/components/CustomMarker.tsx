import greenMarker from "../assets/airQualityColors/green.png";
import yellowMarker from "../assets/airQualityColors/yellow.png";
import orangeMarker from "../assets/airQualityColors/orange.png";
import redMarker from "../assets/airQualityColors/red.png";
import purpleMarker from "../assets/airQualityColors/purple.png";
import maroonMarker from "../assets/airQualityColors/maroon.png";
import blueMarker from "../assets/airQualityColors/blue.png";

import axios from 'axios';
import { useEffect, useState, ReactNode } from "react";
import { MarkerF } from "@react-google-maps/api";

interface CustomMarkerProps {
    key: number;
    position: { lat: number; lng: number };
    onClick: () => void;
    children?: ReactNode;
}

const CustomMarker: React.FC<CustomMarkerProps> = ({key, position, onClick, children}) => {
    const [icon, setIcon] = useState<string | undefined>(undefined);

     
    const getIcon = async (lat: number, lon: number): Promise<string> => {
        const POLLUTANT_API_TOKEN = process.env.REACT_APP_POLLUTANT_TOKEN;
        if (!POLLUTANT_API_TOKEN) {
            throw new Error('Pollutant API token is not provided.');
        }
    
        const pollutantApiUrl = `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${POLLUTANT_API_TOKEN}`;
    
        try {
            const res = await axios.get(pollutantApiUrl);
            const aqi = res.data.data.aqi;
            if (!aqi) {
                return blueMarker;
            } else if (aqi <= 50) {
                return greenMarker;
            } else if (aqi <= 100) {
                return yellowMarker;
            } else if (aqi <= 150) {
                return orangeMarker;
            } else if (aqi <= 200) {
                return redMarker;
            } else if (aqi <= 300) {
                return purpleMarker;
            } else {
                return maroonMarker;
            }
        } catch (error: any) {
            console.error('Error fetching AQI data:', error.message);
            throw new Error('Failed to fetch AQI data.');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const fetchedIcon = await getIcon(position.lat, position.lng);
            setIcon(fetchedIcon);
          } catch (error: any) {
            console.error('Error fetching icon:', error);
          }
        };
    
        fetchData();
    }, [position.lat, position.lng]);

    return (
        <MarkerF
            key={key}
            position={position}
            onClick={onClick}
            options={{
                icon: icon // Use the fetched icon here
            }}
        >
            {children}
        </MarkerF>
    )
}

export default CustomMarker