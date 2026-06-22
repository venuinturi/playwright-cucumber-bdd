Feature: Cart and Checkout Functionality

  Scenario: Add product to cart and verify cart page details
    Given I am on the home page
    When I search for "Laptop"
    And I click on the first product card
    And I click the ADD TO BAG button
    And I click on the header cart link
    Then I should see the product "Lambswool Crew Neck Jumper" in the cart
    And I should see the CHECKOUT button
