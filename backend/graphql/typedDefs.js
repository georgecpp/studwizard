const {gql} = require('apollo-server');

module.exports = gql`
    type Post {
        id: ID!
        body: String!
        createdAt: String!
        username: String!
        userimg: String!
        comments: [Comment]!
        likes: [Like]!
        likeCount: Int!
        commentCount: Int!
    }
    type Comment {
        id: ID!
        createdAt: String!
        username: String!
        userimg: String!
        body: String!
    }
    type Like {
        id: ID!
        createdAt: String!
        username: String!
    }
    type User {
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
        name: String!
        img: String!
        role: String!
    }
    type educationHistory {
        lastInstitution: String!
        teachPlacePreference: String!
    }
    type experience {
        expYears: Int!
        numberOfMeditations: Int!
        score: Int!
    }
    type Meditator {
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
        name: String!
        img: String!
        role: String!
        educationHistory: educationHistory!
        experience: experience!
    }
    input educationHistoryInput {
        lastInstitution: String!
        teachPlacePreference: String!
    }
    input RegisterUserInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
        name: String!
    }
    input RegisterMeditatorInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
        name: String!
        phoneNumber: String!
        aboutMe: String!
        educationHistory: educationHistoryInput!
        experienceYears: Int!
    }
    type Query {
        getPosts: [Post]
        getPost(postId: ID!): Post
    }
    type Mutation {
        # register(registerInput: RegisterInput): User!
        registerMeditator(registerMeditatorInput: RegisterMeditatorInput): Meditator!
        registerUser(registerUserInput: RegisterUserInput): User!
        login(username:String!, password: String!): User!
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
        createComment(postId: ID!, body:String!): Post!
        deleteComment(postId: ID!, commentId: ID!): Post!
        likePost(postId: ID!): Post!
    }
`;