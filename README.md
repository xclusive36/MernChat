# MernChat

## Description

MernChat is a simple barebones MERN full stack chatroom application created using React, Vite, Apollo Graphql, Express, and MongoDB with Mongoose ORM. Visitors can search for and join existing chatrooms. Visitors can create an account or login. When logged in, users may create new chatrooms. Join chatrooms and chat.

Chat page is updated in real time using GraphQL subscriptions with Web Sockets Chat messages are stored in MongoDB.

Uses Bulma CSS framework for styling.

This is far from a complete application. It is a simple proof of concept. It is not intended for production use in its current state.

Setup for Heroku deployment, use MONGODB_URI environment variable to set MongoDB connection string. Use NODE_ENV environment variable to set production or development mode.

Be sure to update your deployment url in the cors origin in the server.js file.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)
- [Badges](#badges)
- [Sources](#sources)

## Installation

run npm install in the base directory to install all dependencies and then run npm run develop to start the client and server.

## Usage

Either signup or login to the application. Once logged in, you can create, join, and contribute to chat messages in chatrooms. You can also search for chatrooms by name.

## License

[GPL](https://api.github.com/licenses/gpl-2.0)

## Badges

![https://img.shields.io/badge/license-GPL-blue.svg](https://img.shields.io/badge/license-GPL-blue.svg)

## Contributing

To contribute, please fork the project and create a feature branch.

## Tests

This project has no test instructions

## Questions

Github Username: xclusive36  
Github Profile: [Github Profile](https://github.com/xclusive36/)  
Any additional questions, please reach out to me by email:  
Email: [Email](mailto:xclusive36@gmail.com)

## Sources

- [React](https://reactjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Apollo](https://www.apollographql.com/)
- [GraphQL](https://graphql.org/)
- [React Router](https://reactrouter.com/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [concurrently](https://www.npmjs.com/package/concurrently)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [bulma](https://bulma.io/)
- [Vite](https://vitejs.dev/)
- [ws](https://www.npmjs.com/package/ws)