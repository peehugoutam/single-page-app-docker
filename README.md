# single-page-app-docker

Deploying single page app using docker CI/CD on EC2

# Deploy code on git repo with PAT(repo, workflows) option

1. Create deploy.yml file that contain all code to create .tar and transfer it to EC2 then create build on EC2
2. Create Dockerfile in root directory

# On EC2 machine

1.  To kill port
    sudo lsof -i :8080

2.  Install Docker on EC2 ubutu machine
    sudo apt update

    sudo apt install -y \
     apt-transport-https \
     ca-certificates \
     curl \
     software-properties-common

    <!-- Add Docker’s Official GPG Key -->

    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

    <!-- Set Up the Docker Repository -->

    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

    <!-- Install Docker -->

    sudo apt update
    sudo apt install -y docker-ce
    sudo systemctl start docker
    sudo systemctl enable docker
    docker --version

3.  Ensure the .tar File Exists in the Correct Directory
    ls /home/<ec2-username>/single-page-app-docker.tar

4.  If the file is missing, re-upload it or manually transfer it using scp:
    scp -i key.pem single-page-app-docker.tar <ec2-username>@<ec2-ip>:/home/<ec2-username>/

5.  Load the Docker Image
    docker load -i /home/<ec2-username>/single-page-app-docker.tar

6.  Restart the Container with Correct Port Mapping
    docker ps -a
    docker stop single-page-app-docker
    docker rm single-page-app-docker
    docker run -d -p 8080:9000 --name single-page-app-docker single-page-app-docker:latest

7.  Test Again from the EC2 Instance
    curl http://localhost:8080
    curl http://localhost:9000

8.  try accessing http://<ec2-public-ip>:8080
