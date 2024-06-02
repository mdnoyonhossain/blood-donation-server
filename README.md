# Blood Donation Server

The Blood Donation Application Server is a robust server-side application designed to facilitate blood donation processes efficiently. It provides user authentication and authorization features using JSON Web Tokens (JWT) to ensure secure access to its functionalities.

The main purpose of the application is to connect blood donors with those in need by enabling users to find blood donors and request blood donations. Users can register an account, update their profiles, and participate in blood donation requests seamlessly.

## Table of Contents

- [Key Features](#key-features)
- [Technology Used](#technology-used)
- [API Documentation](#api-documentation)
- [Live Server Test](#live-server-test)
  - [API Endpoints](#api-endpoints)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation locally](#installation-locally)
  - [Running the Application](#running-the-application)

## Key Features

Every route within the system is safeguarded through JWT token verification and role based authorization, guaranteeing secure access and protection against unauthorized usage.

Database Tables:

1. **user:**
   Responsible for storing user information securely, facilitating a reliable authentication system.

2. **request:**
   Manages blood donation requests, tracking donor and requester information, as well as request status.

3. **profile:**
   Stores user profile information, including bio, age, and last donation date

## Technology Used

- **Express.js**
- **Prisma**
- **JWT (JSON Web Tokens)**
- **Bcrypt**
- **Zod**
- **Dev Tools**
  - **TypeScript**
  - **ts-node-dev**

## API Documentation

This documentation, generated with Postman.

```bash
  https://documenter.getpostman.com/view/15069256/2sA35MzzC9
```

Or,

[Click API Documentation](https://documenter.getpostman.com/view/15069256/2sA35MzzC9)

## Live Server Test

To test the live API endpoints, I prefer using [Postman](https://www.postman.com/) for testing with better user experience.

### Live API

```bash
https://blood-donation-server-orpin.vercel.app/
```

## API Endpoints

for `user`

- **POST** /api/register
- **POST** /api/login

for `profile`

- **GET** /api/my-profile
- **PUT** /api/my-profile

for `request`

- **POST** /api/donation-request
- **GET** /api/donation-request
- **GET** /api/donor-list
- **PUT** /api/donation-request/:requestId

## Getting Started

These instructions will help you set up and run the application on your local machine.

### Prerequisites

- Node.js and npm installed on your machine.

### Installation locally

1. Clone the repository:

```bash
https://github.com/mdnoyonhossain/blood-donation-server.git
```

2. Navigate to the project directory:

```bash
cd blood-donation-server
```

3. Install dependencies:

```bash
npm install
```

4. Create a .env file in the root directory and configure environment variables:

```bash
DATABASE_URL=...
PORT=...
JWT_ACCESS_SECRET=...
JWT_ACCESS_EXPIRES_IN=...
SALT_ROUNDS=...
```

### Running the Application

1. Convert the typescript file to javascript file

```bash
npm run build
```

2. Running typescript in development environment

```bash
npm run start
```

3. Running javascript in production environment

```bash
node ./dist/server.js
```


