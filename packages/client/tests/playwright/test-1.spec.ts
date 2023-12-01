import { expect, test } from "@playwright/test";

test("can login", async ({ page }) => {
  await page.goto("http://localhost:4000/admin");
  await page.getByLabel("Username").fill("thko");
  await page.getByLabel("Password").fill("thko");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByRole("heading", { name: "Forms-App" })).toBeVisible();
  await expect(page).toHaveScreenshot("login.png");
});
