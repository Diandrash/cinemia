pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Check Node.js Version') {
            steps {
                bat 'node --version'
            }
        }

        stage('Check npm Version') {
            steps {
                bat 'npm --version'
            }
        }

        stage('Check Expo Version') {
            steps {
                bat 'npx expo --version'
            }
        }

        stage('Build APK (Optional)') {
            steps {
                bat 'npx eas build --platform android --profile development'
            }
        }
    }

    post {
        always {
            echo 'Test completed'
        }
    }
}
