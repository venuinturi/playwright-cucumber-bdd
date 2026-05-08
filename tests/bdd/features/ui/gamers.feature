Feature: Gamers Dashboard and Tic-Tac-Toe
  As a gamer
  I want to view my stats and play Tic-Tac-Toe
  So that I can track my progress and compete with others

  Scenario: Dashboard elements are visible
    Given I am on the Gamers Dashboard
    Then I should see the "Total Matches" stat
    And I should see the "Leaderboard" section
    And I should see the "Recent Matches" section

  Scenario: Navigation to New Match page
    Given I am on the Gamers Dashboard
    When I click the "New Match" link
    Then I should be navigated to the match recording page

