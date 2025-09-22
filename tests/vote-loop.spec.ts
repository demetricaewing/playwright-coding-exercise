import { chromium, test } from "@playwright/test";
import { votePageUrl, pollPageUrl, playerRadio, voteButton } from "./constants";

test("Vote for Player of the Week", async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 750 });
  for (let i = 0; i < 10; i++) {
    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate to the vote page first to set any necessary cookies
    await page.goto(votePageUrl, { waitUntil: "domcontentloaded" });
    await page.goto(pollPageUrl, {
      waitUntil: "domcontentloaded",
    });

    // Locate the player radio button click radio button
    const playerRadioLocator = page.locator(playerRadio);
    await playerRadioLocator.waitFor({ state: "visible" });
    await playerRadioLocator.check();

    // Locate the vote button and click it
    const voteButtonLocator = page.locator(voteButton);
    await voteButtonLocator.waitFor({ state: "visible" });
    await voteButtonLocator.click();

    // Clear cookies and close context to reset session
    await context.clearCookies();
    await page.close();
    await context.close();
  }
  // Close the browser after all iterations
  await browser.close();
});
