import { getBaseUrl, appendFlagsToUrl } from '../../test-helpers';
import { getTestDao } from '../../../config/test-daos';
import { BaseSeleniumTest } from '../../base-selenium-test';
import { By } from 'selenium-webdriver';
import { pages } from '../../../config/pages';

// Parse governance type from CLI args
const governanceArg = process.argv.find(arg => arg.startsWith('--governance='));
const governanceType = governanceArg ? governanceArg.split('=')[1].toLowerCase() : 'token-voting';

const test = new BaseSeleniumTest('settings', 'permissions-tab');
BaseSeleniumTest.run(async (test) => {
  // Load the DAO homepage
  await test.start();
  
  const daoHomePath = `${pages['dao-homepage']}?dao=${getTestDao(governanceType).value}&demo_mode=on`;
  await test.driver!.get(appendFlagsToUrl(getBaseUrl() + daoHomePath));
  
  // Click the 'Manage DAO' button
  const manageBtn = await test.waitForElement(By.css('[aria-label="Manage DAO"]'));
  await manageBtn.click();
  
  // Click on the 'Permissions' tab
  const permissionsTab = await test.waitForElement(By.xpath("//p[text()='Permissions']"));
  await permissionsTab.click();
  
  // Wait for a button with aria-label="edit"
  await test.waitForElement(By.css('button[aria-label="edit"]'));
  console.log('Permissions tab opened and edit button found.');
}, test);
