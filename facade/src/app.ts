import { graphqlHTTP } from 'express-graphql';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import schema from './schemas';
import mongoose from 'mongoose';
import resolvers from './resolvers';
import 'dotenv/config'

const URL = process.env.DB_STRING;
const app = express();

app.use(cors({
    credentials: true,
    origin: '*'
}));

app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({limit: '10mb'}));

mongoose
  .connect(URL as string)
  .then((res) => console.log('Connected to MongoDB'))
  .catch((err) => console.log(`DB connection error: ${err}`));

app.use(
    '/graphql',
    cookieParser(),
    express.json(),
    graphqlHTTP((req, res) => ({
    schema,
    graphiql: true,
    context: { req, res },
    rootValue: resolvers,
})));

app.listen(process.env.SERVER_PORT || 4000, () => { console.log('Listening the PORT', process.env.SERVER_PORT || 4000) });

