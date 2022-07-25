import { db } from 'src/lib/db'

export const checklists = () => {
  return db.checklist.findMany()
}

export const checklist = ({ id }) => {
  return db.checklist.findUnique({
    where: { id },
  })
}

export const createChecklist = ({ input }) => {
  return db.checklist.create({
    data: input,
  })
}

export const updateChecklist = ({ id, input }) => {
  return db.checklist.update({
    data: input,
    where: { id },
  })
}

export const deleteChecklist = ({ id }) => {
  return db.checklist.delete({
    where: { id },
  })
}

export const Checklist = {
  tasks: (_obj, { root }) =>
    db.checklist.findUnique({ where: { id: root.id } }).tasks(),
}
