import React from 'react';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
  } from "@reach/combobox";
  import "@reach/combobox/styles.css";
  import PropTypes from 'prop-types';

  // Flytta upp all logik till Map
  export const SearchComponent = ({ panTo, setNewLat, setNewLng }) => {

// use-place-autocomplete kommer med bla dessa två funktioner: getGeocode och getLatLng
// requestOptions: ger tillbaka locations nära "location", t ex nära användaren
// Från usePlacesAutoComplete får vi tillbaka ett antal värden vi kan destructure: ready, 
// value (current value being typed in), suggestion (from Google, checkas i popovern) och funktionerna 
// setValue  och clearValue
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {
        location: { lat: () => 43.6532, lng: () => -79.3832 },
        radius: 100 * 1000,
      },
    });

    const handleInput = (e) => {
      setValue(e.target.value);
    };
  
// Ta adressen user vald från input, skickar in en adress
// i getGeocode och får tillbaka ett adress-objekt. getLatLng plockar ut
// lat/long ur objektet.
// andra parametern: fetch data sätts till false. Kommer från use-aut...hooken. 
// setValue uppdaterar state med users val av plats utan att gå till Google för att hämta datan igen
    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();
    
        try {
          const results = await getGeocode({ address });
          console.log(results[0])
          const { lat, lng } = await getLatLng(results[0]);
          panTo({ lat, lng });
          setNewLat(lat);
          setNewLng(lng);
        } catch (error) {
          console.log("Error: ", error);
        }
      };
  
    return (
        <div className="search">
            <Combobox onSelect={handleSelect}>
                <ComboboxInput
                    value={value}
                    onChange={handleInput}
                    disabled={!ready}
                    placeholder="Search your location"
                />
                <ComboboxPopover>
                    <ComboboxList>
                       {status === "OK" &&
                          data.map(({ id, description }) => (
                          <ComboboxOption key={id} value={description} />
                        ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    );
}

SearchComponent.propTypes = {
  panTo: PropTypes.func.isRequired, 
  setNewLat: PropTypes.func.isRequired,
  setNewLng: PropTypes.func.isRequired
};

