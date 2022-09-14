import React, { useState } from 'react';

import Form from './components/Form/Form';
import Countries from './components/Country/Countries';

import './App.css';

const convertToMillion = value => {
  if (Number.isNaN(value)) return 1;

  return (value / 1000000).toFixed(2);
};

const App = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [countryId, setCountryId] = useState(1);
  const [updateItemPrevData, setUpdateItemPrevData] = useState();
  const [updateId, setUpdateId] = useState();

  const addUserData = data => {
    const id = `c${countryId}`;

    data.id = id;
    data.popInMil = +convertToMillion(data.population);

    setCountriesData(prevData => [...prevData, data]);
    setCountryId(prevData => ++prevData);
  };

  const getUpdateId = id => {
    let data = {};
    data = { ...countriesData.find(el => el.id === id) };

    setUpdateId(id);
    setUpdateItemPrevData(data);
  };

  const updateUserData = data => {
    const updateData = countriesData.find(data => data.id === updateId);

    updateData.name = data.name;
    updateData.capital = data.capital;
    updateData.population = data.population;
    updateData.popInMil = +convertToMillion(updateData.population);

    setCountriesData(prevData => [...prevData]);
    setUpdateItemPrevData(undefined);
  };

  return (
    <div className="container">
      <h2 className="secondary-heading">Enter country details</h2>
      <Form
        updateItemData={updateItemPrevData}
        onAddData={addUserData}
        onUpdateData={updateUserData}
      />
      <h2 className="secondary-heading">Countries</h2>
      <Countries getUpdateId={getUpdateId} data={countriesData} />
    </div>
  );
};

export default App;
