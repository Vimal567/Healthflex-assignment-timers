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
          ? { ...timer, status: 'Completed', isCompleted: true, completedAt: '44:32:33' }
          : timer
      );

    case 'RESET_TIMER':
      return state.map(timer =>
        timer.id === action.payload
          ? { ...timer, status: 'Paused', isCompleted: false }
          : timer
      );

    default:
      return state;
  }
};
