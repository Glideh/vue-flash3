ARG NODE_VERSION=24
ARG ALPINE_VERSION=3.22
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION}

RUN mkdir -p /app

WORKDIR /app

# Prevent the reinstallation of node modules at every changes in the source code
COPY ./app/package*.json ./
RUN npm i

COPY ./app ./

CMD ["npm", "run", "dev"]
