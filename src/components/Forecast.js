import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const WEATHER_API_KEY = "bf3ca7e1fa68f11d4a59f5b647d51598"

export const Forecast = ({ newLat, newLng }) => {
    const lat = newLat;
    const lon = newLng;
    const FORECAST_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts,daily&appid=${WEATHER_API_KEY}`
    const [forecast, setForecast] = useState({});
    //console.log(forecast)

    useEffect(() => {
        fetch(FORECAST_URL) 
            .then((res) => res.json())
            .then(data => {
                setForecast(data);
            })
        .catch((error) => console.log(error))
    }, [])
console.log(forecast)
    return (
        <section className="forecast">
            {forecast && newLat && newLng &&
                <>
                   <h4>Latitude: {forecast.dt}</h4> 
                   <h4>Longitude: {forecast.lon}</h4>
                   <h4>Timezone: {forecast.timezone}</h4>
                   <h4>Latitude: {forecast.lat}</h4> 
                   <h4>Longitude: {forecast.lon}</h4>
                   <h4>Timezone: {forecast.timezone}</h4>
                   <h4>Latitude: {forecast.lat}</h4> 
                   <h4>Longitude: {forecast.lon}</h4>
                   <h4>Timezone: {forecast.timezone}</h4>
                </>
            }
        </section>
    )
}

Forecast.propTypes = {
    newLat: PropTypes.number.isRequired,
    newLng: PropTypes.number.isRequired
};