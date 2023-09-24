import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  split,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import Auth from "./utils/auth";
import Account from "./pages/Account";

const PORT = import.meta.env.SERVER_PORT || 4000;
console.log(import.meta.env.SERVER_PORT);

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: `${
    location.hostname === "localhost"
      ? "http://localhost:4000"
      : location.protocol + "//" + location.hostname
  }:${PORT}/graphql`,
});

// get the authentication token from local storage if it exists
const token = localStorage.getItem("id_token");

const wsLink = new GraphQLWsLink(
  createClient({
    url: `${location.protocol === "https:" ? "wss" : "ws"}://${
      location.hostname
    }:${PORT}/graphql`,
    connectionParams: {
      authToken: token,
    },
  })
);

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      token: token,
      user: token ? JSON.stringify(Auth.getProfile().data) : "",
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

// Create the Apollo client with authentication middleware and a cache
const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          chatRoomsSort: {
            // Don't cache separate results based on
            // any of this field's arguments.
            // keyArgs: false,

            // Concatenate the incoming list items with
            // the existing list items.
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
          messageText: {
            // Don't cache separate results based on
            // any of this field's arguments.
            // keyArgs: false,

            // Concatenate the incoming list items with
            // the existing list items.
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
});

// Router that uses the `createBrowserRouter` function to create a new router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/chat/:chatRoomId",
    element: <Chat />,
  },
  {
    path: "/account",
    element: <Account />,
  }
  // {
  //   path: "*",
  //   element: <Home />,
  // },
]);

function App() {
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}

export default App;
