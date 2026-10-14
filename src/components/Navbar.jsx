import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Navbar({ activePage, setActivePage }) {
  const { t, theme, setTheme, lang, setLang } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: t.dashboard, icon: '📊' },
    { id: 'transactions', label: t.transactions, icon: '💳' },
    { id: 'budget', label: t.budget, icon: '🎯' },
    { id: 'savings', label: t.savings, icon: '🏦' },
    { id: 'reports', label: t.reports, icon: '📈' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">💰</span>
        <span className="brand-name">{t.appName}</span>
      </div>

      {/* Desktop nav */}
      <div className="navbar-links">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`nav-link ${activePage === item.id ? 'active' : ''}`}
            onClick={() => setActivePage(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="navbar-controls">
        {/* Language toggle */}
        <button
          className="control-btn lang-btn"
          onClick={() => setLang(lang === 'en' ? 'kh' : 'en')}
          title={t.language}
        >
          <span>{lang === 'en' ? '🇰🇭 KH' : '🇺🇸 EN'}</span>
        </button>

        {/* Theme toggle */}
        <button
          className="control-btn theme-btn"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          title={theme === 'dark' ? t.lightMode : t.darkMode}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        {/* Mobile hamburger */}
        <button
          className="control-btn mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`mobile-nav-link ${activePage === item.id ? 'active' : ''}`}
              onClick={() => { setActivePage(item.id); setMenuOpen(false); }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
