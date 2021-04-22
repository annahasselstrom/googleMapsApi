import React from 'react';
import compass from '../assets/compass.svg';

// Flytta upp onLocate-funktionen högre upp?
export const LocateComponent = ({ panTo })=> {

  const onLocate = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        panTo({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => null
    );
  }

    return (
      <button
        className="locate"
        onClick={onLocate}
      >
        <img src={compass} alt="compass" className="locate"/>
      </button>
    );
};