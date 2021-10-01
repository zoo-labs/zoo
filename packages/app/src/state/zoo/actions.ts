import { CardEgg } from 'components/EggCard/types'
import { eggTimeout } from 'constants/index'
import { sortData } from 'functions'
import { Egg } from 'types/zoo'
import { getDaysHours, getMilliseconds } from 'util/timeHelpers'
import { updatZooBalnce,updateMyEggs ,updateMyTransactions} from '.'
import Moralis from 'moralis'
import { getTransactions } from 'functions/moralis'

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

  export const getMyEggs = (account, allEggs) =>async dispatch =>{
    console.log('getMyEggs', account, allEggs.length)
  let eggData = []
  Object.values(allEggs).forEach((egg:CardEgg, index) => {
    if (!account) {
      return
    }
    if ((egg.owner || '').toLowerCase() !== account.toLowerCase()) {
      return
    }
    eggData.push(eggConverter(egg,account))

  })

  eggData = sortData(eggData, 'hybrid')

  console.log('myEggs length',eggData.length)

  dispatch(updateMyEggs(eggData))
  }

  export const eggConverter = (egg,account) => {
    if (egg.owner.toLowerCase() === account.toLowerCase() && !egg.burned) {
      const eggType = egg.basic ? 'EGG' : 'HYBRID'
      const now = new Date().getTime()
      const elapsedTime = now - egg.createdAt.getTime()
      const hatchTimeout = egg.basic ? 0 : getMilliseconds(eggTimeout)
      const timeRemaining = hatchTimeout - elapsedTime
      const timeRemainingDaysHours = getDaysHours(timeRemaining)
      const barwidth = [100 * (elapsedTime / hatchTimeout), '%'].join('')
    return  {
          id: egg.tokenID,
          ...egg,
          name: eggType,
          timeRemaining: !egg.basic ? (elapsedTime < hatchTimeout ? timeRemaining : 0) : 0,
          CTAOverride: !egg.basic ? (elapsedTime < hatchTimeout ? { barwidth, timeRemainingDaysHours } : null) : null,
        }
      }
  }
  export const getMyTransactions =  (account) =>async dispatch=>{
    console.log('GETTING TRANSACTIONS for account', account)
    const transactions = await getTransactions({ account })
    dispatch(updateMyTransactions(transactions))
  }
