import { formatTime } from '../../utils/helper';
import './Timer.css';

const Timer = ({ remainingTime, duration }) => {
  const percentage = (remainingTime / duration) * 100;

  const radius = 100;
  const strokeWidth = 10;

  // Calculate the circumference of the circle
  const circumference = 2 * Math.PI * radius;

  // The progress stroke length based on the remaining time
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="circle-progress-container">
      <svg width="240" height="240" viewBox="0 0 240 240">
        {/* Define the gradient */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#205722" /> {/* Dark green */}
            <stop offset="100%" stopColor="#b4f16e" /> {/* Light green */}
          </linearGradient>
        </defs>

        {/* Background circle */}
        <circle
          cx="120"
          cy="120"
          r={radius}
          stroke="#e3f79b"
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        {/* Progress circle with gradient */}
        <circle
          cx="120"
          cy="120"
          r={radius}
          stroke="url(#gradient)"  // Apply the gradient here
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />

        {/* Inner text for time left and percentage */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          stroke="#000"
          strokeWidth="1px"
          dy=".3em"
          fontSize="30"
        >
          <tspan x="50%" dy="-0.8em">{formatTime(remainingTime)}</tspan>
          <tspan x="50%" dy="1.5em">{Math.round(percentage)}%</tspan>
        </text>
      </svg>
    </div>
  );
}

export default Timer;
