# FROM node:20

# WORKDIR /api

# COPY package*.json ./

# RUN npm install
# COPY wait-for-it.sh .
# RUN sed -i 's/\r$//' wait-for-it.sh
# RUN chmod +x wait-for-it.sh

# COPY . ./

# EXPOSE 8800

# CMD ["npm", "start"]


FROM node:20

WORKDIR /api

# Install dos2unix to fix line endings in the wait-for-it.sh script
RUN apt-get update && apt-get install -y dos2unix

COPY package*.json ./

RUN npm install

# Copy the wait-for-it script and convert its line endings to Unix format
# COPY wait-for-it.sh .
# RUN dos2unix wait-for-it.sh && chmod +x wait-for-it.sh

COPY . ./

EXPOSE 8800

CMD ["npm", "start"]
