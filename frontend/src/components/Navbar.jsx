import { NavLink } from 'react-router-dom';
import './Navbar.css';

const links = [
  { to: '/',            label: '🏠 首頁'     },
  { to: '/search',      label: '🔍 搜尋菜價' },
  { to: '/solar-term',  label: '🌿 節氣指南' },
  { to: '/report',      label: '📝 回報菜價' },
  { to: '/basket',      label: '🧺 我的菜籃' },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="navbar-logo">
          🥦 便宜買 AI
        </NavLink>
        <nav className="navbar-links">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                'navbar-link' + (isActive ? ' active' : '')
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
