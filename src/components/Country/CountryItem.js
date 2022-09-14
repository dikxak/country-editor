import React from 'react';

import Card from '../Card/Card';

import { BsPeopleFill } from 'react-icons/bs';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';

import classes from './CountryItem.module.css';

const CountryItem = props => {
  const { name, population, capital } = props;

  return (
    <Card>
      <h3 className={classes['name']}>{name}</h3>
      <p className={classes['population']}>
        <BsPeopleFill className={classes['country-icon']} /> {population}M
        People
      </p>
      <p className={classes['capital']}>
        <FaMapMarkerAlt className={classes['country-icon']} /> {capital}
      </p>

      <div className={classes['country-controls']}>
        <button onClick={props.onUpdate} className="btn btn--edit">
          <MdEdit /> Edit
        </button>
        <button className="btn btn--delete">
          <MdDelete /> Delete
        </button>
      </div>
    </Card>
  );
};

export default CountryItem;
