Feature: Login Functionality

  Scenario: Navigate to Login Page
    Given I am on the home page
    When I click on the login link
    Then I should be navigated to the login page

  Scenario: Successful Login with mock credentials
    Given I am on the home page
    And I click on the login link
    When I login with secure credentials
    Then I should be logged in successfully and redirected to the orders page

  Scenario: Successful Logout
    Given I am on the home page
    And I click on the login link
    And I login with secure credentials
    When I click the logout button
    Then I should be logged out successfully and redirected to the home page
