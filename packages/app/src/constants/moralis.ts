const config = {
  applicationID: {
    1337: 'wBLjsQWUNSVJ61NHRimu6xy6slg2s6Zwd5pCQrnx',
    97: '16weSJXK4RD3aYAuwiP46Cgzjm4Bng1Torxz5qiy',
    56: 'cIGUkzL7pyhM8aC8gIcDiH46QGpsEutO5SAQzTgy',
  },
  serverURL: {
    1337: 'https://zdkisefixfx6.bigmoralis.com:2053/server',
    97: 'https://dblpeaqbqk32.usemoralis.com:2053/server',
    56: 'https://j0ixlvmwc1kz.usemoralis.com:2053/server',
  },
}

export function moralisConfig(chainID) {
  return {
    applicationID: config.applicationID[chainID],
    serverURL: config.serverURL[chainID],
  }
}

export default moralisConfig
