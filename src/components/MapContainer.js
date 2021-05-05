import React, { useRef, useCallback, useState  } from 'react';
import {
    GoogleMap,
    useLoadScript,
    Marker,
} from "@react-google-maps/api";
import { SearchComponent } from './SearchComponent';
import { LocateComponent } from './LocateComponent';
import { ScrollDialog } from './ScrollDialog';
//import { Directions } from './Directions';

// Genom att flytta ut variablerna nedan förhindras att maps re-rendrar 
// och går tillbaka till center position om vi t ex sätter en marker.
const MAPS_API_KEY = "AIzaSyCjBrOqqO578R-x_EqkXshwiJ7Cho0INBk"
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

export const MapContainer = ()=> {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: MAPS_API_KEY,
        libraries,
    });
    const [newLat, setNewLat] = useState();
    const [newLng, setNewLng] = useState();
    const [markers, setMarkers] = useState([]);
    const [currentPosition, setCurrentPosition] = useState({});
    const tooltipMessage = "Eslöv forever";
    const mapId = "map";
    
    // får sitt värde när användaren klickar på markern -InfoWindow
    const [setSelected] = useState(null);
    console.log(currentPosition)
    const onMarkerDragEnd = (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        setCurrentPosition({ lat, lng})
    };

    // Refererar till kart-instansen, själva kartan. Vid pan och zoom
    const mapRef = useRef();
    // current - när nytt state baseras på gammalt state. Vi tar emot det gamla (parametern) och 
    // returnerar det nya värdet och spar i en array med spread och den nya markern
    const onMapClick = useCallback((e) => {
        console.log(e)
        setMarkers((current) => [
          ...current,
          {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
            time: new Date(),
          },
        ]);
      }, []);
    
    // map kommer från Google map-komponent. useCallback låter oss accessa kartan utan att skapa onödiga 
    // re-renders. 
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
        }, []);

    // Funktionen tar selected lat/lng som user valt. Accessar mapRef som också tar in 
    // samma lat/lng. 
    const panTo = useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, []);
      
    if (loadError) return "Error loading map";
    if (!isLoaded) return "Loading map";

    return (
        <>
        <LocateComponent panTo={panTo} />
        <SearchComponent 
            panTo={panTo} 
            setNewLat={setNewLat}
            setNewLng={setNewLng}
        />

        <ScrollDialog 
            newLat={newLat}
            newLng={newLng}
            setNewLat={setNewLat}
            setNewLng={setNewLng}
        />

        <GoogleMap
            id={mapId}
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
                title={tooltipMessage}
            />

            {markers.map(marker => 
                <Marker 
                    key={marker.time.toISOString()} 
                    position={{ lat: marker.lat, lng: marker.lng }} 
                    onClick={() => {
                        setSelected(marker);
                    }}
            /> )}
        </GoogleMap>

{/*
        <Directions 
            selected={selected}
            newLat={newLat}
            newLng={newLng}
        />
*/}
      </>
    )
};