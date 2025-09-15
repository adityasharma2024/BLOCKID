import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Layout({ myBlockId, account, connected, onConnect }) {
  return (
    <div>


      

      <br />
      <div className="hidden md:flex items-center gap-4 bg-slate-800/30 px-3 py-2 rounded-2xl shadow-lg">
      <div className="text-white font-extrabold text-5xl">Block<span className="text-emerald-400">ID</span></div><br/>
        <Link to="/" className="px-4 py-2 rounded-full bg-gradient-to-r text-white font-semibold">Home</Link>
        <Link to="/about" className="px-4 py-2 rounded-full hover:opacity-90">About</Link>
        <Link to="/tutorials" className="px-4 py-2 rounded-full hover:opacity-90">Tutorials</Link>
        <Link to="/contact" className="px-4 py-2 rounded-full hover:opacity-90">Contact</Link>
        <Link to="/dashboard" className="px-4 py-2 rounded-full hover:opacity-90">Dashboard</Link>

        <div className="flex items-center gap-6 flex-row-reverse w-full">
          <button className="px-3 py-1 rounded-full bg-slate-800/50" onClick={onConnect}>Connect</button>
          <div className="text-sm gap-410 mr-4 hidden sm:block">{myBlockId ? myBlockId : 'Not logged'}</div>


          <div className={`w-3 h-3 rounded-full ${connected ? 'bg-emerald-400' : 'bg-red-500'} shadow-lg`} />
          <div className="text-sm">{account ? (account.slice(0, 6) + '...' + account.slice(-4)) : 'Not connected'}</div>

        </div>
      </div>



      <main className="pt-28 max-w-7xl mx-auto px-8">
        <Outlet />
      </main>
    </div>
  )
}
