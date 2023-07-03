import React from 'react';

import classes from './LogFeed.module.css';

function LogFeed(props) {
  const { apiResponses } = props;
  return (
    <div className={classes.scrollablelistcontainer}>
      <ul className={classes.scrollablelist}>
        {apiResponses.map((item) => (
          <li key={item.id}>{item.responseString}</li>
        ))}
      </ul>
    </div>
  );
}
export default LogFeed;
