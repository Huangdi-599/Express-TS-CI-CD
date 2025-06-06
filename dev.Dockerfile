FROM node:18-alpine

ENV NODE_ENV=development \
    PORT=3000 \
    MONGODB_URI=mongodb://admin:admin@localhost:27017/express-ts-app?authSource=admin

# create app directory and ensure it exists
RUN mkdir -p /home/app
# Set the working directory
WORKDIR /home/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
