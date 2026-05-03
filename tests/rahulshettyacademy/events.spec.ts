import { test, expect } from '@playwright/test';
import { getLatestCredentials } from '../utils/db';

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';

test.describe('RahulShettyAcademy EventHub Event Booking', () => {
  test('should book an event successfully', async ({ page }) => {
    // 1. Login using latest DB credentials
    const creds = await getLatestCredentials();
    if (!creds) throw new Error('No credentials found in database. Run auth.spec.ts first.');

    await page.goto(`${BASE_URL}/login`);
    await page.getByPlaceholder('you@email.com').fill(creds.email);
    await page.getByPlaceholder('••••••').fill(creds.password);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page).toHaveURL(`${BASE_URL}/`);

    // 2. Navigate to Events
    await page.getByRole('link', { name: 'Events', exact: true }).first().click();
    await expect(page).toHaveURL(`${BASE_URL}/events`);

    // 3. Select an event (e.g., the first one)
    // We'll use the 'Book Now' button for a specific event
    await page.locator('a:has-text("Book Now")').first().click();
    
    // 4. Fill the booking form
    await page.getByPlaceholder('Your full name').fill('QA Tester');
    // Use a more specific locator for the email field in the booking section
    await page.locator('div:has-text("Email*") > input').fill(creds.email);
    await page.getByPlaceholder('+91 98765 43210').fill('1234567890');

    // 5. Confirm Booking
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Confirm Booking' }).click();

    // 6. Verify successful booking message
    await expect(page.getByRole('heading', { name: /Booking Confirmed/i })).toBeVisible();
    
    // 7. Navigate to 'My Bookings' via the button on the success screen
    await page.getByRole('link', { name: 'View My Bookings' }).click();
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);
    
    // 8. Verify the booking appears in 'My Bookings'
    await expect(page.getByText(/Bookings|Upcoming/i).first()).toBeVisible();
  });
});
