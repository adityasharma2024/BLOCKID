import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/Home'
import About from './pages/About'
import Tutorials from './pages/Tutorials'
import Contact from './pages/Contact'
import Dashboard from './pages/Dashboard';
import { Navigate } from 'react-router-dom';
import Login from './pages/Login'
import Create from './pages/Create'

import './index.css'

function AppRouter(){
  const [account, setAccount] = React.useState(null)
  const [connected, setConnected] = React.useState(false)
  const [myBlockId, setMyBlockId] = React.useState(null)

  const handleConnect = async ()=>{
    if(!window.ethereum) return alert('Install MetaMask')
    const accs = await window.ethereum.request({ method: 'eth_requestAccounts' })
    setAccount(accs[0]); setConnected(true)
  }

  return (
    <BrowserRouter>
      <Layout myBlockId={myBlockId} account={account} connected={connected} onConnect={handleConnect} />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/tutorials' element={<Tutorials/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/dashboard' element={<RequireAuth><Dashboard/></RequireAuth>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/create' element={<Create/>} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<AppRouter />)
function RequireAuth({ children }){
  try{
    const p = localStorage.getItem('blockid_profile')
    if(!p) return <Navigate to='/login' replace/>
    return children
  }catch(e){
    return <Navigate to='/login' replace/>
  }
}
