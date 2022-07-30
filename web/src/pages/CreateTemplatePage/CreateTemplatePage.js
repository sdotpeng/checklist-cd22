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
    id
    title
    description
  }
}
`

const CreateTemplatePage = ({ id }) => {
  const formMethods = useForm()

  const templateData = useQuery(GET_TEMPLATE, {
    variables: {
      id: id
    }
  }).data

  const templateTasksData = useQuery(QUERY, {
    variables: {
      id: id
    }
  }).data

  const [createTask, { loading }] = useMutation(CREATE_TASK, {
    onCompleted: () => {
      formMethods.reset()
    }
  })

  const [createChecklist, { data }] = useMutation(CREATE_CHECKLIST, {
    onCompleted: () => {
      templateTasksData.taskList.forEach((task) => (
        createTask({
          variables: {
            input: {
              body: task.body,
              description: task.description,
              completed: false,
              checklistId: data.createChecklist.id
            }
          }
        })
      ))
      navigate(routes.home())
    }
  })

  const onSubmit = (formData) => {
    createTask({
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

  const onClick = () => {
    createChecklist({
      variables: {
        input: {
          title: templateData.template.title,
          description: templateData.template.description
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