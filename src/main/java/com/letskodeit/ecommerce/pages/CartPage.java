package com.letskodeit.ecommerce.pages;

import com.letskodeit.ecommerce.base.BasePage;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class CartPage extends BasePage {

    @FindBy(xpath = "//button[contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'checkout')]")
    private WebElement checkoutButton;

    public CartPage(WebDriver driver) {
        super(driver);
        wait.until(ExpectedConditions.urlContains("/cart"));
    }

    public boolean isProductInCart(String productName) {
        // Look for the product name text on the cart page
        try {
            WebElement productEl = wait.until(ExpectedConditions.visibilityOfElementLocated(
                    By.xpath("//*[contains(text(), '" + productName + "')]")
            ));
            return productEl.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isCheckoutButtonDisplayed() {
        return wait.until(ExpectedConditions.visibilityOf(checkoutButton)).isDisplayed();
    }
}
