[View code on GitHub](zoo-labs/zoo/blob/master/core/src/pages/global-leaderboard/index.tsx)

The `GlobalLeaderboard` component is a React component that renders a leaderboard for a project called ZOO. The component imports `React`, `useState`, `useRouter`, and `Image` from the `react`, `next/router`, and `next/image` modules respectively. 

The component uses the `useState` hook to create two state variables: `isActive` and `category`. `isActive` is initialized to `'nft-value'`, and `category` is initialized to `0`. 

The component then defines a `dummyData` array that contains ten objects, each with an `id`, `name`, and `address` property. 

The component returns a section element with a class of `flex`, `flex-col`, and `items-center`. Within this section, there is a div element with a class of `px-4`, `py-16`, `lg:w-4/12`, and `mx-auto`. This div contains an h1 element with a class of `text-xl`, `lg:text-2xl`, `font-bold`, `mb-4`, and `p-3`, which displays the text "ZOO NFT Leaderboard". 

Below the h1 element, there is a div element with a class of `rounded-xl`, `w-full`, `mb-4`, and `p-0.5`. This div has a background color that is a linear gradient from `#4B31AC` to `#2703F8`. Within this div, there is another div element with a class of `flex`, `items-center`, `justify-center`, `bg-black`, `rounded-xl`, `w-full`, and `h-full`. This div contains three anchor elements that display the text "NFT Value", "Top ZOO", and "Global Users". The anchor element that corresponds to the current value of `category` has a background color that is a linear gradient from `#4B31AC` to `#2703F8`. When an anchor element is clicked, the `setCategory` function is called with the index of the clicked element as an argument. 

Below the div with the class of `rounded-xl`, there is another div element with no class. This div contains a map function that iterates over the `dummyData` array and returns a div element for each object in the array. Each div element has a class of `mb-4`, `rounded-lg`, `p-px`, and `cursor-pointer`, and a background color that is a linear gradient from `#4B31AC` to `#2703F8`. When a div element is clicked, the `route.push` function is called with the path `/global-leaderboard/${id}` as an argument. 

In summary, the `GlobalLeaderboard` component renders a leaderboard for the ZOO project. The component allows the user to switch between three categories: "NFT Value", "Top ZOO", and "Global Users". When a category is selected, the corresponding anchor element is highlighted. The component also displays a list of users with their name and address. When a user is clicked, the user is redirected to a page that displays more information about the user.
## Questions: 
 1. What is the purpose of the `GlobalLeaderboard` component?
- The `GlobalLeaderboard` component is used to display a leaderboard of NFT users.

2. What is the purpose of the `dummyData` array?
- The `dummyData` array is used to provide sample data for the leaderboard.

3. What is the purpose of the `setCategory` function?
- The `setCategory` function is used to update the `category` state variable when a user clicks on one of the leaderboard categories (NFT Value, Top ZOO, Global Users).