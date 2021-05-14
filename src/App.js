/* eslint-disable eqeqeq */
import './App.css';
import React, { useEffect, useState } from 'react';

function Clock(props) {
  useEffect(() => {
    const id = setInterval(() => {
      props.setHasTime(new Date());
    }, 1000);
    return () => {
      clearInterval(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div>{props.hasTime.toLocaleString()}</div>
    </div>
  );
}

function App() {
  const [hasTime, setHasTime] = useState(new Date().toLocaleTimeString());
  const [hasDate, setHasDate] = useState(new Date());
  const [userTime, setUserTime] = useState('');
  const [hasDateB, setHasDateB] = useState('');
  const [userTimeB, setUserTimeB] = useState('');
  const [temporary, setTemporary] = useState(0);
  const [offset, setOffset] = useState(2);
  const [visible, setVisible] = useState(2);

  const time = Date.parse(hasDate) - Date.parse(new Date());
  const second1 = time / 1000 - offset * 60 * 60;
  let second = 0;
  let mins = 0;
  let hours = 0;
  let daysGenerall = 0;
  if (userTime !== '') {
    const uTim = userTime.split(':');
    second = second1 + parseInt(uTim[0]) * 60 * 60 + parseInt(uTim[1]) * 60;
    mins = Math.floor(second / 60);
    hours = Math.floor(mins / 60);
    daysGenerall = Math.floor(hours / 24);
    if (daysGenerall >= 0) {
      hours = hours - daysGenerall * 24;
    }
    if (hours >= 0) {
      mins = mins - (daysGenerall * 24 * 60 + hours * 60);
      second =
        second - (mins * 60 + hours * 60 * 60 + daysGenerall * 24 * 60 * 60);
    }
  }

  return (
    <div
      className="App"
      style={{ backgroundColor: second >= 0 ? 'red' : 'green' }}
    >
      <Clock hasTime={hasTime} setHasTime={setHasTime} />

      <br />
      <br />
      <label>
        Enter date
        <input
          type="date"
          onChange={(event) => setHasDateB(event.currentTarget.value)}
        />
      </label>
      <label>
        Enter time
        <input
          type="time"
          onChange={(event) => setUserTimeB(event.currentTarget.value)}
        />
      </label>
      <button
        onClick={() => {
          setHasDate(new Date(hasDateB));
          setUserTime(userTimeB);
        }}
      >
        Submit
      </button>
      <div>
        <label>
          Select your time zone:{' '}
          <select
            id="utcTime"
            onChange={(e) => {
              setOffset(e.currentTarget.value);
              setVisible(e.currentTarget.value);
            }}
          >
            <option value={-5}>Cental Time US (UTC-5)</option>
            <option value={-2}>Rio, Brasil (UTC-2)</option>
            <option value={1}>London, UK (UTC+1)</option>
            <option value={2} selected="selected">
              Berlin, Germany (UTC+2)
            </option>
            <option value={4}>Dubai, UAE (UTC+4)</option>
            <option value={8}>Bejing, China (UTC+8)</option>
            <option value={10}>Sydney, Australia (UTC+10)</option>
            <option value={0}>Else</option>
          </select>
        </label>
        <div style={{ visibility: visible == 0 ? 'visible' : 'hidden' }}>
          <label>
            UTC Offset:
            <input
              type="number"
              onChange={(e) => setTemporary(e.currentTarget.value)}
            />
          </label>
          <button
            onClick={() => {
              setOffset(temporary);
            }}
          >
            Submit
          </button>
        </div>
      </div>

      <div>
        days: {daysGenerall > 0 ? daysGenerall : 0} hours:
        {hours > 0 ? hours : 0} mins: {mins > 0 ? mins : 0} seconds:{' '}
        {second > 0 ? second : 0}
        {}
      </div>
    </div>
  );
}

export default App;
