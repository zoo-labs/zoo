const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Test Ocean DAO with all tabs
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('http://localhost:3005/ocean');
  
  console.log('✅ Ocean DAO page loaded');
  
  // Take screenshot of overview tab (default)
  await page.screenshot({ path: 'ocean-overview.png', fullPage: true });
  console.log('✅ Overview tab screenshot saved');
  
  // Click Proposals tab
  await page.click('text=Proposals');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'ocean-proposals.png', fullPage: true });
  console.log('✅ Proposals tab screenshot saved');
  
  // Click Treasury tab
  await page.click('text=Treasury');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'ocean-treasury.png', fullPage: true });
  console.log('✅ Treasury tab screenshot saved');
  
  // Click Research tab
  await page.click('text=Research');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'ocean-research.png', fullPage: true });
  console.log('✅ Research tab screenshot saved');
  
  // Click About tab
  await page.click('text=About');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'ocean-about.png', fullPage: true });
  console.log('✅ About tab screenshot saved');
  
  // Test mobile responsiveness on Proposals tab
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('http://localhost:3005/ocean');
  await page.click('text=Proposals');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'ocean-proposals-mobile.png', fullPage: true });
  console.log('✅ Proposals mobile screenshot saved');
  
  await browser.close();
  console.log('\n✨ All governance UI tests completed successfully!');
})();
