import { test, expect } from "@playwright/test";
import crypto from "node:crypto";

test("Admin - Form creation", async ({ page }) => {
  await test.step("login", async () => {
    await page.goto("http://localhost:4000/login");
    await page.getByLabel("Username").click();
    await page.getByLabel("Username").fill("thko");
    await page.getByLabel("Username").press("Tab");
    await page.getByLabel("Password").fill("thko");
    await page.getByLabel("Password").press("Tab");
    await page.getByRole("button", { name: "Login" }).click();
  });
  const title = "Testform-" + crypto.randomUUID().slice(0, 8);
  await test.step("create new form", async () => {
    await page.getByRole("button", { name: "plus icon" }).click();
    await page.getByText("Untitled Form").click();
    await page.getByLabel("Title").fill(title);
    await page.getByRole("button", { name: "Add question" }).click();
    await page
      .locator('input[name="questions\\.0\\.text\\.question"]')
      .fill("asdadad");
    await page.getByRole("button", { name: "Save Form" }).click();
    await page.getByRole("link", { name: "back" }).click();
  });
  await expect(page.getByRole("link", { name: title })).toBeAttached();
});
