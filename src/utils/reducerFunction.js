export const timerReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_TIMERS':
      // Set the status of all timers to 'paused' when loading timers
      return action.payload.map(timer => ({
        ...timer,
        status: 'Paused',
      }));


    case 'ADD_TIMER':
      return [
        ...state,
        {
          id: Date.now(),
          name: action.payload.name,
          category: action.payload.category,
          duration: parseInt(action.payload.duration, 10),
          status: 'paused',
          isCompleted: false,
        },
      ];

    case 'START_TIMER':
      return state.map(timer =>
        timer.id === action.payload
          ? { ...timer, status: 'Running' }
          : timer);

    case 'COMPLETE_TIMER':
      return state.map(timer =>
        timer.id === action.payload
          ? { ...timer, status: 'Completed', isCompleted: true }
          : timer
      );

    case 'RESET_TIMER':
      return state.map(timer =>
        timer.id === action.payload
          ? { ...timer, status: 'Paused', isCompleted: false }
          : timer
      );

    case 'RESET_CATEGORY_TIMERS':
      return state.map(timer =>
        timer.category === action.payload
          ? { ...timer, status: 'paused', isCompleted: false }  // Reset timers for the category
          : timer
      );

    case 'PAUSE_CATEGORY_TIMERS':
      return state.map(timer =>
        timer.category === action.payload
          ? { ...timer, status: 'paused' }  // Pause timers for the category
          : timer
      );

    case 'START_CATEGORY_TIMERS':
      return state.map(timer =>
        timer.category === action.payload
          ? { ...timer, status: 'running' }  // Start timers for the category
          : timer
      );

    default:
      return state;
  }
};
