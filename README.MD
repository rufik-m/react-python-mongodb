to run development environment: docker-compose up -d (-d - means starts in backround)
to run production environemnt: docker-compose -f docker-compose-prod.yml up --build

Note: there is issue when switching between dev adn prod runs above as bontainers are not rebuidl automatically and in dev mode still try to us prod dockerfile build. Solution is to do 'docker-compose build" before doing "docker-compose up"

details: https://medium.com/swlh/how-to-set-up-a-react-app-with-a-flask-and-mongodb-backend-using-docker-19b356180199