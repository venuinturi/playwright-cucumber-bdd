import { test, expect } from '@playwright/test';

const API_BASE_URL = 'https://api.eventhub.rahulshettyacademy.com/api';

test.describe('Feature: Health API', () => {
  test('Scenario: Service is up and running', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/health`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    // Usually health returns { status: 'UP' } or similar
    expect(body.status || body.message).toBeDefined();
  });
});
