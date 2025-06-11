#!/usr/bin/env groovy
//Global shared libary 
@Library('jenkins-shared-library')

//project specific shared libary 
// libarary identifier: 'jenkins-shared-libary@master', retriever:modernSCM([
//     $class:'GitSCMSource',
//     remote:'shared-libary-repo-url',
//     credentialsId:'crendential-id-on-jenkins'
// ])
def gv
pipeline{
    agent any
    stages{
        stage('Init'){
            steps{
                script{
                    gv=load 'script.groovy'
                }
            }
        }
        // stage('Build App'){
        //     steps{
        //         buildNodejs()

        //     }
        // }
        stage('Build Docker Image'){
            steps{
                buildDocker('my-node-app-image')
            }
        }
        stage('Compose Up'){
            steps{
                composeDocker('my-node-app')
            }
        }
        // stage('Compose Down'){
        //     steps{
        //         composeDown('my-node-app')
        //     }
        // }
        stage('Deploy Node.js'){
            steps{
                // deployNodejs is a function from the script.groovy file
                script{
                    gv.deployNodejs()
                    def shellCmd  = "bash ./server-cmd.sh ${imageName} ${containerName}"
                    sshagent(['ec2-server']) {
                        sh "scp -o StrictHostKeyChecking=no ./server-cmd.sh ec2-user@ec2-server:/home/ec2-user/server-cmd.sh"
                        sh "scp -o StrictHostKeyChecking=no docker-compose.yaml ec2-user@ec2-server:/home/ec2-user/docker-compose.yaml"
                        sh "ssh -o StrictHostKeyChecking=no ec2-user@ec2-server '${shellCmd}'"
                    }
                }
            }
        }
    }
} 