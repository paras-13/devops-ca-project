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
                bat 'find . -name "wait-for-it.sh" -print0 | xargs -0 -n 1 dos2unix'
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
