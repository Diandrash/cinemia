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

        stage('Install EAS package globally') {
            steps {
                bat 'npm install -g eas-cli'
            }
        }

        stage('Check EAS package Version') {
            steps {
                bat 'eas --version'
            }
        }

        stage('Build APK (Optional)') {
            steps {
                bat 'eas build -p android --profile preview'
            }
        }
    }

    post {
        always {
            echo 'Test completed'
        }
    }
}
