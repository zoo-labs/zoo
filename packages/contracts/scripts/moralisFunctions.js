const fs    = require('fs')
const spawn = require('child_process').spawn

const buf = fs.readFileSync(__dirname + '/../src/functions/moralis.js')
const buf2 = fs.readFileSync(__dirname + '/../deployments/localhost/ZooKeeper.json')

fs.writeFileSync(__dirname + '/../cache/moralis.js', String(buf).replace('ZOOKEEPER_ABI', buf2))

const child = spawn('node', ['node_modules/.bin/moralis-admin-cli', 'watch-cloud-file', '--moralisSubdomain', 'qjydxwdegh7e.usemoralis.com', '--moralisCloudFile', 'cache/moralis.js'], { shell: true })

child.stdout.on('data', (data) => {
  if (String(data).trim() == 'File Uploaded Correctly') child.kill('SIGHUP') && process.exit(0)
})

child.stderr.on('data', (data) => { console.log('error', data) })
