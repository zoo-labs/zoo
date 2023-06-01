[View code on GitHub](zoo-labs/zoo/blob/master/app/utils/browser.ts)

The `isSafariBrowser` function is a utility function that checks if the current browser is Safari. It does this by first checking if the `window` object is defined, which indicates that the code is running in a browser environment. It then checks if the user agent string contains the word "Safari" and does not contain the word "Chrome". If both conditions are true, the function returns `true`, indicating that the current browser is Safari.

This function can be used in various parts of the larger project to conditionally execute code based on the user's browser. For example, if there is a feature that only works in Safari, the code can use this function to check if the user is using Safari and then enable the feature accordingly. Here is an example of how this function can be used:

```
if (isSafariBrowser()) {
  // enable Safari-only feature
} else {
  // disable Safari-only feature
}
```

Overall, this function provides a simple and reliable way to detect if the user is using Safari, which can be useful in many different scenarios.
## Questions: 
 1. What does this function do?
   This function checks if the user's browser is Safari by checking the userAgent string for the word "Safari" and making sure "Chrome" is not present.

2. Why is it important to check for Safari specifically?
   Safari has some unique quirks and differences in behavior compared to other browsers, so it may be necessary to handle it differently in certain situations.

3. How can this function be used in the zoo project?
   This function could be used to conditionally render certain components or features that may not work properly in Safari, or to apply specific styles or behavior for Safari users.