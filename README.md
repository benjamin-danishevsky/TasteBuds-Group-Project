# Welcome to TasteBuds!

TasteBuds is a clone of Meetup, a popular social media platform for hosting and organizing in-person and virtual activities, gatherings, and events for people and communities of similar interests, hobbies, and professions. 


## Technologies Used
- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
- ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
- ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
- ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
- ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
-  ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)


## Installation

1. Clone the repository ```https://github.com/benjamin-danishevsky/TasteBuds-Group-Project.git```
2. Install dependencies from the root directory ```pipenv install```
3. Install dependencies for the frontend from the ```react-app``` directory ```cd react-app > npm install```
4. Create a POSTGRESQL user with CREATEDB and PASSWORD in PSQL. 
    - ```CREATE USER <name> WITH CREATEDB PASSWORD <'password'>```
5. Create a .env file base on the .env.example given in the backend folder.
6. Create Database, Migrate, and Seed models.
    - ```flask db upgrade```
    - ```flask db seed all```
7. Start the services in the root directory. (Make sure you are in the shel with ```pipenv shell```)
    - ```flask run```
8. Start the services in the react-app directory.
	- ```npm start```
 
