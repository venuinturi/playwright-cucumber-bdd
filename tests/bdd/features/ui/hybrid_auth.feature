Feature: Hybrid Authentication Flow
  As a developer
  I want to register users via API for speed
  And verify their login works through the actual UI
  So that I have a robust and efficient test suite

  Scenario: Register via API and verify Login via UI
    Given I have registered a new user via the "/auth/register" API
    When I navigate to the EventHub login page
    And I enter the credentials used during API registration
    Then I should be successfully logged into the EventHub dashboard
