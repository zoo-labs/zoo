;(async function(){
  const utils = document.querySelector('.account-utils')
  utils.addEventListener('click', e => {
    const tgt = e.target.closest('.ac-js')
    if(tgt) {
      switch(tgt.dataset.action){
        case 'logout':
          if(window.confirm('Log Out?')){
            localStorage.removeItem('czUser')
            location.href = '/'
          }
          break;
      }
    }
  })

  const detailsElem = document.getElementById('AccountDetails'),
    eggModal = window.modals["hatch egg"],
    _eggModalVideos = eggModal.elem.querySelectorAll('video'),
    eggModalVideos = {
      basic: _eggModalVideos[0],
      hybrid: _eggModalVideos[1]
    },
    eggModalText = eggModal.elem.querySelector('h2'),
    currentEggRate = 100,
    breedPair = []

  let user = JSON.parse(localStorage.czUser),
    userZoo = {
      eggs: [],
      hatched: []
    },
    hatchRevealTimeout,
    allowHatchClose,
    requestCreatureRender


  async function updateCreatures(){
    const { creatures } = await window.EndpointManager.get(`/data/creatures/${user.id}`)
    userZoo = {
      eggs: [],
      hatched: [],
      hybrids: []
    }
    creatures.forEach(creature => {
      if(creature.is_egg){
        userZoo.eggs.push(creature)
      } else if(creature.is_hybrid){
        userZoo.hybrids.push(creature)
      } else {
        userZoo.hatched.push(creature)
      }
    })
    window.userZoo = userZoo
  }

//<button class="account-button ac-js" data-action="hatch all" ${userZoo.eggs.length === 0 ? 'disabled' : ''}>Hatch All</button>
  async function renderAccountDetails(){
    let animalsHTML = ''

    if(userZoo.hatched.length) {
      const animalsHTMLarr = [],
        breedable = userZoo.hatched,
        nonbreedable = userZoo.hybrids

      if(breedable.length){
        const now = window.getServerTime(),
          animalsInTimeout = [],
          breedableByAnimal = breedable.reduce((obj, creature) => {
            //assign image
            creature.imgstr = window.cloudinaryImgURL(creature.name, creature.name)

            if(creature.has_bred && creature.breed_count > 0){
              const lastBred = (new Date(creature.last_bred)).getTime(),
                breedTimeoutKey = creature.breed_count > 5 ? 5 : creature.breed_count,
                breedTimeout = window.getMilliseconds(window.breedTimeouts[breedTimeoutKey]),
                elapsedTime = now - lastBred

              if(elapsedTime < breedTimeout){
                const timeRemaining = breedTimeout - elapsedTime,
                  timeRemainingDaysHours = window.getDaysHours(timeRemaining),
                  barwidth = [100 * (elapsedTime / breedTimeout), '%'].join('')

                creature.timeRemaining = timeRemaining
                creature.actionStringOverride = 'data-disabled'
                creature.CTAOverride = `<div class="creature-card__timeout" style="--barwidth: ${barwidth};">
                  <span class="creature-card__timeout-display">${timeRemainingDaysHours.days}d ${timeRemainingDaysHours.hours}h</span>
                </div>`

                animalsInTimeout.push(creature)
              }
              else {
                if(!obj[creature.name]){
                  obj[creature.name] = []
                }
                obj[creature.name].push(creature)
              }
            } else {
              if(!obj[creature.name]){
                obj[creature.name] = []
              }
              obj[creature.name].push(creature)
            }

            return obj
          }, { }),
          animalKeys = Object.keys(breedableByAnimal).sort()

        animalsInTimeout.sort((a, b) => a.timeRemaining - b.timeRemaining)

        animalsHTMLarr.push(`<div class="account-row">
        <h3>Breedable Animals</h3>
        <div class="account-creature-list">
          ${animalKeys.map(key => {
            const creatureStack = breedableByAnimal[key],
              creature = creatureStack[0],
              nextCreatureId = creatureStack.length > 1 ? `data-next-id="${creatureStack[1].id}"` : '',
              countStr = creatureStack.length > 1 ? `<br>x${creatureStack.length}` : ''

            return `<div class="creature-card -breedable ac-js" data-action="go to feed" data-id="${creature.creature_id}" data-animal-id="${creature.animal_id}" ${nextCreatureId} data-name="${creature.name}">
              <img src="${creature.imgstr}" alt="${creature.name}" />
              <div class="creature-card-details">
                <h4>${creature.name}${countStr}</h4>
                <div class="creature-card-cta ac-js" data-action="breed">Breed</div>
              </div>
            </div>`
          }).join('')}
          ${animalsInTimeout.map(creature => `
            <div class="creature-card ac-js" data-action="go to feed" ${creature.actionStringOverride} data-id="${creature.creature_id}" data-animal-id="${creature.animal_id}" data-name="${creature.name}">
              <img src="${creature.imgstr}" alt="${creature.name}" />
              <div class="creature-card-details">
                <h4>${creature.name}</h4>
                ${creature.CTAOverride}
              </div>
            </div>
          `).join('')}
        </div>
      </div>`)
      }

      if(nonbreedable.length){
        const nonBreedableByAnimal = {}

        await Promise.all(nonbreedable.map(async (creature) => {
          if(!nonBreedableByAnimal[creature.name]){
            nonBreedableByAnimal[creature.name] = {
              imgstr: '',
              creatures: []
            }
            //only fetch image for first one of type
            nonBreedableByAnimal[creature.name].imgstr = window.cloudinaryImgURL(creature.hybrid_name_1, creature.name)
          }
          nonBreedableByAnimal[creature.name].creatures.push(creature)
          return Promise.resolve('done')
        }))

        const nonBreedableKeys = Object.keys(nonBreedableByAnimal).sort()

        animalsHTMLarr.push(`<div class="account-row">
        <h3>Hybrids</h3>
        <div class="account-creature-list">
          ${nonBreedableKeys.map(key => {
            const creatureObj = nonBreedableByAnimal[key],
              creatureStack = creatureObj.creatures,
              creature = creatureStack[0],
              countStr = creatureStack.length > 1 ? `<br>x${creatureStack.length}` : ''

            return `<div class="creature-card ac-js" data-action="go to feed" data-id="${creature.creature_id}" data-animal-id="${creature.animal_id}" data-name="${creature.name}">
              <img src="${creatureObj.imgstr}" alt="${creature.name}" />
              <div class="creature-card-details">
                <h4>${creature.name}${countStr}</h4>
              </div>
            </div>`
          }).join('')}
        </div>
      </div>`)
      }

      animalsHTML = animalsHTMLarr.join('')
    }

    const eggs = userZoo.eggs.map(egg => {
      if(egg.is_hybrid){
        const now = window.getServerTime(),
          createdDate = (new Date(egg.created)).getTime(),
          hatchTimeout = window.getMilliseconds(window.eggTimeout),
          elapsedTime = now - createdDate

        if(elapsedTime < hatchTimeout){
          const timeRemaining = hatchTimeout - elapsedTime,
            timeRemainingDaysHours = window.getDaysHours(timeRemaining),
            barwidth = [100 * (elapsedTime / hatchTimeout), '%'].join('')

          egg.actionStringOverride = 'data-disabled'
          egg.CTAOverride = `<div class="creature-card__timeout" style="--barwidth: ${barwidth};">
            <span class="creature-card__timeout-display">${timeRemainingDaysHours.days}d ${timeRemainingDaysHours.hours}h</span>
          </div>`

          egg.timeout = timeRemaining
        } else {
          egg.timeout = 0
        }
      } else {
        egg.timeout = 0
      }
      return egg
    })

    eggs.sort((a, b) => {
      if(a.timeout === b.timeout) {
        if(a.is_hybrid) {
          if(b.is_hybrid) return 0
          return -1
        }
        if(b.is_hybrid) return 1
        return 0
      }
      return a.timeout - b.timeout
    })

    detailsElem.innerHTML = `
      <div class="account-row">
        <h3>Balance - ${user.zooBalance} $ZOO</h3>
        <button class="account-button ac-js" data-action="add funds">Add Funds</button>
      </div>
      <div class="account-row">
        <h3>${userZoo.eggs.length} Eggs owned</h3>
        <button id="BuyEggs" class="account-button ac-js" data-action="buy eggs">Buy Eggs</button>
        <div class="account-creature-list egg-list">
          ${eggs.map(egg => `
            <div class="creature-card ac-js" ${egg.actionStringOverride || `data-action="hatch egg"`} data-id="${egg.creature_id}">
              <img src="/images/egg_small${egg.is_hybrid ? '_hybrid' : ''}.jpg" alt="" />
              <div class="creature-card-details">
                <div class="creature-card-type">${egg.is_hybrid ? 'Hybrid' : 'Basic'}</div>
                ${egg.CTAOverride || `<div class="creature-card-cta">Hatch</div>`}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      ${animalsHTML}
    `
  }

  //bind click events
  detailsElem.addEventListener('click', async e => {
    const tgt = e.target.closest('.ac-js')
    if(tgt){
      switch(tgt.dataset.action){
        case 'add funds':
          const amountObj = await window.quickFormPromise('Amount?', { amount: { type: 'number' } }),
            amount = amountObj ? parseInt(amountObj.amount) : null
          if(amount){
            const data = await window.EndpointManager.post('/users/update', {
              id: user.id,
              vals: {
                "wallet_balance": user.wallet_balance + amount
              }
            })

            user = data.user
            localStorage.czUser = JSON.stringify(user)
          }
          renderAccountDetails()
          break;

        case 'buy eggs':
          const eggObj = await window.quickFormPromise(`How many eggs?<br><span style="font-size: 0.6em">(current price: ${currentEggRate}/egg)</span>`, { amount: { type: 'number', default: 1, label: '' } })
          let numberOfEggs = eggObj ? parseInt(eggObj.amount) : null
          if(numberOfEggs) {
            const fee = numberOfEggs * currentEggRate,
              remainingBalance = user.wallet_balance - fee
            if(remainingBalance < 0){
              alert(`Insufficient funds, please add at least ${-remainingBalance} to make this purchase.`)
            } else {
              while(--numberOfEggs > -1){
                await window.EndpointManager.post('/data/generate-egg', {
                  user_id: user.id
                })
              }

              const data = await window.EndpointManager.post('/users/update', {
                id: user.id,
                vals: {
                  "wallet_balance": remainingBalance
                }
              })

              user = data.user
              localStorage.czUser = JSON.stringify(user)

              updateCreatures().then(renderAccountDetails)
            }
          }
          break;

        case 'hatch egg':
          const confirmHatch = await window.quickConfirm(`You want to hatch this egg?`)
          if(confirmHatch){
            const egg_id = parseInt(tgt.dataset.id),
              egg = userZoo.eggs.filter(_egg => _egg.creature_id === egg_id)[0]
            let eggModalVideo,
              imgstr
            if(egg.is_hybrid){
              eggModalVideo = eggModalVideos.hybrid
              eggModalVideos.basic.classList.add('hidden')
              imgstr = window.cloudinaryImgURL(egg.hybrid_name_1, egg.name)
            } else {
              eggModalVideo = eggModalVideos.basic
              eggModalVideos.hybrid.classList.add('hidden')
              imgstr = window.cloudinaryImgURL(egg.name, egg.name)
            }

            eggModalText.textContent = egg.rarity ? `${egg.name} - ${window.rarityTable[egg.rarity]}` : egg.name
            eggModal.elem.style.backgroundImage = `url(${imgstr})`
            eggModalVideo.classList.remove('-fade-out')
            eggModalVideo.classList.remove('hidden')
            eggModal.open()
            eggModalVideo.play()
            hatchRevealTimeout = window.setTimeout(() => {
              eggModal.elem.classList.remove('-hide-details')
              eggModalVideo.classList.add('-fade-out')
            }, 5000)

            allowHatchClose = false
            requestCreatureRender = false

            await window.EndpointManager.post('/data/hatch-egg', { id: egg_id })
            if(requestCreatureRender){
              //close button has been clicked, fire this when done
              updateCreatures().then(renderAccountDetails)
            } else {
              //close button hasn't been clicked, allow it
              allowHatchClose = true
            }


            //updateCreatures().then(renderAccountDetails)
            //happens in hatch modal close
          }
          break;

        case 'breed':
          const breedCreature = tgt.closest('.creature-card')
          if(!breedPair.length) {
            //this is the first click
            breedCreature.classList.add('-active')
            breedPair.push(breedCreature)
          } else if(breedCreature === breedPair[0] && !breedCreature.dataset.nextId) {
            //deselect if self and no extras
            breedCreature.classList.remove('-active')
            breedPair.splice(0, 1)
          } else {
            const confirmBreed = await window.quickConfirm(`You want to breed this ${breedPair[0].dataset.name} and this ${breedCreature.dataset.name}?`)
            if(confirmBreed){
              //trigger breed
              breedCreature.classList.add('-active')

              if(breedPair[0].dataset.name === 'Blobfish'){
                //if it's a blobfish in slot 1, push it to slot 2
                breedPair.unshift(breedCreature)
              } else {
                breedPair.push(breedCreature)
              }

              const animal_id_1 = breedPair[0].dataset.animalId,
                animal_id_2 =  breedPair[1].dataset.animalId,
                creature_id_1 = breedPair[0].dataset.id,
                creature_id_2 = breedPair[1] === breedPair[0] ? breedPair[1].dataset.nextId : breedPair[1].dataset.id

              await Promise.all([
                window.EndpointManager.post('/data/generate-egg', {
                  user_id: user.id,
                  animal_id_1,
                  animal_id_2
                }),
                window.EndpointManager.get(`/data/breed/${creature_id_1}`),
                window.EndpointManager.get(`/data/breed/${creature_id_2}`)
              ])

              breedPair.splice(0, 2)

              window.quickFormPromise('Hybrid egg created successfully!', {}, 'Ok')

              updateCreatures().then(renderAccountDetails)
            }
          }
          break;

        case 'go to feed':
          window.location.href = `/my-feed?state=${btoa(JSON.stringify({ name: tgt.dataset.name }))}`
          break;
      }
    } else {
      //clear breedable
      document.querySelectorAll('.-breedable.-active').forEach(elem => elem.classList.remove('-active'))
      breedPair.splice(0, 2)
    }
  })

  document.querySelector('#HatchModal').addEventListener('click', () => {
    if(allowHatchClose){
      updateCreatures().then(renderAccountDetails)
    } else {
      requestCreatureRender = true
    }
    window.clearTimeout(hatchRevealTimeout)
    document.querySelector('#HatchModal .modal-close').click()
    eggModal.elem.classList.add('-hide-details')
    document.querySelectorAll('#HatchModal video').forEach(video => {
      video.pause()
      video.currentTime = 0
      video.classList.remove('-fade-out')
    })
  });


  //initialize
  updateCreatures().then(renderAccountDetails)

}());
