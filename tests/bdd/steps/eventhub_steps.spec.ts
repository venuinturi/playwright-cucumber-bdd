import { test, expect } from '@playwright/test';
import { getLatestCredentials } from '../../utils/db';

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

  test('Scenario: Create a new event as an admin', async ({ page }) => {
    const creds = await getLatestCredentials();
    await page.goto(`${BASE_URL}/login`);
    await page.getByPlaceholder('you@email.com').fill(creds!.email);
    await page.getByPlaceholder('••••••').fill(creds!.password);
    await page.getByRole('button', { name: 'Sign In' }).click();

    // When I navigate to the "Admin Events" page
    await page.goto(`${BASE_URL}/admin/events`);

    // And I create a new event with title "BDD Test Event"
    const eventTitle = `BDD Test Event ${Date.now()}`;
    await page.getByPlaceholder('Event title').fill(eventTitle);
    await page.getByPlaceholder('Describe the event…').fill('BDD Description');
    await page.getByRole('combobox', { name: 'Category*' }).selectOption('Workshop');
    await page.getByPlaceholder('e.g. Bangalore').fill('Test City');
    await page.getByPlaceholder('Venue name & address').fill('Test Venue');
    await page.getByLabel('Event Date & Time*').fill('2026-12-25T10:30');
    await page.getByLabel('Price ($)*').fill('50');
    await page.getByLabel('Total Seats*').fill('100');
    await page.getByRole('button', { name: '+ Add Event' }).click();

    // Then the event should be visible in the events list
    await expect(page.getByRole('cell', { name: eventTitle })).toBeVisible({ timeout: 10000 });
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
