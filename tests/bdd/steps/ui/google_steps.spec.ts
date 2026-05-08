import { test, expect } from '@playwright/test';

test.describe('Feature: Google Search', () => {

  test('Scenario: Search for Playwright', async ({ page }) => {
    // Given I am on the Google homepage
    await page.goto('https://www.google.com');

    // Handle cookie consent
    const rejectAll = page.getByRole('button', { name: 'Reject all' });
    if (await rejectAll.isVisible()) {
      await rejectAll.click();
    }

    // When I search for "Playwright"
    const searchBox = page.locator('textarea[name="q"]');
    await searchBox.fill('Playwright');
    await searchBox.press('Enter');

    // Then I should see search results
    await expect(page.locator('#search')).toBeVisible();
  });
});
