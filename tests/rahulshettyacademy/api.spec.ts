import { test, expect } from '@playwright/test';
import { getLatestCredentials } from '../utils/db';

const API_BASE_URL = 'https://api.eventhub.rahulshettyacademy.com/api';

test.describe('RahulShettyAcademy EventHub API Testing', () => {
  let authToken: string;

  test.beforeAll(async ({ request }) => {
    // 1. Retrieve the latest credentials from our DB
    const creds = await getLatestCredentials();
    if (!creds) throw new Error('No credentials found in database. Run auth.spec.ts first.');

    // 2. Perform API Login
    const response = await request.post(`${API_BASE_URL}/auth/login`, {
      data: {
        email: creds.email,
        password: creds.password
      }
    });

    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    authToken = responseBody.token; // Assuming it returns a token
    expect(authToken).toBeDefined();
  });

  test('should fetch current user profile via API', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.success).toBeTruthy();
    const user = body.user;
    const creds = await getLatestCredentials();
    expect(user.email).toBe(creds?.email);
  });

  test('should fetch events list via API', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/events`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      },
      params: {
        page: 1,
        limit: 10
      }
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.success).toBeTruthy();
    
    const events = body.data || body.events;
    expect(Array.isArray(events)).toBeTruthy();
    expect(events.length).toBeGreaterThan(0);
  });

  test('should fail to fetch profile with invalid token', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer invalid_token`
      }
    });

    expect(response.status()).toBe(401);
  });
});
