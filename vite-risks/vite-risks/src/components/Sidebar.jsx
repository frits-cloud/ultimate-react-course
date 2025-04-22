import { useState } from 'react';
import styles from './Sidebar.module.css';
import {
  FaShieldAlt,
  FaChartBar,
  FaUsers,
  FaCogs,
  FaBars,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
function Sidebar() {
  const [sidebarClosed, setSidebarClosed] = useState(false);
  return (
    <div
      className={styles.sidebar}
      style={sidebarClosed ? { width: '20px' } : { width: '150px' }}
    >
      <button
        className={styles.hamburger}
        onClick={() => setSidebarClosed(!sidebarClosed)}
      >
        <FaBars />
      </button>
      {!sidebarClosed ? (
        <>
          <div className={styles.logo}>
            <FaShieldAlt className={styles.icon} />
            <span>RiskOps</span>
          </div>
          <ul className={styles.menu}>
            <Link to="/">
              <li>
                <FaChartBar className={styles.icon} />
                <span>Dashboard</span>
              </li>
            </Link>
            <Link to="/teams">
              <li>
                <FaUsers className={styles.icon} />
                <span>Teams</span>
              </li>
            </Link>
            <Link to="/settings">
              <li>
                <FaCogs className={styles.icon} />
                <span>Settings</span>
              </li>
            </Link>
          </ul>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Sidebar;
