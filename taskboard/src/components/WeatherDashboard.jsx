import { useState } from "react";
import { useFetch } from "../hooks/useFetch.js";

// Lab 5.2: I pick a city and load its current weather from Open-Meteo with useFetch.
const cities = [
  { name: "Johannesburg", lat: -26.2, lon: 28.05 },
  { name: "Cape Town", lat: -33.92, lon: 18.42 },
  { name: "Durban", lat: -29.86, lon: 31.02 },
];

function WeatherDashboard() {
  const [cityName, setCityName] = useState(cities[0].name);
  const city = cities.find((item) => item.name === cityName);

  const url =
    "https://api.open-meteo.com/v1/forecast" +
    `?latitude=${city.lat}&longitude=${city.lon}` +
    "&current=temperature_2m,wind_speed_10m&timezone=auto";

  const { data, loading, error } = useFetch(url);

  let content;
  if (loading) {
    content = <p className="weather-hint">Loading weather...</p>;
  } else if (error) {
    content = <p role="alert">Could not load the weather: {error}</p>;
  } else {
    const current = data?.current;
    content = (
      <div className="weather-stats">
        <p>Temperature: {current.temperature_2m} °C</p>
        <p>Wind speed: {current.wind_speed_10m} km/h</p>
        <p>Last updated: {current.time.replace("T", " ")}</p>
      </div>
    );
  }

  return (
    <section className="weather-dashboard">
      <h2>Lab 5.2 weather in {city.name}</h2>
      <label htmlFor="city">City</label>
      <select id="city" value={cityName} onChange={(event) => setCityName(event.target.value)}>
        {cities.map((item) => (
          <option key={item.name} value={item.name}>{item.name}</option>
        ))}
      </select>
      {content}
    </section>
  );
}

export default WeatherDashboard;
