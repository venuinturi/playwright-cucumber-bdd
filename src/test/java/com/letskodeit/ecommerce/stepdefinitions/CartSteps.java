package com.letskodeit.ecommerce.stepdefinitions;

import com.letskodeit.ecommerce.base.BasePage;
import com.letskodeit.ecommerce.driver.DriverManager;
import com.letskodeit.ecommerce.pages.CartPage;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.WebDriver;
import org.testng.Assert;

public class CartSteps {

    private WebDriver driver = DriverManager.getDriver();
    private CartPage cartPage;

    @When("I click on the header cart link")
    public void iClickOnTheHeaderCartLink() {
        BasePage basePage = new BasePage(driver);
        cartPage = basePage.clickCart();
    }

    @Then("I should see the product {string} in the cart")
    public void iShouldSeeTheProductInTheCart(String productName) {
        boolean isPresent = cartPage.isProductInCart(productName);
        Assert.assertTrue(isPresent, "Product '" + productName + "' was not found in the cart!");
    }

    @Then("I should see the CHECKOUT button")
    public void iShouldSeeTheCheckoutButton() {
        boolean isDisplayed = cartPage.isCheckoutButtonDisplayed();
        Assert.assertTrue(isDisplayed, "Checkout button is not displayed on the cart page!");
    }
}
