const express = require('express'),
  router = express.Router(),
  { Client } = require('pg'),
  connectionData = {
    connectionString: process.env.DATABASE_URL || "postgres://rjsmhnacaikkgi:8cbc3087f0642d69ca866870f401a9a251837557732d7fa9cd62da9bf9ec6b5d@ec2-3-233-7-12.compute-1.amazonaws.com:5432/d4or0tu8ohjart",
    ssl: { rejectUnauthorized: false }
  },  
  localData = require('../data')

function sanitize(str){
  return str.replace(/'/g, "''")
}

function dbRequest(queryStr){
  const client = new Client(connectionData)
  client.connect()
  return new Promise((resolve, reject) => {
    client.query(queryStr, (err, data) => {
      if (err) {
        console.error('Error in dbrequest', queryStr, err)
        reject({ msg: 'Server error occurred', err })
      } else {
        resolve(data.rows)
      }
      client.end()
    })
  })
}

const baseCreatureQuery = `SELECT creatures.*, animals.rarity, _main_name.name as name, _hybrid_name_1.name as hybrid_name_1
FROM creatures
JOIN animals ON creatures.animal_id = animals.unique_id
JOIN animal_names as _main_name on _main_name.animal_id = animals.unique_id
LEFT JOIN animal_names as _hybrid_name_1 on _hybrid_name_1.animal_id = animals.animal_id_1`

router.get('/', async (req, res) => {
  res.status(200).json({ data: demodata })
})

router.get('/contract', (req, res) => {
  res.status(200).json({ data: localData.contract })
})

router.get('/img-test', async (req, res) => {
  const animals = await dbRequest(`SELECT animals.*, _main_name.name as name, _hybrid_name_1.name as hybrid_name_1
  FROM animals
  JOIN animal_names as _main_name on _main_name.animal_id = animals.unique_id
  LEFT JOIN animal_names as _hybrid_name_1 on _hybrid_name_1.animal_id = animals.animal_id_1 ORDER BY _main_name.name`)

  res.render('img-test', { title: 'Test animal images', animals })
})

router.get('/all-creatures', async (req, res) => {
  const creatures = await dbRequest(baseCreatureQuery + `
   WHERE creatures.is_egg = false
  ORDER BY creatures.created ASC`)
  res.status(200).json({ creatures })
})

router.get('/breed/:creature_id', async (req, res) => {
  console.log('Breeding', req.params.creature_id)
  await dbRequest(`UPDATE creatures SET has_bred = true, last_bred = current_timestamp, breed_count = breed_count + 1 WHERE creature_id = ${req.params.creature_id}`)
  await dbRequest(`INSERT INTO creature_history(creature_id, action) VALUES (${req.params.creature_id}, 'BREED')`)
  res.status(200).json({ msg: 'done' })
})

router.get('/creatures/:user_id/:ignore_eggs?', async (req, res) => {
  const eggClause = req.params.ignore_eggs == 'true' ? 'AND creatures.is_egg = false' : ''
    creatures = await dbRequest(baseCreatureQuery + `
   JOIN creatures_to_users ON creatures_to_users.creature_id = creatures.creature_id
  WHERE creatures_to_users.user_id = ${req.params.user_id}
  ${eggClause}
  ORDER BY creatures.created DESC`)
  console.log('eggclause', eggClause)
  res.status(200).json({ creatures })
})

router.get('/eggs/:user_id', async (req, res) => {
  const creatures = await dbRequest(baseCreatureQuery + `
   JOIN creatures_to_users ON creatures_to_users.creature_id = creatures.creature_id
  WHERE creatures_to_users.user_id = ${req.params.user_id}
  AND creatures.is_egg = true ORDER BY creatures.created DESC`)
  res.status(200).json({ creatures })
})

router.get('/breedable/:user_id', async (req, res) => {
  const creatures = await dbRequest(baseCreatureQuery + `
   JOIN creatures_to_users ON creatures_to_users.creature_id = creatures.creature_id
  WHERE creatures_to_users.user_id = ${req.params.user_id}
  AND creatures.is_egg = false
  AND creatures.is_hybrid = false
  ORDER BY creatures.created DESC`)
  res.status(200).json({ creatures })
})

router.post('/generate-egg', async(req, res) => {
  const user_id = req.body.user_id
  let animal, is_hybrid
  if(req.body.animal_id_1){
    //generate hybrid egg
    console.log('generating hybrid')
    const animalResponse = await dbRequest(`SELECT * FROM animals WHERE animal_id_1 = '${req.body.animal_id_1}' AND animal_id_2 = '${req.body.animal_id_2}'`)
    animal = animalResponse[0]
    is_hybrid = 'true'
  } else {
    //generate base egg
    const data = await dbRequest('SELECT * FROM animals WHERE is_hybrid = false'),
      randLookupArr = []

    data.forEach(animal => {
      let i = animal.rarity
      while(--i > -1){
        randLookupArr.push(animal)
      }
    })

    const idx = Math.floor(Math.random() * randLookupArr.length)

    animal = randLookupArr[idx]
    is_hybrid = 'false'
  }

  const creatureData = await dbRequest(`INSERT INTO creatures(animal_id, is_hybrid) VALUES ('${animal.unique_id}', ${is_hybrid}) RETURNING creature_id`),
    creature_id = creatureData[0].creature_id
  
  await dbRequest(`INSERT INTO creatures_to_users(user_id, creature_id) VALUES (${user_id}, ${creature_id})`)
  await dbRequest(`INSERT INTO creature_history(creature_id, action) VALUES (${creature_id}, 'EGG CREATED')`)

  res.status(200).json({ msg: 'complete' })
})

router.post('/hatch-egg', async(req, res) => {
  console.log('this is egg', req.body.id, 'end egg')
  await dbRequest(`UPDATE creatures SET is_egg = false WHERE creature_id = ${req.body.id}`)
    
  await dbRequest(`INSERT INTO creature_history(creature_id, action) VALUES (${req.body.id}, 'EGG HATCHED')`)

  res.status(200).json({ msg: 'hatched' })
})

router.get('/:table', async (req, res) => {
  const table = req.params.table.replace(/ .+/, ''),
    queryStr = `SELECT * FROM ${table}`
  
  dbRequest(queryStr).then(data => {
    res.status(200).json(data)
  }).catch(data => {
    res.status(500).json(data)
  })
})

router.post('/add/:table', (req, res) => {
  const table = req.params.table.replace(/ .+/, ''),
    keys = Object.keys(req.body),
    values = keys.map(key => {
      if(key === 'null') return key
      return `'${sanitize(req.body[key])}'`
    }),
    returning = table === 'creatures' ? 'creature_id' : 'id',
    queryStr = `INSERT INTO ${table} (${keys.join()}) VALUES (${values.join()}) RETURNING ${returning}`
  console.log('body', req.body)
  console.log('querystr', queryStr)
  
  dbRequest(queryStr).then(data => {
    res.status(200).json(data)
  }).catch(data => {
    res.status(500).json(data)
  })
})

module.exports = router;