import {ApolloServer} from 'apollo-server'
import mongoose from 'mongoose'

import typeDefs from './graphql/typeDefs.js'
import resolvers from './graphql/resolvers/index.js'

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context : ({req})=> ({req})
})

//////////// gottttaaa shiftttt
const MONGO_URL = "mongodb+srv://root:1234@cluster0.icmumzl.mongodb.net/?retryWrites=true&w=majority"
//////////// gottttaaa shiftttt


mongoose.connect(MONGO_URL)
.then((res)=> {
    console.log("MONGODB CONNECTED")

    server.listen({port : 5000})
.then(res => console.log(`Server started at ${res.url}`))
})
.catch(err=> console.log(err))

