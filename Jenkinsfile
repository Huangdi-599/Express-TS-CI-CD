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
                    sshagent(['ec2-server']) {
                        sh 'ssh'
                    }
                }
            }
        }
    }
} 