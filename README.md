# Lighthouse Backend Challenge 🚀

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)

## Project Overview

The **Lighthouse Backend Challenge** is a Node.js-based API for managing a shopping cart with special promotions. The app is built using TypeScript, Express, Prisma ORM, PostgreSQL, and Docker, with tests written in Jest.

## Table of Contents

- [Lighthouse Backend Challenge 🚀](#lighthouse-backend-challenge-)
  - [Project Overview](#project-overview)
  - [Table of Contents](#table-of-contents)
  - [Setup Instructions](#setup-instructions)
    - [Prerequisites](#prerequisites)
    - [🛠️ Step-by-Step Setup](#️-step-by-step-setup)
  - [Database Setup](#database-setup)
    - [Production Mode](#production-mode)
  - [Available Routes](#available-routes)
    - [1. **POST /api/checkout**](#1-post-apicheckout)
    - [2. **POST /api/items**](#2-post-apiitems)
  - [Running Tests](#running-tests)
  - [Project Structure](#project-structure)
  - [Future Improvements](#future-improvements)
  - [Author](#author)

## Setup Instructions

### Prerequisites

- **Node.js** (version 22+)
- **Docker** and **Docker Compose**
- **npm**
- **DBeaver** (Optional, for database management)

---

### 🛠️ Step-by-Step Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/seu-usuario/lighthouse-backend-challenge.git
   cd lighthouse-backend-challenge
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables:
   To production create a `.env` file based on `.env.development` in the root of your project and configure your variables as follows:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/lighthouse-backend-challenge"
   PORT=3000
   ```

---

## Database Setup

Ensure that Docker is installed and running.

1. Start the PostgreSQL database with Docker:

   ```bash
   docker-compose up -d
   ```

2. Apply migrations with Prisma and seed the database with initial data:

   ```bash
   npm run prepare

---

## Running the Application

### Development Mode

To run the server in development mode with `nodemon`:

  ```bash
    npm run start:dev
  ```

### Production Mode

To compile TypeScript and run the production version:

```bash
npm run build
npm run start
```

A aplicação estará disponível em: `http://localhost:3000`.

---

## Available Routes

### 1. **POST /api/checkout**

Processes the purchase and applies promotions.

Example Request

```json
// Content-Type: application/json

{
  "items": ["43N23P", "344222"]
}
```

Response

```json
{
  "total": 5399.99
}
```

### 2. **POST /api/items**

Add a new item to the database.

Example Request

```json
// Content-Type: application/json

{
  "sku": "123ABC",
  "name": "New Item",
  "price": 99.99
}
```

Response

```json
{
  "id": 1,
  "sku": "123ABC",
  "name": "New Item",
  "price": 99.99
}
```

---

## Running Tests

The project includes automated tests using **Jest** and **Supertest**.

To run the tests:

```bash
npm test
```

To run the tests in "watch" mode (automatically updates when saving):

```bash
npm run test:noWatch
```

---

## Project Structure

```bash
src/
  ├── controllers/       # Handle the requests for each route.
  ├── database/          # Database configuration (Prisma): Configures the connection to the database and sets up Prisma client.
  └── index.ts           # Application entry point: The main file that initializes the app and starts the server.
prisma/
  ├── migrations/        # Contains database migration files that define changes to the database schema.
  ├── schema/            # Defines the Prisma schema, which describes the database structure and relationships.
  └── seed.ts            # Seed file that populates the database with initial test data or default values.

```

---

## Future Improvements

- 📌 Add authentication and authorization.
- 📌 Improve logging and error handling.
- 📌 Implement caching for frequently accessed data.
- 📌 Add rate limiting to prevent abuse.

---

## Author

This project was created by **Jorge Hecherat**.

Feel free to reach out if you have any questions or feedback!

- GitHub: [https://github.com/hechprad](https://github.com/hechprad)
- Email: [hecherat@gmail.com](mailto:hecherat@gmail.com)

---
