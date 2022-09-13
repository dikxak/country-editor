import React from 'react';

import CountryItem from './CountryItem';

import classes from './Countries.module.css';

const Countries = props => {
  return (
    <div className={classes['country-container']}>
      <CountryItem />
      <CountryItem />
      <CountryItem />
      <CountryItem />
      <CountryItem />
      <CountryItem />
    </div>
  );
};

export default Countries;
