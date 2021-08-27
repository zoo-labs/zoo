declare global {
  interface Window {
    ethereum: any
  }
}

declare module '*.mov' {
  const src: string
  export default src
}

declare const ethereum: any
