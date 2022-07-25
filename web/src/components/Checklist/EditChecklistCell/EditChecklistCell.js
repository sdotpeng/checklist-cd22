import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ChecklistForm from 'src/components/Checklist/ChecklistForm'

export const QUERY = gql`
  query EditChecklistById($id: Int!) {
    checklist: checklist(id: $id) {
      id
      title
    }
  }
`
const UPDATE_CHECKLIST_MUTATION = gql`
  mutation UpdateChecklistMutation($id: Int!, $input: UpdateChecklistInput!) {
    updateChecklist(id: $id, input: $input) {
      id
      title
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ checklist }) => {
  const [updateChecklist, { loading, error }] = useMutation(
    UPDATE_CHECKLIST_MUTATION,
    {
      onCompleted: () => {
        toast.success('Checklist updated')
        navigate(routes.checklists())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateChecklist({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Checklist {checklist.id}
        </h2>
      </header>

      <div className="rw-segment-main">
        <ChecklistForm
          checklist={checklist}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
