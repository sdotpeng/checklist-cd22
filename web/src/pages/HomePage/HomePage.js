import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <form class="create-template-form" action="create-template">
        <input
          type="text"
          class="new-template"
          placeholder="new template name"
          aria-label="new template name"
        />
        <button class="btn-list" aria-label="create new template">+</button>
      </form>

      <div class="all-templates">
        <h2 class="all-templates-title">Templates</h2>
        <div class="template-list">
          <div class="template-card">How to wash a car</div>
          <div class="template-card">How to wash a car</div>
          <div class="template-card">How to wash a car</div>
        </div>
      </div>


    </>
  )
}

export default HomePage
