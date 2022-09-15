import React from 'react';

import classes from './Warning.module.css';

const Warning = props => {
  return (
    <div className={classes['warning-container']}>
      <div className={classes['warning-content']}>
        <h3 className={classes['warning-message']}>{props.heading}</h3>

        <div className={classes['warning-controls']}>
          <button className="btn btn--delete">Yes</button>
          <button className="btn btn--edit">No</button>
        </div>
      </div>
    </div>
  );
};

export default Warning;
