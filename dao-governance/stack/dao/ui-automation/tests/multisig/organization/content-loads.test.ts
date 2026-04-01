
import { getTestDao } from '../../../config/test-daos';
import { BaseSeleniumTest } from '../../base-selenium-test';
import { By } from 'selenium-webdriver';
import { pages } from '../../../config/pages';
import { getBaseUrl, appendFlagsToUrl } from '../../test-helpers';



const test = new BaseSeleniumTest('organization', 'content-loads');
BaseSeleniumTest.run(async (test) => {
  await test.start();
  // Load the organization page
  const orgPath = `${pages['organization']}?dao=${getTestDao('multisig').value}`;
  await test.driver!.get(appendFlagsToUrl(getBaseUrl() + orgPath));
  // Confirm the toggle favorite Safes button is present
  await test.waitForElement(By.css('[aria-label="Toggle your favorite Safes."]'));
  console.log('Organization page loaded and favorite Safes toggle button found.');
}, test);
