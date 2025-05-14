import './Header.css';

import { Link, useLocation } from 'react-router-dom';

const Header = () => {

  const location = useLocation();

  return (
    <div className='header-container'>
      <h1>Timer</h1>
      <ul className='menu'>
        {location.pathname === "/history" ?
          <li className='menu-item'>
            <Link to="/">Home</Link>
          </li>
          :
          <li className="menu-item">
            <Link to="/history">History</Link>
          </li>}
      </ul>
    </div>
  );
}

export default Header;
