import { BaseSeleniumTest } from '../../base-selenium-test';
import { By } from 'selenium-webdriver';
import { getBaseUrl, appendFlagsToUrl } from '../../test-helpers';
import { pages } from '../../../config/pages';

const test = new BaseSeleniumTest('create-dao', 'erc721-workflow');
BaseSeleniumTest.run(async (test) => {
  await test.start();
  await test.driver!.get(appendFlagsToUrl(getBaseUrl() + pages['create-dao']));
  
  // Wait for the essentials DAO name input to appear
  const daoNameInput = await test.waitForElement(By.css('[data-testid="essentials-daoName"]'));
  
  // Enter "test" into the DAO name field
  await daoNameInput.sendKeys('test');
  
  // Open the network dropdown menu
  const networkDropdown = await test.waitForElement(By.css('#menu-button-\\:r9\\:'));
  await networkDropdown.click();
  
  // Select Sepolia network
  const sepoliaOption = await test.waitForElement(By.css('button[data-index="4"]'));
  await sepoliaOption.click();
  
  // Select the azorius-erc721 option
  const azoriusErc721Option = await test.waitForElement(By.css('[data-testid="choose-azorius-erc721"]'));
  await azoriusErc721Option.click();
  
  // Find and click the skip next button
  const skipNextButton = await test.waitForElement(By.css('[data-testid="create-skipNextButton"]'));
  await skipNextButton.click();
  
  // Enter NFT token address
  const tokenAddressInput = await test.waitForElement(By.css('[data-testid="erc721Token.nfts.0.tokenAddressInput"]'));
  await tokenAddressInput.sendKeys('0x31408f226E37FBF8715CA6eE45aaB4Ea213bA7A5');
  await test.driver!.sleep(1000);
  
  // Enter NFT token weight
  const tokenWeightInput = await test.waitForElement(By.css('[data-testid="erc721Token.nfts.0.tokenWeightInput"]'));
  await tokenWeightInput.sendKeys('1');
  await test.driver!.sleep(1000);

  // Click skip next button and wait for next page with retry logic
  const maxRetries = 3;
  let retryCount = 0;
  let nextPageLoaded = false;
  let quorumThresholdInput = null;
  
  while (!nextPageLoaded && retryCount < maxRetries) {
    try {
      console.log(`Attempting to navigate to next page (attempt ${retryCount + 1}/${maxRetries})`);
      
      // Click the skip next button
      const skipNextButton2 = await test.waitForElement(By.css('[data-testid="create-skipNextButton"]'), 5000);
      await skipNextButton2.click();
      
      // Wait for the next page to load by looking for the quorum threshold element
      quorumThresholdInput = await test.waitForElement(By.css('[data-testid="govConfig-quorumThreshold"]'), 8000);
      
      // If we get here without an exception, the next page loaded
      nextPageLoaded = true;
      console.log(`Next page loaded successfully on attempt ${retryCount + 1}`);
      
    } catch (error) {
      retryCount++;
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.log(`Failed to load next page on attempt ${retryCount}, error: ${errorMessage}`);
      
      if (retryCount >= maxRetries) {
        throw new Error(`Failed to load next page after ${maxRetries} attempts. Last error: ${errorMessage}`);
      }
      
      // Wait a bit before retrying
      await test.driver!.sleep(2000);
    }
  }

  // Enter quorum threshold
  await quorumThresholdInput!.sendKeys('1');

  // Click deploy DAO button
  const deployButton = await test.waitForElement(By.css('[data-testid="create-deployDAO"]'));
  await deployButton.click();
  
  // Assert that the expected toast appears
  const toast = await test.waitForElement(By.xpath("//*[contains(text(), 'Connect an account to proceed!')]"));
  console.log('ERC721 DAO creation workflow completed and wallet connection prompt appeared.');
  
}, test);
