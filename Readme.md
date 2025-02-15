# Panscience Project API

This project provides endpoints for a user to register and perform CRUD operations on tasks.

The deployed API can be pinged at

https://panscience-api.onrender.com/isHealthy

(Please wait for a around 2 minutes after visiting the above URL as the server goes offline when inactive and will take some time to spin back up)


## Deployment

To deploy this project, run:

```bash
  git pull https://github.com/ASC1005/Panscience-Project
```

Install the packages:

```bash
  npm install
```

Configure the environment variables according to `.envDemo`, then run:

```bash
  node src/index.js
```

## API Endpoints

### User Endpoints

- **Create User (Admin only)**\
  **POST** `http://localhost:8000/api/v1/user/create`\
  **Body Parameters:**

  ```json
  {
    "email": "example@gmail.com",
    "password": "password123",
    "fullName": "John Doe"
  }
  ```

- **User Login**\
  **POST** `http://localhost:8000/api/v1/user/login`\
  **Body Parameters:**

  ```json
  {
    "email": "example@gmail.com",
    "password": "password123"
  }
  ```

- **Get All Users**\
  **GET** `http://localhost:8000/api/v1/user/get-all`

- **Get User Profile**\
  **GET** `http://localhost:8000/api/v1/user/profile`

- **Get User by ID (Admin only)**\
  **GET** `http://localhost:8000/api/v1/user/get/{userId}`

- **Update User (Admin only)**\
  **PUT** `http://localhost:8000/api/v1/user/update/{userId}`\
  **Body Parameters:**

  ```json
  {
    "fullName": "Updated Name"
  }
  ```

- **Delete User (Admin only)**\
  **DELETE** `http://localhost:8000/api/v1/user/delete/{userId}`

### Task Endpoints

- **Get All Tasks**\
  **GET** `http://localhost:8000/api/v1/task/get-all`

- **Create Task**\
  **POST** `http://localhost:8000/api/v1/task/create`\
  **Body Parameters:**

  ```json
  {
    "title": "Task Title",
    "description": "Task description",
    "priority": "low",
    "due_date": "2024-12-31T23:59:59.000Z"
  }
  ```

- **Get Task by ID**\
  **GET** `http://localhost:8000/api/v1/task/get/{taskId}`

- **Update Task**\
  **PUT** `http://localhost:8000/api/v1/task/update/{taskId}`\
  **Body Parameters:**

  ```json
  {
    "title": "Updated Task Title"
  }
  ```

- **Delete Task**\
  **DELETE** `http://localhost:8000/api/v1/task/delete/{taskId}`

