# Use the official Node.js image as the base image
FROM node:20.10.0

# Set the working directory
WORKDIR /app

# Install Expo CLI globally
RUN npm install -g expo-cli@0.10.17

# Copy the rest of your application code to the container
COPY . .

# Expose the port Expo uses
EXPOSE 19000

# Start the Expo server
CMD ["npx", "expo", "start", "--tunnel"]