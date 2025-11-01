<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This project is for automated regression testing of a webapp using Selenium WebDriver in JavaScript. Test files are located in the `tests/` directory. Use best practices for writing maintainable and robust Selenium tests.

Refer to existing tests for examples of how to structure tests, use page objects, and handle asynchronous operations. Follow the project's coding style and conventions. Note the difference between a test written for multisig vs token-voting when creating new tests.

Extract common functionality into helper functions or classes to avoid duplication.

When refactoring tests, avoid changes to test steps or locators unless explicitly requested. This is extremely important as test steps and locators are very specific to each test and updating them is not trivial.