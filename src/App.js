import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import Form from './components/Form/Form';
import Countries from './components/Country/Countries';
import Warning from './components/Warning/Warning';

import formSchema from './json/country-form-schema.json';

import './App.css';

const convertToMillion = value => {
  if (Number.isNaN(value)) return 1;

  return (value / 1000000).toFixed(2);
};

const App = () => {
  const { inputs } = formSchema;

  const [countriesData, setCountriesData] = useState([]);
  const [countryId, setCountryId] = useState(1);
  const [updateItemPrevData, setUpdateItemPrevData] = useState();
  const [updateId, setUpdateId] = useState();
  const [deleteId, setDeleteId] = useState();

  const addCountryData = data => {
    const id = `c${countryId}`;

    const localData = { ...data };

    localData.id = id;
    localData.popInMil = +convertToMillion(+localData.population);

    setCountriesData(prevData => [...prevData, localData]);
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

    Object.keys(data).forEach(key => {
      updateData[key] = data[key];

      if (key === 'population') {
        updateData.popInMil = +convertToMillion(updateData[key]);
      }
    });

    setCountriesData(prevData => [...prevData]);
    setUpdateItemPrevData(null);
    setUpdateId(null);
  };

  const getDeleteId = id => {
    setDeleteId(id);
  };

  const cancelDeleteHandler = () => {
    setDeleteId(null);
  };

  const proceedDeleteHandler = () => {
    const deleteIndex = countriesData.findIndex(el => el.id === deleteId);
    countriesData.splice(deleteIndex, 1);

    setCountriesData(prevData => prevData);
    setDeleteId(null);
  };

  const inputList = [];
  const initializeInputList = () => {
    for (const key in inputs) {
      const inputObj = {
        [key]: inputs[key],
      };
      inputList.push(inputObj);
    }
  };
  initializeInputList();

  return (
    <div className="container">
      {deleteId
        ? ReactDOM.createPortal(
            <Warning
              onCancel={cancelDeleteHandler}
              onProceed={proceedDeleteHandler}
              heading="Do you want to delete the item?"
            />,
            document.getElementById('warning-root')
          )
        : ''}
      <h2 className="secondary-heading">Enter country details</h2>
      <Form
        inputList={inputList}
        updateItemData={updateItemPrevData}
        onAddData={addCountryData}
        onUpdateData={updateUserData}
      />
      <h2 className="secondary-heading">Countries</h2>
      <Countries
        getDeleteId={getDeleteId}
        getUpdateId={getUpdateId}
        data={countriesData}
      />
    </div>
  );
};

export default App;
