import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('Gamers Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('should load the dashboard and show key elements', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Gamers Dashboard' })).toBeVisible();
    await expect(page.getByText('Total Matches')).toBeVisible();
    await expect(page.getByText('Friends')).toBeVisible();
    await expect(page.getByText('Active Games')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Leaderboard' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Recent Matches' })).toBeVisible();
  });

  test('should navigate to New Match page', async ({ page }) => {
    await page.getByRole('link', { name: 'New Match' }).click();
    await expect(page).toHaveURL(`${BASE_URL}/matches/new`);
    await expect(page.getByRole('heading', { name: 'Record a New Match' })).toBeVisible();
  });

  test('should navigate to Tic-Tac-Toe page', async ({ page }) => {
    await page.getByRole('link', { name: 'Play Tic-Tac-Toe' }).click();
    await expect(page).toHaveURL(`${BASE_URL}/games/tic-tac-toe`);
    await expect(page.getByRole('heading', { name: 'Tic-Tac-Toe', exact: true })).toBeVisible();
  });
});

test.describe('New Match Form', () => {
  test('should record a new match manually', async ({ page }) => {
    await page.goto(`${BASE_URL}/matches/new`);

    // Select Game
    await page.locator('select[name="gameId"]').selectOption({ index: 0 });

    // Select Players (Assuming at least 2 users exist from seeding)
    await page.locator('select[name="player1"]').selectOption({ index: 0 });
    await page.locator('select[name="player2"]').selectOption({ index: 1 });

    // Mark Player 1 as winner
    await page.locator('#winner1').check();

    // Save Match
    await page.getByRole('button', { name: 'Save Match' }).click();

    // Should redirect to dashboard
    await expect(page).toHaveURL(BASE_URL);
    await expect(page.getByRole('heading', { name: 'Recent Matches' })).toBeVisible();
  });
});

test.describe('Tic-Tac-Toe Game', () => {
  test('should play a game and save results', async ({ page }) => {
    await page.goto(`${BASE_URL}/games/tic-tac-toe`);

    // Enter names
    const playerX = `TesterX_${Date.now()}`;
    const playerO = `TesterO_${Date.now()}`;

    await page.getByPlaceholder('Enter name...').first().fill(playerX);
    await page.getByPlaceholder('Enter name...').last().fill(playerO);

    // Start Game
    await page.getByRole('button', { name: 'Start Game' }).click();

    // Play a quick game (X wins on top row)
    const squares = page.locator('button.w-24.h-24');
    
    // X at (0,0)
    await squares.nth(0).click();
    await page.waitForTimeout(500);
    // O at (1,0)
    await squares.nth(3).click();
    await page.waitForTimeout(500);
    // X at (0,1)
    await squares.nth(1).click();
    await page.waitForTimeout(500);
    // O at (1,1)
    await squares.nth(4).click();
    await page.waitForTimeout(500);
    // X at (0,2)
    await squares.nth(2).click();

    // Verify winner message
    await expect(page.getByText(`Winner: ${playerX}`)).toBeVisible();

    // Save result
    await page.getByRole('button', { name: 'Save Result & Record Win' }).click();

    // Should redirect to dashboard
    await expect(page).toHaveURL(BASE_URL);
    
    // Verify names appear in recent matches or leaderboard
    // (Might need a small delay or re-navigation check)
    await expect(page.getByText(playerX).first()).toBeVisible();
  });

  test('should handle a draw', async ({ page }) => {
    await page.goto(`${BASE_URL}/games/tic-tac-toe`);

    await page.getByPlaceholder('Enter name...').first().fill('User1');
    await page.getByPlaceholder('Enter name...').last().fill('User2');
    await page.getByRole('button', { name: 'Start Game' }).click();

    const squares = page.locator('button.w-24.h-24');
    
    // Draw pattern:
    const moves = [0, 1, 2, 4, 3, 5, 7, 6, 8];
    for (const move of moves) {
      await squares.nth(move).click();
      await page.waitForTimeout(300);
    }

    await expect(page.getByText("It's a Draw!")).toBeVisible();
  });
});
