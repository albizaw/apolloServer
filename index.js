import { ApolloServer } from "@apollo/server";
import { createServer } from "http";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import bodyParser from "body-parser";
import express from "express";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { PubSub } from "graphql-subscriptions";

const port = 3000;
const typeDefs = `
  type Query {
    messages: [Message!]!
  }

  type Mutation {
    sendMessage(text: String!): Message!
  }

  type Subscription {
    messageSent: Message!
  }

  type Message {
    id: ID!
    text: String!
    timestamp: String!
  }
`;

const pubSub = new PubSub();
let messages = [];

const resolvers = {
  Query: {
    messages: () => messages,
  },
  Mutation: {
    sendMessage: (_, { text }) => {
      const message = {
        id: messages.length + 1,
        text,
        timestamp: new Date().toISOString(),
      };
      messages.push(message);
      pubSub.publish("messageSent", { messageSent: message });
      return message;
    },
  },
  Subscription: {
    messageSent: {
      subscribe: () => pubSub.asyncIterator(["messageSent"]),
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });
const app = express();
const httpServer = createServer(app);
const wsServer = new WebSocketServer({ server: httpServer, path: "/graphql" });
const wsServerCleanup = useServer({ schema }, wsServer);
const apolloServer = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await wsServerCleanup.dispose();
          },
        };
      },
    },
  ],
});

await apolloServer.start();
app.use("/graphql", bodyParser.json(), expressMiddleware(apolloServer));
httpServer.listen(port, () => {
  console.log(`🚀 Query endpoint ready at http://localhost:${port}/graphql`);
  console.log(
    `🚀 Subscription endpoint ready at ws://localhost:${port}/graphql`
  );
});
