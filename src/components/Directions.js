{/*
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
    GoogleMap,
    useLoadScript,
    Marker,
    useGoogleMap,
    DirectionsRenderer,
    DirectionsService
  } from "@react-google-maps/api";
  
  const google = window.google;
  const libraries = ["places"];


 // const defaultCenter = {
   // lat: 55.839858883271546, 
   // lng: 13.303072329398677



  export const Directions = ({ newLat, newLng, selected }) => { 
    const prevMarkersRef = useRef([]);
    const [directions, setDirections] = useState(null);

    const { isLoaded, loadError, map } = useLoadScript({
      googleMapsApiKey: "AIzaSyCjBrOqqO578R-x_EqkXshwiJ7Cho0INBk",
      libraries,
  });

  
  let origin = {
    lat:  55.839858883271546,
    lng: 13.303072329398677
  };

  let destination = selected

  console.log(destination);

useEffect(() => {
       if (selected) {
       
        clearMarkers(prevMarkersRef.current); //clear prev markers
        prevMarkersRef.current.push(destination);
        map.setCenter(origin);

      }, []) 
      
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();
      
       directionsRenderer.setMap(map);
        calcRoute(directionsService, directionsRenderer);
      }
  
    const clearMarkers = (markers) => {
      for (let marker of markers) {
        marker.setMap(null);
      }
    }


  
    const calcRoute = (directionsService, directionsRenderer) => {
      let request = {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
      };
      directionsService.route(request, function(result, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);
          console.log(setDirections(result))
        }
      });
    }
  
    
    return (
      <div>
            <div style={{ width: 600, height: 500 }} />
      </div>
    );
  };
  
*/}    
  