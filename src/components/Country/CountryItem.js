import React from 'react';

import Card from '../Card/Card';

import { BsPeopleFill } from 'react-icons/bs';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';

import classes from './CountryItem.module.css';

const CountryItem = props => {
  return (
    <Card>
      <h3 className={classes['name']}>Nepal</h3>
      <p className={classes['population']}>
        <BsPeopleFill className={classes['country-icon']} /> 30.26M People
      </p>
      <p className={classes['capital']}>
        <FaMapMarkerAlt className={classes['country-icon']} /> Kathmandu
      </p>

      <div className={classes['country-controls']}>
        <button className="btn btn--edit">
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
