let express = require('express');
import bodyParser from 'body-parser';
let { graphqlExpress, graphiqlExpress} = require('apollo-server-express');
import schema from './schema';

let app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: schema }));

app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled

app.listen(4000);

console.log('Running a GraphQL API server at localhost:4000/graphql');