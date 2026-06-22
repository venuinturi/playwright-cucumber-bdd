Feature: Product Details and Add to Bag

  Scenario: Verify product details and adding to bag
    Given I am on the home page
    When I search for "Laptop"
    And I click on the first product card
    Then the product title should be "Lambswool Crew Neck Jumper"
    When I click the ADD TO BAG button
    Then the product should be added to the bag successfully
