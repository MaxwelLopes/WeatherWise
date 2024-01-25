import React, { useEffect, useRef } from 'react';
import './Forecast.css';
import Chart from 'chart.js/auto';

function Forecast() {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = document.getElementById('temperatureChart').getContext('2d');

    // Destruir o gráfico anterior, se existir
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Criar um novo gráfico
    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['12:00', '15:00', '18:00', '21:00', '00:00', '03:00'],
        datasets: [{
          label: 'Máxima',
          data: [40, 39.5, 38, 37, 35, 41],
          borderColor: 'red',
          pointStyle: 'circle',
        },
        {
          label: 'Mínima',
          data: [20, 20, 19, 17, 15, 23],
          borderColor: 'blue',
          pointStyle: 'circle',
        }]
      },
      options: {
        scales: {
          x: {
            grid: {
              drawOnChartArea: false, 
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              usePointStyle: true, 
              pointStyle: 'line', 
            },
          },
        },
      }
    });
  }, []); 

  return (
    <div className="forecast">
      <canvas id="temperatureChart"></canvas>
    </div>
  );
}

export default Forecast;
