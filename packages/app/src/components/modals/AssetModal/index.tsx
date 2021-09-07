import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { connectorLocalStorageKey } from '../config'
import useWeb3 from 'hooks/useWeb3'
import { getFaucet, getToken } from 'util/contracts'
import AltModal from 'components/Modal/AltModal'
import { numberWithCommas } from 'components/Functions'
import HeaderModal from 'components/Modal/HeaderModal'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen, useAssetModalToggle } from 'state/application/hooks'
import Modal from '../../NewModal'
import useAuth from 'hooks/useAuth'
import { useHistory } from 'react-router'
import CopyHelper from 'components/Copy/Copy'
import { useSelector } from 'react-redux'
import { AppState } from 'state'

interface AssetModalProps {}

const AssetModal: React.FC<AssetModalProps> = ({}) => {
  const assetModal = useModalOpen(ApplicationModal.ASSET)
  const toggleAssetModal = useAssetModalToggle()
  const { logout } = useAuth()
  const { chainId, account } = useWeb3React()
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

  return (
    <Modal isOpen={assetModal} onDismiss={() => null} maxWidth={440}>
      <div className='space-y-3'>
        <div className='space-y-3'>
          <HeaderModal onDismiss={() => toggleAssetModal()} title='Asset' />
        </div>
      </div>
    </Modal>
  )
}

export default AssetModal
