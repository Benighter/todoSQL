# To-Do List Application

This project is a simple and intuitive To-Do List application where you can **add**, **update**, and **delete** your tasks. It allows users to manage their tasks effectively with a clean and straightforward interface.

## Project Structure

The project is divided into several folders, each serving a specific purpose to keep the code organized:

- **`server/`**: This folder contains the back-end logic of the application, specifically the `server.js` file. It handles all server-side operations and API routes.
  
- **`client/`**: The client folder holds the static files of the application, including the `index.html`, `script.js`, and `style.css`. These files manage the front-end user interface and user interactions, interacting with the DOM to provide a seamless experience.

- **`Controllers/`**: This folder includes all the business logic and functionality of the application. It’s where all the core logic resides, such as task manipulation and interactions with the database. Importantly, **this folder does not interact with the DOM** (e.g., no `document.getElementById()`).

- **`dataBase/`**: This folder is responsible for the database connection and configuration. It ensures the application connects to the database to store and retrieve tasks.

- **`Router/`**: This folder is responsible for routing requests to the correct controllers.

- **`SQL/`**: This folder is responsible for executing the SQL queries to retrieve data from the database.

## Features

- **Add tasks**: Quickly add new tasks to your list.
- **Update tasks**: Edit the content of existing tasks.
- **Delete tasks**: Remove tasks you no longer need.

This structure ensures clear separation of concerns, making the application easy to maintain and expand in the future.

## Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/Benighter/todoSQL.git
cd todoSQL
npm install
npm i pg express cors dotenv

don't forget to create your own (.env file), where by you will store your database (Postgrest) configure  like your_username, host_name, database_name, postgress_password,  port 

cd server
nodemon server.js
