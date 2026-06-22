pipeline {
    agent any

    triggers {
        // Run daily at 2:00 AM
        cron('0 2 * * *')
    }

    environment {
        BROWSER = 'chrome'
        RECIPIENT_EMAIL = 'recipient@example.com' // Replace with your email address or configure in Jenkins
        // Bind Jenkins credentials to secure environment variables
        EMAIL = credentials('letskodeit-email')
        PASSWORD = credentials('letskodeit-password')
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout code from Git repository
                checkout scm
            }
        }

        stage('Build & Clean') {
            steps {
                // Compile and verify dependencies
                sh 'mvn clean compile'
            }
        }

        stage('Run Tests') {
            steps {
                // Run tests, passing configuration overrides
                sh "mvn test -Dbrowser=${BROWSER} -Demail=${EMAIL} -Dpassword=${PASSWORD}"
            }
        }
    }

    post {
        always {
            // Archive Cucumber HTML/JSON reports and TestNG results
            archiveArtifacts artifacts: 'target/cucumber-reports/**/*, target/surefire-reports/**/*', allowEmptyArchive: true
            
            // Publish TestNG results (if TestNG Jenkins plugin is installed)
            catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                testng()
            }
            
            // Send email notification with Cucumber test reports attached
            emailext (
                subject: "Jenkins Build #${BUILD_NUMBER} - ${currentBuild.currentResult}: E-Commerce Test Execution",
                body: """<h3>Build Status: ${currentBuild.currentResult}</h3>
                         <p>E-commerce Cucumber/Selenium tests run completed for Build #${BUILD_NUMBER}.</p>
                         <p>Detailed HTML report is attached to this email.</p>
                         <p>Check the build console and test reports in Jenkins: <a href="${BUILD_URL}">${BUILD_URL}</a></p>""",
                to: "${RECIPIENT_EMAIL}",
                attachmentsPattern: 'target/cucumber-reports/index.html',
                recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']],
                mimeType: 'text/html'
            )
        }
    }
}
