import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('Feature: Gamers Dashboard and Tic-Tac-Toe', () => {

  test('Scenario: Dashboard elements are visible', async ({ page }) => {
    // Given I am on the Gamers Dashboard
    await page.goto(BASE_URL);

    // Then I should see the "Total Matches" stat
    await expect(page.getByText('Total Matches')).toBeVisible();
    // And I should see the "Leaderboard" section
    await expect(page.getByRole('heading', { name: 'Leaderboard' })).toBeVisible();
    // And I should see the "Recent Matches" section
    await expect(page.getByRole('heading', { name: 'Recent Matches' })).toBeVisible();
  });

  test('Scenario: Navigation to New Match page', async ({ page }) => {
    await page.goto(BASE_URL);

    // When I click the "New Match" link
    await page.getByRole('link', { name: 'New Match' }).click();

    // Then I should be navigated to the match recording page
    await expect(page).toHaveURL(`${BASE_URL}/matches/new`);
    await expect(page.getByRole('heading', { name: 'Record a New Match' })).toBeVisible();
  });
});
