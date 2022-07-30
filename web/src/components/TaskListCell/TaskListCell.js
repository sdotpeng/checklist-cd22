import { Form, Submit, HiddenField } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'

export const QUERY = gql`
query FindTaskListQuery($id: Int!) {
  taskList: tasksChecklist(checklistId: $id) {
    id
    body
    description
  }
}
`

const DELETE_TASK = gql`
  mutation DeleteTaskMutation($taskId: Int!) {
    deleteTask(id: $taskId) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ taskList }) => {
  const [deleteTask, { error }] = useMutation(DELETE_TASK)

  if (error) console.log(`Submission error! ${error.message}`)

  const onSubmit = (formData) => {
    let id = Number(formData.deleteId)
    console.log(id) // Debug
    deleteTask({
      variables: {
        taskId: id
      },
      refetchQueries: [{ query: QUERY }, 'FindTaskListQuery']
    })
  }

  return taskList.map((taskList) => (
    <taskList key={taskList.key}>
      <div className="task">
        <input type="checkbox" id="task-1"></input>
        <label htmlFor="task-1">
          <span className="custom-checkbox"></span>
          {taskList.body}
          <br />
          {taskList.description}
          {taskList.id}
        </label>
        <Form className="delete-task-form" onSubmit={onSubmit}>
          <HiddenField name="deleteId" value={taskList.id} />
          <Submit>Delete</Submit>
        </Form>
      </div>
    </taskList>
  ))
}
