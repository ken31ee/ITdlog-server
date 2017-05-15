import {
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLObjectType,
    GraphQLList
} from 'graphql'
import GraphQLDate from 'graphql-date';

import {ArticleData} from './db';

let data = new ArticleData({
    id: 0,
    data: Date.now(),
    title: "Go To Statement Considered Harmful",
    content: "Don't fucking use goto in COBOL",
    tags: [
        {name: 'Imperative Programming', color: 'orange'}, {name: 'Programming Principle', color: 'dodgerblue'}
    ],
    author: "Edsger Dijkstra"
});

(async () => {
    //await data.save();
    let result = await ArticleData.find({id: 0});
    console.log(result);
})();


const TagType = new GraphQLObjectType({
    name: 'Tag',
    description: 'Articles classifier',

    fields: () => ({
        name: {type: GraphQLString},
        color: {type: GraphQLString}
    })
});

const ArticleType = new GraphQLObjectType({
    name: 'Article',
    description: 'One of the articles',

    fields: () => ({
        id: {type: GraphQLInt},
        date: {type: GraphQLDate},
        title: {type: GraphQLString},
        content: {type: GraphQLString},
        tags: {
            type: new GraphQLList(TagType)
        },
        author: {type: GraphQLString}
    })
});

const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'fuck ya',

    fields: () => ({
        articles: {
            type: new GraphQLList(ArticleType),
            resolve: (root, args) => ArticleData.find()
        },
        article: {
            type: ArticleType,
            args: {
                id: {type: GraphQLInt}
            },
            resolve: (root, args) => ArticleData.findOne({id: args.id})
        }
    })
});


export default new GraphQLSchema({
    query: QueryType,
})