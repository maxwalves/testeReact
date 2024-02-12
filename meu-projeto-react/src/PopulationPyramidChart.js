import React, { useEffect, useRef } from 'react';

const PopulationPyramidChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Função para buscar dados da API do IBGE
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://servicodados.ibge.gov.br/api/v3/agregados/9514/periodos/-6/variaveis/1000093?localidades=N1[all]&classificacao=2[4,5]|287[93070,93084,93085,93086,93087,93088,93089,93090,93091,93092,93093,93094,93095,93096,93097,93098,49108,49109,60040,60041,6653]|286[113635]',
        );

        if (!response.ok) {
          throw new Error('Erro ao obter dados da API do IBGE');
        }

        const dados = await response.json();
        
        var dadosTratados = dados[0].resultados;

        //crie um array vazio para alimentar o gráfico
        const dadosParaGraficoHomens = [];
        const dadosParaGraficoMulheres = [];
        
        // Iterar sobre os dados para alimentar o gráfico
        for (let i = 0; i < dadosTratados.length; i++) {

          // Acessar a categoria da classificação
          var sexoChaveValor = dadosTratados[i].classificacoes[0].categoria;

          // Capturar a chave e o valor
          var sexoChave = Object.keys(sexoChaveValor)[0]; // Chave
          var sexo = sexoChaveValor[sexoChave]; // Valor

          var grupoIdadeChaveValor = dadosTratados[i].classificacoes[1].categoria;

          // Capturar a chave e o valor
          var chaveGrupoIdade = Object.keys(grupoIdadeChaveValor)[0]; // Chave
          var valorGrupoIdade = grupoIdadeChaveValor[chaveGrupoIdade]; // Valor

          var quantidadeChaveValor = dadosTratados[i].series[0].serie;

          // Capturar a chave e o valor
          var chaveQuantidade = Object.keys(quantidadeChaveValor)[0]; // Chave
          var valorQuantidade = quantidadeChaveValor[chaveQuantidade]; // Valor

          if(sexo == 'Homens'){
            dadosParaGraficoHomens.push([valorGrupoIdade, -valorQuantidade]);
          }
          if(sexo == 'Mulheres'){
            dadosParaGraficoMulheres.push([valorGrupoIdade, valorQuantidade]);
          }
          
        }

        const homens = {
          name: 'Male',
          points: [
            ['0-4', -10059740],
            ['5-9', -10517634],
            ['10-14', -10526401],
            ['15-19', -10631931],
            ['20-24', -11996587],
            ['25-29', -11254853],
            ['30-34', -11114717],
            ['35-39', -9932894],
            ['40-44', -10390339],
            ['45-49', -10378298],
            ['50-54', -11387743],
            ['55-59', -10872343],
            ['60-64', -9145334],
            ['65-69', -7618126],
            ['70-74', -5246871],
            ['75-79', -3617750],
            ['80+', -4626342]
          ]
        };

        const mulheres = {
          name: 'Male',
          points: [
            ['0-4', 9619810],
            ['5-9', 10092946],
            ['10-14', 10093446],
            ['15-19', 10066517],
            ['20-24', 11266559],
            ['25-29', 10711383],
            ['30-34', 10893282],
            ['35-39', 9770693],
            ['40-44', 10381899],
            ['45-49', 10222507],
            ['50-54', 11532467],
            ['55-59', 11232544],
            ['60-64', 9800743],
            ['65-69', 8392833],
            ['70-74', 6168134],
            ['75-79', 4394229],
            ['80+', 7460923]
          ]
        };

/*         const homens = {
          name: 'Male',
          points: dadosParaGraficoHomens, // Substitua os pontos pelos dados tratados
        };

        
        const mulheres = {
          name: 'Female',
          points: dadosParaGraficoMulheres, // Substitua os pontos pelos dados tratados
        }; */

        console.log(homens);
        console.log(mulheres);
        
        // Verifica se a biblioteca JSCharting já está carregada
        if (window.JSC) {
          renderChart(homens, mulheres);
        } else {
          // Carrega a biblioteca JSCharting dinamicamente
          const script = document.createElement('script');
          script.src = 'https://code.jscharting.com/latest/jscharting.js';
          script.async = true;
          script.onload = () => renderChart(homens, mulheres);
          document.head.appendChild(script);
        }
      } catch (error) {
        console.error('Erro:', error);
      }
    };

    // Chama a função para buscar dados ao montar o componente
    fetchData();
  }, []); // Executa apenas uma vez ao montar o componente

  const renderChart = (homens, mulheres) => {
    // Configuração do gráfico
    const config = {
      type: 'horizontal column pyramid',
      title: 'Population Pyramid Chart',
      yAxis: {
        scale: {
          inverted: true, // Inverte o eixo y para a pirâmide
        },
      },
      series: [
        homens, // Série de homens
        mulheres, // Série de mulheres
      ]
    };
  
    // Verifica se a biblioteca JSCharting está disponível
    if (window.JSC && typeof window.JSC.Chart === 'function') {
      // Renderiza o gráfico utilizando a configuração
      window.JSC.Chart(chartRef.current, config);
    } else {
      console.error('JSCharting.Chart não está definido ou não é uma função.');
    }
  };

  return <div ref={chartRef}></div>;
};

export default PopulationPyramidChart;
