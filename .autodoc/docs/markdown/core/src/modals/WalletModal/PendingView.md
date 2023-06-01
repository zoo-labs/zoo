[View code on GitHub](zoo-labs/zoo/blob/master/core/src/modals/WalletModal/PendingView.tsx)

The code above is a React component called `PendingView` that renders a view for when a user is waiting for a wallet connection to be established. The component takes in several props, including `connector`, `error`, `setPendingError`, and `tryActivation`. 

The `connector` prop is an instance of an `AbstractConnector` class from the `@web3-react/abstract-connector` library. The `error` prop is a boolean that indicates whether there was an error connecting to the wallet. The `setPendingError` prop is a function that sets the `error` prop to `true` or `false`. The `tryActivation` prop is a function that attempts to activate the `connector`.

The component first checks if the user is using the MetaMask wallet by checking if `window.ethereum.isMetaMask` is truthy. It then renders a loading indicator using the `Dots` component from `../../components/Dots` if there is no error, or an error message with a "Try Again" button if there is an error. Clicking the "Try Again" button calls the `tryActivation` function with the `connector` prop.

The component then maps over an object called `SUPPORTED_WALLETS` from `../../config/wallets` and renders an `Option` component for each supported wallet. The `Option` component displays information about the wallet, including its name, description, and icon. If the `connector` prop matches the `connector` property of the current wallet option, the `Option` component is rendered. If not, `null` is returned.

This component is likely used in a larger project that involves connecting to a user's wallet to interact with a blockchain. It provides a user-friendly interface for waiting for the wallet connection to be established and displays information about the supported wallets. An example usage of this component might look like:

```
import PendingView from './PendingView'

function WalletConnection() {
  const [connector, setConnector] = useState(null)
  const [error, setError] = useState(false)

  const handleActivation = useCallback(async (connector) => {
    try {
      await activate(connector)
      setConnector(connector)
    } catch (error) {
      setError(true)
    }
  }, [])

  return (
    <div>
      <h1>Connect to your wallet</h1>
      <PendingView
        connector={connector}
        error={error}
        setPendingError={setError}
        tryActivation={handleActivation}
      />
    </div>
  )
}
```
## Questions: 
 1. What is the purpose of the `SUPPORTED_WALLETS` and `injected` variables imported from `../../config/wallets`?
- `SUPPORTED_WALLETS` is an object containing information about different wallet options that can be used to connect to the application. `injected` is a specific connector option that refers to the user's browser extension wallet.
2. What is the `PendingView` component used for?
- The `PendingView` component is used to display a loading screen while the application is initializing and attempting to connect to a wallet.
3. What is the purpose of the `tryActivation` function passed as a prop to `PendingView`?
- The `tryActivation` function is used to attempt to activate a specific wallet connector option. It takes in a connector object as an argument and attempts to activate it for use in the application.