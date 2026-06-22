package com.letskodeit.ecommerce.stepdefinitions;

import com.letskodeit.ecommerce.driver.DriverManager;
import com.letskodeit.ecommerce.pages.HomePage;
import com.letskodeit.ecommerce.pages.SearchPage;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.WebDriver;
import org.testng.Assert;

public class SearchSteps {

    private WebDriver driver = DriverManager.getDriver();
    private HomePage homePage = new HomePage(driver);
    private SearchPage searchPage;

    @When("I search for {string}")
    public void iSearchFor(String product) {
        searchPage = homePage.searchFor(product);
    }

    @Then("I should see search results page")
    public void iShouldSeeSearchResultsPage() {
        String currentUrl = driver.getCurrentUrl();
        Assert.assertTrue(currentUrl.contains("search"), "Not on the search results page! Current URL: " + currentUrl);
    }

    @Then("I should see at least {int} product in the results")
    @Then("I should see at least {int} products in the results")
    public void iShouldSeeAtLeastProductInTheResults(int count) {
        int actualCount = searchPage.getProductCount();
        System.out.println("Products found in search: " + actualCount);
        Assert.assertTrue(actualCount >= count, "Expected at least " + count + " products but found " + actualCount);
    }

    @Then("I should see {int} products in the results due to mock behavior")
    public void iShouldSeeProductsInTheResultsDueToMockBehavior(int expectedCount) {
        int actualCount = searchPage.getProductCount();
        System.out.println("Products found (mock query): " + actualCount);
        Assert.assertEquals(actualCount, expectedCount, "Mock search result count did not match expected!");
    }
}
