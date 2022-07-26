import { Form, TextField, Submit } from '@redwoodjs/forms'
import { Link, routes, navigate } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'

const CREATE_CHECKLIST = gql`
  mutation CreateChecklistMutation($input: CreateChecklistInput!) {
    createChecklist(input: $input) {
      id
    }
  }
`

const HomePage = () => {
  const [create] = useMutation(CREATE_CHECKLIST)
  const onSubmit = (data) => {
    console.log(data)
    create({
      variables: {
        input: {
          title: data.title
        }
      }
    })
    navigate(routes.createTemplate({ id: 1 })) // Change 1 to checklistId
  }

  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <Form className="new-template-creator" onSubmit={onSubmit} >
        <TextField name="title" placeholder="Create template here" />
        <Submit>+</Submit>
      </Form>

      <div className="all-templates">
        <h2 className="all-templates-title">Templates</h2>
        <div className="template-list">
          <div className="template-card">How to wash a car</div>
          <div className="template-card">How to wash a car</div>
          <div className="template-card">How to wash a car</div>
        </div>
      </div>
    </>
  )
}

export default HomePage
