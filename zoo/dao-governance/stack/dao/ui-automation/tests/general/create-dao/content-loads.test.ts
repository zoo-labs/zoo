import { BaseSeleniumTest } from '../../base-selenium-test';
import { By } from 'selenium-webdriver';
import { getBaseUrl, appendFlagsToUrl } from '../../test-helpers';
import { pages } from '../../../config/pages';

const test = new BaseSeleniumTest('create-dao', 'content-loads');
BaseSeleniumTest.run(async (test) => {
  await test.start();
  await test.driver!.get(appendFlagsToUrl(getBaseUrl() + pages['create-dao']));
  // Wait for the essentials DAO name input to appear
  await test.waitForElement(By.css('[data-testid="essentials-daoName"]'));
  console.log('Create DAO essentials page loaded and DAO name input found.');
}, test);
