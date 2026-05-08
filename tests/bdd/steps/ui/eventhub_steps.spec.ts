import { test, expect } from '@playwright/test';
import { getLatestCredentials } from '../../../utils/db';

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';

test.describe('Feature: EventHub User Interface', () => {

  test('Scenario: Successful login to EventHub', async ({ page }) => {
    const creds = await getLatestCredentials();
    
    // Given I am on the EventHub login page
    await page.goto(`${BASE_URL}/login`);

    // When I login with my database credentials
    await page.getByPlaceholder('you@email.com').fill(creds!.email);
    await page.getByPlaceholder('••••••').fill(creds!.password);
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Then I should be redirected to the EventHub home page
    await expect(page).toHaveURL(`${BASE_URL}/`);

    // And I should see the "Events" and "My Bookings" navigation links
    await expect(page.getByRole('link', { name: 'Events' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'My Bookings' }).first()).toBeVisible();
  });

  test('Scenario: Book an existing event', async ({ page }) => {
    const creds = await getLatestCredentials();
    await page.goto(`${BASE_URL}/login`);
    await page.getByPlaceholder('you@email.com').fill(creds!.email);
    await page.getByPlaceholder('••••••').fill(creds!.password);
    await page.getByRole('button', { name: 'Sign In' }).click();

    // When I navigate to the "Events" page
    await page.getByRole('link', { name: 'Events', exact: true }).first().click();

    // And I book the first available event
    await page.locator('a:has-text("Book Now")').first().click();
    await page.getByPlaceholder('Your full name').fill('BDD Tester');
    await page.locator('div:has-text("Email*") > input').fill(creds!.email);
    await page.getByPlaceholder('+91 98765 43210').fill('1234567890');
    await page.getByRole('button', { name: 'Confirm Booking' }).click();

    // Then I should see a "Booking Confirmed" confirmation message
    await expect(page.getByRole('heading', { name: /Booking Confirmed/i })).toBeVisible();
  });
});
