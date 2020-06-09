

pipeline{

agent any

    environment{
        Register ="damier85/damier-raymond"
        RegisterCrudential ="Mydocker20"
        dockerImage =""
        forTheAWSecr="367484709954.dkr.ecr.us-east-2.amazonaws.com/caliber-batch"
        Region ="ecr:us-east-2"
        ID="damierTestEcr"


    }
     tools{
     maven 'maven-3'

     }
stages{

    stage ('Clonning from git'){

        steps
        {
            echo "Something here happening"
        }


    }

    stage(' Node Version'){
            steps
                {
                sh 'node --version'
                }
          }
  
     stage(' NPM Version'){
            steps
                {
                sh ' npm --version'
                }
          }
  
  stage ('Init'){
    
    steps{
         sh '''#!/bin/bash
     echo "JAVA_HOME = ${JAVA_HOME}";
     echo "PATH = ${PATH}";
     echo "MAVEN_HOME = ${M2_HOME}";
     
   
     npm install -g @angular/cli@6.0.8;
     npm install
    '''
      
    }
    
  }
  
      stage(' Ng Version'){
            steps
                {
                sh ' ng --version'
                }
          }
  
   stage(' Build'){
            steps
                {
                sh ' ng build'
                }
          }
    
    
    stage('Build Angular & SonarScanner'){
            steps{
                sh 'ng build sonar:sonar'
            }
        }

        stage("Quality Gate for Sonar") {
            steps {
                waitForQualityGate abortPipeline: true
            }
        }

        stage('Build image'){
            sh 'docker build . -t caliber-angular:damier-latest'
        }
    





}


}
