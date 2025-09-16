import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ethers } from 'ethers'
import QRCode from 'qrcode'
import Papa from 'papaparse'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const BACKEND = 'http://localhost:4001'
const CONTRACT_ABI = [
  { "inputs":[{"internalType":"string","name":"cid","type":"string"},{"internalType":"string","name":"title","type":"string"}],"name":"registerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function" },
  { "inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"hasRegistered","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function" },
  { "inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getMyId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function" },
  { "inputs":[],"name":"getContractBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function" }
]

function shortAddr(a){ if(!a) return ''; return a.slice(0,6)+'...'+a.slice(-4) }

export default function Dashboard(){
  const [provider, setProvider] = useState(null)
  const [account, setAccount] = useState(null)
  const [connected, setConnected] = useState(false)
  const [contractAddr, setContractAddr] = useState(null)  
  const [profile, setProfile] = useState(null)
  const [ledger, setLedger] = useState([])
  const [globalLedger, setGlobalLedger] = useState([])
  const [recipientLookup, setRecipientLookup] = useState(null)
  const [qrLongBlockid, setQrLongBlockid] = useState(null)
  const [recipientAddressInput, setRecipientAddressInput] = useState('')
  const [recipientNameInput, setRecipientNameInput] = useState('')
  const [addresses, setAddresses] = useState([])

  useEffect(()=>{
    const p = localStorage.getItem('blockid_profile')


// *************************This part was the Problem for Ledger***************************************
    // if(p) {
    //   const parsed = JSON.parse(p)
    //   setProfile(parsed)
    //   // fetch latest addresses from backend
    //   fetch(BACKEND + '/api/userByBlockid/' + parsed.blockid)
    //     .then(r=>r.json())
    //     .then(data=>{
    //       setAddresses(data.addresses || (data.address ? [data.address] : []))
    //     })
    // }

// *************************The Solution of Ledger Problem***************************************


    if (p) {
      const parsed = JSON.parse(p);
      setProfile(parsed);
      if (parsed.blockid) {
        loadMyLedger(parsed.blockid);
      }
    }
    // And update loadMyLedger to accept blockid as a parameter
    async function loadMyLedger(blockid) {
      if (!blockid) return;
      try {
        const r = await fetch(BACKEND + '/api/ledger/by/' + blockid);
        const d = await r.json();
        setLedger(d);
      } catch (e) {}
    }


    fetchContract(); fetchGlobalLedger(); loadMyLedger();
    // try to set provider/account if MetaMask available
    if(window.ethereum){
      const prov = new ethers.BrowserProvider(window.ethereum)
      setProvider(prov)
      window.ethereum.request({ method: 'eth_accounts' }).then(accs=>{ if(accs && accs.length) { setAccount(accs[0]); setConnected(true); } })
    }
  }, [])

  // Generate QR code for long block id (wallet address) when profile is available
  useEffect(()=>{
    if(profile && profile.address){
      QRCode.toDataURL(profile.address)
        .then(url => setQrLongBlockid(url))
        .catch(()=>setQrLongBlockid(null))
    }
  }, [profile])

  async function fetchContract(){ try{ const r=await fetch(BACKEND+'/api/contract'); const j=await r.json(); setContractAddr(j.address) }catch(e){} }
  async function fetchGlobalLedger(){ try{ const r=await fetch(BACKEND+'/api/ledger'); setGlobalLedger(await r.json()) }catch(e){} }
  async function loadMyLedger(){ if(!profile) return; try{ const r=await fetch(BACKEND+'/api/ledger/by/'+profile.blockid); const d=await r.json(); setLedger(d) }catch(e){} }

  async function lookupRecipient(blockid){
    if(!blockid) {
      setRecipientLookup(null)
      setRecipientAddressInput('')
      setRecipientNameInput('')
      return
    }
    try{
      const r=await fetch(BACKEND + '/api/userByBlockid/' + blockid)
      if(r.status===200){
        const data = await r.json()
        setRecipientLookup(data)
        setRecipientAddressInput(data.address)
        setRecipientNameInput(data.details.name)
      } else {
        setRecipientLookup(null)
        setRecipientAddressInput('')
        setRecipientNameInput('')
      }
    }catch(e){
      setRecipientLookup(null)
      setRecipientAddressInput('')
      setRecipientNameInput('')
    }
  }

  async function sendToRecipient(recipientBlockid, amountEth){
    // Use input fields for address and name
    const recipientAddress = recipientAddressInput
    const recipientName = recipientNameInput
    if(!recipientBlockid) return alert('Enter recipient BlockID')
    if(!recipientAddress) return alert('Enter recipient address')
    if(!recipientName) return alert('Enter recipient name')
    if(!provider) return alert('Connect wallet in browser')
    if(!amountEth || Number(amountEth)<=0) return alert('Invalid amount')
    try{
      const signer = await provider.getSigner()
      const tx = await signer.sendTransaction({ to: recipientAddress, value: ethers.parseEther(amountEth) })
      await tx.wait()
      await fetch(BACKEND + '/api/ledger', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({
        senderBlockid: profile.blockid,
        senderAddress: signer.address || account,
        recipientBlockid,
        recipientAddress,
        recipientName,
        amount: amountEth,
        txHash: tx.hash
      })})
      alert('Transfer complete: '+tx.hash)
      loadMyLedger(); fetchGlobalLedger()
    }catch(e){ console.error(e); alert('Transfer failed: '+(e?.message||e)) }
  }

  function exportCSV(data){
    const csv = Papa.unparse(data)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'ledger.csv'; a.click()
  }
  function exportPDF(data){
    const doc = new jsPDF()
    const rows = data.map(d=>[d.senderBlockid, d.senderAddress, d.recipientBlockid, d.recipientAddress, d.amount, new Date(d.timestamp).toLocaleString()])
    doc.autoTable({ head:[['Sender ID','Sender','Recipient ID','Recipient','Amount','When']], body: rows })
    doc.save('ledger.pdf')
  }

  if(!profile){
    return <div className="min-h-screen flex items-center justify-center"><div className="p-6 bg-slate-800 rounded">Not logged in. Please login first.</div></div>
  }

  return (
    <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.45 }} className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-white">
      <main >
        {/* LEFT - hero / content */}
        <section className="col-span-2 space-y-6">
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-800 shadow">
              <h3 className="text-xl font-semibold">Profile</h3>
              <p className="mt-2"><strong>Name:</strong> {profile.details.name}</p>
              <p><strong>DOB:</strong> {profile.details.dob}</p>
              <p><strong>POB:</strong> {profile.details.pob}</p>
              <p><strong>TOB:</strong> {profile.details.tob}</p>
              <p><strong>BirthReg:</strong> {profile.details.birthReg}</p>
              <p><strong>BlockID:</strong> {profile.blockid}</p>
              <div className="mt-2">
                <strong>Wallet Addresses:</strong>
                <ul className="text-xs mt-1">
                  {addresses.map((addr, i) => (
                    <li key={i} className="break-all">{addr}</li>
                  ))}
                </ul>
              </div>
              {qrLongBlockid && (
                <div className="my-2">
                  <img src={qrLongBlockid} alt="Long BlockID QR" style={{ width: 96, height: 96 }} />
                  <div className="text-xs text-slate-400">Scan for Wallet Address</div>
                </div>
              )}
            </div>

            <div className="p-4 rounded-2xl bg-slate-800 shadow">
              <h3 className="text-xl font-semibold">Transact (send ETH to another BlockID)</h3>
              <div className="grid grid-cols-1 gap-2">
                <input
                  placeholder="Recipient BlockID (e.g. B1002)"
                  onBlur={e=>lookupRecipient(e.target.value)}
                  id="recip"
                  className="p-2 rounded bg-slate-700"
                />
                <input
                  placeholder="Recipient Address"
                  value={recipientAddressInput}
                  onChange={e=>setRecipientAddressInput(e.target.value)}
                  className="p-2 rounded bg-slate-700"
                />
                <input
                  placeholder="Recipient Name"
                  value={recipientNameInput}
                  onChange={e=>setRecipientNameInput(e.target.value)}
                  className="p-2 rounded bg-slate-700"
                />
                <input
                  placeholder="Amount (ETH)"
                  id="amt"
                  className="p-2 rounded bg-slate-700"
                />
                <div className="flex gap-2">
                  <button
                    className="bg-emerald-400 text-black px-4 py-2 rounded"
                    onClick={()=>{
                      const rid = document.getElementById('recip').value
                      const amt = document.getElementById('amt').value
                      sendToRecipient(rid, amt)
                    }}
                  >Send Ether</button>
                  <button
                    className="bg-slate-700 text-white px-3 py-2 rounded"
                    onClick={()=>{
                      setRecipientLookup(null)
                      setRecipientAddressInput('')
                      setRecipientNameInput('')
                      document.getElementById('recip').value=''
                      document.getElementById('amt').value=''
                    }}
                  >Reset</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right - Ledger */}
        <aside className="col-span-1">
          <div className="p-4 rounded-2xl bg-slate-800 shadow sticky top-28">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Ledger</h3>
              <div className="flex gap-2">
                <button className="bg-sky-500 px-2 py-1 rounded" onClick={()=>exportCSV(ledger)}>CSV</button>
                <button className="bg-amber-400 px-2 py-1 rounded" onClick={()=>exportPDF(ledger)}>PDF</button>
              </div>
            </div>
            {/* <div className="mt-3 max-h-96 overflow-auto">
              {ledger.length===0 ? <p className="text-sm text-slate-400">No transactions for your BlockID yet.</p> :
                <table className="w-full text-sm">
                  <thead className="text-slate-400">
                    <tr><th className="text-left">Sender</th><th className="text-left">Recipient</th><th>Amount</th></tr>
                  </thead>
                  <tbody>
                    {ledger.map((r,i)=>(
                      <tr key={i} className="border-t border-slate-700">
                        <td className="py-2">{r.senderBlockid} <div className="text-xs text-slate-500">{shortAddr(r.senderAddress)}</div></td>
                        <td className="py-2">{r.recipientBlockid} <div className="text-xs text-slate-500">{shortAddr(r.recipientAddress)}</div></td>
                        <td className="py-2 text-center">{r.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              }
            </div> */}

          <div className="mt-3 max-h-96 overflow-auto">
            <table className="w-full text-sm">
              <thead className="text-slate-400">
                <tr>
                  <th className="text-left">Sender</th>
                  <th className="text-left">Recipient</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {ledger.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-4 text-center text-slate-400">
                      No transactions for your BlockID yet.
                    </td>
                  </tr>
                ) : (
                  ledger.map((r, i) => (
                    <tr key={i} className="border-t border-slate-700">
                      <td className="py-2">
                        {r.senderBlockid}
                        <div className="text-xs text-slate-500">{shortAddr(r.senderAddress)}</div>
                      </td>
                      <td className="py-2">
                        {r.recipientBlockid}
                        <div className="text-xs text-slate-500">{shortAddr(r.recipientAddress)}</div>
                      </td>
                      <td className="py-2 text-center">{r.amount}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

            <div className="mt-3 text-xs text-slate-400">Showing transactions sent or received by your BlockID.</div>
          </div>

          <div className="mt-4 p-4 rounded-2xl bg-slate-800 shadow">
            <h4 className="font-semibold">Global Ledger (admin)</h4>
            <div className="mt-2 text-sm text-slate-400">Total entries: {globalLedger.length}</div>
          </div>
        </aside>
      </main>
    </motion.div>
  )
}
