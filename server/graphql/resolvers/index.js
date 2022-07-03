import postResolvers from '../resolvers/posts.js'
import usersResolvers from '../resolvers/users.js'
import commentResolvers from '../resolvers/comments.js'

export default  {
    Post: {
        likeCount : (parent)=> parent.likes.length,
        commentCount : (parent)=> parent.comments.length
    },
    Query : {
        ...postResolvers.Query
    },
    Mutation :{
        ...usersResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentResolvers.Mutation
    }
}