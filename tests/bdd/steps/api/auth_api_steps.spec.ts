import { test, expect } from '@playwright/test';

const API_BASE_URL = 'https://api.eventhub.rahulshettyacademy.com/api';

test.describe.serial('Feature: User Authentication API', () => {
  // Shared state for the serial tests
  const testEmail = `bdd_api_${Date.now()}@example.com`;
  const testPassword = 'Password123!';
  let registrationResponse: any;

  test('Scenario: Register a new user', async ({ request }) => {
    // When I send a POST request to "/auth/register"
    const response = await request.post(`${API_BASE_URL}/auth/register`, {
      data: {
        email: testEmail,
        password: testPassword
      }
    });

    // Then the API should return a "201" or "200" status
    expect([200, 201]).toContain(response.status());

    // And the response should contain the registration details
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.user.email).toBe(testEmail);
    expect(body.token).toBeDefined();
  });

  test('Scenario: Login with newly registered credentials', async ({ request }) => {
    // When I send a POST request to "/auth/login" with my credentials
    const response = await request.post(`${API_BASE_URL}/auth/login`, {
      data: {
        email: testEmail,
        password: testPassword
      }
    });

    // Then the API should return a "200" status
    expect(response.status()).toBe(200);

    // And the response should contain a valid authentication token
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.token).toBeDefined();
    expect(body.user.email).toBe(testEmail);
  });

  test('Scenario: Fail login with incorrect password', async ({ request }) => {
    // When I attempt to login with an incorrect password
    const response = await request.post(`${API_BASE_URL}/auth/login`, {
      data: {
        email: testEmail,
        password: 'WrongPassword'
      }
    });

    // Then the API should return an error status
    expect(response.status()).toBeGreaterThanOrEqual(400);
    
    // And the response success should be false
    const body = await response.json();
    expect(body.success).toBeFalsy();
  });
});
