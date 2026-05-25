const { chromium } = require('playwright');
const path = require('path');

(async () => {
  console.log('Starting Corrected Form Submission test via Playwright...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Capture console messages
  page.on('console', msg => {
    console.log(`[CONSOLE ${msg.type().toUpperCase()}] ${msg.text()}`);
  });

  // Capture page errors
  page.on('pageerror', err => {
    console.error(`[PAGE ERROR] ${err.toString()}`);
  });

  // Capture network requests & responses
  page.on('request', req => {
    if (req.url().includes('supabase')) {
      console.log(`[NET REQ] ${req.method()} ${req.url()}`);
    }
  });

  page.on('response', async res => {
    if (res.url().includes('supabase')) {
      console.log(`[NET RES] ${res.status()} ${res.url()}`);
      try {
        const text = await res.text();
        console.log(`[NET RES BODY] ${text.substring(0, 1000)}`);
      } catch (e) {
        console.log(`[NET RES BODY ERROR] Could not read response text: ${e.message}`);
      }
    }
  });

  try {
    await page.goto('http://localhost:8080/');
    await page.waitForLoadState('networkidle');
    console.log('Page loaded.');

    // Scroll to #contact
    console.log('Scrolling to contact section...');
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    // Fill form using exact placeholders
    console.log('Filling form...');
    await page.fill('input[placeholder="e.g. Elon Musk"]', 'Test Recruiter');
    await page.fill('input[placeholder="e.g. elon@spacex.com"]', 'recruiter@test.com');
    await page.fill('input[placeholder="e.g. +91 99999 88888"]', '+91 76200 85260');
    await page.fill('input[placeholder="e.g. Production Oracle to MS SQL Migration"]', 'Urgent Consulting Request');
    await page.fill('textarea[placeholder="Describe transaction specifications, project parameters, or questions..."]', 'This is a test message to verify the connection is working successfully.');

    // Click Submit
    console.log('Clicking Submit...');
    await page.click('button:has-text("Execute Commit")');

    // Wait 5 seconds to capture all async network/console actions
    await page.waitForTimeout(6000);

    // Save screenshot
    const screenshotPath = path.join(__dirname, 'form_submit_result.png');
    await page.screenshot({ path: screenshotPath });
    console.log(`Screenshot saved to ${screenshotPath}`);

  } catch (err) {
    console.error('Test crashed:', err);
  } finally {
    await browser.close();
    console.log('Test finished.');
  }
})();
