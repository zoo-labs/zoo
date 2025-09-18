import { ChainId } from '@zoolabs/zdk'
import { useEffect } from 'react';

export const sortData = (data: Array<any>, byType: string) => {
  return data.sort((a, b) => Number(b.tokenID) - Number(a.tokenID))
}
export const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout)
  })
}

export const waitOnHardhat = (chainId: ChainId, timeout) => {
  return new Promise((resolve) => {
    if ([ChainId.HARDHAT, ChainId.HARDHAT2].includes(chainId)) {
      setTimeout(resolve, timeout)
    } else {
      resolve(undefined)
    }
  })
}

export const timer = (countDownDate) => {
  // Update the count down every 1 second
  const x = setInterval(function () {
    // Get today's date and time
    var now = new Date().getTime()

    // Find the distance between now and the count down date
    var distance = countDownDate - now

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24))
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    var seconds = Math.floor((distance % (1000 * 60)) / 1000)

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x)
      if (typeof window !== 'undefined') {
        document.getElementById('demo').innerHTML = 'EXPIRED'
      }
    }
    return days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's '
  }, 1000)
}

export const accountEllipsis = (account) => `${account.substring(0, 6)}...${account.substring(account.length - 4)}`

export const getEmoji = (rarity) => {
  switch (rarity) {
    case 'Common':
      return '🌕'
    case 'Uncommon':
      return '🌓'
    case 'Rare':
      return '🔥'
    case 'Super Rare':
      return '☄️'
    case 'Epic':
      return '🌟'
    default:
      return ''
  }
}

export const formatError = (err) => {
  // console.log(err)
  if (err?.data?.message) {
    return err?.data?.message?.replace(/Error: Returned error: /, '');
  } else if (err.code) {
    return err.message
  } else {
    return err.toString().replace(/Error: Returned error: /, '');
  }
}

export const initializeClientSideLogic = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // This code will only run in the browser
      const element = document.getElementById('my-element');
      // Perform operations with the element
    }
  }, []);
};

// Example function that might be using document or window
export const someFunction = () => {
  if (typeof window !== 'undefined') {
    // Safe to use window or document here
    console.log('Running in the browser');
  }
};
