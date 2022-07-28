import { Form, TextField, Submit, useForm } from '@redwoodjs/forms'
import { Link, routes, navigate } from '@redwoodjs/router'
import { MetaTags, useMutation, useQuery } from '@redwoodjs/web'
import TaskListCell, { QUERY } from 'src/components/TaskListCell'
import TemplateListHeaderCell from 'src/components/TemplateListHeaderCell'

const CREATE_TASK = gql`
  mutation CreateTaskMutation($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
    }
  }
`

const CREATE_CHECKLIST = gql`
  mutation CreateChecklistMutation($input: CreateChecklistInput!) {
    createChecklist(input: $input) {
      id
    }
  }
`

const GET_TEMPLATE = gql`
query FindTemplateQuery($id: Int!) {
  template: checklist(id: $id) {
    title
    description
  }
}
`

const CreateTemplatePage = ({ id }) => {
  const formMethods = useForm()

  // Replace error with data
  const { error } = useQuery(GET_TEMPLATE)
  const [create, { loading }] = useMutation(CREATE_TASK, {
    onCompleted: () => {
      formMethods.reset()
    }
  })

  // Essentially duplicate checklist
  // Need to get this template's title and tasks
  // After mutation function executed, user is taken to home
  const [createChecklist, { data }] = useMutation(CREATE_CHECKLIST, {
    onCompleted: () => {
      // Test data
      const taskList = [
        { body: "temp1", completed: false, checklistId: 2 },
        { body: "temp2", completed: false, checklistId: 2 },
        { body: "temp3", completed: false, checklistId: 2 }
      ]

      // Replace with the template's tasks
      taskList.forEach(() => (
        create({
          variables: {
            input: {
              body: "New",
              description: "New",
              completed: false,
              checklistId: data.createChecklist.id
            }
          }
        })
      ))
      navigate(routes.home()) // Potentially change location?
    }
  })

  const onSubmit = (formData) => {
    create({
      variables: {
        input: {
          body: formData.body,
          description: formData.description,
          completed: false,
          checklistId: id
        }
      },
      refetchQueries: [{ query: QUERY }, 'FindTaskListQuery']
    })
  }

  // Replace input with this template's data
  const onClick = () => {
    createChecklist({
      variables: {
        input: {
          title: "Temp",
          description: "Temp"
        }
      }
    })
  }

  return (
    <>
      <MetaTags title="CreateTemplate" description="CreateTemplate page" />

      <h1>This is my checklist ID: {id}</h1>

      <div className="template">
        <TemplateListHeaderCell id={id} />

        <div className="template-body">
          <TaskListCell id={id} />

          <Form className="new-task-creator" onSubmit={onSubmit} formMethods={formMethods}>
            <TextField name="body" placeholder="Enter task here" />
            <TextField name="description" placeholder="Enter description here" />
            <Submit disabled={loading}>+</Submit>
          </Form>
        </div>
      </div>

      <Form className="new-checklist-form" onSubmit={onClick} >
        <Submit>Testing create checklist</Submit>
      </Form>
    </>
  )
}

export default CreateTemplatePage