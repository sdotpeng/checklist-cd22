export const QUERY = gql`
  query FindTemplateListHeaderQuery($id: Int!) {
    templateListHeader: checklist(id: $id) {
      id
      title
      description
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ templateListHeader }) => {
  return (
    <templateListHeader key={templateListHeader.id}>
      <h1>{templateListHeader.title}</h1>
      <p>{templateListHeader.description}</p>
    </templateListHeader>
  )
}
