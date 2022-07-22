export const QUERY = gql`
query FindTaskListQuery {
  taskList: tasks {
    body
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
        </label>
      </div>
    </taskList>
  ))
}
