import { test, expect } from '@playwright/test';
import { storeCredentials, getLatestCredentials } from '../utils/db';

const LOGIN_URL = 'https://eventhub.rahulshettyacademy.com/login';
const REGISTER_URL = 'https://eventhub.rahulshettyacademy.com/register';

test.describe.serial('RahulShettyAcademy EventHub E2E Flow', () => {
  let testEmail: string;
  let testPassword = 'Password123!';

  test('should register a new account and store details in DB', async ({ page }) => {
    testEmail = `qa_tester_${Date.now()}@test.com`;
    
    await page.goto(REGISTER_URL);
    await page.getByPlaceholder('you@email.com').fill(testEmail);
    await page.getByPlaceholder('Min 8 chars, uppercase, number & symbol').fill(testPassword);
    await page.getByPlaceholder('Repeat your password').fill(testPassword);
    await page.getByRole('button', { name: 'Create Account' }).click();

    // Verify successful registration redirect
    await expect(page).toHaveURL('https://eventhub.rahulshettyacademy.com/');
    
    // Store in DB
    await storeCredentials(testEmail, testPassword);
    console.log(`Stored credentials for: ${testEmail}`);
  });

  test('should login using credentials from DB and verify modules', async ({ page }) => {
    // Retrieve the latest credentials from our DB
    const creds = await getLatestCredentials();
    if (!creds) throw new Error('No credentials found in database');

    await page.goto(LOGIN_URL);
    await page.getByPlaceholder('you@email.com').fill(creds.email);
    await page.getByPlaceholder('••••••').fill(creds.password);
    await page.getByRole('button', { name: 'Sign In' }).click();

    // 1. Verify successful login
    await expect(page).toHaveURL('https://eventhub.rahulshettyacademy.com/');
    
    // 2. Verify Dashboard/Home Modules
    // Let's verify key navigation items or sections
    const navItems = ['Home', 'Events', 'My Bookings'];
    for (const item of navItems) {
        await expect(page.getByRole('link', { name: item, exact: true }).or(page.getByText(item)).first()).toBeVisible();
    }

    // 3. Verify specific module content
    await expect(page).toHaveTitle(/EventHub — Discover \u0026 Book Events/i);
    
    // 4. Click into 'Events' module and verify
    await page.getByRole('link', { name: 'Events' }).first().click();
    await expect(page).toHaveURL(/.*events/);
    await expect(page.getByRole('heading', { name: 'Events' }).or(page.getByText('All Events')).first()).toBeVisible();

    // 5. Click into 'My Bookings' module and verify
    await page.getByRole('link', { name: 'My Bookings' }).first().click();
    await expect(page).toHaveURL(/.*bookings/);
    // Flexible check for empty state or generic bookings text
    await expect(page.getByText(/Bookings|Discover|Upcoming/i).first()).toBeVisible();
  });
});
