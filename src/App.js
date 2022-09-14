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
  const [countryId, setCountryId] = useState(1);

  const getUserData = data => {
    const id = `c${countryId}`;

    data.id = id;
    data.popInMil = +convertToMillion(data.population);

    setCountriesData(prevData => [...prevData, data]);
    setCountryId(prevData => ++prevData);
  };

  countriesData.forEach(data => console.log(data));

  return (
    <div className="container">
      <h2 className="secondary-heading">Enter country details</h2>
      <Form onGetData={getUserData} />
      <h2 className="secondary-heading">Countries</h2>
      <Countries data={countriesData} />
    </div>
  );
};

export default App;
