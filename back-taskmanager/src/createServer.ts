import 'reflect-metadata';
import { ApolloError, ApolloServer, AuthenticationError } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import jwt, { JwtPayload } from 'jsonwebtoken';

import TaskResolver from './resolvers/TaskResolver';
import CommentResolver from './resolvers/CommentResolver';
import UserResolver from './resolvers/UserResolver';
import ProjectResolver from './resolvers/ProjectResolver';
// eslint-disable-next-line import/no-cycle
import LoginResolver from './resolvers/LoginResolver';

export const jwtKey = 'my_secret_key_that_must_be_very_long';

async function createServer() {
  const schema = await buildSchema({
    resolvers: [
      TaskResolver,
      CommentResolver,
      UserResolver,
      ProjectResolver,
      LoginResolver,
    ],
    authChecker: ({ context }) => {
      if (context.authenticatedUserEmail) {
        return true;
      }
      throw new ApolloError(
        'Vous devez être connecté(e) pour accéder à cette ressource'
      );
    },
    authMode: 'null',
  });

  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      const token = req.headers.authorization;
      if (token) {
        let payload: JwtPayload;
        try {
          payload = jwt.verify(token, jwtKey) as JwtPayload;
          return { authenticatedUserEmail: payload.user };
        } catch (err) {
          throw new AuthenticationError('Veuillez vous reconnecter');
        }
      } else return false;
    },
  });
  return server;
}

export default createServer;
