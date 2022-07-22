import { Form, TextField, Submit } from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import TaskListCell from 'src/components/TaskListCell'

const CREATE_TASK = gql`
  mutation CreateTaskMutation($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
    }
  }
`

const CreateTemplatePage = () => {

  const [create] = useMutation(CREATE_TASK)

  const onSubmit = (data) => {
    console.log(data)
    create({
      variables: {
        input: {
          body: data.name,
          completed: false
        }
      }
    })
  }

  return (
    <>
      <MetaTags title="CreateTemplate" description="CreateTemplate page" />

      <h1>Create a new template</h1>

      <div className="template">
        <div className="template-header">
          <h2 className="template-title">Building a car</h2>
        </div>

        <div className="template-body">
          <TaskListCell />

          <Form className="new-task-creator" onSubmit={onSubmit}>
            <TextField name="name" />
            <Submit>+</Submit>
          </Form>
        </div>
      </div>

      <button className="btn-submit-template" aria-label="create new task">Submit</button>
    </>
  )
}

export default CreateTemplatePage