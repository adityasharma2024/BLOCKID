<<<<<<< HEAD
# BlockID Full Prototype - Local (with ledger, login, transact)

Generated: 2025-09-14T01:56:34.867244Z

## Features included
- Smart contract `BlockID.sol` (requires msg.value>0, one BlockID per account)
- Backend with users.json and ledger.json (pre-populated demo data)
- Frontend Vite + React + Tailwind UI at port 3000
- Registration flow: pay transaction -> set password -> stored in backend
- Login flow: BlockID + password -> dashboard
- Dashboard: left = profile + transact, right = ledger (user-specific), export CSV/PDF
- Transactions can be sent only to registered BlockIDs; backend maintains global ledger

## Run locally (steps)
1. Install root deps & start Hardhat node (terminal A)
   ```bash
   npm install
   npx hardhat node
   ```
2. Start backend (terminal B)
   ```bash
   cd backend
   npm install
   npm start
   ```
3. Deploy & autodeploy (terminal C)
   ```bash
   # from project root
   npm run deploy
   ```
4. Start frontend (terminal D)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
5. Open http://localhost:3000 in your browser. Connect MetaMask to RPC http://127.0.0.1:8545 (chain id 31337) and import one Hardhat account private key.
6. Use the app: create BlockID by paying, set password, login, view dashboard, send ETH to other BlockIDs.

Notes:
- The backend includes `backend/users.json` and `backend/ledger.json` with demo entries.
- The backend endpoint `/api/ledger/by/:blockid` returns user-specific ledger entries (sent or received).
=======
# BLOCKID
>>>>>>> 76f3c5906365bacf8c036d7033ad63d69a1e1324
