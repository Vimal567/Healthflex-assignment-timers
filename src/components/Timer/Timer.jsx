import React, { useState, useEffect } from 'react';

const Timer = ({ timer, start, reset, pause }) => {
  const [timeLeft, setTimeLeft] = useState(timer.duration);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime === 0) {
            clearInterval(interval);
            alert(`Congratulations! Timer ${timer.name} is done.`);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timer.duration]);

  return (
    <div>
      <h4>{timer.name}</h4>
      <p>{timeLeft} seconds remaining</p>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default Timer;
