export const schema = gql`
  type Checklist {
    id: Int!
    title: String!
    tasks: [Task]!
  }

  type Query {
    checklists: [Checklist!]! @requireAuth
    checklist(id: Int!): Checklist @requireAuth
  }

  input CreateChecklistInput {
    title: String!
  }

  input UpdateChecklistInput {
    title: String
  }

  type Mutation {
    createChecklist(input: CreateChecklistInput!): Checklist! @requireAuth
    updateChecklist(id: Int!, input: UpdateChecklistInput!): Checklist!
      @requireAuth
    deleteChecklist(id: Int!): Checklist! @requireAuth
  }
`
