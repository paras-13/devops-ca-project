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

COPY package*.json ./

RUN npm install
COPY wait-for-it.sh .

# Fix line endings to avoid issues with Windows-style line endings
RUN sed -i 's/\r$//' wait-for-it.sh

# Ensure that the script has executable permissions
RUN chmod +x wait-for-it.sh

# Debugging: Print out the content of wait-for-it.sh to ensure it's correct
RUN cat -v wait-for-it.sh  # This will display any \r characters

COPY . ./

EXPOSE 8800

CMD ["npm", "start"]
