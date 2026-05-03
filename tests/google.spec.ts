import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://www.google.com');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Google/);
});

test('search for playwright', async ({ page }) => {
  await page.goto('https://www.google.com');

  // Handle cookie consent if it appears (common in many regions)
  const rejectAll = page.getByRole('button', { name: 'Reject all' });
  if (await rejectAll.isVisible()) {
    await rejectAll.click();
  } else {
      const acceptAll = page.getByRole('button', { name: 'I agree' });
      if (await acceptAll.isVisible()) {
          await acceptAll.click();
      }
  }

  // Find the search box by name and type
  const searchBox = page.locator('textarea[name="q"]');
  await searchBox.fill('Playwright');
  await searchBox.press('Enter');

  // Expect results to appear
  await expect(page.locator('#search')).toBeVisible();
});
