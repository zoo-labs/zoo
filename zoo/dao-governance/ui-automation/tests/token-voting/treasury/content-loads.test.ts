import { getBaseUrl, appendFlagsToUrl } from '../../test-helpers';
import { getTestDao } from '../../../config/test-daos';
import { BaseSeleniumTest } from '../../base-selenium-test';
import { By } from 'selenium-webdriver';
import { pages } from '../../../config/pages';


// Parse governance type from CLI args
const governanceArg = process.argv.find(arg => arg.startsWith('--governance='));
const governanceType = governanceArg ? governanceArg.split('=')[1].toLowerCase() : 'erc20';

const test = new BaseSeleniumTest('treasury', 'content-loads');
BaseSeleniumTest.run(async (test) => {
  await test.start();
  const pagePath = `${pages['treasury']}?dao=${getTestDao(governanceType).value}`;
  await test.driver!.get(appendFlagsToUrl(getBaseUrl() + pagePath));
  // Wait for the Hats Protocol v1 image to appear
  await test.waitForElement(By.css('img[alt="Hats Protocol v1"]'));
  console.log('Treasury page loaded and Hats Protocol v1 image found.');
}, test);
