## Dockerfiles always starts with the FROM directive. This tells
## the Dockerfile what to start with. In this case we are starting
## with a base node container.
FROM node

## We add our code into the container
ADD node-demo-app/ /var/src/app/

## We run npm install which builds our code based on the package.json
RUN cd /var/src/app/ && npm install

## The CMD directive tells the container what command to
## execute on start up. This command starts our service.
CMD node /var/src/app/index.js

## Expose simply exposes the port that we will connect on.
EXPOSE 80
