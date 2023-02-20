import * as React from 'react'
import { styled } from '@mui/material/styles'
import FormGroup from '@mui/material/FormGroup'
import Switch, { SwitchProps } from '@mui/material/Switch'
import Stack from '@mui/material/Stack'

const UiSwitch = styled(Switch)(({ theme }) => ({
  width: 80,
  height: 40,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    marginTop: 4,
    padding: 0,
    transform: 'translateX(4px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(44px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('/static/images/bnb.svg')`,
        height: 20,
        top: '20%',
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#F0B90B',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#fff',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('/ZooLogo.svg')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#040404' : '#040404',
    borderRadius: 20,
  },
}))

interface CurrencySwitchProps {
  checked: boolean
  checkFunc: () => void
}

const CurrencySwitch: React.FC<CurrencySwitchProps> = ({ checkFunc, checked }) => {
  return (
    <FormGroup>
      <Stack direction='row' spacing={1} alignItems='center'>
        <h6 className='text-md font-semibold'>ZOO</h6>
        <UiSwitch sx={{ m: 1 }} checked={checked} onChange={() => checkFunc()} />
        <h6 className='text-md font-semibold'>BNB</h6>
      </Stack>
    </FormGroup>
  )
}

export default CurrencySwitch
