# REST API Documentation

## Overview
This project is a REST API built using **Node.js** and **Express.js**. The API allows CRUD operations on a list of users stored in a `MOCK_DATA.json` file.

## Features
- Fetch all users.
- Fetch a specific user by ID.
- Add a new user.
- Update an existing user.
- Delete a user.

## Prerequisites
- Node.js installed (v14 or higher recommended).
- NPM installed.

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Add a `MOCK_DATA.json` file in the project root. This file should contain an array of user objects with the following structure:
   ```json
   [
     {
       "id": 1,
       "first_name": "John",
       "last_name": "Doe",
       "email": "johndoe@example.com"
     },
     {
       "id": 2,
       "first_name": "Jane",
       "last_name": "Smith",
       "email": "janesmith@example.com"
     }
   ]
   ```
4. Start the server:
   ```bash
   node index.js
   ```
5. The server will run on `http://localhost:8000`.

## API Endpoints

### Fetch All Users
**GET** `/api/users`

#### Response:
- **200 OK**: Returns an array of all users.

```json
[
  {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "johndoe@example.com"
  }
]
```

### Fetch User by ID
**GET** `/api/users/:id`

#### Parameters:
- `id`: The ID of the user to fetch.

#### Response:
- **200 OK**: Returns the user object.
- **404 Not Found**: If the user with the specified ID does not exist.

### Add a New User
**POST** `/api/users`

#### Request Body:
- JSON object with the user's data (e.g., `first_name`, `last_name`, `email`).

#### Response:
- **200 OK**: Returns the ID of the newly created user.

```json
{
  "status": "Success",
  "id": 3
}
```

### Update a User
**PATCH** `/api/users/:id`

#### Parameters:
- `id`: The ID of the user to update.

#### Request Body:
- JSON object with the fields to update.

#### Response:
- **200 OK**: Returns the updated user object.
- **404 Not Found**: If the user with the specified ID does not exist.

```json
{
  "status": "Success",
  "updatedUser": {
    "id": 1,
    "first_name": "UpdatedName",
    "last_name": "Doe",
    "email": "updatedemail@example.com"
  }
}
```

### Delete a User
**DELETE** `/api/users/:id`

#### Parameters:
- `id`: The ID of the user to delete.

#### Response:
- **200 OK**: Confirms deletion.
- **404 Not Found**: If the user with the specified ID does not exist.

```json
{
  "status": "Success",
  "message": "User with id 1 deleted!"
}
```

### Render User List (HTML)
**GET** `/users`

#### Response:
- Renders an HTML page displaying all user names in an unordered list.

## Error Handling
- **404 Not Found**: Returned when a user with the specified ID does not exist.
- **500 Internal Server Error**: Returned when an error occurs while reading or writing the `MOCK_DATA.json` file.

## Example Requests
Use tools like **Postman**, **cURL**, or **any REST client** to test the endpoints.

### Fetch All Users
```bash
curl http://localhost:8000/api/users
```

### Add a New User
```bash
curl -X POST -H "Content-Type: application/json" -d '{"first_name":"Alice","last_name":"Johnson","email":"alice@example.com"}' http://localhost:8000/api/users
```

### Update a User
```bash
curl -X PATCH -H "Content-Type: application/json" -d '{"first_name":"UpdatedName"}' http://localhost:8000/api/users/1
```

### Delete a User
```bash
curl -X DELETE http://localhost:8000/api/users/1
```

