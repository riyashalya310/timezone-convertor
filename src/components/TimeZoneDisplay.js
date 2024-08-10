// src/components/TimeZoneDisplay.js
import React from 'react';
import moment from 'moment-timezone';

const TimeZoneDisplay = ({ timeZone, currentTime, onDelete }) => {
  const timeInZone = moment.tz(currentTime, timeZone).format('YYYY-MM-DD HH:mm:ss');

  return (
    <div style={styles.container}>
      <span>{timeZone}: {timeInZone}</span>
      <button onClick={onDelete} style={styles.button}>Remove</button>
    </div>
  );
};

const styles = {
  container: {
    padding: '10px',
    marginBottom: '5px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    padding: '5px 10px',
    backgroundColor: '#ff4d4d',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default TimeZoneDisplay;
