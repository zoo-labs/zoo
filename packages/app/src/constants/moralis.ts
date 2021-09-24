const config = {
  applicationID: {
    1337: 'IDg3LiOmXqUUGtya4MSRtUsrZWSjTsboxS90FSLG',
    97: '16weSJXK4RD3aYAuwiP46Cgzjm4Bng1Torxz5qiy',
    56: 'cIGUkzL7pyhM8aC8gIcDiH46QGpsEutO5SAQzTgy',
  },
  serverURL: {
    1337: 'https://c1edput5nphx.grandmoralis.com:2053/server',
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
