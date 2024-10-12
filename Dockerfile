# Step 1: Use an official Node.js image as the base image for building the app
FROM node:18 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and lock file to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app
RUN npm run build

# Step 2: Use a lightweight web server to serve the built app
FROM nginx:alpine

# Copy the built app from the previous stage to the Nginx web server's default location
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port that Nginx will run on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
