FROM node:latest AS builder
WORKDIR "/app"
COPY . .
RUN rm -rf node_modules
RUN npm install --legacy-peer-deps
RUN npm run build

FROM node:14-alpine AS production
WORKDIR "/app"
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
CMD [ "sh", "-c", "npm run start:prod"]