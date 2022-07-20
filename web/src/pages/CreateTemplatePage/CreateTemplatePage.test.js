import { render } from '@redwoodjs/testing/web'

import CreateTemplatePage from './CreateTemplatePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CreateTemplatePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CreateTemplatePage />)
    }).not.toThrow()
  })
})
