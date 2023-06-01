[View code on GitHub](zoo-labs/zoo/blob/master/lab/src/hooks/EventListener.js)

## Code Explanation: useEventListener

The `useEventListener` function is a custom React hook that enables the user to keep track of events. It is designed to be used in conjunction with the `readContracts` function and the `ContractLoader.js` file. 

### Features

The `useEventListener` function has several features that make it useful for tracking events:

- Provide `readContracts` by loading contracts (see more on `ContractLoader.js`)
- Specify the name of the contract, in this case it is "YourContract"
- Specify the name of the event in the contract, in this case we keep track of "SetPurpose" event
- Specify the provider

### Usage

To use the `useEventListener` function, you need to pass in the following parameters:

- `contracts`: an object containing the contracts you want to track events for
- `contractName`: the name of the contract you want to track events for
- `eventName`: the name of the event you want to track
- `provider`: the provider you want to use to track events
- `startBlock`: the block number from which you want to start tracking events
- `args`: optional arguments to pass to the event listener

Here is an example of how to use the `useEventListener` function:

```javascript
const setPurposeEvents = useEventListener(readContracts, "YourContract", "SetPurpose", localProvider, 1);
```

This will track the "SetPurpose" event for the "YourContract" contract using the `localProvider` provider, starting from block number 1.

### Implementation

The `useEventListener` function uses the `useState` and `useEffect` hooks to keep track of updates to the event listener. 

When the component mounts, the function checks if the `provider` and `startBlock` parameters are defined. If they are, it resets the events block to the specified start block. 

Next, the function checks if the `contracts` object and the `contractName` parameter are defined. If they are, it adds an event listener to the specified contract and event name. When the event is triggered, the function extracts the block number and event arguments and adds them to the `updates` state using the `setUpdates` function.

Finally, the function returns the `updates` state, which contains an array of all the updates to the event listener.

Overall, the `useEventListener` function is a useful tool for tracking events in a React application. It is flexible and can be used with a variety of providers and contracts.
## Questions: 
 1. What is the purpose of this code?
    
    This code enables the user to keep track of events and provides a hook called `useEventListener` to do so.

2. How do I use this code in my project?
    
    To use this code, you can import the `useEventListener` hook and pass in the required parameters such as `readContracts`, `contractName`, `eventName`, `provider`, and `startBlock`.

3. What are the features of this code?
    
    This code provides the ability to load contracts, specify the name of the contract and event, and specify the provider. It also allows the user to reset the events block and remove listeners.