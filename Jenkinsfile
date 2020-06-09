

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
         
          
           steps
        {
            script
            {
                dockerImage = docker.build("${Register}:my-image-Angular")
            }
        }
          
        }
    





}


}
