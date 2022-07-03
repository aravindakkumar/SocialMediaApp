import React from "react";
import App from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider,HttpLink } from '@apollo/client';
import {setContext} from 'apollo-link-context'

const httpLink = new HttpLink({ uri: 'http://localhost:5000' });
window.history.pushState('', 'Home Page', '/')
// const authLink = new ApolloLink((operation, forward) => {
//   const token = localStorage.getItem('jwtToken');

//   operation.setContext({
//     headers: {
//       Authorization: token ? `Bearer ${token}` : ' '
//     }
//   });

//   // Call the next link in the middleware chain.
//   return forward(operation);
// });

const authLink = setContext(()=> {
  const token = localStorage.getItem('jwtToken')
    // console.log(token)

  return {    
      headers : {
        authorization : token ? `Bearer ${token}` : '',      
    }
    }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink), // Chain it with the HttpLink
  cache: new InMemoryCache()
});

export default (
    <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)