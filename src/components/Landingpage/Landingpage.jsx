import { useState, useEffect, useRef } from 'react';
import './Landingpage.css';
import { useSnackbar } from 'notistack';

const Landingpage = () => {
  const [timers, setTimers] = useState([]);
  const categories = ["Workout", "Study", "Break"];
  const [newTimer, setNewTimer] = useState({ name: '', duration: 0, category: '' });

  const modalRef = useRef();
  const { enqueueSnackbar } = useSnackbar();

  const addTimer = (event) => {
    event.preventDefault();

    // Check all fields are filled
    if (!newTimer.name) {
      enqueueSnackbar("Please enter a name for the timer.", { varient: 'warning' });
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

    if (!newTimer.name || newTimer.duration <= 0 || !newTimer.category) {
      return;
    }

    const updatedTimers = [...timers, newTimer];
    setTimers(updatedTimers);
    closeModal();
  };


  const startTimer = (index) => {
  };

  const resetTimer = (index) => {
  };

  const pauseTimer = (index) => {
  };

  const openModal = () => {
    modalRef.current.style.display = 'flex';
  };

  const closeModal = () => {
    modalRef.current.style.display = 'none';
  };

  // useEffect(() => {
  //   const savedTimers = JSON.parse(localStorage.getItem('timers')) || [];
  //   setTimers(savedTimers);
  // }, []);


  return (
    <div className='home-section page-wrapper'>
      {/* Manage Timers */}
      <div className="tools-container">
        <button type="button" className='add-timer' onClick={openModal}>Add Timer</button>
        <button type="button" className='start-all' onClick={startTimer}>Start all</button>
        <button type="button" className='pause-all' onClick={pauseTimer}>Pause all</button>
        <button type="button" className='reset-all' onClick={resetTimer}>Reset all</button>
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

      <div className="timer-section">

      </div>

      {/* No timer present */}
      <div className="no-timer">
        No timers available. Please add a timer.
      </div>

    </div>
  );
}

export default Landingpage;
