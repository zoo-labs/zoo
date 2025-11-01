import { getTestDao } from '../../../config/test-daos';
import { BaseSeleniumTest } from '../../base-selenium-test';
import { By, WebElement } from 'selenium-webdriver';
import { pages } from '../../../config/pages';
import { getBaseUrl, appendFlagsToUrl } from '../../test-helpers';

// This test is annoyingly complicated: the sub DAO locator is hard to identify and the sub DAO name often shows as an address at first

// Parse governance type from CLI args
const governanceArg = process.argv.find(arg => arg.startsWith('--governance='));
const governanceType = governanceArg ? governanceArg.split('=')[1].toLowerCase() : 'erc20';

const test = new BaseSeleniumTest('organization', 'load-sub-dao');
BaseSeleniumTest.run(async (test) => {
  await test.start();
  // Load the organization page
  const orgPath = `${pages['organization']}?dao=${getTestDao(governanceType).value}`;
  await test.driver!.get(appendFlagsToUrl(getBaseUrl() + orgPath));

  // Wait loop for all DAO favorite buttons to appear (first is parent DAO, second+ are sub DAOs)
  const maxWaitMs = 15000;
  const pollIntervalMs = 500;
  let daoFavoriteElements: WebElement[] = [];
  const startTime = Date.now();
  while (Date.now() - startTime < maxWaitMs) {
    daoFavoriteElements = await test.driver!.findElements(By.css('div[data-testid="DAOInfo-favorite"]'));
    if (daoFavoriteElements.length >= 2) break;
    await new Promise(res => setTimeout(res, pollIntervalMs));
  }
  if (daoFavoriteElements.length < 2) throw new Error('Less than one sub DAO found on organization page after waiting!');

  // Sub DAOs may load in any order, so pick the last one found
  const anySubDaoFavorite = daoFavoriteElements[daoFavoriteElements.length - 1];
  // Move up to the ancestor <a> element (the clickable sub DAO link)
  const subDaoLink = await anySubDaoFavorite.findElement(By.xpath('ancestor::a'));
  // For address/name extraction, move down to the chakra-stack inside the link
  const subDaoBlock = await subDaoLink.findElement(By.css('div.chakra-stack'));

  // Get the sub DAO name and abbreviated address from the block
  const subDaoNameElem = await subDaoBlock.findElement(By.css('p.chakra-text'));
  const subDaoName = await subDaoNameElem.getText();
  let subDaoAbbrevAddr = '';
  try {
    const textElems = await subDaoBlock.findElements(By.css('p.chakra-text'));
    for (const elem of textElems) {
      const txt = (await elem.getText()).trim();
      if (/^0x[0-9a-f]{4,}\.{3,}[0-9a-f]{3,}$/i.test(txt)) {
        subDaoAbbrevAddr = txt;
        console.log(`Found sub DAO abbreviated address: ${subDaoAbbrevAddr}`);
        break;
      }
    }
    if (!subDaoAbbrevAddr) {
      console.log('No abbreviated address found in any p.chakra-text in sub DAO block.');
    }
  } catch (err) {
    console.log('Error while searching for abbreviated address in p.chakra-text:', err);
  }
  console.log(`Found sub DAO name: ${subDaoName}`);

  // Scroll the sub DAO link into view before clicking
  await test.driver!.executeScript('arguments[0].scrollIntoView({block: "center"});', subDaoLink);
  await test.driver!.sleep(500); // Small delay to allow scroll animation
  await subDaoLink.click();

  // Wait for the sub DAO homepage to load and check for the name using data-testid
  await test.driver!.sleep(1500); // Delay to allow name to load (without delay DAO address is shown instead)
  const nameElem = await test.waitForElement(By.css('[data-testid="DAOInfo-name"]'), { extra: 10000 });
  const loadedName = await nameElem.getText();
  // Accept if loadedName matches subDaoName or the abbreviated address (case-insensitive)
  const isNameMatch = loadedName === subDaoName;
  const isAddrMatch = subDaoAbbrevAddr && loadedName.trim().toLowerCase() === subDaoAbbrevAddr.trim().toLowerCase();
  if (!isNameMatch && !isAddrMatch) {
    throw new Error(`Sub DAO homepage loaded, but name does not match. Expected: '${subDaoName}' or abbreviated address '${subDaoAbbrevAddr}', Found: '${loadedName}'`);
  }
  console.log(`Sub DAO homepage loaded and name '${loadedName}' found.`);
}, test);
