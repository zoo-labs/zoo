import { getBaseUrl, appendFlagsToUrl } from '../../test-helpers';
import { getTestDao } from '../../../config/test-daos';
import { BaseSeleniumTest } from '../../base-selenium-test';
import { By } from 'selenium-webdriver';
import { pages } from '../../../config/pages';

const test = new BaseSeleniumTest('dapp-explorer', 'content-loads');
BaseSeleniumTest.run(async (test) => {
  // Load the DAO homepage with demo_mode enabled
  await test.start();
  const daoHomePath = `${pages['dao-homepage']}?dao=${getTestDao('multisig').value}&demo_mode=on`;
  await test.driver!.get(appendFlagsToUrl(getBaseUrl() + daoHomePath));
  // Open the dApp Explorer modal (needs extra time to load)
  const createProposalBtn = await test.waitForElement(By.xpath("//button[contains(., 'Create Proposal')]"), { extra: 5000 });
  await createProposalBtn.click();
  const useDappsOption = await test.waitForElement(By.css('[data-testid="optionMenu-Use dApps"]'));
  // Add a short delay to improve reliability
  await test.driver!.sleep(500);
  await useDappsOption.click();
  // Confirm the CoW Swap image is present
  await test.waitForElement(By.css('img[alt="CoW Swap"]'));
  console.log('dApp Explorer modal loaded and CoW Swap image found.');
}, test);
