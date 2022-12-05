import { useParams } from "react-router-dom"

const EditTodo = () => {
  const { id } = useParams()
  return (
    <div>Todo: {id}</div>
  )
}

export default EditTodo