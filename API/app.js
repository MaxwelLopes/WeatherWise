const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const port = 5000;
require('dotenv').config();

app.use(cors());

const KEY_WEATHER = process.env.KEY_WEATHER;
const KEY_GOOGLE = process.env.KEY_GOOGLE;

const fetchData = async ({ type = null, city = null, latitude = null, longitude = null }) => {
    let url;    
    if (type === 'weather') {
        if (city) {
            url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY_WEATHER}&units=metric`;
        } else if (latitude && longitude) {
            url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${KEY_WEATHER}&units=metric`;
        }
    } else if (type === 'forecast') {
        if (city) {
            url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${KEY_WEATHER}&units=metric`;
        } else if (latitude && longitude) {
            url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${KEY_WEATHER}&units=metric`;
        }
    }

    const response = await fetch(url);   
    const data = await response.json();
    if(data.cod != 200){
        return res.status(404).json({
            error: true,
        });
    }
    return data;
}

app.get('/api', async (req, res) => {
    const { type, city, lat, lon } = req.query;
    if (!city && (!lat || !lon)) {
        res.status(400).json({
            error: true,
            message: 'Por favor, forneça uma cidade!'
        });
    }
    
    try {
        const data = await fetchData({ type: type, city: city, latitude: lat,longitude: lon});
        res.send(data);
    } catch (error) {
        res.status(404).json({
            error: true,
            message: "cidade não encontrada!"
        });
    }
});

app.get('/search', async (req, res) => {
    const url = `https://maps.googleapis.com/maps/api/js?key=${KEY_GOOGLE}&libraries=places`;
    const response = await axios.get(url);
    res.type('text/javascript').send(response.data);
  });



app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
