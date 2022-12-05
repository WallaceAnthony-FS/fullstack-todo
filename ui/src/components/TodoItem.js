import { useQuery, useMutation, useQueryClient } from "react-query";
import { updateTodo, deleteTodo } from "../api/todosApi";
import { Link } from "react-router-dom"

const TodoItem = ({todo}) => {

  const queryClient = useQueryClient()

  const updateTodoMutation = useMutation(updateTodo, {
    onSuccess: () => {
      // invalidates cache and refetches todos
      queryClient.invalidateQueries("todos")
    }
  })

  const deleteTodoMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      // invalidates cache and refetches todos
      queryClient.invalidateQueries("todos")
    }
  })

  const handleComplete = () => {
    updateTodoMutation.mutate({ ...todo, completed: !todo.completed })
  }

  const handleDelete = () => {
    deleteTodoMutation.mutate(todo._id)
  }

  return (
    <div className="flex items-center">
      <input className="h-4 w-4 mr-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" type="checkbox" checked={todo.completed} id={todo._id} onChange={handleComplete}/>
      <Link to={`/todo/:${todo._id}`}>{todo.task}</Link>
      <button className="ml-4 text-sm font-medium text-red-800 justify-self-end" onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default TodoItem