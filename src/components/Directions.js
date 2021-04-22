{/*

import React, { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import {
    GoogleMap,
    useLoadScript,
    Marker,
    withGoogleMap,
    useGoogleMap,
    DirectionsRenderer,
    DirectionsService
  } from "@react-google-maps/api";
  
  const google = window.google;
  const libraries = ["places"];

  export const Directions = () => { 
    const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: "AIzaSyCjBrOqqO578R-x_EqkXshwiJ7Cho0INBk",
      libraries,
  });


    const [directions, setDirections] = useState(null);
    //const directionsService = new google.maps.DirectionsService();
    //var directionsRenderer = new google.maps.DirectionsRenderer();
    
    const origin = { lat: 40.756795, lng: -73.954298 };
    const destination = { lat: 41.756795, lng: -78.954298 };

    
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections({
            directions: result
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
    
  


  return (
      <GoogleMap
        defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
        defaultZoom={13}
      >
        <DirectionsRenderer
          directions={directions}
        />
      </GoogleMap>

    );
};

*/}