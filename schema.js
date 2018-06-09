import {
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLObjectType,
    GraphQLList
} from 'graphql'

import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let articleSchema = new Schema({
    id: {type: Number, require: true},
    title: {type: String, require: true},
    content: {type: String, require: true},
    tags: [{
        name: {type: String, require: true}
    }],
    author: {type: String, require: true}
});

mongoose.connect('mongodb://localhost:27017/itdlog');
let ArticleData = mongoose.model('articles', articleSchema);

let data = new ArticleData({
    id: "1",
    title: "Go To Statement Considered Harmful",
    content: "Don't fucking use goto in COBOL",
    tags: [
        {name: 'Imperative Programming'}, {name: 'Programming Principle'}
    ],
    author: "Edsger Dijkstra"
});

(async () => {
    await data.save();
    let result = await ArticleData.find({id: 1});
    console.log(result);
})();


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
        id: {type: GraphQLInt},
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