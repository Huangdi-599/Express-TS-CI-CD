#!/usr/bin/env groovy
@Library('jenkins-shared-library')
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
        stage('Build Node.js'){
            steps{
                // buildNodejs is a function from the shared library
                buildNodejs()
            }
        }
        stage('Build Node.js Image'){
            steps{
                // buildNodeImage is a function from the shared library
                buildNodeImage()
            }
        }
        stage('Deploy Node.js'){
            steps{
                // deployNodejs is a function from the script.groovy file
                script{
                    gv.deployNodejs()
                }
            }
        }
    }
} 