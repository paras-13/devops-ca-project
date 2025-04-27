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
                powershell '''
                    Get-ChildItem . -Recurse -Filter "wait-for-it.sh" | ForEach-Object {
                        $content = Get-Content $_.FullName
                        $content = $content -replace "\`r", ""
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

