package com.letskodeit.ecommerce.stepdefinitions;

import com.letskodeit.ecommerce.config.ConfigReader;
import com.letskodeit.ecommerce.driver.DriverManager;
import io.cucumber.java.After;
import io.cucumber.java.Before;
import org.openqa.selenium.WebDriver;

public class Hooks {

    @Before
    public void setUp() {
        WebDriver driver = DriverManager.getDriver();
        driver.manage().deleteAllCookies();
        String url = ConfigReader.getProperty("url");
        driver.get(url);
        try {
            Thread.sleep(2000); // Allow React SPA layout and state hydration
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    @After
    public void tearDown() {
        DriverManager.quitDriver();
    }
}
