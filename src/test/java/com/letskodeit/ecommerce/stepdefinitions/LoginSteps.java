package com.letskodeit.ecommerce.stepdefinitions;

import com.letskodeit.ecommerce.config.ConfigReader;
import com.letskodeit.ecommerce.driver.DriverManager;
import com.letskodeit.ecommerce.pages.HomePage;
import com.letskodeit.ecommerce.pages.LoginPage;
import com.letskodeit.ecommerce.pages.OrdersPage;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import java.time.Duration;

public class LoginSteps {

    private WebDriver driver = DriverManager.getDriver();
    private HomePage homePage = new HomePage(driver);
    private LoginPage loginPage;
    private OrdersPage ordersPage;

    @Given("I am on the home page")
    public void iAmOnTheHomePage() {
        String currentUrl = driver.getCurrentUrl();
        Assert.assertTrue(currentUrl.contains("ecommercepractice.letskodeit.com"), "Not on the ecommerce practice homepage! Current URL: " + currentUrl);
    }

    @When("I click on the login link")
    public void iClickOnTheLoginLink() {
        homePage.clickLogin();
        loginPage = new LoginPage(driver);
    }

    @Then("I should be navigated to the login page")
    public void iShouldBeNavigatedToTheLoginPage() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.urlContains("login"));
        String currentUrl = driver.getCurrentUrl();
        Assert.assertTrue(currentUrl.contains("login"), "Navigation to login page failed! Current URL: " + currentUrl);
    }

    @When("I login with email {string} and password {string}")
    public void iLoginWithEmailAndPassword(String email, String password) {
        loginPage.login(email, password);
    }

    @When("I login with secure credentials")
    public void iLoginWithSecureCredentials() {
        String email = ConfigReader.getProperty("email");
        String password = ConfigReader.getProperty("password");
        loginPage.login(email, password);
    }

    @Then("I should be logged in successfully and redirected to the orders page")
    public void iShouldBeLoggedInSuccessfullyAndRedirectedToTheOrdersPage() {
        String currentUrl = driver.getCurrentUrl();
        Assert.assertTrue(currentUrl.contains("/account/orders"), "Successful login redirection failed! Current URL: " + currentUrl);
    }

    @When("I click the logout button")
    public void iClickTheLogoutButton() {
        ordersPage = new OrdersPage(driver);
        homePage = ordersPage.clickLogout();
    }

    @Then("I should be logged out successfully and redirected to the home page")
    public void iShouldBeLoggedOutSuccessfullyAndRedirectedToTheHomePage() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.not(ExpectedConditions.urlContains("account")));
        String currentUrl = driver.getCurrentUrl();
        Assert.assertTrue(!currentUrl.contains("account") && !currentUrl.contains("login"), 
            "Logout redirection failed! Current URL: " + currentUrl);
    }
}
