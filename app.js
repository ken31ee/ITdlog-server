import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema';
import cors from 'cors';

let app = express();

// for testing, only from localhost:8080 is allowed
let corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use('/graphql', cors(corsOptions), graphqlHTTP({
    schema,
    graphiql: true,
}));

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');