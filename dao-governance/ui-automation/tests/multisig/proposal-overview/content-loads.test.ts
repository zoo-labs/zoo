
import { getBaseUrl, appendFlagsToUrl } from '../../test-helpers';
import { getTestDao } from '../../../config/test-daos';
import { BaseSeleniumTest } from '../../base-selenium-test';
import { By } from 'selenium-webdriver';
import { pages } from '../../../config/pages';

// NOTE: This test has been modified to specifically work with multisig DAOs

const test = new BaseSeleniumTest('proposal-overview', 'content-loads');
BaseSeleniumTest.run(async (test) => {
  let proposalHash: string | null = null;
  const maxRetries = 3;
  let attempt = 0;
  let success = false;
  let lastError: any = null;
  while (attempt < maxRetries && !success) {
    try {
      await test.start();
      const daoHomePath = `${pages['dao-homepage']}?dao=${getTestDao('multisig').value}`;
      await test.driver!.get(appendFlagsToUrl(getBaseUrl() + daoHomePath));

      // Find the first proposal link (needs extra time to load)
      const proposalSelector = By.css('a[href^="/proposals/"]');
      const proposalLink1 = await test.waitForElement(proposalSelector, { extra: 10000 });
      // Re-locate the element before getting text to avoid staleness
      const proposalText = await (await test.driver!.findElement(proposalSelector)).getText();

      // Look for hash pattern: # followed by alphanumeric characters (like #4824 or #4a59)
      const hashMatch = proposalText.match(/#([a-fA-F0-9]+)/);
      if (!hashMatch) throw new Error('No proposal hash found in proposal text!');
      proposalHash = hashMatch[0]; // Keep the full hash including the # symbol
      // Re-locate the element before clicking to avoid staleness
      const proposalLink2 = await test.driver!.findElement(proposalSelector);
      await proposalLink2.click();
      await test.driver!.sleep(500);

      // Wait for the proposal hash to appear on the overview page (should be in title, not breadcrumbs)
      await test.waitForElement(By.xpath(`//*[contains(text(), '${proposalHash}')]`));
      console.log(`Proposal overview page loaded and found ${proposalHash}.`);
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
