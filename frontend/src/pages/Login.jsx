import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const BACKEND = 'http://localhost:4001'

export default function Login() {
  const [blockid, setBlockid] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()

  async function doLogin() {
    if (!blockid || !password) return alert('Enter credentials')
    try {
      setLoading(true)
      const res = await fetch(BACKEND + '/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ blockid, password }) })
      const j = await res.json()
      if (j.ok) {

        // store profile in localStorage for simple session
        localStorage.setItem('blockid_profile', JSON.stringify({ blockid, address: j.address, details: j.details }))
        nav('/dashboard')
      } else {
        alert('Login failed: ' + (j.error || 'invalid'))
      }
    } catch (e) { console.error(e); alert('Login error') }
    finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-2xl p-6 rounded-2xl bg-slate-800/60 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Welcome back — Login</h2>
        <div className="grid grid-cols-1 gap-3">
          <input value={blockid} onChange={e => setBlockid(e.target.value)} placeholder="BlockID (e.g. B1001)" className="p-2 rounded bg-slate-900" />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="p-2 rounded bg-slate-900" />
          <div className="flex gap-2">
            <button onClick={doLogin} className="px-4 py-2 rounded bg-emerald-400 text-black" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
            <button onClick={() => nav('/create')} className="px-4 py-2 rounded bg-slate-700">Create account</button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
