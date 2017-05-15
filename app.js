var express = require('express');
var graphqlHTTP = require('express-graphql');
import schema from './schema';
import cors from 'cors';


var app = express();
app.use('/graphql', cors(), graphqlHTTP({
    schema,
    graphiql: true,
}));

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');