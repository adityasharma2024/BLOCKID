import React, { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function Layout({ myBlockId, account, connected, onConnect }) {
  const nav = useNavigate();
  const isLoggedIn = !!localStorage.getItem('blockid_profile');
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    localStorage.removeItem('blockid_profile');
    nav('/login');
    setMenuOpen(false);
  }

  function handleNav(path) {
    nav(path);
    setMenuOpen(false);
  }

  return (
    <div>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-800/80 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="text-white font-extrabold text-3xl md:text-5xl">Block<span className="text-emerald-400">ID</span></div>
          </div>
          {/* Hamburger for mobile */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-4 w-full justify-end">
            <Link to="/" className="px-4 py-2 rounded-full bg-gradient-to-r text-white font-semibold">Home</Link>
            {/* <Link to="/about" className="px-4 py-2 rounded-full hover:opacity-90">About</Link>
            <Link to="/tutorials" className="px-4 py-2 rounded-full hover:opacity-90">Tutorials</Link>
            <Link to="/contact" className="px-4 py-2 rounded-full hover:opacity-90">Contact</Link> */}
            <Link to="/dashboard" className="px-4 py-2 rounded-full hover:opacity-90 mr-8">Dashboard</Link>
            
            <div className={`w-3 h-3 rounded-full ${connected ? 'bg-emerald-400' : 'bg-red-500'} shadow-lg`} />
            <div className="text-sm">{account ? (account.slice(0, 6) + '...' + account.slice(-4)) : 'Not connected'}</div>
            <button className="px-3 py-1 rounded-full bg-slate-800/50 mr-8" onClick={onConnect}>Connect</button>

            {isLoggedIn ? (
              <button
                className="px-4 py-2 rounded bg-red-500 text-white font-semibold"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <button
                className="px-4 py-2 rounded bg-emerald-400 text-black font-semibold"
                onClick={() => nav('/login')}
              >
                Login
              </button>
            )}

          </div>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-slate-900/95 px-4 pb-4 pt-2 rounded-b-2xl shadow-lg">
            <Link to="/" onClick={() => handleNav('/')} className="block px-4 py-2 rounded hover:bg-slate-700 text-white font-semibold">Home</Link>
            {/* <Link to="/about" onClick={() => handleNav('/about')} className="block px-4 py-2 rounded hover:bg-slate-700 text-white">About</Link>
            <Link to="/tutorials" onClick={() => handleNav('/tutorials')} className="block px-4 py-2 rounded hover:bg-slate-700 text-white">Tutorials</Link>
            <Link to="/contact" onClick={() => handleNav('/contact')} className="block px-4 py-2 rounded hover:bg-slate-700 text-white">Contact</Link> */}
            <Link to="/dashboard" onClick={() => handleNav('/dashboard')} className="block px-4 py-2 rounded hover:bg-slate-700 text-white">Dashboard</Link>
            {isLoggedIn ? (
              <button
                className="block w-full text-left px-4 py-2 rounded bg-red-500 text-white font-semibold mt-2"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <button
                className="block w-full text-left px-4 py-2 rounded bg-emerald-400 text-black font-semibold mt-2"
                onClick={() => { nav('/login'); setMenuOpen(false); }}
              >
                Login
              </button>
            )}
            <button className="block w-full text-left px-4 py-2 rounded bg-slate-800/50 mt-2" onClick={() => { onConnect && onConnect(); setMenuOpen(false); }}>Connect</button>
            <div className="flex items-center gap-2 mt-2">
              <div className={`w-3 h-3 rounded-full ${connected ? 'bg-emerald-400' : 'bg-red-500'} shadow-lg`} />
              <div className="text-sm text-white">{account ? (account.slice(0, 6) + '...' + account.slice(-4)) : 'Not connected'}</div>
            </div>
          </div>
        )}
      </nav>
      {/* Main content */}
      <main className="pt-24 max-w-7xl mx-auto px-4">
        <Outlet />
      </main>      
    </div>
  )
}