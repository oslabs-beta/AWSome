# Use an official Node.js image.
FROM node:18-alpine

# Set the working directory.
WORKDIR /app

# Copy package files and install dependencies.
COPY package*.json ./
RUN npm install

# Copy the rest of your application code.
COPY . .

# Expose the port Vite is running on.
EXPOSE 3000

# Run the dev server.
CMD ["npm", "run", "dev"]
