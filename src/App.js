import React, { useState } from 'react';

import Form from './components/Form/Form';

import './App.css';
import Countries from './components/Country/Countries';

const convertToMillion = value => {
  if (Number.isNaN(value)) return 1;

  return (value / 1000000).toFixed(2);
};

const App = () => {
  const [countriesData, setCountriesData] = useState([]);

  return (
    <div className="container">
      <h2 className="secondary-heading">Enter country details</h2>
      <Form />
      <h2 className="secondary-heading">Countries</h2>
      <Countries data={countriesData} />
    </div>
  );
};

export default App;
