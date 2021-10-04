import BidModalHeader from 'components/NewModal/BidModalHeader'
import { ChainId } from 'constants/Chains'
import { addresses } from 'constants/contracts'
import { getTokenTransactions } from 'functions/moralis'
import { useMatchBreakpoints } from 'hooks'
import useAuth from 'hooks/useAuth'
import { useMarket, useMedia, useZooToken } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import useWeb3 from 'hooks/useWeb3'
import Moralis from 'moralis'
import React, { useEffect, useState } from 'react'
import { FaCompressAlt, FaExpand } from 'react-icons/fa'
import { ImArrowUpRight2 } from 'react-icons/im'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { AppState } from 'state'
import { ApplicationModal } from 'state/application/actions'
import { useAssetModalToggle, useModalOpen } from 'state/application/hooks'
import { useGasPrice } from 'state/network/hooks'
import { useAnimationModeManager, useIsAnimationMode } from 'state/user/hooks'
import Modal from '../../NewModal'
interface AssetModalProps {
  item: any
}

const AssetModal: React.FC<AssetModalProps> = ({ item }) => {
  const { chainId, account, library } = useWeb3()

  const assetModal = useModalOpen(ApplicationModal.ASSET)
  const [animationMode, toggleSetAnimationMode] = useAnimationModeManager()
  const chainAddresses = (addresses[chainId] as any) || (addresses[ChainId.BSC] as any)
  const toggleAssetModal = useAssetModalToggle()
  const [fullView, setFullView] = useState(false)
  const [askItem, setAskItem] = useState({ amount: 0, usdAmount: 0, currency: chainAddresses.ZOO })
  const [amount, setAmount] = useState(0)
  const [transactions, setTransactions] = useState([])
  const [transactionHash, setTransactionHash] = useState(null)
  const [askModal, setAskModal] = useState(false)
  const [hasRequestedAsk, setHasRequestedAsk] = useState(false)
  const gasPrice = useGasPrice()

  const { logout } = useAuth()
  const history = useHistory()
  const zooBalance = useSelector<AppState, AppState['zoo']['zooBalance']>((state) => state.zoo.zooBalance)
  const getNetwork = (chainId: number) => {
    switch (chainId) {
      case 56:
        return 'BSC'
      case 97:
        return 'BSC-TEST'
      case 1:
        return 'ETH'
      case 4:
        return 'ETH-TEST'
      default:
        return ''
    }
  }

  const getBrowserUrl = (chainId: number) => {
    return chainId === 56 ? 'https://bscscan.com' : 'https://testnet.bscscan.com'
  }

  const isAnimated = useIsAnimationMode()
  const getVideo = () => {
    return isAnimated ? (
      <div>
        <video
          className={`${fullView ? ' h-screen' : 'rounded h-1/2'}`}
          autoPlay
          playsInline
          loop
          muted
          style={{
            pointerEvents: 'none',
            maxHeight: '100vh',
            alignSelf: 'center',
            // width: '100%',
          }}>
          <source src={'/static/video/egg.mp4'} type='video/mp4'></source>
        </video>
      </div>
    ) : (
      <img
        style={{ verticalAlign: 'middle' }}
        src={`${item.imageUrl || window.location.origin + '/static/images/basic.jpg'}`}
        className={` transition-transform duration-1000 ${fullView ? ' h-screen' : 'rounded h-full'}`}
      />
    )
  }

  const txHash = item.transactionHash || '0x000000000000000000000000000000000000000'
  const ownerAccount = item.owner || ''
  const txHashEllipsis = `${txHash.substring(0, 10)}...${txHash.substring(txHash.length - 6)}`
  const accountEllipsis = `${ownerAccount.substring(0, 6)}...${ownerAccount.substring(txHash.length - 4)}`
  const { toastSuccess, toastError, toastInfo, clear } = useToast()
  const [disabled, setDisabled] = useState(false)
  const myTransactions = useSelector<AppState, AppState['zoo']['myTransactions']>((state) => state.zoo.myTransactions)
  const { isSm } = useMatchBreakpoints()
  const media = useMedia()
  const market = useMarket()
  const zooToken = useZooToken()
  // const setAsk = async (amount) => {
  //   setDisabled(true)
  //   try {
  //     await media.methods
  //       .setAsk(item.tokenID, { amount, currency: chainAddresses.ZOO }) //set Ask price for token
  //       .send({ from: account, gasPrice: gasPrice })
  //       .then((res) => {
  //         clear()
  //         toastInfo('Ask Price Set.')
  //         console.log('Set Ask Price', res)

  //         setDisabled(false)
  //         setAskModal(false)
  //         getAskValue()
  //         setHasRequestedAsk(false)
  //       })
  //       .catch((err) => {
  //         const message = formatError(err)
  //         setDisabled(false)
  //         clear()
  //         toastError(message)
  //         console.error(message)
  //       })
  //   } catch (err) {
  //     console.error(err)
  //     clear()
  //     setDisabled(false)

  //     toastError('Unable to purchase eggs. Try again later.')
  //   }
  //   // console.log(testEggs)
  //   // dispatch(addEggs(testEggs))
  // }

  useEffect(() => {
    getZooUsdPrice(360000)
    getTokenTransactions({ tokenID: item.tokenID }).then((transactions) => {
      if (transactions.length > 0) {
        setTransactions(transactions)
        setTransactionHash(transactions[0].hash)
      }
    })
  }, [item])
  // const getAskValue = () => {
  //   const tokenID = item.tokenID || 0
  //   console.log('tokenID', tokenID)

  //   try {
  //     market &&
  //       market.methods
  //         .currentAskForToken(tokenID)
  //         .call()
  //         .then((res) => {
  //           console.log('currentAskForToken', res)
  //           const amount = res.amount

  //           Moralis.Cloud.run('zooPrice', { amount })
  //             .then((res) => {
  //               const ask = {
  //                 amount,
  //                 usdAmount: res.usdAmount,
  //                 currency: chainAddresses.ZOO,
  //               }
  //               console.log('zooPrice', ask)
  //               setAskItem(ask)
  //               setAmount(ask?.amount)

  //             })
  //             .catch((err) => console.log('error in zooPrice', err))
  //         })
  //         .catch((err) => console.log('error in getAsk', err))
  //   } catch (error) {
  //     console.log('error in getAsk 2', error)
  //   }
  // }

  const getZooUsdPrice = (amount) => {
    Moralis.Cloud.run('zooPrice', { amount })
      .then((res) => {
        const ask = {
          amount,
          usdAmount: res.usdAmount,
          currency: chainAddresses.ZOO,
        }
        console.log('zooPrice', ask)
        setAskItem(ask)
        setAmount(ask?.amount)
      })
      .catch((err) => console.log('error in zooPrice', err))
  }

  return (
    <Modal isOpen={assetModal} onDismiss={() => null} isMax scrollable>
      <BidModalHeader
        onBack={() => {
          toggleAssetModal()
          setAskItem({ amount: 0, usdAmount: 0, currency: chainAddresses.ZOO })
        }}
        className={`absolute p-6 w-full z-10 ${fullView && 'hidden'}`}
      />
      <div className='h-full  flex'>
        <div className={`flex flex-1 flex-wrap ${!fullView && 'self-center'}`}>
          <div className={` w-full  md:flex-1  bg-modal-dark flex   ${fullView ? 'w-screen fixed z-20 h-screen' : ' lg:w-1/2 '}`} style={{ minHeight: isSm ? '80vh' : '100vh' }}>
            <div className={`flex   w-full items-center justify-center ${fullView ? 'fixed h-screen' : 'relative h-full'}`}>
              <div
                className={` ${animationMode ? (fullView ? 'bg-none h-full' : 'w-2/3  lg:w-1/2 p-px') : fullView ? ' h-screen ' : 'w-2/3 lg:w-1/2  p-px'}   ${
                  animationMode && fullView ? 'bg-none' : ' bg-gradient-to-b from-btn1  to-btn2'
                }  rounded bg-no-repeat `}>
                <div className='bg-cover '>{getVideo()}</div>
              </div>
              {/*

              w-10/12  md:w-2/3

            <div className='absolute top-5 xs:left-10 pl-4 lg:pl-0 lg:right-5 '>
              {[0, 1, 2].map((value) => (
                <div className='cursor-pointer rounded-full p-2 bg-dark-800 mb-4 flex justify-center items-center'>
                  {value === 0 ? (
                    <HeartIcon fill='white' style={{ fontSize: 8 }} />
                  ) : value === 1 ? (
                    <RiShareFill fill='white' size={20} />
                  ) : (
                    <CopyIcon fill='white' style={{ fontSize: 8 }} />
                  )}
                </div>
              ))}
            </div>
            */}
              <div
                className='cursor-pointer absolute rounded-full z-50 bg-dark-900 shadow-2xl h-12 w-12 top-8 right-8 lg:right-20 flex items-center justify-center'
                onClick={() => setFullView(!fullView)}>
                {fullView ? <FaCompressAlt fill='white' /> : <FaExpand fill='white' />}
              </div>
            </div>
          </div>

          <div className={`w:1/2 my-8 mb-16 md:m-0 md:flex-1 flex items-center justify-center lg:min-h-full   overflow-y-scroll ${fullView && 'hidden'}`}>
            <div className='flex '>
              <div className=' flex flex-col items-start px-4 w-full  '>
                <h2 className='text-2xl font-semibold'>Egg #{item.tokenID}</h2>
                {/*
              <div className='flex my-4'>
                <div className='rounded-full p-px h-full bg-gradient-to-b from-btn1  to-btn2 mr-4'>
                  <div className='text-xs font-semibold bg-dark-800 px-6 py-2 rounded-full'>🔥 {'  '}Highest Bid</div>
                </div>
                <div className='rounded-full p-px h-full bg-gradient-to-b from-btn1  to-btn2 mr-4'>
                  <div className='text-xs font-semibold bg-dark-800 px-6 py-2 rounded-full'>{item.basic ? 'BASIC' : 'HYBRID'}</div>
                </div>
              </div>
              */}
                <p className='text-sm text-justify text-gray-500 my-4 font-semibold' style={{ color: '#f2f2f2' }}>
                  Contains 1 of 16 Generation One Base Animals. To hatch or to hold…
                </p>

                <div className='w-full mb-4'>
                  <div className='rounded border-2 border-gray-400 border-solid p-4' style={{ borderWidth: 1 }}>
                    <h2 className='text-sm font-bold mb-2'>Price</h2>
                    <div className=''>
                      <span className='mr-2 text-xl  font-semibold'>{askItem?.amount} ZOO</span>
                      <span className='font-light'>${askItem?.usdAmount} USD</span>
                    </div>
                  </div>
                </div>
                {/* <div className='w-full  grid  mb-8' style={{ gridTemplateColumns: '1fr 54px', gap: '10px' }}>
                  <a
                    style={{ pointerEvents: 'unset', padding: '11px 0px', borderRadius: 4 }}
                    className='rounded bg-white text-black flex items-center justify-center font-bold text-sm transform active:scale-95'
                    onClick={() => setAskModal(true)}>
                    {account?.toLowerCase() == ownerAccount?.toString() && hasRequestedAsk === true ? 'Pending Request...' : account?.toLowerCase() == ownerAccount?.toString() ? 'Set Ask' : 'Place Bid'}
                  </a>
                  <button style={{ paddingLeft: 0, paddingRight: 0, padding: '11px 20px', backgroundColor: '#f2f2f2', borderRadius: 4 }} className=''>
                    <RiShareFill fill='black' />
                  </button>
                </div> */}

                <div className='w-full mb-4'>
                  <div className=' rounded border-2 border-gray-400 border-solid p-4' style={{ borderWidth: 1 }}>
                    <h2 className='text-sm font-bold mb-4'>Details</h2>
                    {/* <div className='flex justify-between items-center'>
                      <span className='text-md  font-semibold'>Transaction Hash</span>
                      <span className='font-semibold text-sm primary cursor-pointer' onClick={() => window.open(`https://testnet.bscscan.com/tx/${txHash}`, '_blank')}>
                        {txHashEllipsis}
                      </span>
                    </div> */}
                    <div className='flex justify-between items-center'>
                      <span className=' text-md  font-semibold'>Token ID</span>
                      <div className='text-sm font-medium'>{item.tokenID}</div>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-md  font-semibold'>Token Standard</span>
                      <span className='font-semibold text-sm '>ERC-721</span>
                    </div>
                  </div>
                </div>
                <div className='w-full rounded flex flex-col  border-2 border-gray-400 border-solid mb-6 pt-4' style={{ borderWidth: 1 }}>
                  <div className='px-4'>
                    <h2 className='text-sm font-bold'>Proof of Authenticity</h2>
                  </div>
                  <div className='flex flex-col'>
                    {transactionHash && (
                      <a
                        href={`${getBrowserUrl(chainId)}/tx/${transactionHash}`}
                        target='_blank'
                        className='p-4 justify-between items-center flex hover:bg-dark-800'
                        style={{ borderBottomWidth: 1 }}>
                        <div className='text-sm font-medium primary'>
                          Transaction {transactionHash.substring(0, 6)}...${transactionHash.substring(transactionHash.length - 4)}
                        </div>
                        <div>
                          <ImArrowUpRight2 fill='#f2f2f2' size={12} />
                        </div>
                      </a>
                    )}
                    <a
                      href='https://bafybeidq6egcuxafoo2i2pvyp7cgajf6iewzfiq24owfhrgrezyokygvwq.ipfs.dweb.link/'
                      target='_blank'
                      className='p-4 flex justify-between items-center hover:bg-dark-800 rounded-b-lg'>
                      <div className='text-sm font-medium primary'>View on IPFS</div>
                      <div>
                        <ImArrowUpRight2 fill='#f2f2f2' size={12} />
                      </div>
                    </a>
                  </div>
                </div>

                {/* <div className='w-full rounded flex flex-col  border-2 border-gray-400 border-solid mb-6 px-4 pt-4 ' style={{ borderWidth: 1 }}>
                  <div className='mb-6 mt-2'>
                    <h2 className='text-sm font-bold'>History</h2>
                  </div>
                  <div className='flex flex-col'>
                    {transactions.map((transaction, index) => {
                      const { from, amount, description, date, hash, createdAt } = transaction
                      return (
                        <div className='flex mb-4 items-center '>
                          <a className='' href='/'>
                            <div className='m-1 relative rounded-full h-10 w-10 bg-gray-500 bg-gradient-to-b from-btn1 to-btn2'></div>
                          </a>
                          <div className='ml-2'>
                            <div className='text-sm'>
                              <a className='font-semibold primary '>
                                {hash.substring(0, 6)}...${hash.substring(hash.length - 4)}
                              </a>{' '}
                              {description}
                              <a className='font-bold'> {amount}</a>
                            </div>
                            <span className='text-sm font-semibold text-gray-400'>{createdAt}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Modal
        isOpen={askModal}
        onDismiss={() => {
          setAskModal(false)
          setAmount(0)
        }}>
        <div className='w-full mb-8 flex justify-between items-center'>
          <div className=''>Set Ask Amount</div>
          <div className='p-1 bg-white rounded-full cursor-pointer' onClick={() => setAskModal(false)}>
            <CloseIcon color='white' />
          </div>
        </div>
        <div>
          <div className='flex justify-center  items-center'>
            <div className='relative mb-3 w-full'>
              <input
                type='number'
                min='0'
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                value={amount}
                className=' w-full border border-solid rounded-md py-2 px-3 focus:outline-none font-semibold leading-snug text-md bg-dark-800 '
              />
              <h6 className='absolute top-1/2 right-4 leading-normal font-semibold transform -translate-y-2/4 '>ZOO</h6>
            </div>
          </div>
          <div className='flex'>
            <button
              disabled={disabled}
              onClick={() => {
                setAsk(amount)
                // console.log("amount:" ,amount);
                setHasRequestedAsk(true)
                setAskModal(false)
              }}
              className='text-white mt-4 w-full inline-flex justify-center items-center h-10 px-6 bg-primary-light hover:bg-primary rounded-lg font-bold text-lg leading-none'
              style={{ transition: 'all .2s' }}>
              {disabled ? <CircularProgress color='secondary' size={20} thickness={4} /> : account?.toLowerCase() == ownerAccount?.toString() ? 'Ask' : 'Bid'}
            </button>
          </div>
        </div>
      </Modal>
     */}
    </Modal>
  )
}

export default AssetModal

// const transactions = [
//   { date: 'September 25, 12:21 AM', description: 'listed this NFT with a reserve price of', amount: '35K ZOO', account: '0x36de990133D36d7E3DF9a820aA3eDE5a2320De71' },
//   { date: 'September 25, 12:17 AM', description: 'minted this NFT', amount: '', account: '0x36de990133D36d7E3DF9a820aA3eDE5a2320De71' },
// ]

// box-sizing: border-box;
// margin: -80px 0px 0px;
// min-width: 0px;
// background-color: var(--theme-ui-colors-black-5);
// position: relative;
// display: flex;
// -moz-box-align: center;
// align-items: center;
// -moz-box-pack: center;
// justify-content: center;
// height: calc(80px + 75vh);
// width: 100%;
// padding: 105px 100px 75px;
// }

// box-sizing: border-box;
// margin: 0px;
// min-width: 0px;
// background-color: var(--theme-ui-colors-black-5);
// position: fixed;
// padding: 50px 100px;
// inset: 0px;
// z-index: 21;
// width: 100vw;
// height: 100vh;
// display: flex;
// flex-direction: column;
// -moz-box-align: center;
// align-items: center;
// -moz-box-pack: center;
// justify-content: center;
// }
