import {
  checklists,
  checklist,
  createChecklist,
  updateChecklist,
  deleteChecklist,
} from './checklists'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('checklists', () => {
  scenario('returns all checklists', async (scenario) => {
    const result = await checklists()

    expect(result.length).toEqual(Object.keys(scenario.checklist).length)
  })

  scenario('returns a single checklist', async (scenario) => {
    const result = await checklist({ id: scenario.checklist.one.id })

    expect(result).toEqual(scenario.checklist.one)
  })

  scenario('creates a checklist', async () => {
    const result = await createChecklist({
      input: { title: 'String' },
    })

    expect(result.title).toEqual('String')
  })

  scenario('updates a checklist', async (scenario) => {
    const original = await checklist({ id: scenario.checklist.one.id })
    const result = await updateChecklist({
      id: original.id,
      input: { title: 'String2' },
    })

    expect(result.title).toEqual('String2')
  })

  scenario('deletes a checklist', async (scenario) => {
    const original = await deleteChecklist({ id: scenario.checklist.one.id })
    const result = await checklist({ id: original.id })

    expect(result).toEqual(null)
  })
})
