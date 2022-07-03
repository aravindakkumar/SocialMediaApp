import postModel from "../../models/post.js";
import checkAuth from "../../utils/check-auth.js";
import { AuthenticationError, UserInputError } from "apollo-server";

export default  {
    Query :{
        async getPosts(){
            try {
                const posts = await postModel.find().sort({createdAt : -1});
                return posts
            } catch (error) {
                console.log(err)
            }
        },

        async getPost(_, {postId}){
            try {
                const post = await postModel.findById(postId)
                if(post){
                    return post
                }
                else {
                    throw new Error('Post not Found')
                }
            } catch (error) {
                throw new Error(error)                
            }
        },


    },
    Mutation : {
        async createPost(_, body, context){
            const user = checkAuth(context)
            console.log(user);
            // console.log("Here")
            // if(body.trim === ''){
            //     throw new Error('Post body must not be empty')
            // }

            const newPost = postModel({
                body : body.body,
                user : user.id,
                username : user.username,
                createdAt : new Date().toISOString()
            })

            const post = await newPost.save()
            return post;
        },

        async deletePost(_, {postId}, context){
            const user = checkAuth(context)

            try {
                const post = await postModel.findById(postId)
                if(user.username === post.username){
                    await post.deleteOne()
                    return 'Post suceessfully deleted'
                }
                else{
                    throw new AuthenticationError('Action not allowed')
                }
            } catch (error) {
                throw new Error(error)
            }
        },

        async likePost(_,{postId}, context){
            const {username} = checkAuth(context)

            const post = await postModel.findById(postId)

            if(post){
                if(post.likes.find(like => like.username === username)){
                    post.likes = post.likes.filter(like => like.username !== username)
                    await post.save()
                }
                else{
                    post.likes.push({
                        username,
                        createdAt : new Date().toISOString()
                    })

                    await post.save()
                    return post
                }
            }
            else{
                throw new UserInputError('Post not found')
            }
        }
    }
}