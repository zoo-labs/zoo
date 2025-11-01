import { BaseSeleniumTest } from '../../base-selenium-test';
import { By, Key } from 'selenium-webdriver';
import { getBaseUrl, appendFlagsToUrl } from '../../test-helpers';

const test = new BaseSeleniumTest('app-homepage', 'dao-search');
BaseSeleniumTest.run(async (test) => {
  await test.start();
  await test.driver!.get(appendFlagsToUrl(getBaseUrl()));
  // Locate and click the search input
  const searchInput = await test.waitForElement(By.css('[data-testid="search-input"]'));
  await searchInput.click();
  await searchInput.sendKeys('0xB4b01b4Dc5f8d11feD90D760a237BF4D74C3423d', Key.RETURN);
  // Wait for the expected text to appear
  await test.waitForElement(By.xpath("//*[contains(text(), 'ERC-20 token DAO')]"));
  console.log('DAO search completed and found expected text.');
}, test);
