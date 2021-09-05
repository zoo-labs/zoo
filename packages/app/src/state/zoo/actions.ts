import { CardEgg } from 'components/EggCard/types'
import { eggTimeout } from 'constants/index'
import { sortData } from 'functions'
import { Egg } from 'types/zoo'
import { getDaysHours, getMilliseconds } from 'util/timeHelpers'
import { updatZooBalnce,updatMyEggs } from '.'

export { clear, remove, push } from '../toasts'
export { addEgg, addAnimal, addEggs, addAnimals, burnEgg, burnAnimal,updatZooBalnce, clearZoo } from '.'

export  const getZooBalance =  (account,zooToken) => async dispatch =>{
    if (!account) return
    try {
      const decimals = await zooToken.methods.decimals().call()
      const rawBalance = await zooToken.methods.balanceOf(account).call()
      const divisor = parseFloat(Math.pow(10, decimals).toString())
      const balance = rawBalance / divisor
      dispatch(updatZooBalnce(balance))
    } catch (e) {
      console.error('ISSUE LOADING ZOO BALANCE \n', e)
    }
  }

  export const getMyEggs = (account,allEggs) =>async dispatch =>{
  let eggData = []
  Object.values(allEggs).forEach((egg:CardEgg, index) => {
    if (!account) {
      return
    }
    const eggType = egg.basic ? 'EGG' : 'HYBRID'
    if ((egg.owner || '').toLowerCase() !== account.toLowerCase()) {
      return
    }
    const now = new Date().getTime()
    const elapsedTime = now - egg.createdAt.getTime()
    const hatchTimeout = egg.basic ? 0 : getMilliseconds(eggTimeout)
    const timeRemaining = hatchTimeout - elapsedTime
    const timeRemainingDaysHours = getDaysHours(timeRemaining)
    const barwidth = [100 * (elapsedTime / hatchTimeout), '%'].join('')
    if (egg.owner.toLowerCase() === account.toLowerCase() && !egg.burned) {
      eggData.push({
        id: index,
        ...egg,
        name: eggType,
        timeRemaining: !egg.basic ? (elapsedTime < hatchTimeout ? timeRemaining : 0) : 0,
        CTAOverride: !egg.basic ? (elapsedTime < hatchTimeout ? { barwidth, timeRemainingDaysHours } : null) : null,
      })
    }
  })

  eggData = sortData(eggData, 'hybrid')
  
  console.log('myEggs length',eggData.length)
  
  dispatch(updatMyEggs(eggData))  
  }