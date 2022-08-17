import {Schema, model, models} from 'mongoose';

const blogSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please give title for the blog post"]
    },
    description: {
        type: String,
        required: [true, "Please give description for the blog post "]
    },
    content: {
        type: String,
        required: [true, "Please give content for the blog post"]
    },
    image: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    blogger:{
        id: {
            type: Schema.ObjectId,
            ref: "bloggers",
            required: true 
        },
        name: {
            type: String,
            required: true
        }  
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const createBlog = models.blogs || model('blogs', blogSchema);

export default createBlog;
