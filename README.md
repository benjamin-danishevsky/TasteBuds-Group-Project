# Welcome to TasteBuds!

TasteBuds is a clone of Meetup, a popular social media platform for hosting and organizing in-person and virtual activities, gatherings, and events for people and communities of similar interests, hobbies, and professions. 

## Live Site Link
[Tastebuds](https://taste-buds-project.herokuapp.com/)

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
 
 ## Features
 
 ### Events
 All users can view listed events. Users can create events and join them
 ![image](https://user-images.githubusercontent.com/65691441/173885035-8af84d7c-849d-47ea-b740-713299d7a58f.png)
 ![image](https://user-images.githubusercontent.com/65691441/173885206-551252b4-6614-47f1-b61c-8d71dc918412.png)

### Groups 
Users can view a list of groups. Users can select a group to join them and can also see all events in the group. Upon joining a group they will show up on the user profile page.
![image](https://user-images.githubusercontent.com/65691441/173885355-070cbd23-80f9-495b-8601-d4724662250c.png)
![image](https://user-images.githubusercontent.com/65691441/173885728-daca70c2-cf50-482e-a3fb-b66350345c58.png)
![image](https://user-images.githubusercontent.com/65691441/173886250-6dbfa844-1b24-47ce-9f10-fc6e96206739.png)


### Date Filter
After signing in and going to their profile page, users can use a date selector to find upcoming events
![image](https://user-images.githubusercontent.com/65691441/173886744-3ff13e42-0c1c-45e4-9a07-800886c9b274.png)


### Search Bar
All users can search for events using the search bar
![image](https://user-images.githubusercontent.com/65691441/173886846-9c9c5e4d-1e8c-4b0e-9f54-34cdfaa14550.png)
