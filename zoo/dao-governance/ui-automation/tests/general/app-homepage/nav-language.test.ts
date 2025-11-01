import { BaseSeleniumTest } from '../../base-selenium-test';
import { By } from 'selenium-webdriver';
import { getBaseUrl, appendFlagsToUrl } from '../../test-helpers';
import { pages } from '../../../config/pages';

const test = new BaseSeleniumTest('app-homepage', 'nav-language');
BaseSeleniumTest.run(async (test) => {
  await test.start();
  await test.driver!.get(appendFlagsToUrl(getBaseUrl() + pages['app-homepage']));
  
  // Open the language dropdown menu
  const languageDropdown = await test.waitForElement(By.xpath("//button[contains(., 'Language')]"));
  await languageDropdown.click();
  
  // Wait for dropdown to open
  await test.driver!.sleep(500);
  
  // Select German language option
  const deutschOption = await test.waitForElement(By.xpath("//p[contains(text(), 'Deutsch (DE)')]"));
  await deutschOption.click();
  
  // Wait for page to reload/update with German language
  await test.driver!.sleep(2000);
  
  // Assert that German text "Meine DAOs" is present on the page
  const germanText = await test.waitForElement(By.xpath("//p[contains(text(), 'Meine DAOs')]"));
  const isDisplayed = await germanText.isDisplayed();
  
  if (!isDisplayed) {
    throw new Error('German text "Meine DAOs" is not visible on the page!');
  }
  
  console.log('Language selection changed to German and page content updated successfully.');
  
}, test);
