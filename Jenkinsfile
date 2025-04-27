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
        stage('Fix Line Endings') {
    steps {
        powershell '''
            # This will recursively search for all .sh files and fix the line endings
            Get-ChildItem -Recurse -Filter *.sh | ForEach-Object {
                # Replace Windows line endings (\r\n) with Unix line endings (\n)
                $content = Get-Content $_.FullName
                $content = $content -replace "`r", ""  # Remove carriage return characters
                Set-Content $_.FullName -Value $content -Encoding UTF8
            }
        '''
    }
}
        stage('Set Executable Permissions') {
            steps {
                powershell '''
                    # PowerShell script to make the wait-for-it.sh file executable
                    $filePath = "./api/wait-for-it.sh"
                    # We give full control permissions to the file (Windows equivalent of chmod +x)
                    $acl = Get-Acl $filePath
                    $permission = "Everyone", "FullControl", "Allow"
                    $accessRule = New-Object System.Security.AccessControl.FileSystemAccessRule($permission[0], $permission[1], $permission[2])
                    $acl.AddAccessRule($accessRule)
                    Set-Acl $filePath $acl
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





