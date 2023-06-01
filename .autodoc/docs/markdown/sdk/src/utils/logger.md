[View code on GitHub](zoo-labs/zoo/blob/master/sdk/src/utils/logger.ts)

The code above defines an enum called `LogLevel` that represents different levels of logging. The levels are `Verbose`, `Info`, `Warn`, `Error`, and `None`, with `Verbose` being the highest level of logging and `None` being the lowest. 

The code also exports a function called `log` that takes in three parameters: an array of `params`, a `level` of type `LogLevel`, and a `currentLevel` of type `LogLevel`. The `log` function checks if the `currentLevel` is greater than or equal to the `level` passed in as a parameter. If it is, the function logs the `params` array to the console at the appropriate level. 

For example, if the `level` passed in is `LogLevel.Info`, the `log` function will log the `params` array to the console using `console.info()`. If the `level` passed in is `LogLevel.Error`, the `log` function will log the `params` array to the console using `console.error()`. If the `level` passed in is `LogLevel.Warn`, the `log` function will log the `params` array to the console using `console.warn()`. If the `level` passed in is any other level, the `log` function will log the `params` array to the console using `console.log()`.

This code can be used to log information at different levels of severity throughout the project. For example, if the project has a debugging mode, the `LogLevel.Verbose` level can be used to log detailed information that would not be logged in production. On the other hand, if the project is in production, the `LogLevel.Error` level can be used to log critical errors that need to be addressed immediately. 

Here is an example of how the `log` function can be used in the project:

```
import { log, LogLevel } from 'zoo';

const currentLogLevel = LogLevel.Verbose;

log(['This is a verbose log message'], LogLevel.Verbose, currentLogLevel);
log(['This is an info log message'], LogLevel.Info, currentLogLevel);
log(['This is a warning log message'], LogLevel.Warn, currentLogLevel);
log(['This is an error log message'], LogLevel.Error, currentLogLevel);
```

In the example above, the `log` function is called four times with different levels of logging. The `currentLogLevel` variable is set to `LogLevel.Verbose`, so all four log messages will be logged to the console. If `currentLogLevel` was set to `LogLevel.Warn`, only the warning and error messages would be logged to the console.
## Questions: 
 1. What is the purpose of the `LogLevel` enum?
- The `LogLevel` enum is used to define different levels of logging, from most verbose to least verbose.

2. What is the purpose of the `log` function?
- The `log` function is used to log messages to the console, based on the specified log level and the current log level.

3. What is the purpose of the `params` parameter in the `log` function?
- The `params` parameter is an array of values to be logged, which can include any number of arguments. The function will concatenate these values and log them to the console.