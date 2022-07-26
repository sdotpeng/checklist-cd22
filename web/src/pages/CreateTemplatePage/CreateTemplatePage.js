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

const CreateTemplatePage = ({ id }) => {
  const [create] = useMutation(CREATE_TASK)
  const onSubmit = (data) => {
    console.log(data)
    create({
      variables: {
        input: {
          body: data.body,
          description: data.description,
          completed: false,
          checklistId: id
        }
      }
    })
  }

  return (
    <>
      <MetaTags title="CreateTemplate" description="CreateTemplate page" />

      <h1>This is my checklist ID: {id}</h1>

      <div className="template">
        <h2 className="template-title">Building a car</h2>

        <div className="template-body">
          <TaskListCell id={id} />

          <Form className="new-task-creator" onSubmit={onSubmit}>
            <TextField name="body" placeholder="Enter task here" />
            <TextField name="description" placeholder="Enter description here" />
            <Submit>+</Submit>
          </Form>
        </div>
      </div>
    </>
  )
}

export default CreateTemplatePage