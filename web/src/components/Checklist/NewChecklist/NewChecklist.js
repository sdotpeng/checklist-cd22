import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ChecklistForm from 'src/components/Checklist/ChecklistForm'

const CREATE_CHECKLIST_MUTATION = gql`
  mutation CreateChecklistMutation($input: CreateChecklistInput!) {
    createChecklist(input: $input) {
      id
    }
  }
`

const NewChecklist = () => {
  const [createChecklist, { loading, error }] = useMutation(
    CREATE_CHECKLIST_MUTATION,
    {
      onCompleted: () => {
        toast.success('Checklist created')
        navigate(routes.checklists())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createChecklist({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Checklist</h2>
      </header>

      <div className="rw-segment-main">
        <ChecklistForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewChecklist
