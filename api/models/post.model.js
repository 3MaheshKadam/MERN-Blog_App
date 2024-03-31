import mongoose from 'mongoose';

const postScheme = new mongoose.Schema(

    {
        userId:{
            type :String,
            required:true,
        },
        content:{
            type:String,
            required :true,
        },
        title:{
            type:String,
            required :true,
            unique:true,
        },
        image:{
            type:String,
            default:'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png',
        },
        category:{
            type:String,
            default :'uncategorized',
        },
    },
    {timestamps:true}
);

const Post = mongoose.model('Post',postScheme);

export default Post;