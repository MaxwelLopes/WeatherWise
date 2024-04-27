import axios from "axios";

const KEY_WEATHER = import.meta.env.VITE_KEY_WEATHER;
const KEY_GOOGLE = import.meta.env.VITE_KEY_GOOGLE;

export async function fetchData({
  type = null,
  city = null,
  latitude = null,
  longitude = null,
}) {
  if (!city && (!latitude || !longitude)) {
    return {
      status: 400,
      error: true,
      message:
        "Por favor, forneça uma cidade ou coordenadas de latitude e longitude!",
    };
  }
  let url;
  if (type === "weather") {
    if (city) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY_WEATHER}&units=metric`;
    } else if (latitude && longitude) {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${KEY_WEATHER}&units=metric`;
    }
  } else if (type === "forecast") {
    if (city) {
      url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${KEY_WEATHER}&units=metric`;
    } else if (latitude && longitude) {
      url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${KEY_WEATHER}&units=metric`;
    }
  }

  const response = await fetch(url);
  const data = await response.json();
  if (data.cod != 200) {
    return {
      status: 404,
      error: true,
    };
  }
  return data;
}

export async function search() {
  const url = `https://maps.googleapis.com/maps/api/js?key=${KEY_GOOGLE}&libraries=places`;
  const response = await axios.get(url);
  return response.data;
}
