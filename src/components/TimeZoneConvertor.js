// src/components/TimeZoneConverter.js
import React, { Component } from 'react';
import moment from 'moment-timezone';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TimeZoneDisplay from './TimeZoneDisplay';
import AddTimeZone from './AddTimeZone';

class TimeZoneConverter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeZones: ['UTC', 'Asia/Kolkata'], // Default time zones
      currentTime: moment(),
      darkMode: false,
      shareableLink: '',
    };
  }

  handleTimeZoneAddition = (timeZone) => {
    this.setState(prevState => ({
      timeZones: [...prevState.timeZones, timeZone]
    }));
  };

  handleTimeZoneDeletion = (index) => {
    this.setState(prevState => ({
      timeZones: prevState.timeZones.filter((_, i) => i !== index)
    }));
  };

  handleDateChange = (date) => {
    this.setState({ currentTime: moment(date) }, this.generateShareableLink);
  };

  reverseTimeZones = () => {
    this.setState(prevState => ({
      timeZones: prevState.timeZones.slice().reverse()
    }));
  };

  toggleDarkMode = () => {
    this.setState(prevState => ({
      darkMode: !prevState.darkMode
    }));
  };

  generateShareableLink = () => {
    const { timeZones, currentTime } = this.state;
    const baseUrl = 'https://your-deployed-app-url.com'; // Replace with your deployed app URL
    const timeZoneParam = timeZones.join(',');
    const dateParam = currentTime.format('YYYY-MM-DDTHH:mm:ssZ');
    this.setState({ shareableLink: `${baseUrl}?timeZones=${encodeURIComponent(timeZoneParam)}&currentTime=${encodeURIComponent(dateParam)}` });
  };

  openGoogleCalendar = () => {
    const { currentTime } = this.state;
    const startTime = currentTime.format('YYYYMMDDTHHmmss');
    const endTime = currentTime.add(2, 'hours').format('YYYYMMDDTHHmmss');
    const url = `https://calendar.google.com/calendar/r/eventedit?text=Meeting&dates=${startTime}/${endTime}`;
    window.open(url, '_blank');
  };

  render() {
    const { timeZones, currentTime, darkMode, shareableLink } = this.state;
    return (
      <div style={{ backgroundColor: darkMode ? '#333' : '#fff', color: darkMode ? '#fff' : '#000', padding: '20px' }}>
        <button onClick={this.toggleDarkMode} style={styles.button}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button onClick={this.reverseTimeZones} style={styles.button}>Reverse Time Zones</button>
        <button onClick={this.generateShareableLink} style={styles.button}>Generate Shareable Link</button>
        <button onClick={this.openGoogleCalendar} style={styles.button}>Schedule Meet</button>

        <DatePicker
          selected={currentTime.toDate()}
          onChange={this.handleDateChange}
          showTimeSelect
          timeIntervals={15}
          dateFormat="Pp"
          style={styles.datePicker}
        />

        <AddTimeZone onAdd={this.handleTimeZoneAddition} />

        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {timeZones.map((zone, index) => (
                  <Draggable key={zone} draggableId={zone} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TimeZoneDisplay
                          timeZone={zone}
                          currentTime={currentTime}
                          onDelete={() => this.handleTimeZoneDeletion(index)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {shareableLink && (
          <div style={styles.linkContainer}>
            <input type="text" readOnly value={shareableLink} style={styles.linkInput} />
            <button onClick={() => navigator.clipboard.writeText(shareableLink)} style={styles.button}>Copy Link</button>
          </div>
        )}
      </div>
    );
  }
}

const styles = {
  button: {
    padding: '10px 20px',
    margin: '5px',
    backgroundColor: '#4CAF50',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
  },
  datePicker: {
    marginBottom: '20px',
  },
  linkContainer: {
    marginTop: '20px',
  },
  linkInput: {
    width: '80%',
    padding: '10px',
    marginRight: '10px',
  },
};

export default TimeZoneConverter;
