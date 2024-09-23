# Use the official Node.js image with the specified version
FROM node:20.11.0

# Set the working directory
WORKDIR /

# Copy package.json and package-lock.json (if available)
COPY server/package*.json ./server/

# Install dependencies
RUN cd server && npm install

# Copy the rest of the application files
COPY . .

# Expose the port your server runs on (change as necessary)
EXPOSE 3000

# Command to start the server
CMD ["npm", "run", "start", "--prefix", "server"]
