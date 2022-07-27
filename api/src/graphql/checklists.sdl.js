export const schema = gql`
  type Checklist {
    id: Int!
    title: String!
    description: String
  }

  type Query {
    checklists: [Checklist!]! @requireAuth
    checklist(id: Int!): Checklist @requireAuth
  }

  input CreateChecklistInput {
    title: String!
    description: String
  }

  input UpdateChecklistInput {
    title: String
    description: String
  }

  type Mutation {
    createChecklist(input: CreateChecklistInput!): Checklist! @requireAuth
    updateChecklist(id: Int!, input: UpdateChecklistInput!): Checklist!
      @requireAuth
    deleteChecklist(id: Int!): Checklist! @requireAuth
  }
`
