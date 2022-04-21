FROM node:18-alpine AS development
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY ./web/package.json .
RUN npm install
# Copy app files
COPY . .
# Expose port
EXPOSE 3001
# Start the app
CMD [ "npm", "start" ]