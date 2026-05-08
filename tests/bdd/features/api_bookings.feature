Feature: Bookings API
  As a registered user
  I want to book events
  So that I can attend them

  Background:
    Given I have valid account credentials in the database
    And I am logged in via the API

  Scenario: List user bookings
    When I request my list of bookings
    Then the response status should be 200
    And I should receive my booking history

  Scenario: Create a new booking
    Given there is at least one event available
    When I book the first available event via API
    Then the response status should be 201 or 200
    And the booking should be confirmed
