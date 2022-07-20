import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const CreateTemplatePage = () => {
  return (
    <>
      <MetaTags title="CreateTemplate" description="CreateTemplate page" />

      <h1>Create a new template</h1>

      <div class="template">
        <div class="template-header">
          <h2 class="template-title">Building a car</h2>
        </div>

        <div class="template-body">
          <div class="all-tasks">
            <div class="task">
              <input type="checkbox" id="task-1"></input>
              <label for="task-1">
                <span class="custom-checkbox"></span>
                Invent the wheel
              </label>
            </div>

            <div class="task">
              <input type="checkbox" id="task-2"></input>
              <label for="task-2">
                <span class="custom-checkbox"></span>
                Invent the wheel
              </label>
            </div>

            <div class="task">
              <input type="checkbox" id="task-3"></input>
              <label for="task-3">
                <span class="custom-checkbox"></span>
                Invent the wheel
              </label>
            </div>
          </div>

          <div class="new-task-creator">
            <form class="create-task-form" action="">
              <input
                type="text"
                class="new-task"
                placeholder="new task name"
                aria-label="new task name"
              />
              <button class="btn-task" aria-label="create new task">+</button>
            </form>
          </div>
        </div>
      </div>

      <button class="btn-submit-template" aria-label="create new task">Submit</button>
    </>
  )
}

export default CreateTemplatePage
