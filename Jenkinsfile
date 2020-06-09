

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
            echo "Something here"
        }


    }

    stage('Version'){
            steps
                {
                sh 'mvn --version'
                }
          }
    
        stage ("initialize") {
        steps {
        sh '''
        echo "PATH = ${PATH}"
        echo "M2_HOME = ${M2_HOME}"
        '''
        }
        }

    
        stage('Compile the App'){
        steps
           {
            
            sh 'mvn compile'
          }
        }



stage('package the App'){
        steps
        {
            sh "mvn clean package"
        }
    }

stage('Build the image for Docker'){

        steps
        {
            script
            {
                dockerImage = docker.build("${Register}:my-image")
            }
        }
}

stage ('Deploy image to DockerHub'){
    
    
    
      steps
        {
                script{
                  docker.withRegistry('', RegisterCrudential)
                    {
                     dockerImage.push("damier-test")
                    }
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
