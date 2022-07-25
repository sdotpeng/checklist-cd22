import Checklist from 'src/components/Checklist/Checklist'

export const QUERY = gql`
  query FindChecklistById($id: Int!) {
    checklist: checklist(id: $id) {
      id
      title
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Checklist not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ checklist }) => {
  return <Checklist checklist={checklist} />
}
