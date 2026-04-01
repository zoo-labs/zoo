import { getTestDao } from '../../../config/test-daos';
import { BaseSeleniumTest } from '../../base-selenium-test';
import { By } from 'selenium-webdriver';
import { pages } from '../../../config/pages';
import { getBaseUrl, appendFlagsToUrl } from '../../test-helpers';

const test = new BaseSeleniumTest('dao-homepage', 'content-loads');
BaseSeleniumTest.run(async (test) => {
  // Load the DAO homepage for multisig DAO
  await test.start();
  const daoHomePath = `${pages['dao-homepage']}?dao=${getTestDao('multisig').value}`;
  await test.driver!.get(appendFlagsToUrl(getBaseUrl() + daoHomePath));
  // Confirm the settings button is present
  await test.waitForElement(By.css('[aria-label="Manage DAO"]'));
  console.log('DAO homepage loaded and settings button found (multisig).');
}, test);
