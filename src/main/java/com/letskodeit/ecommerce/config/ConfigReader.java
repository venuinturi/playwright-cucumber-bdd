package com.letskodeit.ecommerce.config;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class ConfigReader {

    private static Properties properties;
    private static final String FILE_PATH = "src/test/resources/config.properties";

    static {
        properties = new Properties();
        try (FileInputStream fis = new FileInputStream(FILE_PATH)) {
            properties.load(fis);
        } catch (IOException e) {
            System.err.println("Warning: config.properties file not found or could not be loaded at " + FILE_PATH);
        }
    }

    public static String getProperty(String key) {
        // 1. Check System Properties (e.g. -Demail=value)
        String value = System.getProperty(key);
        if (value != null && !value.trim().isEmpty()) {
            return value;
        }

        // 2. Check Environment Variables (e.g. EMAIL or LOGIN_EMAIL)
        String envKey = key.toUpperCase().replace(".", "_");
        value = System.getenv(envKey);
        if (value != null && !value.trim().isEmpty()) {
            return value;
        }
        
        value = System.getenv(key);
        if (value != null && !value.trim().isEmpty()) {
            return value;
        }

        // 3. Check properties file
        value = properties.getProperty(key);
        if (value != null && !value.trim().isEmpty()) {
            return value;
        }

        // 4. Default fallbacks for LetsKodeIt Practice site
        if ("email".equalsIgnoreCase(key)) {
            return "user@example.com";
        } else if ("password".equalsIgnoreCase(key)) {
            return "password123";
        } else if ("url".equalsIgnoreCase(key)) {
            return "https://ecommercepractice.letskodeit.com/";
        } else if ("browser".equalsIgnoreCase(key)) {
            return "chrome";
        }

        return null;
    }
}
