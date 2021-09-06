import { CardEgg } from 'components/EggCard/types'
import { eggTimeout } from 'constants/index'
import { sortData } from 'functions'
import { Egg } from 'types/zoo'
import { getDaysHours, getMilliseconds } from 'util/timeHelpers'
import { updatZooBalnce,updateMyEggs ,updateMyTransactions} from '.'
import Moralis from 'moralis'

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
  
  dispatch(updateMyEggs(eggData))  
  }
  export const getMyTransactions =  (account) =>async dispatch=>{
    console.log('GETTING TRANSACTIONS for account', account)
    try {
      const Transactions = Moralis.Object.extend('Transactions')
      const query = new Moralis.Query(Transactions)
      query.limit(1000)
      query.descending('createdAt')
      query.equalTo('from', account.toLowerCase())
      const results = await query.find()
      let transactions = []
      for (const tx of results) {
        const action = tx.get('action')
        const txHash = tx.get('transactionHash')
        const url = `https://testnet.bscscan.com/tx/${txHash}`

        // Filter out Burned Tokens
        if (action == 'Burned Token') continue

        transactions.push({
          id: tx.get('objectId'),
          from: tx.get('from'),
          action: action,
          hash: txHash,
          url: url,
          createdAt: tx.get('createdAt').toLocaleDateString(),
          blockNumber: tx.get('blockNumber'),
          timestamp: tx.get('timestamp'),
          tokenID: tx.get('tokenID'),
        })
      }
      dispatch(updateMyTransactions(transactions))
    } catch (e) {
      console.error('ISSUE GETTING TRANSACTIONS \n', e)
    }
  }