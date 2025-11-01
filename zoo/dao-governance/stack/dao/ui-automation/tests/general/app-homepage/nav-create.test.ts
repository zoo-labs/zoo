import { BaseSeleniumTest } from '../../base-selenium-test';
import { By } from 'selenium-webdriver';
import { getBaseUrl, appendFlagsToUrl } from '../../test-helpers';
import { pages } from '../../../config/pages';

const test = new BaseSeleniumTest('app-homepage', 'nav-create');
BaseSeleniumTest.run(async (test) => {
  await test.start();
  await test.driver!.get(appendFlagsToUrl(getBaseUrl() + pages['app-homepage']));
  
  // Find and click the "Create DAO" navigation link
  const createDaoLink = await test.waitForElement(By.xpath("//*[contains(text(), 'Create DAO')]"));
  await createDaoLink.click();
  
  // Assert that the DAO name input is present on the create page
  const daoNameInput = await test.waitForElement(By.css('[data-testid="essentials-daoName"]'));
  const isDisplayed = await daoNameInput.isDisplayed();
  
  if (!isDisplayed) {
    throw new Error('DAO name input is not visible on the Create DAO page!');
  }
  
  console.log('Create DAO navigation link successfully navigated to create page.');
  
}, test);
