export const schema = gql`
  type Task {
    id: Int!
    body: String!
    description: String
    completed: Boolean!
    checklist: Checklist
    checklistId: Int
  }

  type Query {
    tasks: [Task!]! @requireAuth
    task(id: Int!): Task @requireAuth
  }

  input CreateTaskInput {
    body: String!
    description: String
    completed: Boolean!
    checklistId: Int
  }

  input UpdateTaskInput {
    body: String
    description: String
    completed: Boolean
    checklistId: Int
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task! @requireAuth
    updateTask(id: Int!, input: UpdateTaskInput!): Task! @requireAuth
    deleteTask(id: Int!): Task! @requireAuth
  }
`
