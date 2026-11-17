# MT1-LABEXAM – Online Food Ordering Web Application

## Project Description
This project is a simple Online Food Ordering Web Application developed using Node.js and Express.js. It demonstrates HTTP server creation, routing, file system operations, REST API development, and CRUD operations.

## Technologies Used
- Node.js
- Express.js
- JavaScript
- HTML
- HTTP Module
- File System (FS) Module

## Project Structure

```text
MT1-LABEXAM/
│
├── public/
│   └── menu.html
│
├── httpServer.js
├── expressApp.js
├── package.json
├── package-lock.json
└── README.md
```

## Installation and Setup

### Step 1: Open the project
Open the project folder in Visual Studio Code.

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Run the HTTP Server

```bash
node httpServer.js
```

The HTTP server runs on:

http://localhost:3000

### Step 4: Run the Express Server

Open a separate terminal in VS Code and execute:

```bash
node expressApp.js
```

The Express server runs on:

http://localhost:4000

**Note:** Keep both terminals running simultaneously.

## HTTP Server Routes

| URL | Description |
|---|---|
| `/` | Home page |
| `/foods` | Display food information |

## Express REST API Routes

The Express server performs CRUD operations on food items.

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Home route |
| GET | `/foods` | Get all food items |
| GET | `/foods/:id` | Get a food item by ID |
| POST | `/foods` | Add a new food item |
| PUT | `/foods/:id` | Update a food item |
| DELETE | `/foods/:id` | Delete a food item |

## Sample Food Data

```json
[
  {
    "id": 1,
    "name": "Pizza",
    "price": 250
  },
  {
    "id": 2,
    "name": "Burger",
    "price": 120
  },
  {
    "id": 3,
    "name": "Pasta",
    "price": 180
  }
]
```

## Testing the API

Open the following URL in your browser to retrieve all food items:

http://localhost:4000/foods

To test POST, PUT, and DELETE operations, use Postman.

### Example POST Request

**Method:** POST

**URL:** `http://localhost:4000/foods`

**Body (raw JSON):**

```json
{
  "name": "Sandwich",
  "price": 100
}
```

## Features
- HTTP server using Node.js.
- Express server implementation.
- GET and POST request handling.
- REST API development.
- CRUD operations (Create, Read, Update, Delete).
- JSON request and response handling.
- Dynamic routing using URL parameters.

## Learning Outcomes
- Understanding Node.js HTTP servers.
- Working with Express.js.
- Understanding REST API architecture.
- Implementing CRUD operations.
- Handling HTTP requests and responses.
- Testing APIs using Postman.

## Important Note
Food data is stored in an in-memory JavaScript array. Therefore, changes made through POST, PUT, and DELETE operations are temporary and reset whenever the Express server restarts.

## Author
**Online Food Ordering Web Application**

Developed as part of the MT1 Lab Examination.