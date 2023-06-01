[View code on GitHub](zoo-labs/zoo/blob/master/ui/src/modal/editListing/EditListingModal.tsx)

The `EditListingModal` component is a React modal that allows users to edit an existing listing. It imports several hooks and components from other files in the project, including `useFallbackState`, `useTimeSince`, `Flex`, `Text`, `Box`, `Button`, `Loader`, `Select`, `EditListingModalRenderer`, `Modal`, `TokenPrimitive`, `Progress`, `FontAwesomeIcon`, `faCheckCircle`, `faCircleExclamation`, `PriceInput`, `InfoTooltip`, and `constants`. 

The component takes in several props, including `openState`, `listingId`, `tokenId`, `collectionId`, `trigger`, `normalizeRoyalties`, `enableOnChainRoyalties`, `onClose`, `onEditListingComplete`, and `onEditListingError`. 

The `EditListingModal` component renders the `EditListingModalRenderer` component, which is responsible for rendering the actual modal content. The `EditListingModalRenderer` component takes in several props, including `listingId`, `tokenId`, `collectionId`, `open`, `normalizeRoyalties`, and `enableOnChainRoyalties`. 

The `EditListingModalRenderer` component renders different content depending on the value of `editListingStep`. If `editListingStep` is `Edit`, the component renders a form that allows users to edit the listing's price, quantity, and expiration date. If `editListingStep` is `Approving`, the component renders a progress bar that shows the status of the transaction. If `editListingStep` is `Complete`, the component renders a success message. 

The `EditListingModal` component also includes several helper functions that are used to calculate the profit, updated total USD, and expiration time of the listing. These functions are called within the `EditListingModalRenderer` component. 

Overall, the `EditListingModal` component is an important part of the larger project as it allows users to edit their listings, which is a key feature of the platform.
## Questions: 
 1. What is the purpose of the `EditListingModal` component?
- The `EditListingModal` component is used to edit a listing and update it on the blockchain.

2. What are the required props for the `EditListingModal` component?
- The required props for the `EditListingModal` component are `trigger`, which is the element that triggers the modal to open, and either `listingId`, `tokenId`, or `collectionId` to identify the listing to be edited.

3. What is the significance of the `MINIMUM_AMOUNT` constant?
- The `MINIMUM_AMOUNT` constant is used to validate that the price entered for the listing is higher than the minimum amount allowed, which is set to 0.000001.