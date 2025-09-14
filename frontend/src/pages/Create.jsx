import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ethers } from 'ethers'
import QRCode from 'qrcode'

const BACKEND = 'http://localhost:4001'
const CONTRACT_ABI = [
  { "inputs":[{"internalType":"string","name":"cid","type":"string"},{"internalType":"string","name":"title","type":"string"}],"name":"registerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function" }
]

function shortIdFromHex(hex){ return 'B' + hex.slice(0,6).toUpperCase() }

export default function Create(){
  const [form, setForm] = useState({ name:'', dob:'', pob:'', tob:'', birthReg:'' })
  const [feeEth, setFeeEth] = useState('0.001')
  const [account, setAccount] = useState(null)
  const [provider, setProvider] = useState(null)
  const [shortId, setShortId] = useState('')
  const [longId, setLongId] = useState('')
  const [qr, setQr] = useState(null)
  const [stage, setStage] = useState('form') // form -> txSent -> setPassword -> done
  const [txLoading, setTxLoading] = useState(false)
  const nav = useNavigate()

  function updateField(k,v){ setForm(s=>({...s,[k]:v})) }

  async function connectWallet(){
    if(!window.ethereum) return alert('Install MetaMask')
    const prov = new ethers.BrowserProvider(window.ethereum)
    setProvider(prov)
    const accs = await window.ethereum.request({ method:'eth_requestAccounts' })
    setAccount(accs[0])
  }

  async function generateIds(){
    const payload = `${form.name}|${form.dob}|${form.pob}|${form.tob}|${form.birthReg}|${Date.now()}`
    const hexbuf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(payload))
    const h = Array.from(new Uint8Array(hexbuf)).map(b=>b.toString(16).padStart(2,'0')).join('')
    const longStr = btoa(h)
    const short = shortIdFromHex(h)
    setLongId(longStr); setShortId(short)
    QRCode.toDataURL(longStr).then(u=>setQr(u))
  }

  async function payAndCreate(){
    if(!provider || !account) return alert('Connect wallet first')
    if(!form.name||!form.dob||!form.birthReg) return alert('Fill required fields')
    await generateIds()
    try{
      setTxLoading(true)
      const signer = await provider.getSigner()
      const infoRes = await fetch(BACKEND + '/api/contract'); const info = await infoRes.json()
      if(!info.address) return alert('Contract not deployed (backend missing address)')
      const contract = new ethers.Contract(info.address, CONTRACT_ABI, signer)
      const tx = await contract.registerBlock(longId, form.name, { value: ethers.parseEther(feeEth || '0') })
      await tx.wait()
      setStage('txSent')
      alert('On-chain creation successful. Now set a password to complete registration.')
    }catch(e){ console.error(e); alert('Transaction error: '+ (e?.message||e)) }
    finally{ setTxLoading(false) }
  }

  async function finishRegistration(password){
    if(!shortId) return alert('No blockid generated')
    try{
      const res = await fetch(BACKEND + '/api/registerUser', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ blockid: shortId, password, address: account, details: form }) })
      const j = await res.json()
      if(j.ok){ localStorage.setItem('blockid_profile', JSON.stringify({ blockid: shortId, address: account, details: form })); alert('Account created'); nav('/dashboard') }
      else alert('Register error: '+JSON.stringify(j))
    }catch(e){ console.error(e); alert('Register failed') }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div initial={{ opacity:0, scale:0.98 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.45 }} className="w-full max-w-3xl p-6 rounded-2xl bg-slate-800/60 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Create a new BlockID</h2>
        {stage==='form' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input placeholder="Full name" className="p-2 rounded bg-slate-900" value={form.name} onChange={e=>updateField('name',e.target.value)} />
            <input placeholder="DOB (YYYY-MM-DD)" className="p-2 rounded bg-slate-900" value={form.dob} onChange={e=>updateField('dob',e.target.value)} />
            <input placeholder="Place of birth" className="p-2 rounded bg-slate-900" value={form.pob} onChange={e=>updateField('pob',e.target.value)} />
            <input placeholder="Time of birth (HH:MM)" className="p-2 rounded bg-slate-900" value={form.tob} onChange={e=>updateField('tob',e.target.value)} />
            <input placeholder="Birth registration no." className="p-2 rounded bg-slate-900 col-span-2" value={form.birthReg} onChange={e=>updateField('birthReg',e.target.value)} />
            <div className="flex items-center gap-2">
              <input value={feeEth} onChange={e=>setFeeEth(e.target.value)} className="p-2 rounded bg-slate-900 w-32" />
              <button onClick={connectWallet} className="px-4 py-2 rounded bg-indigo-600">Connect Wallet</button>
              <button onClick={payAndCreate} className="px-4 py-2 rounded bg-purple-600" disabled={txLoading}>{txLoading? 'Processing...':'Pay & Create'}</button>
            </div>
          </div>
        )}

        {stage==='txSent' && (
          <div className="mt-4">
            <h4 className="font-semibold">Generated IDs</h4>
            <div className="mt-2"><strong>Short:</strong> <span className="font-mono text-purple-300">{shortId}</span></div>
            <div className="mt-1"><strong>Long:</strong> <div className="break-all text-xs">{longId}</div></div>
            {qr && <img src={qr} alt="qr" className="w-28 h-28 mt-3 rounded" />}
            <div className="mt-4">
              <h4 className="font-semibold">Set a password</h4>
              <PasswordForm onSubmit={finishRegistration} />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

function PasswordForm({ onSubmit }){
  const [pw, setPw] = useState('')
  return (
    <div className="flex gap-2 items-center mt-2">
      <input type="password" className="p-2 rounded bg-slate-900" value={pw} onChange={e=>setPw(e.target.value)} placeholder="Choose a password" />
      <button className="px-3 py-2 rounded bg-emerald-400 text-black" onClick={()=>{ if(!pw) return alert('Enter password'); onSubmit(pw) }}>Set Password</button>
    </div>
  )
}
