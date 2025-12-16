# simple REST-api with bun and hono

## requirments

- postgresql (database)
- [Bun](https://bun.com/)
- docker (optional)
- docker compose (optional)

To install dependencies

```sh
bun install
```

To run:

```sh
bun run dev
```

rename .env.example to .env

```sh
cp .env.example .env
```

run with docker

```sh
docker compose up -d
```

open <http://localhost:3000>

## API Documentation

### Authentication

All endpoints require a valid JWT token in the `Authorization` header.

```
Authorization: Bearer <your_jwt_token>
```

To get jwt token Authentication for using Api

```
POST /auth

Content-Type: application/json

{
  "name": "John Doe"
}
```

**Body Parameters:**

- `name` (string, required): The user's name

**Response (200 Ok):**

```json
{
  "token": "jwt.token"
}
```

### Base URL

```
http://localhost:3000/users
```

### Endpoints

#### 1. Get All Users

Retrieve a list of all users.

**Request:**

```
GET /users
```

**Response (200 OK):**

```json
{
  "data": [
    {
      "id": 1,
      "name": "John Doe"
    },
    {
      "id": 2,
      "name": "Jane Smith"
    }
  ]
}
```

---

#### 2. Get User by ID

Retrieve a specific user by their ID.

**Request:**

```
GET /users/:id
```

**Parameters:**

- `id` (string, required): The user ID

**Response (200 OK):**

```json
[
  {
    "id": 1,
    "name": "John Doe"
  }
]
```

**Response (404 Not Found):**

```json
{
  "data": "Not Found"
}
```

---

#### 3. Create New User

Create a new user.

**Request:**

```
POST /users
Content-Type: application/json

{
  "name": "John Doe"
}
```

**Body Parameters:**

- `name` (string, required): The user's name

**Response (201 Created):**

```json
{
  "message": "user data successfully created",
  "name": "John Doe"
}
```

**Response (422 Error):**

```json
{
  "message": "failed to create a new user",
  "name": null
}
```

---

#### 4. Update User

Update an existing user's information.

**Request:**

```
PATCH /users/:id
Content-Type: application/json

{
  "name": "Jane Doe"
}
```

**Parameters:**

- `id` (string, required): The user ID

**Body Parameters:**

- `name` (string, required): The updated user name

**Response (200 OK):**

```json
{
  "message": "update data successfully",
  "data": {
    "name": "Jane Doe"
  }
}
```

---

#### 5. Delete User

Delete an existing user.

**Request:**

```
DELETE /users/:id
```

**Parameters:**

- `id` (string, required): The user ID

**Response (200 OK):**

```json
{
  "message": "Data successfully deleted"
}
```

**Response (404 Not Found):**

```json
{
  "message": "User not found"
}
```

---

### Error Handling

All endpoints will return appropriate HTTP status codes:

- `200 OK`: Successful request
- `201 Created`: Resource successfully created
- `404 Not Found`: Resource not found
- `401 Unauthorized`: Invalid or missing JWT token
- `422 Unprocessable Entity` : Missing Data
