package com.letskodeit.ecommerce.driver;

import com.letskodeit.ecommerce.config.ConfigReader;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.safari.SafariDriver;
import org.openqa.selenium.Dimension;

public class DriverManager {

    private static ThreadLocal<WebDriver> dr = new ThreadLocal<>();

    public static WebDriver getDriver() {
        if (dr.get() == null) {
            String browser = ConfigReader.getProperty("browser");
            if (browser == null) {
                browser = "chrome";
            }
            
            WebDriver driver;
            switch (browser.toLowerCase()) {
                case "firefox":
                    WebDriverManager.firefoxdriver().setup();
                    FirefoxOptions ffOptions = new FirefoxOptions();
                    ffOptions.addArguments("-headless");
                    driver = new FirefoxDriver(ffOptions);
                    driver.manage().window().setSize(new Dimension(1920, 1080));
                    break;
                case "safari":
                    driver = new SafariDriver();
                    driver.manage().window().setSize(new Dimension(1920, 1080));
                    break;
                case "chrome":
                default:
                    WebDriverManager.chromedriver().setup();
                    ChromeOptions chromeOptions = new ChromeOptions();
                    chromeOptions.addArguments("--headless"); // Enable headless execution for stability
                    chromeOptions.addArguments("--window-size=1920,1080");
                    driver = new ChromeDriver(chromeOptions);
                    break;
            }
            dr.set(driver);
        }
        return dr.get();
    }

    public static void quitDriver() {
        if (dr.get() != null) {
            dr.get().quit();
            dr.remove();
        }
    }
}
