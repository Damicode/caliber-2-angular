

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
  
      stage(' Ng Version'){
            steps
                {
                sh ' ng --version'
                }
          }
    
    

    





}


}
