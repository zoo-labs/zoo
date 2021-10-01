import Moralis from 'moralis'

export const actions = {
  BOUGHT_EGG: 'Bought Egg',
  BREED_ANIMALS: 'Breed Animals',
  BURNED_TOKEN: 'Burned Token',
  FREE_ANIMAL: 'Free Animal',
  HATCHED_EGG: 'Hatched Egg',
  ASK_CREATED: 'Ask Created',
  PLACE_BID: 'Placed Bid',
}

type GetTransactionsInput = {
  account?: string 
  tokenID?: number
  excludeBurned?: boolean 
  limit?: number
}

export const getTransactionDescription = async (tx) => {
  return {
    // text: tx.
  }
}

export const getZooPrice = async (amount: string) => {
  try {
    return await Moralis.Cloud.run('zooPrice', { amount })
  } catch (error) {
    console.log('getZooPrice error', error)
    return {}
  }
}

export const getTransactions = async ({ account, tokenID, excludeBurned = true, limit }: GetTransactionsInput) => {
  try {
    const response = await Moralis.Cloud.run('transactions', { account, tokenID, excludeBurned, limit })
    return response
  } catch (error) {
    console.log('getTransactions error', error)
    return []
  }
}

export const getTokenTransactions = async (params: GetTransactionsInput) => {
  if (!params.tokenID) {
    return []
  }
  const transactions = await getTransactions(params)
  console.log('getTokenTransactions', transactions)
  return transactions.map(tx => {
    return {
      ...tx,
    }
  })
}
