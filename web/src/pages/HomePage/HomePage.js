import { Form, TextField, Submit } from '@redwoodjs/forms'
import { Link, routes, navigate } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const HomePage = () => {

  const onSubmit = (data) => {
    console.log(data)
    navigate(routes.createTemplate())
  }

  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <Form className="new-task-creator" onSubmit={onSubmit} action="create-template" >
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
