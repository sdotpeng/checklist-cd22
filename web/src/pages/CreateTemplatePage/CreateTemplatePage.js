import { Form, TextField, Submit } from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import TaskListCell, { QUERY } from 'src/components/TaskListCell'
import TemplateListHeaderCell from 'src/components/TemplateListHeaderCell'

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
      },
      refetchQueries: [{ query: QUERY }, 'FindTaskListQuery' ]
    })
  }

  return (
    <>
      <MetaTags title="CreateTemplate" description="CreateTemplate page" />

      <h1>This is my checklist ID: {id}</h1>

      <div className="template">
        <TemplateListHeaderCell id={id}/>

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