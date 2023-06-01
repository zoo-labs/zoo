[View code on GitHub](zoo-labs/zoo/blob/master/app/utils/till.ts)

This code is a utility module for working with dates and times in the larger zoo project. It imports the dayjs library, which is a lightweight alternative to Moment.js for parsing, validating, manipulating, and formatting dates and times in JavaScript. The module extends dayjs with the relativeTime plugin, which allows for the calculation of human-readable relative time strings like "2 hours ago" or "in 5 minutes".

The module exports two constants and one function. The first constant, DATE_REGEX, is a regular expression that matches a date and time string in the format "YYYY-MM-DD HH:MM:SS". This can be used to extract date and time information from raw strings in other parts of the project.

The second constant is not exported, but is used internally by the timeTill function. It is a string template that formats the output of the fromNow method of dayjs to only include the relative time value (e.g. "2 hours").

The timeTill function takes a single argument, a string representing a date and time in the format "YYYY-MM-DD HH:MM:SS". It uses dayjs to parse the string into a date object, and then calculates the relative time between that date and the current time using the fromNow method. The function returns a human-readable string indicating the time remaining until the target time, in the format "X hours" or "Y minutes", etc.

Here is an example of how this module might be used in the larger zoo project:

```javascript
import { timeTill, DATE_REGEX } from 'zoo/date-utils'

const rawString = 'The event starts at 2022-01-01 12:00:00'
const match = rawString.match(DATE_REGEX)
const targetTime = match ? match[0] : undefined

if (targetTime) {
  const timeRemaining = timeTill(targetTime)
  console.log(`The event starts in ${timeRemaining}.`)
} else {
  console.log('Could not find a valid date and time in the string.')
}
```

In this example, we use the DATE_REGEX constant to extract a date and time string from a raw string. We then pass that string to the timeTill function to calculate the relative time until the target time. Finally, we log a message to the console indicating how much time is left until the event starts.
## Questions: 
 1. What is the purpose of the `dayjs` library and how is it being used in this code?
   - The `dayjs` library is being used to manipulate and format dates and times. It is being imported and extended with the `relativeTime` plugin, which allows for the calculation of relative time differences. 
2. What is the expected format of the `timeString` parameter in the `timeTill` function?
   - The `timeString` parameter is expected to be in the format "YYYY-MM-DD HH:MM:SS". 
3. What is the output format of the `timeTill` function?
   - The `timeTill` function returns a human-readable string indicating the time remaining until the target time, using the `fromNow` method of the `dayjs` library. The output format is a string with a number and a unit of time (e.g. "2 hours", "5 minutes", etc.).