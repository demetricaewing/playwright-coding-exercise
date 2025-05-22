import { test, expect } from "@playwright/test";

test.only("This is a login test", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/login");
  await page.getByRole("textbox", { name: "Username" }).click();

  await page.pause();
});
