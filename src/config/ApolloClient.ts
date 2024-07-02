import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const link=createHttpLink({
    uri:"http://localhost:4000/graphql"
})

const client=new ApolloClient({
    link,
    cache:new InMemoryCache()
})

export default client