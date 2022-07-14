FROM node:14-alpine AS builder
WORKDIR '/app'
COPY . .
RUN npm i
RUN npm run build

FROM node:14-alpine AS production
WORKDIR '/app'
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
CMD ["sh", "-c" 'npm run start:prod']

#FROM node:14-alpine AS builder
# Create app directory
##WORKDIR /usr/src/app
# A wildcard is used to ensure both package.json AND package-lock.json are copied
##COPY package*.json ./
# Install app dependencies
##RUN npm install
# Bundle app source
#COPY . .
# Creates a "dist" folder with the production build
#RUN npm run build
# Start the server using the production build
#CMD [ "node", "dist/main.js" ]





