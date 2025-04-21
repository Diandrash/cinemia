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
            steps {
                script {
                    // Ambil build ID dari file JSON
                    def buildId = bat(
                        script: 'powershell -Command "(Get-Content build-info.json | ConvertFrom-Json).id"',
                        returnStdout: true
                    ).trim()

                    echo "Build ID: ${buildId}"

                    // Poll status sampai selesai
                    def buildUrl = ''
                    timeout(time: 15, unit: 'MINUTES') {
                        waitUntil {
                            def result = bat(
                                script: "curl -s https://api.expo.dev/v2/builds/${buildId} -H \"Authorization: Bearer ${env.EXPO_TOKEN}\"",
                                returnStdout: true
                            ).trim()

                            echo "Build Status JSON: ${result}"

                            if (result.contains('"status":"finished"')) {
                                def match = result =~ /"artifacts":\{"buildUrl":"([^"]+\.apk)"/
                                if (match) {
                                    buildUrl = match[0][1]
                                    echo "Build URL: ${buildUrl}"
                                }
                                return true
                            } else if (result.contains('"status":"errored"')) {
                                error("Expo Build Failed!")
                            }
                            return false
                        }
                    }

                    // Download APK
                    if (buildUrl) {
                        bat "curl -o build-output/app.apk ${buildUrl}"
                        echo "APK downloaded to build-output/app.apk"
                    } else {
                        error("Gagal mendapatkan URL APK dari build result.")
                    }
                }
            }
        }

    post {
        always {
            echo 'Test completed'
        }
    }
}
