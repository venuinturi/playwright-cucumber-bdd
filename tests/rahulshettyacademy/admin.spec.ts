import { test, expect } from '@playwright/test';
import { getLatestCredentials } from '../utils/db';

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';

test.describe('RahulShettyAcademy EventHub Admin Features', () => {
  test('should create a new event successfully', async ({ page }) => {
    // 1. Login using latest DB credentials
    const creds = await getLatestCredentials();
    if (!creds) throw new Error('No credentials found in database. Run auth.spec.ts first.');

    await page.goto(`${BASE_URL}/login`);
    await page.getByPlaceholder('you@email.com').fill(creds.email);
    await page.getByPlaceholder('••••••').fill(creds.password);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page).toHaveURL(`${BASE_URL}/`);

    // 2. Navigate to Admin Events page
    await page.goto(`${BASE_URL}/admin/events`);
    await expect(page.getByRole('heading', { name: '+ New Event' })).toBeVisible();

    // 3. Fill out the "New Event" form
    const eventTitle = `Test Event ${Date.now()}`;
    await page.getByPlaceholder('Event title').fill(eventTitle);
    await page.getByPlaceholder('Describe the event…').fill('This is a test event description.');
    
    // Select category (default is Conference, let's pick Workshop)
    await page.getByRole('combobox', { name: 'Category*' }).selectOption('Workshop');
    
    await page.getByPlaceholder('e.g. Bangalore').fill('Test City');
    await page.getByPlaceholder('Venue name & address').fill('Test Venue, Street 123');
    
    // Event Date & Time - usually requires a specific format or picker
    // Let's try typing a future date
    await page.getByLabel('Event Date & Time*').fill('2026-12-25T10:30');

    await page.getByLabel('Price ($)*').fill('50');
    await page.getByLabel('Total Seats*').fill('100');

    // 4. Click Add Event
    await page.getByRole('button', { name: '+ Add Event' }).click();

    // 5. Verify the event appears in the "All Events" table
    // The table might take a second to update
    await expect(page.getByRole('cell', { name: eventTitle })).toBeVisible({ timeout: 10000 });
    
    // 6. Verify the event also appears on the public Events page
    await page.getByRole('link', { name: 'Events', exact: true }).first().click();
    await expect(page.getByRole('heading', { name: eventTitle })).toBeVisible();
  });
});
