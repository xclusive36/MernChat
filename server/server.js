import { ApolloServer } from "@apollo/server";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import express from "express";
import http from "http";
import path from "path";
import { authMiddleware } from "./utils/auth.js"; // import authMiddleware function to be configured with the Apollo Server
import { typeDefs, resolvers } from "./schemas/index.js"; // import typeDefs and resolvers from schemas folder

import db from "./config/connection.js"; // import db from config/connection

// Define a port to run the server on, default to 4000
const PORT = process.env.PORT || 4000;

// Required logic for integrating with Express
const app = express();
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Same ApolloServer initialization as before, plus the drain plugin
// for our httpServer.
const server = new ApolloServer({
  // create a new Apollo Server instance and pass in our schema data, context, and plugins
  typeDefs, // add typeDefs
  resolvers, // add resolvers
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })], // add the drain plugin
  context: authMiddleware, // apply authMiddleware function to the server as the context
});

// Ensure we wait for our server to start
await server.start();

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
  "/graphql",
  cors(),
  bodyParser.json(),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  })
);

db.once("open", () => {
  // start the Apollo Server
  // callback function required, will not run without it
  // will not run anything
});

// Modified server startup
await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));

console.log(`🚀 Server ready at http://localhost:4000/graphql`);
