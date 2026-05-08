import { test, expect } from '@playwright/test';

const API_BASE_URL = 'https://api.eventhub.rahulshettyacademy.com/api';

test.describe.serial('EventHub Auth API Tests', () => {
  // Generate a unique email for each test run to avoid "Email already exists" errors
  const testEmail = `api_test_${Date.now()}@example.com`;
  const testPassword = 'Password123!';

  test('should register a new user successfully', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/auth/register`, {
      data: {
        email: testEmail,
        password: testPassword
      }
    });

    // Validate status code - registration often returns 201 Created
    expect([200, 201]).toContain(response.status());

    const body = await response.json();
    
    // Validate response structure
    expect(body.success).toBe(true);
    expect(body.user.email).toBe(testEmail);
    expect(body.token).toBeDefined();
    
    console.log(`Successfully registered user: ${testEmail}`);
  });

  test('should login with the newly registered credentials', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/auth/login`, {
      data: {
        email: testEmail,
        password: testPassword
      }
    });

    // Validate status code
    expect(response.status()).toBe(200);

    const body = await response.json();
    
    // Validate response structure
    expect(body.success).toBe(true);
    expect(body.token).toBeDefined();
    expect(body.user.email).toBe(testEmail);
    
    console.log(`Successfully logged in user: ${testEmail}`);
  });

  test('should fail login with incorrect password', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/auth/login`, {
      data: {
        email: testEmail,
        password: 'WrongPassword'
      }
    });

    // Based on typical API behavior, we expect a 401 or 400 for bad credentials
    expect(response.status()).toBeGreaterThanOrEqual(400);
    
    const body = await response.json();
    expect(body.success).toBeFalsy();
  });
});
