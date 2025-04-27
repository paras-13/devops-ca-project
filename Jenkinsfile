// pipeline {
//   agent any

//   stages {
//     stage('Checkout') {
//       steps {
//         checkout scm
//       }
//     }
//     stage('Build') {
//       steps {
//         bat 'docker-compose build'
//       }
//     }
//     stage('Deploy') {
//       steps {
//         bat 'docker-compose up -d'
//       }
//     }
//   }
// }
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Convert Line Endings') {
            steps {
                // PowerShell script to fix line endings in all .sh files recursively
                powershell '''
                    Get-ChildItem -Recurse -Filter *.sh | ForEach-Object {
                        $content = Get-Content $_.FullName
                        $content = $content -replace "`r", ""
                        Set-Content $_.FullName -Value $content -Encoding UTF8
                    }
                '''
            }
        }
        stage('Build') {
            steps {
                bat 'docker-compose build'
            }
        }
        stage('Deploy') {
            steps {
                bat 'docker-compose up -d'
            }
        }
    }
}



