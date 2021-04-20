import React from 'react';
import compass from '../assets/compass.svg';

export const LocateComponent = ({ panTo })=> {

    // Flytta upp getCurrentPosition-funktionen utanför return för att undvika
    // re-rendering?
    return (
      <button
        className="locate"
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            () => null
          );
        }}
      >
        <img src={compass} alt="compass" className="locate"/>
      </button>
    );
  };