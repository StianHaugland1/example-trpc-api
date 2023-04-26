# Todo App API using trpc

This is a simple Todo app API built with Node.js and trpc. It provides CRUD (Create, Read, Update, Delete) operations for managing a list of Todos.

## Prerequisites

Before you can run this app, please make sure you have the following installed on your system:

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory using the terminal.
3. Run `npm install` to install the dependencies.

## Configuration

The app uses environment variables for configuration. You need to set up the following environment variables:

- `PORT`: The port number on which the server will listen. (Default is 3000)
- `AUTH0_ISSUER_BASE_URL`: The base URL of the Auth0 issuer for verifying JWT tokens. This is required for authentication. 

You can set the environment variables in a `.env` file in the root of your project or using another method of your choice.

## Running the App

You can start the app by running the following command in the terminal:

```npm run dev```

