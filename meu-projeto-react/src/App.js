import React from 'react';
import PopulationPyramidChart from './PopulationPyramidChart';

const App = () => {
  return (
    <div style={{ height: '1000px', margin: '0 auto', textAlign: 'center', marginTop: '50px' }}>
      {/* Outros componentes ou conteúdo aqui */}
      <p>Pirâmide Etária do Brasil</p>
      <PopulationPyramidChart />
    </div>
  );
};

export default App;
