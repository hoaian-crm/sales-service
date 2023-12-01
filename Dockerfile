FROM node:16

WORKDIR /usr/app

COPY ./package*.json .

# Install requirement package
RUN npm install
COPY . .

# Build from source
RUN npm run build

# Config run command
CMD [ "npm", "start" ]

# Api port
EXPOSE 3000