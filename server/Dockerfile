FROM node:16.15.0
WORKDIR /server/
COPY package*.json /server/
RUN yarn
COPY . .
EXPOSE 8000
CMD [ "yarn", "start" ]