import { BaseSeleniumTest } from '../../base-selenium-test';
import { By } from 'selenium-webdriver';
import { getBaseUrl, appendFlagsToUrl } from '../../test-helpers';
import { pages } from '../../../config/pages';

const test = new BaseSeleniumTest('create-dao', 'erc20-workflow');
BaseSeleniumTest.run(async (test) => {
  await test.start();
  await test.driver!.get(appendFlagsToUrl(getBaseUrl() + pages['create-dao']));
  
  // Wait for the essentials DAO name input to appear
  const daoNameInput = await test.waitForElement(By.css('[data-testid="essentials-daoName"]'));
  
  // Enter "test" into the DAO name field
  await daoNameInput.sendKeys('test');
  
  // Find and click the skip next button
  const skipNextButton = await test.waitForElement(By.css('[data-testid="create-skipNextButton"]'));
  await skipNextButton.click();
  
  // Select the new token option
  const newTokenOption = await test.waitForElement(By.css('[data-testid="choose-newToken"]'));
  await newTokenOption.click();
  
  // Enter token name
  const tokenNameInput = await test.waitForElement(By.css('[data-testid="tokenVoting-tokenNameInput"]'));
  await tokenNameInput.sendKeys('test');
  
  // Enter token symbol
  const tokenSymbolInput = await test.waitForElement(By.css('[data-testid="tokenVoting-tokenSymbolInput"]'));
  await tokenSymbolInput.sendKeys('test');
  
  // Enter token supply
  const tokenSupplyInput = await test.waitForElement(By.css('[data-testid="tokenVoting-tokenSupplyInput"]'));
  await tokenSupplyInput.sendKeys('123');
  
  // Enter allocation address
  const allocationAddressInput = await test.waitForElement(By.css('[data-testid="tokenVoting-tokenAllocationAddressInput-0"]'));
  await allocationAddressInput.sendKeys('0xAf3ee09F37ead9F28a05AeF0d09841BC9A6Fe8e9');
  
  // Enter allocation amount
  const allocationAmountInput = await test.waitForElement(By.css('[data-testid="tokenVoting-tokenAllocationAmountInput-0"]'));
  await allocationAmountInput.sendKeys('123');
  
  // Click skip next button again
  const skipNextButton2 = await test.waitForElement(By.css('[data-testid="create-skipNextButton"]'));
  await skipNextButton2.click();
  
  // Enter quorum percentage
  const quorumPercentageInput = await test.waitForElement(By.css('[data-testid="govConfig-quorumPercentage"]'));
  await quorumPercentageInput.sendKeys('1');
  
  // Click deploy DAO button
  const deployButton = await test.waitForElement(By.css('[data-testid="create-deployDAO"]'));
  await deployButton.click();
  
  // Assert that the expected toast appears
  const toast = await test.waitForElement(By.xpath("//*[contains(text(), 'Connect an account to proceed!')]"));
  console.log('DAO creation workflow completed and wallet connection prompt appeared.');
  
}, test);
