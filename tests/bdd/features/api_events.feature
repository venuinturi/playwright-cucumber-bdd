Feature: Events API
  As a user
  I want to browse and manage events
  So that I can find interesting activities to attend

  Scenario: List all events
    When I request the list of events
    Then the response status should be 200
    And I should receive a non-empty list of events

  Scenario: Get specific event details
    Given there is at least one event available
    When I request the details of the first event
    Then the response status should be 200
    And the details should match the event ID
