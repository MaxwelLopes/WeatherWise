import React, { useState, useEffect, useRef } from 'react';
import './Forecast.css';
import Chart from 'chart.js/auto';

function Forecast({ forecastData }) {
  const chartRef = useRef(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [chartInstance, setChartInstance] = useState(null); // Armazenar a instância do gráfico

  useEffect(() => {
    if (forecastData && forecastData.length > 0 && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
    
      if (chartInstance) {
        chartInstance.destroy();
      }
    
      // Criar um novo gráfico
      const newChartInstance = new Chart(ctx, {
        type: 'bar', // Tipo padrão definido como barra para permitir gráficos mistos
        data: {
          labels: forecastData.map(previsao => previsao[0]),
          datasets: [{
            label: 'Temperature',
            data: forecastData.map(previsao => previsao[1]),
            borderColor: 'red',
            pointStyle: 'circle',
            type: 'line', 
          },
          {
            label: 'Rain',
            data: forecastData.map(previsao => previsao[2]),
            backgroundColor: 'blue', 
            borderColor: 'blue',
            pointStyle: 'circle',
            pointBackgroundColor: 'blue', // Cor do ponto na legenda
            pointBorderColor: 'blue'
          }]
        },
        options: {
          scales: {
            x: {
              grid: {
                drawOnChartArea: false, 
              },
              ticks: { 
                color: 'aliceblue',
              }
            },
            y: {
              beginAtZero: true,
              ticks: { 
                color: 'aliceblue',
              }
            }
          },
          plugins: {
            legend: {
              display: true,
              labels: {
                usePointStyle: true, 
                pointStyle: 'line', 
                color: 'aliceblue' 
              },
            },
            datalabels: {
              anchor: 'end',
              align: 'top',
              formatter: (value) => `${value} mm`
            }
          },
        }
      });
      
    
      setChartInstance(newChartInstance); // Armazenar a nova instância do gráfico
      setDataLoaded(true); // Indica que os dados foram carregados
    }
  }, [forecastData]);

  // Renderização condicional com base no carregamento dos dados
  if (!forecastData) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        Carregando...
      </div>
    );
  }

  return (
    <div className="forecast">
      <canvas ref={chartRef} id="temperatureChart"></canvas>
    </div>
  );
}

export default Forecast;

