

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
     
     echo "this is the project id environment"+GOOGLE_PROJECT_ID;
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
    
    

    





}


}
