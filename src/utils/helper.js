export const formatTime = (seconds) => {
  if (!seconds || seconds <= 0) {
    return "00:00:00";
  }
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

// Export history as JSON file
export const exportHistory = (timers) => {
  const history = timers.map(timer => ({
    name: timer.name,
    duration: timer.duration,
    category: timer.category,
    completedAt: timer.completedAt,
  }));

  // Convert array of objects to JSON string
  const jsonString = JSON.stringify(history, null, 2);

  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'timer-history.json';
  link.click();

  URL.revokeObjectURL(url);
};