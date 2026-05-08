import { test, expect, APIRequestContext } from '@playwright/test';
import { getLatestCredentials } from '../../../utils/db';

const API_BASE_URL = 'https://api.eventhub.rahulshettyacademy.com/api';

/**
 * Simplified BDD Runner for Playwright
 * This mimics the Cucumber structure using standard Playwright tests.
 */
test.describe('Feature: EventHub API', () => {
  let authToken: string;
  let requestContext: APIRequestContext;
  let lastResponse: any;

  // --- BACKGROUND ---
  
  test.beforeAll(async ({ playwright }) => {
    requestContext = await playwright.request.newContext();
  });

  test.beforeEach(async () => {
    // Given I have valid credentials from the database
    const creds = await getLatestCredentials();
    if (!creds) throw new Error('No credentials found in database');

    // And I am logged in via the API
    const response = await requestContext.post(`${API_BASE_URL}/auth/login`, {
      data: { email: creds.email, password: creds.password }
    });
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    authToken = body.token;
  });

  // --- SCENARIO: Fetch current user profile ---
  
  test('Scenario: Fetch current user profile', async () => {
    // When/Then combined for this simple scenario
    const response = await requestContext.get(`${API_BASE_URL}/auth/me`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    
    // Then the API should return my correct email address
    const creds = await getLatestCredentials();
    expect(body.user.email).toBe(creds?.email);
  });

  // --- SCENARIO: Fetch events list ---
  
  test('Scenario: Fetch events list', async () => {
    // When I request the list of events
    const response = await requestContext.get(`${API_BASE_URL}/events`, {
      headers: { 'Authorization': `Bearer ${authToken}` },
      params: { page: 1, limit: 10 }
    });
    
    // Then I should receive a non-empty list of events
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    const events = body.data || body.events;
    expect(Array.isArray(events)).toBeTruthy();
    expect(events.length).toBeGreaterThan(0);
  });

  // --- SCENARIO: Fail authentication with invalid token ---
  
  test('Scenario: Fail authentication with invalid token', async () => {
    // When I request my profile with an invalid token
    const response = await requestContext.get(`${API_BASE_URL}/auth/me`, {
      headers: { 'Authorization': `Bearer invalid_token` }
    });

    // Then the API should return an unauthorized status
    expect(response.status()).toBe(401);
  });
});
