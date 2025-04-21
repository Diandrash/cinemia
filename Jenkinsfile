pipeline {
    agent any
    environment {
        EXPO_TOKEN = credentials('expo-token') 
    }
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

        stage('Check EAS Username') {
            steps {
                bat '''
                    SET PATH=C:\\Users\\farel.shadeva\\AppData\\Roaming\\npm;%PATH%
                    eas whoami --non-interactive
                '''
            }
        }


        stage('Check GIT Version') {
            steps {
                bat 'set PATH=C:\\Users\\farel.shadeva\\AppData\\Local\\Programs\\Git\\cmd;%PATH% && git --version'
            }
        }

        stage('Build Android APK') {
            steps {
                bat '''
                    SET PATH=C:\\Users\\farel.shadeva\\AppData\\Roaming\\npm;%PATH%
                    set PATH=C:\\Users\\farel.shadeva\\AppData\\Local\\Programs\\Git\\cmd;%PATH%
                    eas build -p android --non-interactive --no-wait 
                '''
            }
        }

        stage('Wait & Download APK') {
            environment {
                AUTH = "Bearer ${EXPO_TOKEN}"
            }
            steps {
                script {
                    // Ambil buildId dari file JSON hasil build
                    def buildId = bat(
                        script: 'powershell -Command "(Get-Content build-info.json | ConvertFrom-Json).id"',
                        returnStdout: true
                    ).trim()
                    
                    echo "Build ID: ${buildId}"

                    // Polling Expo sampai statusnya "finished"
                    def buildUrl = ""
                    timeout(time: 15, unit: 'MINUTES') {
                        waitUntil {
                            bat """
                                powershell -Command "$headers = @{ Authorization = '$env:AUTH' }; Invoke-RestMethod -Uri 'https://api.expo.dev/v2/builds/${buildId}' -Headers $headers | ConvertTo-Json -Depth 10" > build-result.json
                            """

                            def result = readFile('build-result.json')
                            if (result.contains('"status":"finished"')) {
                                def match = result =~ /"buildUrl"\s*:\s*"([^"]+\.apk)"/
                                if (match) {
                                    buildUrl = match[0][1]
                                    echo "Download URL: ${buildUrl}"
                                }
                                return true
                            } else if (result.contains('"status":"errored"')) {
                                error("Expo build failed.")
                            }
                            return false
                        }
                    }

                    // Download APK
                    if (buildUrl) {
                        bat "mkdir build-output"
                        bat "curl -L -o build-output/app.apk ${buildUrl}"
                        echo "APK downloaded to: build-output/app.apk"
                    } else {
                        error("Failed to retrieve APK download URL.")
                    }
                }
            }
        }

    }

    post {
        success {
            archiveArtifacts artifacts: 'build-output/app.apk', fingerprint: true
        },
        always {
            echo 'Test completed'
        }
    }
}
