import React, { useRef, useCallback, useState  } from 'react';
import {
    GoogleMap,
    useLoadScript,
    Marker,
} from "@react-google-maps/api";

import { SearchComponent } from './SearchComponent';
import { LocateComponent } from './LocateComponent';


const libraries = ["places"];

const mapContainerStyle = {
    height: "100vh",
    width: "100vw",
  };

const defaultCenter = {
    lat: 55.839858883271546, 
    lng: 13.303072329398677
};
  
const options = {
    disableDefaultUI: true,
    zoomControl: true,
};

export const MapContainer = ({  searchValue })=> {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyCjBrOqqO578R-x_EqkXshwiJ7Cho0INBk",
        libraries,
    });

    const [markers, setMarkers] = useState([]);
    const [currentPosition, setCurrentPosition] = useState({});

    const onMarkerDragEnd = (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        setCurrentPosition({ lat, lng})
    };

    const mapRef = useRef();

    const onMapClick = useCallback((e) => {
        setMarkers((current) => [
          ...current,
          {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
            time: new Date(),
          },
        ]);
      }, []);
    
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
        }, []);

    const panTo = useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, []);
      

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    return (
        <>
        <LocateComponent panTo={panTo} />
        <SearchComponent 
            panTo={panTo}
            searchValue={searchValue}
          />

        <GoogleMap
            id="map"
            mapContainerStyle={mapContainerStyle}
            zoom={14}
            center={defaultCenter}
            options={options}
            onClick={onMapClick}
            onLoad={onMapLoad}
        >
            <Marker 
                position={defaultCenter}
                onDragEnd={(e) => onMarkerDragEnd(e)}
                draggable={true}
            />
      </GoogleMap>
      </>
    )
};