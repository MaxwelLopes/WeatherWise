import React, { useState, useEffect, useRef } from 'react';
import './Forecast.css';
import Chart from 'chart.js/auto';

function Forecast({ forecastData }) {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (forecastData && forecastData.length > 0 && chartRef.current) {
      if (chartInstance) {
        chartInstance.destroy();
      }

      const ctx = chartRef.current.getContext('2d');

      const newChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: forecastData.map(previsao => previsao[0]),
          datasets: [{
            label: 'Rain',
            data: forecastData.map(previsao => previsao[2]),
            backgroundColor: 'blue',
            borderColor: 'blue',
            borderWidth: 1,
            yAxisID: 'y'
          },
          {
            label: 'Temperature',
            data: forecastData.map(previsao => previsao[1]),
            borderColor: 'red',
            borderWidth: 2,
            type: 'line',
            fill: false,
            yAxisID: 'y'
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              position: 'left',
              title: {
                display: true,
                text: 'Temperature'
              }
            },
            y1: {
              beginAtZero: true,
              position: 'right',
              title: {
                display: true,
                text: 'Rain'
              },
              grid: {
                drawOnChartArea: false
              }
            },
            x: {
              grid: {
                drawOnChartArea: false
              }
            }
          },
          plugins: {
            legend: {
              display: true
            }
          }
        }
      });

      setChartInstance(newChartInstance);
    }
  }, [forecastData]);

  return (
    <div className="forecast">
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default Forecast;
