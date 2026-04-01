import { getBaseUrl, appendFlagsToUrl } from '../../test-helpers';
import { getTestDao } from '../../../config/test-daos';
import { BaseSeleniumTest } from '../../base-selenium-test';
import { By } from 'selenium-webdriver';
import { pages } from '../../../config/pages';

const test = new BaseSeleniumTest('proposal-templates', 'create-template');
BaseSeleniumTest.run(async (test) => {
  // Directly load the proposal templates page
  await test.start();
  const proposalTemplatesPath = `${pages['proposal-templates']}?dao=${getTestDao('multisig').value}&demo_mode=on`;
  await test.driver!.get(appendFlagsToUrl(getBaseUrl() + proposalTemplatesPath));
  
  // Click a button that has a link starting with /proposal-templates/new
  const createButton = await test.waitForElement(By.css('a[href^="/proposal-templates/new"]'));
  await createButton.click();
  
  // Confirm the metadata title input is present
  await test.waitForElement(By.css('[data-testid="metadata.title"]'));
  console.log('Create template page loaded and metadata title field found.');
}, test);
