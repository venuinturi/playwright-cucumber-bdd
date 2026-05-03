Feature: EventHub API
  As a registered user
  I want to interact with the EventHub API
  So that I can manage my events and profile programmatically

  Background:
    Given I have valid credentials from the database
    And I am logged in via the API

  Scenario: Fetch current user profile
    Then the API should return my correct email address

  Scenario: Fetch events list
    When I request the list of events
    Then I should receive a non-empty list of events

  Scenario: Fail authentication with invalid token
    When I request my profile with an invalid token
    Then the API should return an unauthorized status
