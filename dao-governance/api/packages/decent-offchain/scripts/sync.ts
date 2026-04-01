import { sleep } from 'bun';
import { Dao, ApiResponse } from 'sdk';

const API = 'http://localhost:3005';

export async function sync() {
  const startTime = Date.now();
  const f = (await fetch(`${API}/d`).then(r => r.json())) as { data: Dao[] };
  const daos = f.data.filter(d => d.governanceModules?.length === 0); // multisig DAOs

  for (let i = 0; i < daos.length; i++) {
    const dao = daos[i];
    if (!dao) continue;
    const daoStartTime = Date.now();
    console.log(`[${i + 1}/${daos.length}] Syncing ${dao.address} on ${dao.chainId}`);
    const res = (await fetch(`${API}/d/${dao.chainId}/${dao.address}/safe-proposals`, {
      method: 'POST',
    }).then(r => r.json())) as ApiResponse<Dao[]>;
    if (res.error) {
      console.error(res.error.message);
      continue;
    }
    await sleep(100);
  }

  const endTime = Date.now();
  console.log(`Total sync time: ${(endTime - startTime) / 1000}s`);
}

sync();
