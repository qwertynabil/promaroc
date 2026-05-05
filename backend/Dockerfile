# Use a lightweight Node image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the backend code
COPY . .

# Generate Prisma client for database access
RUN npx prisma generate

# Expose the API port
EXPOSE 5000

# Command to run the backend in development mode
CMD ["npm", "run", "dev"]