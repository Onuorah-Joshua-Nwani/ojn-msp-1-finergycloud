FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build || echo "Frontend placeholder"
CMD ["npm", "start"]
