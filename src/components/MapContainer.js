import React, { useState } from 'react';
import {
    GoogleMap,
    useLoadScript,
    Marker,
} from "@react-google-maps/api";
import { Map } from './Map';

export const MapContainer = ()=> {
    return (
        <Map />
    )
}