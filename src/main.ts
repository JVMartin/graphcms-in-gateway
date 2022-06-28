import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';
import { ApolloServer } from 'apollo-server';
import pino from 'pino';

const logger = pino();

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: 'content', url: 'https://api-us-west-2.graphcms.com/v2/cl4ra7mjp0sux01wghfyrh7bj/master' },
    ],
  }),
});

const server = new ApolloServer({
  gateway,
});

server
  .listen()
  .then(({ url }) => {
    logger.info(`Gateway ready at ${url}`);
  })
  .catch((error) => {
    logger.error({ errorMessage: error.message, errorStack: error.stack }, error.message);
  });
