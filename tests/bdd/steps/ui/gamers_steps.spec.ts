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

  test('Scenario: Play a full game of Tic-Tac-Toe', async ({ page }) => {
    // Given I am on the Tic-Tac-Toe game page
    await page.goto(`${BASE_URL}/games/tic-tac-toe`);

    // When I enter player names "PlayerX" and "PlayerO"
    await page.getByPlaceholder('Enter name...').first().fill('PlayerX');
    await page.getByPlaceholder('Enter name...').last().fill('PlayerO');

    // And I start the game
    await page.getByRole('button', { name: 'Start Game' }).click();

    // And I play moves to make "PlayerX" win
    const squares = page.locator('button.w-24.h-24');
    const moves = [0, 3, 1, 4, 2]; // X: 0,1,2 (Top row win)
    for (const move of moves) {
      await squares.nth(move).click();
      await page.waitForTimeout(100);
    }

    // Then I should see the "Winner: PlayerX" message
    await expect(page.getByText('Winner: PlayerX')).toBeVisible();

    // When I save the result
    await page.getByRole('button', { name: 'Save Result & Record Win' }).click();

    // Then I should be redirected to the dashboard
    await expect(page).toHaveURL(BASE_URL);
    
    // And "PlayerX" should appear in the recent matches
    await expect(page.getByText('PlayerX').first()).toBeVisible();
  });
});
