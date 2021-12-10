import React, { FC, Fragment } from 'react'
import { Trans, useLingui } from '@lingui/react'

import { ChainId } from '@zoolabs/sdk'
import HeadlessUIModal from '../../NewModal/HeadlessUIModal'
import { t } from '@lingui/macro'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import Modal from 'components/NewModal'

interface NetworkGuardProps {
  networks?: ChainId[]
}

const NetworkGuard: FC<NetworkGuardProps> = ({ children, networks = [] }) => {
  const [active, setActive] = useState('home')

  const { i18n } = useLingui()
  let location = useLocation()
  useEffect(() => {
    setActive(location.pathname.split('/')[1])
  }, [location])
  const link = (
    <NavLink to='/home'>
      <a className='text-blue focus:outline-none'>{i18n._(t`home page`)}</a>
    </NavLink>
  )
  const history = useHistory()
  return (
    <>
      <HeadlessUIModal isOpen={active === 'bridge'} onDismiss={() => null}>
        <div className='flex flex-col gap-7 justify-center'>
          <h1 className='max-w-2xl text-white text-center font-semibold text-4xl'>{i18n._(t`Roll it back - this feature is not yet supported`)}</h1>
          <h6 className='text-center cursor-pointer' onClick={() => history.goBack()}>
            <Trans id='Return to the Homepage' values={{ link }} components={Fragment} />
          </h6>
        </div>
      </HeadlessUIModal>
      {children}
    </>
  )
}
// const NetworkGuard = (networks: ChainId[]) => {
//   return ({ children }) => <Component networks={networks}>{children}</Component>
// }

export default NetworkGuard
