import { useEffect, useState } from 'react';
import './History.css';
import { formatTime } from '../../utils/helper';

const History = () => {
  const [completedTimers, setCompletedTimers] = useState([]);

  // Load completed timers from localStorage
  useEffect(() => {
    const savedTimers = JSON.parse(localStorage.getItem('timers')) || [];
    const completedTimers = savedTimers.filter(timer => timer.isCompleted);
    setCompletedTimers(completedTimers);
  }, []);

  return (
    <div className="history-page page-wrapper">
      <h1>History</h1>
      {completedTimers.length === 0 ? (
        <div className='no-data'>No timers have been completed yet.</div>
      ) : (
        <div className="completed-timers-list">
          {completedTimers.map((timer, index) => (
            <div key={index} className="completed-timer">
              <div className="timer-name">Name: {timer.name.charAt(0).toUpperCase() + timer.name.slice(1)}</div>
              <div className="timer-category">Category: {timer.category}</div>
              <div className="timer-duration">Duration: {formatTime(timer.duration)}</div>
              <div className="timer-completion-time">
                Completed at: {timer.completedAt}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default History;