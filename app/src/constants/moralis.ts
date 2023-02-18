const config = {
  applicationID: {
    1337: 'VSQQ9yipOlkZ7GmAwKPHKm8HOmBIEO6No23DbeLm',
    // 97: 'eI32aqJjU5pEm1BzMYHZxjWlgpKqMi2WMnI650Qk',
    97: '16weSJXK4RD3aYAuwiP46Cgzjm4Bng1Torxz5qiy',
    56: 'cIGUkzL7pyhM8aC8gIcDiH46QGpsEutO5SAQzTgy',
  },
  serverURL: {
    1337: 'https://crkoxpwp0jgk.moralishost.com:2053/server',
    // 97: `https://bv47r2tczd0v.moralishost.com:2053/server`,
    97: `https://dblpeaqbqk32.usemoralis.com:2053/server`,
    56: 'https://j0ixlvmwc1kz.usemoralis.com:2053/server',
  },
}

export function moralisConfig(chainId) {
  return {
    applicationID: config.applicationID[chainId],
    serverURL: config.serverURL[chainId],
  }
}

export default moralisConfig
