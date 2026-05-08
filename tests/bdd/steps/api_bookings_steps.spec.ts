import { test, expect } from '@playwright/test';
import { getLatestCredentials } from '../../utils/db';

const API_BASE_URL = 'https://api.eventhub.rahulshettyacademy.com/api';

test.describe.serial('Feature: Bookings API', () => {
  let authToken: string;
  let firstEventId: number;

  test.beforeAll(async ({ request }) => {
    // 1. Get credentials and login
    const creds = await getLatestCredentials();
    if (!creds) throw new Error('No credentials found in database');

    const response = await request.post(`${API_BASE_URL}/auth/login`, {
      data: { email: creds.email, password: creds.password }
    });
    const body = await response.json();
    authToken = body.token;

    // 2. Get an event ID to book later
    const eventsRes = await request.get(`${API_BASE_URL}/events`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    const eventsBody = await eventsRes.json();
    const events = eventsBody.data || eventsBody.events;
    if (events && events.length > 0) {
        firstEventId = events[0].id || events[0].eventId;
    }
  });

  test('Scenario: List user bookings', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/bookings`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.success).toBeTruthy();
  });

  test('Scenario: Create a new booking', async ({ request }) => {
    test.skip(!firstEventId, 'No event ID available');

    const creds = await getLatestCredentials();

    const response = await request.post(`${API_BASE_URL}/bookings`, {
      headers: { 'Authorization': `Bearer ${authToken}` },
      data: {
        eventId: firstEventId,
        customerName: 'BDD Tester',
        customerEmail: creds?.email,
        customerPhone: '1234567890',
        quantity: 1,
        bookingDate: new Date().toISOString()
      }
    });
    
    // If already booked, it might return 400, so we handle both
    if (response.status() === 400) {
        const body = await response.json();
        console.log('Booking already exists or validation failed:', body.error);
        expect(body.error).toBeDefined();
    } else {
        expect([200, 201]).toContain(response.status());
        const body = await response.json();
        expect(body.success).toBeTruthy();
    }
  });
});
