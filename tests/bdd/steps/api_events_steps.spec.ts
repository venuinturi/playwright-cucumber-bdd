import { test, expect } from '@playwright/test';
import { getLatestCredentials } from '../../utils/db';

const API_BASE_URL = 'https://api.eventhub.rahulshettyacademy.com/api';

test.describe('Feature: Events API', () => {
  let firstEventId: number;
  let authToken: string;

  test.beforeAll(async ({ request }) => {
    const creds = await getLatestCredentials();
    if (!creds) throw new Error('No credentials found in database');

    const response = await request.post(`${API_BASE_URL}/auth/login`, {
      data: { email: creds.email, password: creds.password }
    });
    const body = await response.json();
    authToken = body.token;
  });

  test('Scenario: List all events', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/events`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    const events = body.data || body.events || body;
    expect(Array.isArray(events)).toBeTruthy();
    expect(events.length).toBeGreaterThan(0);
    
    // Capture ID for next test
    firstEventId = events[0].id || events[0].eventId;
  });

  test('Scenario: Get specific event details', async ({ request }) => {
    test.skip(!firstEventId, 'No event ID available from previous test');
    
    const response = await request.get(`${API_BASE_URL}/events/${firstEventId}`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    const event = body.data || body.event || body;
    expect(event.id || event.eventId).toBe(firstEventId);
  });
});
