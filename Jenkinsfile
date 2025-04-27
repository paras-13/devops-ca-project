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

    stage('Set Environment Variables') {
      steps {
        script {
          // Set the .env file dynamically
          sh 'echo SECRET_KEY=${env.SECRET_KEY} > ./api/.env'
        }
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
