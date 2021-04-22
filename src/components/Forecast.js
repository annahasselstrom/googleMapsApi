import React, { useEffect, useState } from 'react';

// FLYTTA DENNA UTANFÖR
const WEATHER_API_KEY = "20216c09e09f267ccc58282554c77ecf"

export const Forecast = ({ newLat, newLng }) => {
    const lat = newLat;
    const lon = newLng;

    const FORECAST_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts,daily&appid=${WEATHER_API_KEY}`

    const [forecast, setForecast] = useState({});
    console.log(forecast)

    useEffect(() => {
        fetch(FORECAST_URL) 
            .then((res) => res.json())
            .then(data => {
                setForecast(data);
            })
        .catch((error) => console.log(error))
    }, [])

    return (
        <div className="forecast">
            {forecast && newLat && newLng &&
                <div>
                    <p>Latitude: {forecast.lat}</p>
                    <p>Longitude: {forecast.lon}</p>
                    <p>Timezone: {forecast.timezone}</p>
                </div>
            }
        </div>
    )
};