import { test, expect } from '@playwright/test';

const API_BASE_URL = 'https://api.eventhub.rahulshettyacademy.com/api';

test.describe('Feature: Config API', () => {
  test('Scenario: Retrieve system configuration', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/config`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    // Verify it's a valid JSON object with content
    expect(typeof body).toBe('object');
    expect(Object.keys(body).length).toBeGreaterThan(0);
  });
});
