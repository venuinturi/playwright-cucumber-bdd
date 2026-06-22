package com.letskodeit.ecommerce.pages;

import com.letskodeit.ecommerce.base.BasePage;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class OrdersPage extends BasePage {

    @FindBy(xpath = "//span[text()='Logout']")
    private WebElement logoutSpan;

    public OrdersPage(WebDriver driver) {
        super(driver);
        wait.until(ExpectedConditions.urlContains("/account/orders"));
        try {
            Thread.sleep(1500); // Allow React event listener hydration
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    public HomePage clickLogout() {
        wait.until(ExpectedConditions.elementToBeClickable(logoutSpan)).click();
        return new HomePage(driver);
    }
}
