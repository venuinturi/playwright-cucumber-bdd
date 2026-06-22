package com.letskodeit.ecommerce.pages;

import com.letskodeit.ecommerce.base.BasePage;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class HomePage extends BasePage {

    @FindBy(id = "searchInput")
    private WebElement searchInput;

    @FindBy(css = "button[aria-label='Search']")
    private WebElement searchIcon;

    @FindBy(css = "a[href*='/account/orders']")
    private WebElement loginLink;

    public HomePage(WebDriver driver) {
        super(driver);
    }

    public void clickLogin() {
        wait.until(ExpectedConditions.elementToBeClickable(loginLink)).click();
    }

    public SearchPage searchFor(String product) {
        wait.until(ExpectedConditions.elementToBeClickable(searchIcon)).click();
        wait.until(ExpectedConditions.visibilityOf(searchInput));
        searchInput.clear();
        searchInput.sendKeys(product);
        searchInput.sendKeys(Keys.ENTER);
        wait.until(ExpectedConditions.urlContains("search"));
        return new SearchPage(driver);
    }
}

