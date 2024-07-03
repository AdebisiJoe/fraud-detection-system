import express from 'express';
import dotenv from 'dotenv';
import { createHandler } from 'graphql-http/lib/use/express';
import schema from './schema.js';
import resolvers from './resolvers.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.all('/graphql', createHandler({ schema: schema, rootValue: resolvers }));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/graphql`);
});
