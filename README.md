# Northcoders News API

# Project Setup Locally

1. git clone https://github.com/ladantork/News_API_Solo.git
2. News_API_Solo

# Creating the Databases
This project uses two databases: one for real-looking dev data and another for simpler test data.
You will need to create two .env files for your project:
 .env.test and add PGDATABASE=nc_news_test into the file
 .env.development add PGDATABASE=nc_news  into the file.
 database name for this environment located in /db/setup.sql

 # npm install
  run <npm install>in your terminal 
  run <npm i jest>in your terminal

# SCRIPTS
<npm run setup-dbs>: Essential for setting up the databases.
<npm run seed>:populating the databases with initial data.
<npm run test>:running tests using Jest.
<npm run prepare>: Essential for installing Husky during the preparation phase, enabling Git hook management.

# Dependencies
<npm install dotenv>
<npm install pg>
<npm install pg-format>