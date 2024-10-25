var mongoose = require('mongoose')
var Post = require('./post')

var resourceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    type: {
        type: String,
        required: [true,'Resource must have a type'],
        lowercase: true,
        enum: ['book', 'article', 'application', 'report', 'studentwork', 'monographs']
    },
    title: {
        type: String,
        required: [true,'Resource must have a title.'],
        maxlength: 20
    },
    subtitle: String,
    creationDate: {
        type: Date,
        default: Date.now
    },
    RegistrationDate: {
        type: Date,
        default: Date.now
    },
    visibility: String,
    hashtags: {
        type: [String],
        lowercase: true,
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    }],
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'user'
    }
});

//mongo midleware for deleting
resourceSchema.post('findByIdAndDelete', async function(resource){
    if(resource.posts.length){
        await Post.deleteMany({
            _id: {
                $in: resource.posts
            }
        })
    }
})

module.exports = mongoose.model('resource', resourceSchema)
