import { BaseSeleniumTest } from '../../base-selenium-test';
import { By } from 'selenium-webdriver';
import { getBaseUrl, appendFlagsToUrl } from '../../test-helpers';
import { pages } from '../../../config/pages';

const test = new BaseSeleniumTest('create-dao', 'multisig-workflow');
BaseSeleniumTest.run(async (test) => {
  await test.start();
  await test.driver!.get(appendFlagsToUrl(getBaseUrl() + pages['create-dao']));
  
  // Wait for the essentials DAO name input to appear
  const daoNameInput = await test.waitForElement(By.css('[data-testid="essentials-daoName"]'));
  
  // Enter "test" into the DAO name field
  await daoNameInput.sendKeys('test');
  
  // Select the multisig option
  const multisigOption = await test.waitForElement(By.css('[data-testid="choose-multisig"]'));
  await multisigOption.click();
  
  // Find and click the skip next button
  const skipNextButton = await test.waitForElement(By.css('[data-testid="create-skipNextButton"]'));
  await skipNextButton.click();
  
  // Enter first signer address
  const signerAddressInput = await test.waitForElement(By.css('[data-testid="safeConfig-signer-0"]'));
  await signerAddressInput.sendKeys('0xAf3ee09F37ead9F28a05AeF0d09841BC9A6Fe8e9');
  
  // Click deploy DAO button
  const deployButton = await test.waitForElement(By.css('[data-testid="create-deployDAO"]'));
  await deployButton.click();
  
  // Assert that the expected toast appears
  const toast = await test.waitForElement(By.xpath("//*[contains(text(), 'Connect an account to proceed!')]"));
  console.log('Multisig DAO creation workflow completed and wallet connection prompt appeared.');
  
}, test);
