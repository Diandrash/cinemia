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

        stage('Check EAS Version') {
            steps {
                bat '''
                    SET PATH=C:\\Users\\farel.shadeva\\AppData\\Roaming\\npm;%PATH%
                    eas --version
                '''
            }
        }


        stage('Build Android Preview') {
            steps {
                bat '''
                    SET PATH=C:\\Users\\farel.shadeva\\AppData\\Roaming\\npm;%PATH%
                    eas build -p android --profile preview --token %EXPO_TOKEN%
                '''
            }
        }

    }

    post {
        always {
            echo 'Test completed'
        }
    }
}
