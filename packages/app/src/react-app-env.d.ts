/// <reference types="react-scripts" />
/// <reference types="@emotion/react/types/css-prop" />

interface WindowChain {
  ethereum?: {
    isMetaMask?: true
    request?: (...args: any[]) => void
  }
}
