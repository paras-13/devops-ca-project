FROM node:20

WORKDIR /api

COPY package*.json ./

RUN npm install
COPY wait-for-it.sh .
RUN sed -i 's/\r$//' wait-for-it.sh
RUN chmod +x wait-for-it.sh

COPY . ./

EXPOSE 8800

CMD ["npm", "start"]


