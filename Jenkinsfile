

pipeline{

agent any

    environment{
        Register ="damier85/damier-raymond"
        RegisterCrudential ="Mydocker20"
        dockerImage =""
        forTheAWSecr="367484709954.dkr.ecr.us-east-2.amazonaws.com/caliber-angular"
        Region ="ecr:us-east-2"
        ID="damierTestEcr"


    }
 
  stages{

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
  
  
  
      stage(' Ng Version'){
            steps
                {
                sh ' ng --version'
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
  
   stage(' Build'){
            steps
                {
                sh 'ng build'
                }
          }
    
    
 
        stage('Building the image'){
         
          
           steps
        {
            script
            {
              sh'docker image prune'
                dockerImage = docker.build("${Register}:my-image-Angular")
              echo "TESTING IF IMAGE IS SUCCEED"
            }
        }
          
        }
    


   stage('AWS Building Bloc'){

        steps
        {
            script
            {
                dockerImage = docker.build("${forTheAWSecr}")
            }
        }
}
  
   stage ('Deploy image to AWS Ecr'){

        steps
        {
                script{
                  
                    docker.withRegistry('https://367484709954.dkr.ecr.us-east-2.amazonaws.com', "${REGION}:${ID}")
                    {
                        
                        dockerImage.push("damier-test")
                   
                    }
                }
            
        }

}

    stage ("Remove unUsed docker image"){
        steps
        {
            sh "docker rmi ${Register}:my-image"
        }
    }

 



}

}
