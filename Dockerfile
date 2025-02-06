# Use an official Node.js image.
FROM node:23.6.0

# Set the working directory.
WORKDIR /app

# Copy package files and install dependencies.
COPY . /app
RUN npm install

# Copy the rest of your application code.
# Expose the port Vite is running on.
EXPOSE 5173

# Run the dev server.
CMD ["npm", "run", "dev"]