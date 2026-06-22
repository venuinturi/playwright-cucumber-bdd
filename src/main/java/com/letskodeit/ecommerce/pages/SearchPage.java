package com.letskodeit.ecommerce.pages;

import com.letskodeit.ecommerce.base.BasePage;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;
import java.util.List;

public class SearchPage extends BasePage {

    @FindBy(css = "div[class*='ProductCard-module--root']")
    private List<WebElement> productCards;

    @FindBy(css = "span[class*='productName']")
    private List<WebElement> productNames;

    public SearchPage(WebDriver driver) {
        super(driver);
    }

    public int getProductCount() {
        return productCards.size();
    }

    public List<WebElement> getProductNames() {
        return productNames;
    }

    public ProductDetailsPage clickFirstProduct() {
        if (!productCards.isEmpty()) {
            WebElement firstProduct = wait.until(ExpectedConditions.elementToBeClickable(productCards.get(0)));
            firstProduct.click();
            return new ProductDetailsPage(driver);
        }
        throw new IllegalStateException("No products found to click on!");
    }
}
