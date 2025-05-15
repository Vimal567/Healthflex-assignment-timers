import { useEffect, useState } from 'react';
import './History.css';
import { exportHistory, formatTime } from '../../utils/helper';

const History = () => {
  const [completedTimers, setCompletedTimers] = useState([]);
  const categories = ["Workout", "Study", "Break"];
  const [selectedTimers, setSelectedTimers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleOnSelectCategory = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    if (category.length <= 0) {
      setSelectedTimers(completedTimers);
      return;
    }
    setSelectedTimers(completedTimers.filter(timer => timer.category === category));
  };

  // Load completed timers from localStorage
  useEffect(() => {
    const savedTimers = JSON.parse(localStorage.getItem('timers')) || [];
    const completedTimers = savedTimers.filter(timer => timer.isCompleted);
    setCompletedTimers(completedTimers);
    setSelectedTimers(completedTimers);
  }, []);

  return (
    <div className="history-page page-wrapper">
      <div className="heading-container">
        <h1>History</h1>
        <div className="form-group">
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => handleOnSelectCategory(e)}
          >
            <option value="">Select Category</option>
            {categories.map((categoryItem, index) => (
              <option key={index} value={categoryItem}>{categoryItem}</option>
            ))}
          </select>
        </div>
      </div>
      {selectedTimers.length === 0 ? (
        <div className='no-data'>No timers have been completed yet.</div>
      ) : (
        <div className="completed-timers-list">
          {selectedTimers.map((timer, index) => (
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
      {selectedTimers.length > 0 && <div className="tools-container">
        <button type="button" className='export' onClick={() => exportHistory(selectedTimers)}>Export</button>
      </div>}
    </div>
  );
}

export default History;