import React from 'react';

import classes from './Form.module.css';

const Form = props => {
  return (
    <form className={classes['form']}>
      <div className={classes['form-control-group']}>
        <div className={classes['form-group']}>
          <label htmlFor="name">Enter name:</label>
          <input type="text" id="name" name="name" placeholder="e.g. Nepal" />
        </div>

        <div className={classes['form-group']}>
          <label htmlFor="population">Enter population:</label>
          <input
            type="number"
            id="population"
            name="population"
            placeholder="e.g. 30286125"
          />
        </div>

        <div className={classes['form-group']}>
          <label htmlFor="capital">Enter capital:</label>
          <input
            type="text"
            id="capital"
            name="capital"
            placeholder="e.g. Kathmandu"
          />
        </div>
      </div>

      <div className={classes['form-action-group']}>
        <button type="submit">Add Country</button>
      </div>
    </form>
  );
};

export default Form;
