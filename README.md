Kryos Backend API

A Node.js + TypeScript backend API demonstrating authentication, PostgreSQL integration, Dockerized development, runtime input validation, and Jest-based integration testing.

This project focuses on backend fundamentals: clear API structure, async/await data access, authentication middleware, real database usage, and validation at runtime — intentionally kept simple but realistic.

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

RESTful API with organized route structure

User authentication:

Register

Login

JWT-based authorization

Request validation using Zod schemas

Protected routes via authentication middleware

PostgreSQL database with migrations and seed data

Centralized error handling

Request logging middleware

Dockerized local development environment

Jest tests for core auth flows

Validation Strategy

Zod is used to validate incoming request payloads at runtime

Validation happens before business logic is executed

Invalid requests return structured error responses

TypeScript types are inferred directly from Zod schemas where applicable

This ensures:

No reliance on as casting

Safer request handling

Clear API contracts

Getting Started
Prerequisites

Docker

Docker Compose