import mongoose from 'mongoose';
let Schema = mongoose.Schema;

// Schema for articles
let articleSchema = new Schema({
    id: {type: Number, require: true},
    date: {type: Date, require: true, default: Date.now},
    title: {type: String, require: true},
    content: {type: String, require: true},
    tags: [{
        name: {type: String, require: true},
        color: {type: String, require: true}
    }],
    author: {type: String, require: true}
});


// Connect external MongoDB
mongoose.connect('localhost:27017');

// Construct MongoDB models
let ArticleData = mongoose.model('articles', articleSchema);

export {ArticleData};
