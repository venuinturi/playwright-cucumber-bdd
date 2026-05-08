import { test, expect } from '@playwright/test';

const API_BASE_URL = 'https://api.eventhub.rahulshettyacademy.com/api';
const UI_BASE_URL = 'https://eventhub.rahulshettyacademy.com';

test.describe('Feature: Hybrid Authentication Flow', () => {
  const testEmail = `hybrid_test_${Date.now()}@example.com`;
  const testPassword = 'Password123!';

  test('Scenario: Register via API and verify Login via UI', async ({ request, page }) => {
    // 1. Given I have registered a new user via the "/auth/register" API
    console.log(`Registering ${testEmail} via API...`);
    const registerResponse = await request.post(`${API_BASE_URL}/auth/register`, {
      data: {
        email: testEmail,
        password: testPassword
      }
    });
    expect([200, 201]).toContain(registerResponse.status());
    const registerBody = await registerResponse.json();
    expect(registerBody.success).toBe(true);

    // 2. When I navigate to the EventHub login page
    await page.goto(`${UI_BASE_URL}/login`);

    // 3. And I enter the credentials used during API registration
    await page.getByPlaceholder('you@email.com').fill(testEmail);
    await page.getByPlaceholder('••••••').fill(testPassword);
    await page.getByRole('button', { name: 'Sign In' }).click();

    // 4. Then I should be successfully logged into the EventHub dashboard
    await expect(page).toHaveURL(`${UI_BASE_URL}/`);
    await expect(page.getByRole('link', { name: 'My Bookings' }).first()).toBeVisible();
    
    console.log(`Successfully logged in ${testEmail} via UI after API registration.`);
  });
});
