[View code on GitHub](zoo-labs/zoo/blob/master/core/src/functions/analytics.ts)

This code is a set of functions that utilize the ReactGA library to log user activity on a website. The ReactGA library is a third-party analytics tool that allows developers to track user behavior and gain insights into how users interact with their website. 

The `logPageView` function logs a page view by setting the page property to the current window location and then calling the `pageview` method. This function can be used to track which pages on the website are being viewed and how often they are being viewed. 

The `logEvent` function logs a custom event with a specified category and action. This function can be used to track specific user interactions on the website, such as button clicks or form submissions. 

The `logException` function logs an exception with a specified description and fatal flag. This function can be used to track errors or unexpected behavior on the website. 

Overall, these functions provide a way for developers to gain insights into how users are interacting with their website and identify areas for improvement. By using the ReactGA library, developers can easily integrate analytics tracking into their website without having to build their own tracking system from scratch. 

Example usage:

```
import { logPageView, logEvent, logException } from 'zoo'

// Log a page view
logPageView()

// Log a custom event
logEvent('Button Click', 'Submit Form')

// Log an exception
logException('Error: Invalid input', true)
```
## Questions: 
 1. What is ReactGA and how is it being used in this code?
   ReactGA is a library for tracking user interactions with a website using Google Analytics. It is being used to log page views, events, and exceptions.

2. What is the purpose of the logPageView function?
   The logPageView function is used to log a page view with Google Analytics, setting the page path to the current window location.

3. What is the purpose of the logException function?
   The logException function is used to log an exception with Google Analytics, with an optional description and flag for whether it is fatal. This can be used to track errors and issues on the website.