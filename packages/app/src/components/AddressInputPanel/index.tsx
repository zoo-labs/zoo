import React, { FC, useCallback } from 'react'
import { escapeRegExp } from '../../functions'

import useENS from '../../hooks/useENS'
const inputRegex = RegExp(`^\\d*$`) // match escaped "." characters via in a non-capturing group

interface AddressInputPanelProps {
  id?: string
  value: string
  onChange: (value: string) => void
}

const AddressInputPanel: FC<AddressInputPanelProps> = ({ id, value, onChange }) => {
  const { address, loading } = useENS(value)

  const handleInput = useCallback(
    (event) => {
      const input = event.target.value
      const withoutSpaces = input.replace(/\s+/g, '')
      onChange(withoutSpaces)
    },
    [onChange],
  )

  const error = Boolean(value.length > 0 && !loading && !address)
  const enforcer = (nextUserInput: string) => {
    if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
      if (Number(nextUserInput) <= 100) {
        handleInput(nextUserInput)
      }
    }
  }

  return (
    <div className={`flex flex-row bg-dark-800 rounded items-center h-[68px] ${error ? 'border border-red border-opacity-50' : ''}`} id={id}>
      <div className='flex justify-between w-full px-5 sm:w-2/5'>
        <span className='text-[18px] text-primary'>{`Send to:`}</span>
        <span className='text-sm underline cursor-pointer text-blue' onClick={() => onChange(null)}>
          {`Remove`}
        </span>
      </div>
      <div className='flex w-full h-full border-2 rounded-r sm:w-3/5 border-dark-800'>
        <input
          value={value}
          onChange={(event) => {
            enforcer(event.target.value.replace(/\s+/g, ''))
          }}
          // universal input options
          inputMode='text'
          title='Wallet Address or ENS name'
          autoComplete='off'
          autoCorrect='off'
          autoCapitalize='off'
          spellCheck='false'
          placeholder='Wallet Address or ENS name'
          pattern='^(0x[a-fA-F0-9]{40})$'
          // text-specific options
          type='text'
          className={`
          font-medium bg-transparent whitespace-nowrap overflow-ellipsis flex-auto
          `}
        />
      </div>
    </div>
  )
}

export default AddressInputPanel
