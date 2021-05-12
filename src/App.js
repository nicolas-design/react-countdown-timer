import './App.css';
import { useEffect, useState } from 'react';
import logo from './logo.svg';

function Clock(props) {
  useEffect(() => {
    const id = setInterval(() => {
      props.setHasTime(new Date());
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div>
      <div>{props.hasTime.toLocaleString()}</div>
    </div>
  );
}

/*function TimeLeft(props) {
  useEffect(() => {
    const id = setInterval(() => {
      props.setTimeLeftDate(Math.abs());
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

  return <div>{props.timeLeftDate}</div>;

  <TimeLeft
        timeLeftDate={timeLeftDate}
        setTimeLeftDate={setTimeLeftDate}
        timeLeftUser={timeLeftUser}
        setTimeLeftUser={setTimeLeftUser}
        hasDate={hasDate}
        setHasDate={setHasDate}
        userTime={userTime}
        setUserTime={setUserTime}
      />
}*/

function App() {
  const [hasTime, setHasTime] = useState(new Date().toLocaleTimeString());
  const [hasDate, setHasDate] = useState(new Date());
  const [userTime, setUserTime] = useState('');
  const [hasDateB, setHasDateB] = useState('');
  const [userTimeB, setUserTimeB] = useState('');
  const [timeLeftDate, setTimeLeftDate] = useState('');
  const [timeLeftUser, setTimeLeftUser] = useState('');

  let time = Date.parse(hasDate) - Date.parse(new Date());
  let sec = time / 1000;
  let daysGenerall = Math.ceil(sec / 60 / 60 / 24);
  let hours = 24 - new Date().getHours() - 1;
  let mins = 60 - new Date().getMinutes();
  return (
    <div className="App">
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
          setUserTime(new Date(userTimeB));
        }}
      >
        Submit
      </button>

      <div>
        days {daysGenerall}
        hour {hours}
      </div>
    </div>
  );
}

export default App;
