
import { getBaseUrl, appendFlagsToUrl } from '../../test-helpers';
import { getTestDao } from '../../../config/test-daos';
import { BaseSeleniumTest } from '../../base-selenium-test';
import { By } from 'selenium-webdriver';
import { pages } from '../../../config/pages';

const test = new BaseSeleniumTest('proposal-templates', 'content-loads');
BaseSeleniumTest.run(async (test) => {
  // Directly load the proposal templates page
  await test.start();
  const proposalTemplatesPath = `${pages['proposal-templates']}?dao=${getTestDao('multisig').value}`;
  await test.driver!.get(appendFlagsToUrl(getBaseUrl() + proposalTemplatesPath));
  // Confirm the paragraph with text "Airdrop" is present
  await test.waitForElement(By.xpath("//p[contains(text(), 'Airdrop')]"));
  console.log('Proposal Templates page loaded and "Airdrop" paragraph found.');
}, test);
