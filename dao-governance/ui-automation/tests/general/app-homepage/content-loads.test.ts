import { getBaseUrl, appendFlagsToUrl } from '../../test-helpers';
import { BaseSeleniumTest } from '../../base-selenium-test';
import { By } from 'selenium-webdriver';

const test = new BaseSeleniumTest('app-homepage', 'content-loads');
BaseSeleniumTest.run(async (test) => {
  // Load the app homepage
  await test.start();
  await test.driver!.get(appendFlagsToUrl(getBaseUrl()));
  // Confirm the search input is present
  await test.waitForElement(By.css('[data-testid="search-input"]'));
  console.log('App homepage loaded and search input found.');
}, test);
