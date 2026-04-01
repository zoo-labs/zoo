
import { getBaseUrl, appendFlagsToUrl } from '../../test-helpers';
import { getTestDao } from '../../../config/test-daos';
import { BaseSeleniumTest } from '../../base-selenium-test';
import { By } from 'selenium-webdriver';
import { pages } from '../../../config/pages';


// Parse governance type from CLI args
const governanceArg = process.argv.find(arg => arg.startsWith('--governance='));
const governanceType = governanceArg ? governanceArg.split('=')[1].toLowerCase() : 'erc20';

const test = new BaseSeleniumTest('create-proposal', 'content-loads');
BaseSeleniumTest.run(async (test) => {
  // Directly load the create proposal page
  await test.start();
  const createProposalPath = `${pages['create-proposal']}?dao=${getTestDao(governanceType).value}`;
  await test.driver!.get(appendFlagsToUrl(getBaseUrl() + createProposalPath));
  // Confirm the metadata title field is present
  await test.waitForElement(By.css('[data-testid="metadata.title"]'));
  console.log('Create Proposal page loaded and metadata title field found.');
}, test);
