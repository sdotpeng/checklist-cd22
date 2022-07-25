import humanize from 'humanize-string'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Checklist/ChecklistsCell'

const DELETE_CHECKLIST_MUTATION = gql`
  mutation DeleteChecklistMutation($id: Int!) {
    deleteChecklist(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const formatEnum = (values) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values)
    }
  }
}

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
}

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const ChecklistsList = ({ checklists }) => {
  const [deleteChecklist] = useMutation(DELETE_CHECKLIST_MUTATION, {
    onCompleted: () => {
      toast.success('Checklist deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete checklist ' + id + '?')) {
      deleteChecklist({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>

            <th>Title</th>

            <th>&nbsp;</th>
          </tr>
        </thead>

        <tbody>
          {checklists.map((checklist) => (
            <tr key={checklist.id}>
              <td>{truncate(checklist.id)}</td>

              <td>{truncate(checklist.title)}</td>

              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.checklist({ id: checklist.id })}
                    title={'Show checklist ' + checklist.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>

                  <Link
                    to={routes.editChecklist({ id: checklist.id })}
                    title={'Edit checklist ' + checklist.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>

                  <button
                    type="button"
                    title={'Delete checklist ' + checklist.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(checklist.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ChecklistsList
