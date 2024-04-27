import React, { useState, useEffect } from "react";
import { search } from "../../api.js";
import "./search.css";

const KEY_GOOGLE = import.meta.env.VITE_KEY_GOOGLE;

function Search({ callFetchData }) {
  const [city, setCity] = useState("");

  useEffect(() => {
    loadGooglePlacesScript();
  }, [callFetchData]);

  const loadGooglePlacesScript = async () => {
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${KEY_GOOGLE}&libraries=places`;
      script.async = true;
      document.head.appendChild(script);
      script.onload = initializeAutocomplete;

      return () => {
        document.head.removeChild(script);
      };
    } else {
      initializeAutocomplete();
    }
  };

  const initializeAutocomplete = () => {
    const autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById("search_input"),
      { types: ["(cities)"] }
    );
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const latitude = place.geometry.location.lat();
        const longitude = place.geometry.location.lng();
        callFetchData({ latitude, longitude });
      }
    });
  };

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleClick = () => {
    if (city.trim() !== "") {
      callFetchData({ city });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        id="search_input"
        placeholder="Digite a cidade"
        value={city}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button
        className="search-button"
        onClick={handleClick}
        disabled={city.trim() === ""}
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
            stroke="var(--text)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </button>
    </div>
  );
}

export default Search;
