import React from 'react'
import { FaHeart, FaMoneyBill, FaMoneyBillWave } from 'react-icons/fa'
import { GiCandlestickPhone } from 'react-icons/gi'
import { CloseIcon, HeartIcon } from 'components'
import { useHistory } from 'react-router'
import { accountEllipsis, getEmoji } from 'functions'

interface IndexProps {
  datum: any
  applyMaxWidth: boolean
  placeBid: () => void
}

const Index: React.FC<IndexProps> = ({ datum, applyMaxWidth, placeBid }) => {
  const history = useHistory()
  return (
    <div className='flex flex-col '>
      <div className='relative overflow-hidden rounded parent'>
        <img style={{ verticalAlign: 'middle' }} src={`${datum.imageUrl || '/static/video/egg.gif'}`} className='transition-transform w-full duration-1000 ' />
        <div className='absolute top-0 left-0 w-full h-full invisible opacity-0 rounded transition-all duration-300 hover:visible hover:opacity-100'>
          <div className='absolute top-6 left-3 bg-primary px-2 py-1 rounded text-xs font-bold uppercase '>{datum.bloodline || (datum.basic ? 'BASIC' : 'HYBRID')}</div>
          {/* <div className=' cursor-pointer absolute top-6 right-3 w-8 h-8 bg-dark-800 rounded-full flex items-center justify-center'>
            <FaHeart fill='white' style={{ fontSize: 10 }} />
          </div> */}
          <a
            onClick={() => placeBid()}
            className='cursor-pointer absolute left-1/2 bottom-6 min-w-max h-10 bg-primary px-4 rounded-full text-sm items-center justify-center inline-flex transition-all duration-300 transform -translate-x-2/4'>
            <span>Place a bid</span>
          </a>
        </div>
      </div>

      <a
        onClick={() =>
          history.push(`/feed/${datum.owner}/${datum.tokenID}`, {
            item: datum,
          })
        }
        className='py-4 flex flex-grow flex-col no-underline cursor-pointer'>
        <div className='flex flex-grow flex-col'>
          <div className='mb-4 flex '>
            <div className='mr-auto mt-1 font-semibold'>
              {datum.name || 'Egg'} <span className='text-xs text-gray-500'>({datum.tokenID || ''})</span>
            </div>
            <div
              className='flex-shrink-0 ml-2 px-2 uppercase primary font-bold rounded-sm text-xs flex items-center justify-center'
              style={{ boxShadow: 'inset 0 0 0 1px rgb(140, 79, 248)' }}>
              500K Z00
            </div>
          </div>
          <div className=' flex '>
            <div className='mr-auto mt-1 font-semibold flex text-xs text-gray-500'>
              <div className='h-4 w-4 rounded-full bg-gradient-to-b from-btn1 to-btn2 mr-1'></div>
              {accountEllipsis(datum.owner || '')}
            </div>
            <div className='flex-shrink-0 ml-2  uppercase font-bold rounded-sm text-xs flex items-center justify-center'>3 days Left</div>
          </div>
        </div>
        <div className=' border-t border-solid border-gray-700 flex items-center justify-between mt-4 pt-4 text-sm text-gray-800'>
          <div className='flex items-center text-xs text-gray-500 font-semibold'>
            <div className='mr-1'>
              <FaMoneyBillWave />
            </div>
            Highest bid <span className='ml-1'>1M ZOO</span>
          </div>
          <div className='text-xs text-gray-500 font-semibold'>{datum.yield ? `${datum.yield} Yields/Day ${getEmoji(datum.rarity)}` : ''} </div>
        </div>
      </a>
    </div>
  )
}

export default Index
