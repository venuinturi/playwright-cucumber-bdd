Feature: User Authentication API
  As a new user
  I want to register and login through the API
  So that I can access protected resources

  Scenario: Register a new user
    Given I have a unique email and password
    When I send a POST request to "/auth/register"
    Then the API should return a "201" or "200" status
    And the response should contain the registration details

  Scenario: Login with newly registered credentials
    Given I am a registered user
    When I send a POST request to "/auth/login" with my credentials
    Then the API should return a "200" status
    And the response should contain a valid authentication token

  Scenario: Fail login with incorrect password
    Given I am a registered user
    When I attempt to login with an incorrect password
    Then the API should return an error status
    And the response success should be false
