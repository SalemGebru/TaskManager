# TaskManager- Planpal

A simple web application to keep track of to-do items.

##Installation
1,Clone repository

   git clone https://github.com/SalemGebru/TaskManager.git

2,Install backend dependencies
  cd backend
  composer install

3,Set up your .env file for Laravel
  cp .env.example .env
  php artisan key:generate

4,Run database migrations
  php artisan migrate

5,Install frontend dependencies
  cd frontend
  cd frontend-task
  npm install

6,Start the backend server
  cd..
  cd..
  cd backend
  php artisan serve

7,Start the frontend server
  cd..
  cd frontend
  npm start

8,Once both servers are running, you can interact with the application via the UI at http://localhost:5173. You can create an account, log in, and start adding tasks to your task manager.

##API Endpoints
o POST /api/register → Register a user. 
o POST /api/login → Authenticate a user and return a token. 
o GET /api/tasks → Get a list of all tasks (only for logged-in users). 
o POST /api/tasks → Create a new task (only for logged-in users). 
o PUT /api/tasks/{id} → Update a task (only the owner can update). 
o DELETE /api/tasks/{id} → Delete a task (only the owner can delete). 

