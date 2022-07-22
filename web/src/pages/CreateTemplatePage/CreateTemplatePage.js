import { Form, TextField, Submit } from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'

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
          <div className="all-tasks">
            <div className="task">
              <input type="checkbox" id="task-1"></input>
              <label htmlFor="task-1">
                <span className="custom-checkbox"></span>
                Invent the wheel
              </label>
            </div>

            <div className="task">
              <input type="checkbox" id="task-2"></input>
              <label htmlFor="task-2">
                <span className="custom-checkbox"></span>
                Invent the wheel
              </label>
            </div>

            <div className="task">
              <input type="checkbox" id="task-3"></input>
              <label htmlFor="task-3">
                <span className="custom-checkbox"></span>
                Invent the wheel
              </label>
            </div>
          </div>

          <div className="new-task-creator">
            <form className="create-task-form" action="">
              <input
                type="text"
                className="new-task"
                placeholder="new task name"
                aria-label="new task name"
              />
              <button className="btn-task" aria-label="create new task">+</button>
            </form>
          </div>

          <Form onSubmit={onSubmit}>
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