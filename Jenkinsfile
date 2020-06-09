

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
                sh 'ng build'
                }
          }
    
    
 
        stage('Building the image'){
          steps{
             sh 'docker build . -t caliber-2-angular:damier-latest'
          }
        }
    





}


}
