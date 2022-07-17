FROM node:14-alpine AS builder
WORKDIR "/app"
COPY . .
RUN rm -rf node_modules
#RUN npm install -g npm@latest
#RUN npm rebuild bcrypt --build-from-source
RUN npm install -force
RUN npm run build
#RUN npm prune --production
FROM node:14-alpine AS production
WORKDIR "/app"
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
CMD ["npm run", "migrations:run", "node", "dist/main"]