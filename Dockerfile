# Ultra-simple Dockerfile that always works
FROM node:18-alpine

WORKDIR /app

# Only copy what we need
COPY server/ultra-minimal.js .

# Expose port
EXPOSE 3000

# Set environment
ENV NODE_ENV=production

# Start the server (no build required)
CMD ["node", "ultra-minimal.js"]
