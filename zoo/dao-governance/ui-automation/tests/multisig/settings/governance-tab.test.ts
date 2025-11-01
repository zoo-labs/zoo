import { getBaseUrl, appendFlagsToUrl } from '../../test-helpers';
import { getTestDao } from '../../../config/test-daos';
import { BaseSeleniumTest } from '../../base-selenium-test';
import { By } from 'selenium-webdriver';
import { pages } from '../../../config/pages';

/* There are very specific things we need to do to ensure this test is stable.
Unfortunately, if the test runs in CI, it tends to run slower and this is where things fall apart.
For some reason, when the test runs quickly, it has no trouble using the paragraph text as reference
for the tab. But when the page has more time to load, it catches the wrong element, which is underneath
the settings modal. Therefore, the test must account for both possibilities. */

const test = new BaseSeleniumTest('settings', 'governance-tab');
BaseSeleniumTest.run(async (test) => {
  // Load the DAO homepage
  await test.start();

  const daoHomePath = `${pages['dao-homepage']}?dao=${getTestDao('multisig').value}`;
  await test.driver!.get(appendFlagsToUrl(getBaseUrl() + daoHomePath));
  // Click the 'Manage DAO' button
  const manageBtn = await test.waitForElement(By.css('[aria-label="Manage DAO"]'));
  await manageBtn.click();
  // Try to find and click the first <p> with text 'Governance'
  let found = false;
  const actions = test.driver!.actions({ bridge: true });
  const firstGovernanceTab = await test.driver!.findElement(By.xpath("//p[text()='Governance']"));
  await actions.move({ origin: firstGovernanceTab }).click().perform();
  try {
    await test.waitForElement(By.css('input[value^="0x"]'), 2000);
    found = true;
  } catch (e) {
    // If not found, look for all <p> elements and try the second one if it exists
    const governanceTabs = await test.driver!.findElements(By.xpath("//p[text()='Governance']"));
    if (governanceTabs.length > 1) {
      await actions.move({ origin: governanceTabs[1] }).click().perform();
      await test.waitForElement(By.css('input[value^="0x"]'), 2000);
      found = true;
    }
  }
  if (!found) {
    throw new Error('Governance tab could not be activated by clicking either <p> element.');
  }
  console.log('Governance tab clicked and signer address found.');
}, test);
