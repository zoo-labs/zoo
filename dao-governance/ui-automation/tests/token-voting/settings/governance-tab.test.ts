import { getBaseUrl, appendFlagsToUrl } from '../../test-helpers';
import { getTestDao } from '../../../config/test-daos';
import { BaseSeleniumTest } from '../../base-selenium-test';
import { By } from 'selenium-webdriver';
import { pages } from '../../../config/pages';

// Parse governance type from CLI args
const governanceArg = process.argv.find(arg => arg.startsWith('--governance='));
const governanceType = governanceArg ? governanceArg.split('=')[1].toLowerCase() : 'erc20';

const test = new BaseSeleniumTest('settings', 'governance-tab');
BaseSeleniumTest.run(async (test) => {
  // Load the DAO homepage
  await test.start();
  const daoHomePath = `${pages['dao-homepage']}?dao=${getTestDao(governanceType).value}`;
  await test.driver!.get(appendFlagsToUrl(getBaseUrl() + daoHomePath));
  // Click the 'Manage DAO' button
  const manageBtn = await test.waitForElement(By.css('[aria-label="Manage DAO"]'));
  await manageBtn.click();
  
 // Click on the 'Governance' tab using JavaScript to bypass click interception
 const governanceTab = await test.waitForElement(By.xpath("//p[text()='Governance']"));
 await test.driver!.executeScript("arguments[0].click();", governanceTab);
 // Wait for the chakra form label element to confirm tab loaded
 await test.waitForElement(By.css('[class*="chakra-form__label"]'), { extra: 5000 });
 console.log('Governance tab clicked and form label element found.');
}, test);
