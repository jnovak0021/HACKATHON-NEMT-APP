# Use the official Node.js image as the base image
FROM node:20.10.0

# Set the working directory
WORKDIR /app

# Install Expo CLI globally
RUN npm install -g expo-cli @expo/ngrok

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Expose the port Expo uses
EXPOSE 19000

# Start the Expo server
CMD ["npx", "expo", "start", "--tunnel"]