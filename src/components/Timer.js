import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Timer = () => {
  const { state } = useLocation();
  const { timedSecs, waitingSecs, totalHours } = state; // Read values passed on state

  const [fHours, setfHours] = useState(0);
  const [fMinutes, setfMinutes] = useState(0);
  const [fSeconds, setfSeconds] = useState(0);
  const totalSecs = useRef(timedSecs);

  const [wHours, setWHours] = useState(0);
  const [wMinutes, setWMinutes] = useState(0);
  const [wSeconds, setWSeconds] = useState(0);
  const waitingTotalSecs = useRef(waitingSecs);

  const totalHrs = useRef(totalHours);

  const [isActive, setIsActive] = useState(true);
  const [isWaiting, setIsWaiting] = useState(false);

  const ActiveTimer = () => {
    let interval = null;
    interval = setInterval(() => {
      if (totalSecs.current === 0) {
        setIsWaiting(true);
        waitingTotalSecs.current = waitingSecs;
        setIsActive(false);
      } else {
        totalSecs.current = totalSecs.current - 1;
        const seconds = Math.floor(totalSecs.current % 60);
        const minutes = Math.floor((totalSecs.current / 60) % 60);
        const hours = Math.floor((totalSecs.current / (60 * 60)) % 60);

        setfHours(hours);
        setfMinutes(minutes);
        setfSeconds(seconds);
      }
    }, 1000);
    return interval;
  };

  const WaitingTimer = () => {
    let interval = null;
    interval = setInterval(() => {
      if (waitingTotalSecs.current === 0) {
        setIsActive(true);
        totalSecs.current = timedSecs;
        setIsWaiting(false);
      } else {
        waitingTotalSecs.current = waitingTotalSecs.current - 1;
        const seconds = Math.floor(waitingTotalSecs.current % 60);
        const minutes = Math.floor((waitingTotalSecs.current / 60) % 60);
        const hours = Math.floor((waitingTotalSecs.current / (60 * 60)) % 60);

        setWHours(hours);
        setWMinutes(minutes);
        setWSeconds(seconds);
      }
    }, 1000);
    return interval;
  };

  const TotalTimer = () => {
    let interval = null;
    interval = setInterval(() => {
      console.log('It has been one hour.');
      totalHrs.current = totalHrs.current - 1;
      console.log({ totalHrs } + ' hours left.');
      if (totalHrs.current === 0) {
        setIsActive(false);
        setIsWaiting(false);
      }
    }, 3600000);
    return interval;
  };

  const history = useNavigate();

  useEffect(() => {
    let activeInterval = null;
    let waitingInterval = null;
    let totalInterval = null;
    totalInterval = TotalTimer();
    if (totalHrs.current > 0) {
      if (isActive) {
        activeInterval = ActiveTimer();
      } else if (isWaiting) {
        waitingInterval = WaitingTimer();
      }
    } else {
      history('/');
    }
    return () => {
      clearInterval(activeInterval);
      clearInterval(waitingInterval);
      clearInterval(totalInterval);
    };
  });

  return (
    <div className="app">
      <div className="time">
        <h2 style={{ color: 'lightgreen' }}>Standing for: </h2> {fHours} hours,{' '}
        {fMinutes} minutes, and {fSeconds} seconds longer.
      </div>
      <div className="time">
        <h2 style={{ color: 'red' }}>Sitting for: </h2> {wHours} hours,{' '}
        {wMinutes} minutes, and {wSeconds} seconds longer.
      </div>
      <div className="row"></div>
    </div>
  );
};

export default Timer;
