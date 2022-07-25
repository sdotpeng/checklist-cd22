import { Link, routes } from '@redwoodjs/router'

import Checklists from 'src/components/Checklist/Checklists'

export const QUERY = gql`
  query FindChecklists {
    checklists {
      id
      title
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No checklists yet. '}

      <Link to={routes.newChecklist()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ checklists }) => {
  return <Checklists checklists={checklists} />
}
