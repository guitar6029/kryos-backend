Kryos Backend API

A Node.js + TypeScript backend API demonstrating authentication, PostgreSQL integration, Dockerized development, runtime input validation, and Jest-based integration testing.

This project focuses on backend fundamentals: clear API structure, async/await data access, authentication middleware, real database usage, and request validation — intentionally kept simple but realistic.

Tech Stack

Node.js

Express

TypeScript

PostgreSQL

Docker & Docker Compose

JWT Authentication

Zod (runtime validation)

Jest (integration-style testing)

Features

Organized REST API structure

User authentication (register & login)

JWT-based authorization

Request validation using Zod

Protected API routes via auth middleware

PostgreSQL database with migrations and seed data

Centralized error handling

Request logging middleware

Dockerized development environment

Basic integration tests with Jest

Project Structure (Simplified)
```
src/
  routes/          # API routes
  middleware/      # auth, logging, error handling
  repo/            # database access logic
  validators/      # Zod schemas
  seeds/           # seed data

__tests__/
  auth.test.ts     # auth integration tests
```
Getting Started
Prerequisites

Docker

Docker Compose

Run the App
```
docker compose up --build -d
```

Run migrations and seed data:
```
docker compose exec api npm run migrate:up
docker compose exec api npm run seed
```

The API will be available at:

http://localhost:3000

Resetting the Dev Environment

To reset Docker containers, database, migrations, and seed data:
```
npm run dev:reset
```
API Overview
Auth Routes

POST /auth/register

POST /auth/login

Protected Routes

GET /devices

GET /measurements

Protected routes require a valid JWT:

Authorization: Bearer <JWT_TOKEN>

Running Tests

Tests run against the Dockerized API and real PostgreSQL database.
```
docker compose exec api npm test
```

Current test coverage includes:

User registration flow

Authentication behavior

Notes & Scope

This project intentionally focuses on core backend architecture and fundamentals.

Not included:

Refresh tokens

Role-based access control

Rate limiting

CI/CD pipelines

Purpose

This project was built to demonstrate:

Backend API design with Express and TypeScript

JWT-based authentication

Runtime request validation with Zod

PostgreSQL integration using migrations and seed data

Docker-based development workflows

Basic integration testing with Jest
