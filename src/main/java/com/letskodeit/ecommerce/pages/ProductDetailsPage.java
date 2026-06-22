package com.letskodeit.ecommerce.pages;

import com.letskodeit.ecommerce.base.BasePage;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class ProductDetailsPage extends BasePage {

    @FindBy(tagName = "h1")
    private WebElement productTitle;

    @FindBy(xpath = "//button[contains(., 'ADD TO BAG') or contains(., 'Add to Bag') or contains(., 'Add to bag')]")
    private WebElement addToBagButton;

    public ProductDetailsPage(WebDriver driver) {
        super(driver);
        wait.until(ExpectedConditions.urlContains("/product/"));
    }

    public String getProductTitle() {
        return wait.until(ExpectedConditions.visibilityOf(productTitle)).getText().trim();
    }

    public void clickAddToBag() {
        wait.until(ExpectedConditions.elementToBeClickable(addToBagButton)).click();
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
