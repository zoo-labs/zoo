import { updatZooBalnce } from '.'

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
