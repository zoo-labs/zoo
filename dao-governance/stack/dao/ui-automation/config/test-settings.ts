// Number of parallel tests to run. Tune up for faster execution. Tune down for more stability.
export const maxConcurrency = 5;

// Default timeout for waiting for elements (in milliseconds). Can be adjusted to address general test flakiness.
// Waits that require extra time on top of this should use the `extra` option in wait methods. Shorter wait times can be specified with absolute value parameter.
export const defaultElementWaitTime = 10000;
