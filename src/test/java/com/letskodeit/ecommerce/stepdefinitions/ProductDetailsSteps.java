package com.letskodeit.ecommerce.stepdefinitions;

import com.letskodeit.ecommerce.driver.DriverManager;
import com.letskodeit.ecommerce.pages.HomePage;
import com.letskodeit.ecommerce.pages.ProductDetailsPage;
import com.letskodeit.ecommerce.pages.SearchPage;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.WebDriver;
import org.testng.Assert;

public class ProductDetailsSteps {

    private WebDriver driver = DriverManager.getDriver();
    private SearchPage searchPage;
    private ProductDetailsPage detailsPage;

    @When("I click on the first product card")
    public void iClickOnTheFirstProductCard() {
        searchPage = new SearchPage(driver);
        detailsPage = searchPage.clickFirstProduct();
    }

    @Then("the product title should be {string}")
    public void theProductTitleShouldBe(String expectedTitle) {
        String actualTitle = detailsPage.getProductTitle();
        System.out.println("Actual product title: " + actualTitle);
        Assert.assertEquals(actualTitle, expectedTitle, "Product details page title did not match expected!");
    }

    @When("I click the ADD TO BAG button")
    public void iClickTheAddToBagButton() {
        detailsPage.clickAddToBag();
    }

    @Then("the product should be added to the bag successfully")
    public void theProductShouldBeAddedToTheBagSuccessfully() {
        System.out.println("Product successfully added to the bag.");
        // Additional assertions can be placed here if cart page verification is added
    }
}
