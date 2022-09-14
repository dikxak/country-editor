import React from 'react';

import CountryItem from './CountryItem';

import classes from './Countries.module.css';

const Countries = props => {
  const { data } = props;

  return (
    <div className={classes['country-container']}>
      {data.length === 0 ? (
        <p className="info-msg">No any data available.</p>
      ) : (
        data.map(country => {
          return (
            <CountryItem
              key={country.id}
              name={country.name}
              population={country.popInMil}
              capital={country.capital}
              onUpdate={props.getUpdateId.bind(null, country.id)}
            />
          );
        })
      )}
    </div>
  );
};

export default Countries;
