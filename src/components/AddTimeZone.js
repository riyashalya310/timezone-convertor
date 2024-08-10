// src/components/AddTimeZone.js
import React, { useState } from 'react';

const AddTimeZone = ({ onAdd }) => {
  const [newTimeZone, setNewTimeZone] = useState('');

  const handleAdd = () => {
    if (newTimeZone) {
      onAdd(newTimeZone);
      setNewTimeZone('');
    }
  };

  return (
    <div style={styles.container}>
      <input
        type="text"
        value={newTimeZone}
        onChange={(e) => setNewTimeZone(e.target.value)}
        placeholder="Enter time zone (e.g., 'America/New_York')"
        style={styles.input}
      />
      <button onClick={handleAdd} style={styles.button}>Add Time Zone</button>
    </div>
  );
};

const styles = {
  container: {
    marginBottom: '20px',
  },
  input: {
    padding: '5px',
    marginRight: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    padding: '5px 10px',
    backgroundColor: '#4CAF50',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default AddTimeZone;
