import fs from 'fs'
import path from 'path'

const SNAPSHOT_FILE = 'router_snapshot'
const REPORT_FILE = 'report'

let dataWasRead = false
let snapshotMap = new Map<string, number>()
let newReportWasStarted = false

function fullFileName(fileName: string): string {
  return path.join(__dirname, fileName)
}
export function checkRouteResult(id: string, amountOut: number) {
  if (!dataWasRead) {
    let data
    try {
      data = fs.readFileSync(fullFileName(SNAPSHOT_FILE), { encoding: 'utf8', flag: 'r' })
    } catch (e) {
      data = ''
    }
    const records = data.split('\n')
    records.forEach(r => {
      if (r.trim() !== '') {
        // @ts-ignore
        const [_, id, out] = r.split('"').map(e => e.trim())
        snapshotMap.set(id, parseFloat(out))
      }
    })
    dataWasRead = true
  }

  const prevOut = snapshotMap.get(id)
  if (prevOut === undefined) {
    snapshotMap.set(id, amountOut)
    fs.writeFileSync(fullFileName(SNAPSHOT_FILE), `"${id}" ${amountOut}\n`, { encoding: 'utf8', flag: 'a' })
  } else {
    const increase = prevOut === 0 ? amountOut - prevOut : (amountOut / prevOut - 1) * 100
    console.assert(increase >= -1e-4, `Routing result ${id} ${increase}%`)
    fs.writeFileSync(fullFileName(REPORT_FILE), `"${id}": ${prevOut} -> ${amountOut} (${increase}%)\n`, {
      encoding: 'utf8',
      flag: newReportWasStarted ? 'a' : 'w'
    })
    newReportWasStarted = true
  }
}
