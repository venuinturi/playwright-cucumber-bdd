package com.letskodeit.ecommerce.base;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;
import com.letskodeit.ecommerce.pages.CartPage;

public class BasePage {
    protected WebDriver driver;
    protected WebDriverWait wait;

    @FindBy(css = "a[href*='/cart']")
    private WebElement cartIcon;

    public BasePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        PageFactory.initElements(driver, this);
    }

    public CartPage clickCart() {
        wait.until(ExpectedConditions.elementToBeClickable(cartIcon)).click();
        return new CartPage(driver);
    }
}
