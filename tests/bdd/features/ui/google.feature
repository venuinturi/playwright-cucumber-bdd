Feature: Google Search
  As an internet user
  I want to search for information on Google
  So that I can find relevant websites and resources

  Scenario: Search for Playwright
    Given I am on the Google homepage
    When I search for "Playwright"
    Then I should see search results
