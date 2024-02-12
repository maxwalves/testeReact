import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const PiramideEtariaChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Dados de exemplo (substitua pelos dados reais)
    const dadosPopulacao = {
      labels: ['0-4', '5-9', '10-14', '15-19', '20-24', '25-29', '30-34', '35-39', '40-44', '45-49', '50-54', '55-59', '60-64', '65-69', '70-74', '75+'],
      datasets: [
        {
          label: 'Homens',
          backgroundColor: 'blue',
          data: [/* Adicione as contagens de homens por faixa etária aqui */]
        },
        {
          label: 'Mulheres',
          backgroundColor: 'pink',
          data: [/* Adicione as contagens de mulheres por faixa etária aqui */]
        }
      ]
    };

    const ctx = document.getElementById('piramideEtariaChart').getContext('2d');

    // Destrói o gráfico existente, se houver
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Cria um novo gráfico
    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: dadosPopulacao,
      options: {
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true
          }
        }
      }
    });
  }, []); // Executa apenas uma vez ao montar o componente

  return (
    <div>
      <h2>Gráfico de Pirâmide Etária</h2>
      <canvas id="piramideEtariaChart" width="400" height="400"></canvas>
    </div>
  );
};

export default PiramideEtariaChart;
