export const schema = gql`
  type Task {
    id: Int!
    body: String!
    completed: Boolean!
  }

  type Query {
    tasks: [Task!]! @requireAuth
    task(id: Int!): Task @requireAuth
  }

  input CreateTaskInput {
    body: String!
    completed: Boolean!
  }

  input UpdateTaskInput {
    body: String
    completed: Boolean
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task! @requireAuth
    updateTask(id: Int!, input: UpdateTaskInput!): Task! @requireAuth
    deleteTask(id: Int!): Task! @requireAuth
  }
`
