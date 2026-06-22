Feature: Search Functionality

  Scenario: Search for a valid product
    Given I am on the home page
    When I search for "Laptop"
    Then I should see search results page
    And I should see at least 1 product in the results

  Scenario: Search for a non-existent product
    Given I am on the home page
    When I search for "NonExistentProductXYZ"
    Then I should see search results page
    And I should see 3 products in the results due to mock behavior
