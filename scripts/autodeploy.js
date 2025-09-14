import fs from 'fs';
import fetch from 'node-fetch';

async function main() {
  try {
    const txt = fs.readFileSync('deploy.log', 'utf-8');
    const m = txt.match(/BlockID deployed to:\s*(0x[0-9a-fA-F]+)/);
    if (!m) { console.error('No deployed address in deploy.log'); process.exit(1); }
    const address = m[1];
    console.log('Deployed contract:', address);
    fs.writeFileSync('backend/contract.json', JSON.stringify({ address }, null, 2));
    try {
      const res = await fetch('http://localhost:4001/api/contract', {
        method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ address })
      });
      console.log('Backend response status', res.status);
    } catch (e) {
      console.error('Failed to POST to backend (maybe backend not running yet)');
    }
  } catch (e) {
    console.error('autodeploy failed', e);
    process.exit(1);
  }
}
main();
