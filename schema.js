import {
    GraphQLSchema,
    GraphQLString,
    GraphQLObjectType,
    GraphQLList
} from 'graphql'

import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let articleSchema = new Schema({
    title: {type: String, require: true},
    content: {type: String, require: true},
    tags: [{
        name: {type: String, require: true}
    }],
    author: {type: String, require: true}
});

mongoose.connect('localhost:27017');
let ArticleData = mongoose.model('articles', articleSchema);

let data = new ArticleData({
    title: "Go To Statement Considered Harmful",
    content: "Don't fucking use goto in COBOL",
    tags: [
        {name: 'Imperative Programming'}, {name: 'Programming Principle'}
    ],
    author: "Edsger Dijkstra"
});


(async () => {
    await data.save();
    let result = await ArticleData.find();
    console.log(result)
});


const TagType = new GraphQLObjectType({
    name: 'Tag',
    description: 'Articles classifier',

    fields: () => ({
        name: {type: GraphQLString}
    })
});

const ArticleType = new GraphQLObjectType({
    name: 'Article',
    description: 'One of the articles',

    fields: () => ({
        title: {
            type: GraphQLString,
            resolve: (article) => (article.title)
        },
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
        }
    })
});


export default new GraphQLSchema({
    query: QueryType,
})