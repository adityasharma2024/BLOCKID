const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const { ethers } = require('ethers');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DATA_DIR = __dirname;
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const LEDGER_FILE = path.join(DATA_DIR, 'ledger.json');
const CONTRACT_FILE = path.join(DATA_DIR, 'contract.json');
const EVENTS_FILE = path.join(DATA_DIR, 'events.json');

if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, JSON.stringify({}, null, 2));
if (!fs.existsSync(LEDGER_FILE)) fs.writeFileSync(LEDGER_FILE, JSON.stringify([], null, 2));
if (!fs.existsSync(CONTRACT_FILE)) fs.writeFileSync(CONTRACT_FILE, JSON.stringify({ address: null }, null, 2));
if (!fs.existsSync(EVENTS_FILE)) fs.writeFileSync(EVENTS_FILE, JSON.stringify([], null, 2));

function readUsers(){ return JSON.parse(fs.readFileSync(USERS_FILE)); }
function writeUsers(u){ fs.writeFileSync(USERS_FILE, JSON.stringify(u, null, 2)); }
function readLedger(){ return JSON.parse(fs.readFileSync(LEDGER_FILE)); }
function writeLedger(l){ fs.writeFileSync(LEDGER_FILE, JSON.stringify(l, null, 2)); }
function readContract(){ return JSON.parse(fs.readFileSync(CONTRACT_FILE)); }
function writeContract(c){ fs.writeFileSync(CONTRACT_FILE, JSON.stringify(c, null, 2)); }
function appendEvent(e){ const ev = JSON.parse(fs.readFileSync(EVENTS_FILE)); ev.unshift(e); fs.writeFileSync(EVENTS_FILE, JSON.stringify(ev, null, 2)); }

app.get('/api/contract', (req, res) => { res.json(readContract()); });

app.post('/api/contract', (req, res) => {
  const { address } = req.body || {};
  if (!address) return res.status(400).json({ error: 'address required' });
  writeContract({ address });
  res.json({ ok:true, address });
});

app.post('/api/registerUser', async (req, res) => {
  try {
    const { blockid, password, address, details } = req.body || {};
    if (!blockid || !password || !address || !details) return res.status(400).json({ error: 'missing fields' });
    const users = readUsers();
    if (users[blockid]) return res.status(400).json({ error: 'blockid exists' });
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    users[blockid] = { passwordHash: hash, address, details };
    writeUsers(users);
    res.json({ ok:true });
  } catch (e) { console.error(e); res.status(500).json({ error: 'server error' }); }
});

app.post('/api/login', (req, res) => {
  const { blockid, password } = req.body || {};
  if (!blockid || !password) return res.status(400).json({ error: 'missing' });
  const users = readUsers();
  const u = users[blockid];
  if (!u) return res.status(401).json({ error: 'not found' });
  const ok = bcrypt.compareSync(password, u.passwordHash);
  if (!ok) return res.status(401).json({ error: 'invalid' });
  res.json({ ok:true, address: u.address, details: u.details });
});

app.get('/api/userByBlockid/:id', (req, res) => {
  const id = req.params.id;
  const users = readUsers();
  const u = users[id];
  if (!u) return res.status(404).json({ error: 'not found' });
  res.json({ address: u.address, details: u.details, blockid: id });
});

app.post('/api/ledger', (req, res) => {
  const { senderBlockid, senderAddress, recipientBlockid, recipientAddress, amount, txHash } = req.body || {};
  if (!senderBlockid || !senderAddress || !recipientBlockid || !recipientAddress || !amount) {
    return res.status(400).json({ error: 'missing fields' });
  }
  const ledger = readLedger();
  const entry = { senderBlockid, senderAddress, recipientBlockid, recipientAddress, amount, txHash: txHash||null, timestamp: new Date().toISOString() };
  ledger.unshift(entry);
  writeLedger(ledger);
  res.json({ ok:true });
});

app.get('/api/ledger', (req, res) => { res.json(readLedger()); });

app.get('/api/ledger/by/:blockid', (req, res) => {
  const id = req.params.blockid;
  const ledger = readLedger();
  const filtered = ledger.filter(e => e.senderBlockid === id || e.recipientBlockid === id);
  res.json(filtered);
});

app.get('/api/events', (req, res) => { res.json(JSON.parse(fs.readFileSync(EVENTS_FILE))); });

app.get('/api/users', (req, res) => {
  const users = readUsers(); const arr = Object.keys(users).map(k => ({ blockid: k, address: users[k].address, details: users[k].details }));
  res.json(arr);
});

app.get('/api/ping', (req, res) => res.json({ ok:true }));

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log('Backend running on', PORT));
