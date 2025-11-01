
import { getBaseUrl, appendFlagsToUrl } from '../../test-helpers';
import { getTestDao } from '../../../config/test-daos';
import { BaseSeleniumTest } from '../../base-selenium-test';
import { By } from 'selenium-webdriver';
import { pages } from '../../../config/pages';

const test = new BaseSeleniumTest('roles', 'content-loads');
BaseSeleniumTest.run(async (test) => {
  await test.start();
  
  // Retry logic for flaky roles page loading
  const maxRetries = 3;
  let retryCount = 0;
  let rolesLoaded = false;
  
  while (!rolesLoaded && retryCount < maxRetries) {
    try {
      console.log(`Attempting to load roles page (attempt ${retryCount + 1}/${maxRetries})`);
      
      // Load the roles page
      const rolesPath = `${pages['roles']}?dao=${getTestDao('multisig').value}`;
      await test.driver!.get(appendFlagsToUrl(getBaseUrl() + rolesPath));
      
      // Confirm the image with the given alt is present (needs extra time to load)
      await test.waitForElement(By.css('img[alt="0xAf3ee09F37ead9F28a05AeF0d09841BC9A6Fe8e9"]'), { extra: 10000 });
      
      // If we get here without an exception, the roles loaded successfully
      rolesLoaded = true;
      console.log(`Roles page loaded successfully on attempt ${retryCount + 1} - image with correct alt found.`);
      
    } catch (error) {
      retryCount++;
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.log(`Failed to load roles page on attempt ${retryCount}, error: ${errorMessage}`);
      
      if (retryCount >= maxRetries) {
        throw new Error(`Failed to load roles page after ${maxRetries} attempts. Last error: ${errorMessage}`);
      }
      
      // Wait a bit before retrying
      await test.driver!.sleep(3000);
    }
  }
}, test);
