const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')
const fetch = require('node-fetch')

const baseUrl = 'https://mvrp.herokuapp.com/api/cars'

// 2
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: (root, args, context, info) => {
      return context.prisma.links()
    },
    getCars: () =>{
      console.log("Get cars")
      return fetch('https://mvrp.herokuapp.com/api/cars').then(res => res.json ())
    },
    getCarByPlateNumber: (parent, args) =>{
      return fetch(`https://mvrp.herokuapp.com/api/cars`).then(res => res.json ())
    }
  }, 
  Mutation:{
    post: (root, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description,
      })
    },
  },
}


// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {prisma},
})
server.start(() => console.log(`Server is running on http://localhost:4000`))


