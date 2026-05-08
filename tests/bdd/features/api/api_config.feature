Feature: Config API
  As a client application
  I want to retrieve system configuration
  So that I can adapt my UI and behavior accordingly

  Scenario: Retrieve system configuration
    When I request the system configuration
    Then the response status should be 200
    And the configuration should contain valid system settings
