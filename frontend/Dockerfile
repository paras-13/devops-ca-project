FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]


# Use a Debian-based image instead of Alpine
# FROM node:20-alpine

# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 5173
# CMD ["npm", "run", "dev", "--", "--host"]