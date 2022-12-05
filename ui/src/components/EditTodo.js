import { useQuery, useMutation, useQueryClient } from "react-query";
import { getTodo, updateTodo, deleteTodo } from "../api/todosApi";
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";

const EditTodo = () => {

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { id } = useParams()
  const { isLoading, isError, error, data: todo, isSuccess } = useQuery('todo', () => getTodo(id))
  const [values, setValues] = useState({
    task: '',
    priority: '',
    completed: ''
  })

  useEffect(() => {
    if (isSuccess) {
      setValues({
        task: todo.data.task,
        priority: todo.data.priority,
        completed: todo.data.completed
      })
    }
  }, [todo, isSuccess])

  const updateTodoMutation = useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todo")
      navigate("/")
    }
  })
  
  const deleteTodoMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todo")
      navigate("/", {replace: true})
    }
  })

  // const handleComplete = () => {
  //   updateTodoMutation.mutate({ ...todo, completed: !todo.completed, _id: id })
  // }

  const handleDelete = () => {
    deleteTodoMutation.mutate(todo._id)
  }

  const handleChange = e => {
    e.persist()
    if(e.target.name === "completed"){
      setValues(values => ({
        ...values,
        completed: !values.completed
      }))
    } else {
      setValues(values => ({
        ...values,
        [e.target.name]: e.target.value
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateTodoMutation.mutate({
      ...values,
      _id: id
    })
  }

  const priorities = {
    1: "1 -- lowest",
    2: "2",
    3: "3",
    4: "4",
    5: "5 -- highest",
  }
  return (
    <div className="flex items-center m-8">
      {isSuccess &&
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <input className="h-4 w-4 mr-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" type="checkbox" checked={values.completed} id={todo._id} name="completed" onChange={handleChange} />
            <input value={values.task} name="task" onChange={handleChange} />
            <select name="priority" onChange={handleChange} value={values.priority}>
              {Object.keys(priorities).map(key =>
                <option value={key} key={key}>
                  {priorities[key]}
                </option>)}
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="inline-flex items-center rounded border border-blue-300 bg-white px-2.5 py-1.5 text-xs font-medium text-blue-700 shadow-sm hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Update
            </button>
            <button type="button" className="text-sm font-medium text-red-800 justify-self-end" onClick={handleDelete}>Delete</button>
          </div>
        </form>}
    </div>
  )
}

export default EditTodo