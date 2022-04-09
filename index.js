const {ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typedDefs');
const resolvers = require('./graphql/resolvers');
const {MONGODB} = require('./config');

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
});

mongoose.connect(MONGODB, {useNewUrlParser: true})
.then(() => {
    console.log('MongoDB Connected');
    return server.listen({port: 5000});
})
.then(res => {
    console.log(`Server running at ${res.url}`);
});