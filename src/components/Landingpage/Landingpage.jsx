import { useState, useEffect, useRef, useReducer } from 'react';
import './Landingpage.css';
import { useSnackbar } from 'notistack';
import { timerReducer } from '../../utils/reducerFunction';
import { formatTime } from '../../utils/helper';
import { useNavigate } from 'react-router-dom';
import Timer from '../Timer/Timer';

const Landingpage = () => {
  const categories = ["Workout", "Study", "Break"];
  const [newTimer, setNewTimer] = useState({ name: '', duration: 0, category: '' });
  const [activeTimers, setActiveTimers] = useState({}); // { id: remainingSeconds }
  const [intervals, setIntervals] = useState({});
  const [activeCategory, setActiveCategory] = useState('');
  const [timers, dispatch] = useReducer(timerReducer, []);
  const [selectedTimer, setSelectedTimer] = useState([]);

  const modalRef = useRef();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const toggleCategorySection = (category) => {
    setActiveCategory(activeCategory === category ? '' : category); // Close if the same section is clicked again
  };

  const addTimer = (event) => {
    event.preventDefault();

    //Check if all fields are filled
    if (!newTimer.name) {
      enqueueSnackbar("Please enter a name for the timer.", { variant: 'warning' });
      return;
    }
    if (newTimer.duration <= 0) {
      alert("Please enter a valid duration greater than 0.");
      return;
    }
    if (!newTimer.category) {
      alert("Please select a category for the timer.");
      return;
    }

    dispatch({ type: 'ADD_TIMER', payload: newTimer });
    //Show the timer added category
    setActiveCategory(newTimer.category);
    setNewTimer({ name: '', duration: 0, category: '' });
    closeModal();
  };
  
  const startTimer = (id, duration) => {
    if (intervals[id]) {
      // Already running
      return;
    }
    const remaining = activeTimers[id] ?? duration;

    dispatch({ type: 'START_TIMER', payload: id });

    let halfwayNotified = false;  // Flag to track if the halfway alert has been shown

    const intervalId = setInterval(() => {
      setActiveTimers((prev) => {
        const newRemaining = prev[id] - 1;

        // Check for halfway point alert
        if (!halfwayNotified && newRemaining <= duration / 2) {
          halfwayNotified = true;
          enqueueSnackbar(`Halfway through! "${timers.find(timer => timer.id === id)?.name}" is at the halfway point.`, { variant: 'info' });
        }

        if (newRemaining <= 0) {
          clearInterval(intervals[id]);
          setIntervals((prevInt) => prevInt[id] !== intervals[id]);
          setSelectedTimer([]);
          enqueueSnackbar(`Congratulations! "${timers.find(timer => timer.id === id)?.name}" is completed!`, { variant: 'success' });
          dispatch({ type: 'COMPLETE_TIMER', payload: id });

          // When no active timers are running and timer is completed, navigate to history page
          if (timers.filter((timerData) => !timerData.isCompleted).length <= 1) {
            setTimeout(() => {
              navigate('/history');
            }, 0);
          }

          const { [id]: __, ...restActive } = prev;
          return restActive;
        }

        return { ...prev, [id]: newRemaining };
      });
    }, 1000);

    setActiveTimers((prev) => ({ ...prev, [id]: remaining }));
    setIntervals((prev) => ({ ...prev, [id]: intervalId }));
  };



  // Pause Timer
  const pauseTimer = (id) => {
    if (intervals[id]) {
      clearInterval(intervals[id]);
      setIntervals((prevInt => prevInt[id] !== intervals[id]));
    }
  };

  // Reset Timer
  const resetTimer = (id) => {
    if (intervals[id]) {
      clearInterval(intervals[id]);
      setIntervals((prevInt => prevInt[id] !== intervals[id]));
    }
    setActiveTimers(prev => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
    dispatch({ type: 'RESET_TIMER', payload: id });
  };

  // Find all timers in the category and start them
  const handleStartCategoryTimers = (event, category) => {
    event.stopPropagation();
    timers
      .filter(timer => timer.category === category)
      .forEach((timer) => {
        startTimer(timer.id, timer.duration);
      });
  };

  // Pause all timers in the category
  const handlePauseCategoryTimers = (event, category) => {
    event.stopPropagation();
    timers
      .filter(timer => timer.category === category)
      .forEach((timer) => {
        pauseTimer(timer.id);
      });
  };

  // Reset all timers in the category
  const handleResetCategoryTimers = (event, category) => {
    event.stopPropagation();
    timers
      .filter(timer => timer.category === category)
      .forEach((timer) => {
        resetTimer(timer.id);
        dispatch({ type: 'RESET_TIMER', payload: timer.id });
      });
  };

  const onTimerSelection = (timerData) => {
    setSelectedTimer([timerData]);
  }

  const openModal = () => {
    modalRef.current.style.display = 'flex';
  };

  const closeModal = () => {
    modalRef.current.style.display = 'none';
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('timers')) || [];
    dispatch({ type: 'LOAD_TIMERS', payload: saved });
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('timers', JSON.stringify(timers));
  }, [timers]);

  return (
    <div className='home-section page-wrapper'>
      {/* Manage Timers */}
      <div className="tools-container">
        <button type="button" className='add-timer' onClick={openModal}>Add Timer</button>
      </div>

      {/* Add Timer Modal */}
      <div className="add-timer-modal" ref={modalRef}>
        <div className="add-timer-section">
          <button type='button' title='close' onClick={closeModal}>
            <img src="assets/close-icon.svg" alt="close icon" />
          </button>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={newTimer.name}
                onChange={(e) => setNewTimer({ ...newTimer, name: e.target.value })}
                placeholder="Timer name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="duration">Duration(s):</label>
              <input
                type="number"
                id="duration"
                value={newTimer.duration}
                onChange={(e) => setNewTimer({ ...newTimer, duration: e.target.value })}
                placeholder="Duration (seconds)"
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category:</label>
              <select
                id="category"
                value={newTimer.category}
                onChange={(e) => setNewTimer({ ...newTimer, category: e.target.value })}
              >
                <option value="">Select Category</option>
                {categories.map((categoryItem, index) => (
                  <option key={index} value={categoryItem}>{categoryItem}</option>
                ))}
              </select>
            </div>

            <button type='submit' className='save-button' onClick={(event) => addTimer(event)}>Save</button>
          </form>
        </div>
      </div>

      {timers.filter(timerData => !timerData.isCompleted).length > 0 && <div className="timer-section">
        {/* Timer view section */}
        <div className="view-timer-section">
          {selectedTimer.length > 0 &&
            <div>
              <Timer remainingTime={activeTimers[selectedTimer[0].id] ? activeTimers[selectedTimer[0].id] : selectedTimer[0]?.duration} duration={selectedTimer[0]?.duration} />
              <div className="actions-container">
                <button type="button" className='start-button' onClick={() => startTimer(selectedTimer[0]?.id, selectedTimer[0]?.duration)}>Start</button>
                <button type="button" className='pause-button' onClick={() => pauseTimer(selectedTimer[0]?.id)}>Pause</button>
                <button type="button" className='reset-button' onClick={() => resetTimer(selectedTimer[0]?.id)}>Reset</button>
              </div>
            </div>}
        </div>

        {/* Timers list section */}
        <div className="timers-list-section">
          <div className="accordion">
            {categories.map((category, index) => (
              <div className="accordion-section" key={index}>
                <div className={`accordion-header ${activeCategory === category ? 'active' : ''}`} onClick={() => toggleCategorySection(category)}>
                  <h2>{category}</h2>
                  <div className="actions-container">
                    <button type="button" className='start-button' onClick={(e) => handleStartCategoryTimers(e, category)}>Start all</button>
                    <button type="button" className='pause-button' onClick={(e) => handlePauseCategoryTimers(e, category)}>Pause all</button>
                    <button type="button" className='reset-button' onClick={(e) => handleResetCategoryTimers(e, category)}>Reset all</button>
                  </div>
                </div>
                <div className={`accordion-content ${activeCategory === category ? 'open' : ''}`}>
                  {timers
                    .filter(timerData => timerData.category === category && !timerData.isCompleted)
                    .map((filteredTimer, timerIndex) => (
                      <div className="timer-details" key={timerIndex}>
                        <div className="details-container" onClick={() => onTimerSelection(filteredTimer)}>
                          <div>Name: {filteredTimer.name.charAt(0).toUpperCase() + filteredTimer.name.slice(1)}</div>
                          <div>Time left: {formatTime(activeTimers[filteredTimer.id] ?? filteredTimer.duration)}</div>
                          <div>Status: {filteredTimer.status}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>}

      {/* No active timer present */}
      {timers.filter(timerData => !timerData.isCompleted).length === 0 && <div className="no-data">
        No active timers available. Check history page.
      </div>}

      {/* No timesr present */}
      {timers.length === 0 && <div className="no-data">
        No timers available. Please add a timer.
      </div>}

    </div>
  );
}

export default Landingpage;
