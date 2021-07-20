import { AbstractConnector } from '@web3-react/abstract-connector'
import { useWeb3React } from '@web3-react/core'
import { ConnectorNames, connectorsByName } from '../../connectors'
import { useAppState } from '../../state'

const iconsMap = {
  [ConnectorNames.Metamask]: 'https://docs.metamask.io/metamask-fox.svg',
  [ConnectorNames.WalletConnect]: 'https://walletconnect.org/walletconnect-logo.svg',
}

const Login = () => {
  const { activatingConnector, setActivatingConnector } = useAppState()
  const { connector, activate } = useWeb3React()
  return (
   <div>
     Flex this shit
   </div>
  )
}

export { Login }
