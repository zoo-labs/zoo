import { getTestDao } from '../../../config/test-daos';
import { BaseSeleniumTest } from '../../base-selenium-test';
import { By } from 'selenium-webdriver';
import { pages } from '../../../config/pages';
import { getBaseUrl, appendFlagsToUrl } from '../../test-helpers';

// Parse governance type from CLI args
const governanceArg = process.argv.find(arg => arg.startsWith('--governance='));
const governanceType = governanceArg ? governanceArg.split('=')[1].toLowerCase() : 'erc20';

const test = new BaseSeleniumTest('organization', 'create-sub-dao');
BaseSeleniumTest.run(async (test) => {
  await test.start();
  // Load the organization page
  const orgPath = `${pages['organization']}?dao=${getTestDao(governanceType).value}&demo_mode=on`;
  await test.driver!.get(appendFlagsToUrl(getBaseUrl() + orgPath));
  // Wait for the Create SubDAO button and click it
  const createBtn = await test.waitForElement(By.xpath("//button[contains(., 'Create SubDAO')]"));
  await createBtn.click();
  // Wait for the input with data-testid="essentials-daoName"
  await test.waitForElement(By.css('input[data-testid="essentials-daoName"]'));
  console.log('Create SubDAO flow loaded and DAO name input found.');
}, test);
