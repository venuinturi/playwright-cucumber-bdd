Feature: EventHub User Interface
  As an EventHub user
  I want to manage my account and events through the web interface
  So that I can successfully book and create events

  Background:
    Given I have valid account credentials in the database

  Scenario: Successful login to EventHub
    Given I am on the EventHub login page
    When I login with my database credentials
    Then I should be redirected to the EventHub home page
    And I should see the "Events" and "My Bookings" navigation links

  Scenario: Book an existing event
    Given I am logged in to EventHub
    When I navigate to the "Events" page
    And I book the first available event
    Then I should see a "Booking Confirmed" confirmation message
