# Fans CRM

This is the backend service for the Fans CRM application, built with NestJS. It provides APIs for user management, authentication.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Akezh/fans-crm-challenge.git
   cd fans-crm/backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the database migrations:

   ```bash
   npx sequelize-cli db:migrate
   ```

4. Start the application:
   ```bash
   npm run start:dev
   ```

## API Documentation

### AuthController

#### `POST /auth/sign-in`

Sign in a user.

- **Request Body**:

  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- **Response**:
  ```json
  {
    "accessToken": "jwt_token"
  }
  ```

### UsersController

#### `POST /add-user`

Create a new user.

- **Request Body**:

  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```

- **Response**:
  ```json
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
  ```

#### `GET /get-user/:id`

Get a user by ID.

- **Request Parameters**:

  - `id` (number): The ID of the user.

- **Response**:
  ```json
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
  ```

## cURLs for APIs:

### create user/register

```bash
curl --request POST \
  --url http://localhost:3000/api/v1/add-user \
  --header 'Content-Type: application/json' \
  --data '{
	"username": "john_doe4",
	"email": "john.doe@example.com",
	"password": "securepassword"
}'
```

### getUserById

```bash
curl --request GET \
  --url http://localhost:3000/api/v1/get-user/2 \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiam9obi5kb2VAZXhhbXBsZS5jb20iLCJpYXQiOjE3MjQ4ODM0MDUsImV4cCI6MTcyNDk2OTgwNX0.niIZY8q5gDgtN7ozmryhCDUR5Zhs7ZTwRRxLdOEspkg' \
  --header 'User-Agent: insomnia/8.3.0'
```

### sign in

```bash
curl --request POST \
  --url http://localhost:3000/api/v1/auth/sign-in \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "john.doe@example.com",
	"password": "securepassword"
}'
```
