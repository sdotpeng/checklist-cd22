export const QUERY = gql`
query FindTaskListQuery($id: Int!) {
  taskList: tasksChecklist(checklistId: $id) {
    body
    description
  }
}
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ taskList }) => {
  return taskList.map((taskList) => (
    <taskList key={taskList.key}>
      <div className="task">
        <input type="checkbox" id="task-1"></input>
        <label htmlFor="task-1">
          <span className="custom-checkbox"></span>
          {taskList.body}
          <br/>
          {taskList.description}
        </label>
      </div>
    </taskList>
  ))
}
