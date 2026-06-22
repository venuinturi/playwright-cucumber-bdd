# Selenium Automation Suite - LetsKodeIt Ecommerce Practice

This project is a Selenium WebDriver automation suite built with Java and TestNG for the [LetsKodeIt Ecommerce Practice site](https://ecommercepractice.letskodeit.com/).

## Project Structure
- **BasePage & BaseTest**: Core abstractions for WebDriver management and Page Object initialization.
- **Page Object Model (POM)**: Located in `src/main/java/com/letskodeit/ecommerce/pages/`.
- **Tests**: Located in `src/test/java/com/letskodeit/ecommerce/tests/`.
- **testng.xml**: Test suite configuration.

## Prerequisites
- Java 17 or higher
- Maven
- Google Chrome

## Running Tests
To run the tests from the command line:
```bash
mvn clean test
```

## Features
- **WebDriverManager**: Automatically handles driver binary management.
- **PageFactory**: Uses `@FindBy` annotations for cleaner locator management.
- **TestNG**: Comprehensive test execution and assertions.
