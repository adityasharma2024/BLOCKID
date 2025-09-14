import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Layout({ myBlockId, account, connected, onConnect }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-white">
      <nav className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-8 py-4 bg-transparent">
        <div className="flex items-center gap-6">
          <div className="text-white font-extrabold text-xl">Block<span className="text-emerald-400">ID</span></div>
          <div className="hidden md:flex items-center gap-4 bg-slate-800/30 px-3 py-2 rounded-2xl shadow-lg">
            <Link to="/" className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-violet-500 text-white font-semibold">Home</Link>
            <Link to="/about" className="px-4 py-2 rounded-full hover:opacity-90">About</Link>
            <Link to="/tutorials" className="px-4 py-2 rounded-full hover:opacity-90">Tutorials</Link>
            <Link to="/contact" className="px-4 py-2 rounded-full hover:opacity-90">Contact</Link>
            <Link to="/dashboard" className="px-4 py-2 rounded-full hover:opacity-90">Dashboard</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm mr-4 hidden sm:block">{myBlockId ? myBlockId : 'Not logged'}</div>
          <div className="flex items-center gap-3">
            <div className="text-sm">{account ? (account.slice(0,6) + '...' + account.slice(-4)) : 'Not connected'}</div>
            <div className={`w-3 h-3 rounded-full ${connected ? 'bg-emerald-400' : 'bg-red-500'} shadow-lg`} />
            <button className="ml-3 px-3 py-1 rounded-full bg-slate-800/50" onClick={onConnect}>Connect</button>
          </div>
        </div>
      </nav>

      <main className="pt-28 max-w-7xl mx-auto px-8">
        <Outlet />
      </main>
    </div>
  )
}
