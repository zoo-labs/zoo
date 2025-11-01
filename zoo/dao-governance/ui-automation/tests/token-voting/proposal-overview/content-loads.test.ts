
import { getBaseUrl, appendFlagsToUrl } from '../../test-helpers';
import { getTestDao } from '../../../config/test-daos';
import { BaseSeleniumTest } from '../../base-selenium-test';
import { By } from 'selenium-webdriver';
import { pages } from '../../../config/pages';


// Parse governance type from CLI args
const governanceArg = process.argv.find(arg => arg.startsWith('--governance='));
const governanceType = governanceArg ? governanceArg.split('=')[1].toLowerCase() : 'erc20';

const test = new BaseSeleniumTest('proposal-overview', 'content-loads');
BaseSeleniumTest.run(async (test) => {
  let proposalNumber: string | null = null;
  const maxRetries = 3;
  let attempt = 0;
  let success = false;
  let lastError: any = null;
  while (attempt < maxRetries && !success) {
    try {
      await test.start();
      const daoHomePath = `${pages['dao-homepage']}?dao=${getTestDao(governanceType).value}`;
      await test.driver!.get(appendFlagsToUrl(getBaseUrl() + daoHomePath));
      // Find the first proposal link (needs extra time to load)
      const proposalSelector = By.css('a[href^="/proposals/"]');
      const proposalLink1 = await test.waitForElement(proposalSelector, { extra: 10000 });
      const href = await proposalLink1.getAttribute('href');
      const match = href.match(/\/proposals\/(\d+)/);
      if (!match) throw new Error('No proposal link found!');
      proposalNumber = match[1];
      // Re-locate the element before clicking to avoid staleness
      const proposalLink2 = await test.driver!.findElement(proposalSelector);
      await proposalLink2.click();
      await test.driver!.sleep(500);
      // Wait for the proposal number to appear on the overview page
      await test.waitForElement(By.xpath(`//*[contains(text(), '#${proposalNumber}')]`));
      console.log(`Proposal overview page loaded and found #${proposalNumber}.`);
      success = true;
    } catch (error) {
      lastError = error;
      attempt++;
      console.log(`Attempt ${attempt} failed: ${error instanceof Error ? error.message : error}`);
      if (attempt < maxRetries) {
        await test.driver!.sleep(2000);
      }
    }
  }
  if (!success) {
    throw lastError;
  }
}, test);
