import React, { useState, useCallback, useRef } from 'react';
import {
    GoogleMap,
    useLoadScript,
    Marker,
} from "@react-google-maps/api";
import { Button, Input } from '@material-ui/core';
i//mport { MapContainer } from './MapContainer';
import { SearchComponent } from './SearchComponent';
import { Header } from './Header';

const libraries = ["places"];


// två knappar
// info-popup
export const HomeView = ()=> {

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyCjBrOqqO578R-x_EqkXshwiJ7Cho0INBk",
        libraries,
    });

    const [selected, setSelected] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    console.log(searchValue);
   
    const onSetValue = (e) => {
        setSearchValue(e.target.value)
    };

    const onGoToMap= () => {
        setSelected(true)

    }

    const onGetInfo = () => {
        //setSelected(true)

    }

    return (
        <>
        <Header />
        <Input
            type="text"
            placeholder="Search Places"
            value={searchValue}
            onChange={onSetValue}
            
        />
        <Button 
            onClick={onGoToMap}
            selected={selected}
        >
            To Map

        </Button>
        <Button onClick= {onGetInfo}>
            Read more...

        </Button>

      {selected && 
        <MapContainer searchValue={searchValue}/>
      }
        </>
    )
};