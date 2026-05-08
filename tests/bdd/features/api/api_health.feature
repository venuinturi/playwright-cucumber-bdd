Feature: Health API
  As a system monitor
  I want to check the service health
  So that I can ensure the API is running correctly

  Scenario: Service is up and running
    When I request the service health status
    Then the response status should be 200
    And the health status should be "UP" or similar success indicator
