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
            label: 'Temperature',
            data: forecastData.map(previsao => previsao[1]),
            borderColor: 'red',
            borderWidth: 2,
            type: 'line',
            fill: false,
            yAxisID: 'y',
            color: 'aliceblue'
          },
          {
            label: 'Rain',
            data: forecastData.map(previsao => previsao[2]),
            backgroundColor: 'blue',
            borderColor: 'blue',
            borderWidth: 1,
            yAxisID: 'y1',
            color: 'aliceblue',
            textShadow: '0.5px 0.5px 6px rgba(0, 0, 0, 0.5)'
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              position: 'left',
              title: {
                display: true,
                text: 'Temperature',
                color: 'aliceblue',
                textShadow: '0.5px 0.5px 6px rgba(0, 0, 0, 0.5)'
              },
              ticks: {
                color: 'aliceblue',
                textShadow: '0.5px 0.5px 6px rgba(0, 0, 0, 0.5)'
              }
            },
            y1: {
              beginAtZero: true,
              position: 'right',
              title: {
                display: true,
                text: 'Rain',
                color: 'aliceblue',
                textShadow: '0.5px 0.5px 6px rgba(0, 0, 0, 0.5)'
              },
              ticks: {
                color: 'aliceblue',
                textShadow: '0.5px 0.5px 6px rgba(0, 0, 0, 0.5)'
              },
              grid: {
                drawOnChartArea: false
              }
            },
            x: {
              grid: {
                drawOnChartArea: false
              },
              ticks: {
                color: 'aliceblue',
                textShadow: '0.5px 0.5px 6px rgba(0, 0, 0, 0.5)'
              }
            }
          },
          plugins: {
            legend: {
              display: true,
              labels: {
                usePointStyle: true,
                boxWidth: 10,
                boxHeight: 10,
                generateLabels: function(chart) {
                  const labels = Chart.defaults.plugins.legend.labels.generateLabels(chart);
                  labels.forEach(label => {
                    if (label.datasetIndex === 0) { 
                      label.fillStyle = 'red'; 
                    } else if (label.datasetIndex === 1) { 
                      label.fillStyle = 'blue'; 
                    }
                  });
                  return labels;
                }
              }
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
