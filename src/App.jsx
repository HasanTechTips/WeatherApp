import React, { useState } from "react";
import axios from "axios";

const WeatherApp = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = "32bda99389ae414986e223330251003";
  const BASE_URL = "https://api.weatherapi.com/v1";

  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(
        `${BASE_URL}/search.json?key=${API_KEY}&q=${query}`
      );
      setSuggestions(response.data);
    } catch (err) {
      console.error("Error fetching suggestions", err);
    }
  };

  const fetchWeather = async (location) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/current.json?key=${API_KEY}&q=${location}`
      );
      setWeather(response.data);
      setError(null);
    } catch (err) {
      setError("Could not fetch weather data. Try again.");
      console.error("Error fetching weather", err);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchSuggestions(value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion.name);
    setSuggestions([]);
    fetchWeather(suggestion.name);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search) fetchWeather(search);
  };

  // Simple inline styles for center alignment
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "20px",
    backgroundColor: "#f0f8ff"
  };

  const cardStyle = {
    width: "90%",
    maxWidth: "350px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    backgroundColor: "white",
    marginBottom: "20px",
    textAlign: "center"
  };

  const inputStyle = {
    width: "90%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#4169e1",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "15px"
  };

  const suggestionStyle = {
    width: "90%",
    maxWidth: "350px",
    backgroundColor: "white",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    marginTop: "-10px",
    marginBottom: "15px",
    textAlign: "left"
  };

  const suggestionItemStyle = {
    padding: "10px",
    borderBottom: "1px solid #eee",
    cursor: "pointer"
  };

  const weatherCardStyle = {
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    backgroundColor: "#f9f9f9",
    width: "100%",
    textAlign: "center"
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={{ marginBottom: "10px" }}>Weather App</h1>
        <p style={{ marginBottom: "20px" }}>Check the weather anywhere in the world</p>
        
        <form onSubmit={handleSearchSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search for a city"
            style={inputStyle}
          />
          
          <button type="submit" style={buttonStyle}>
            Get Weather
          </button>
        </form>
        
        {suggestions.length > 0 && (
          <div style={suggestionStyle}>
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                style={suggestionItemStyle}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {error && (
        <div style={{...cardStyle, backgroundColor: "#ffebee", color: "#d32f2f"}}>
          {error}
        </div>
      )}

      {weather && (
        <div style={cardStyle}>
          <h2 style={{ marginBottom: "5px", color: "#4169e1" }}>
            {weather.location.name}, {weather.location.country}
          </h2>
          <p style={{ color: "#666", marginBottom: "15px" }}>
            {weather.current.condition.text}
          </p>
          
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "20px" }}>
            <img
              src={weather.current.condition.icon}
              alt="Weather Icon"
              style={{ marginRight: "10px" }}
            />
            <p style={{ fontSize: "36px", fontWeight: "bold", margin: 0 }}>
              {weather.current.temp_c}°C
            </p>
          </div>
          
          <div style={{...weatherCardStyle, width: "90%", maxWidth: "300px", margin: "0 auto" }}>
            <p style={{ margin: "8px 0" }}>
              <strong>Wind Speed:</strong> {weather.current.wind_kph} kph
            </p>
            <p style={{ margin: "8px 0" }}>
              <strong>Humidity:</strong> {weather.current.humidity}%
            </p>
            <p style={{ margin: "8px 0" }}>
              <strong>Feels Like:</strong> {weather.current.feelslike_c}°C
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;