import { useQuery, useMutation, useQueryClient } from "react-query";
import { getTodos, addTodo } from "../api/todosApi";
import { useState } from "react"
import { XCircleIcon, PlusIcon } from '@heroicons/react/20/solid'
import TodoItem from "./TodoItem";


const TodoList = () => {
  const [values, setValues] = useState({
    task: "",
    priority: 1
  })
  const queryClient = useQueryClient()

  const { isLoading, isError, error, data: todos, isSuccess } = useQuery('todos', getTodos)

  const addTodoMutation = useMutation(addTodo, {
    onSuccess: () => {
      // invalidates cache and refetches todos
      queryClient.invalidateQueries("todos")
    }
  })

  const handleSubmit = e => {
    e.preventDefault()
    addTodoMutation.mutate(values)
    setValues({
      task: "",
      priority: 1
    })
  }

  const handleChange = (e) => {
    e.persist()
    setValues(values => ({
      ...values,
      [e.target.name]: e.target.value
    }))
  }

  let content
  if (isLoading) {
    content = <p>Loading...</p>
  } else if (isError) {
    content = <p className="rounded-md flex bg-red-50 p-4">
      <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
      <h3 className="text-sm font-medium text-red-800">{error.message}</h3>
    </p>
  } else if(isSuccess){
    try {
      content = todos.map(todo => <TodoItem todo={todo} key={todo._id} />)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="m-auto w-[600px]">
      <form onSubmit={handleSubmit} className="flex items-end">
      <div>
      <label htmlFor="task" className="block text-lg font-medium text-gray-700">
        Task
      </label>
      <div className="mt-1">
        <input
          type="task"
          name="task"
          id="task"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
          placeholder="Enter new todo..."
          aria-describedby="task-description"
          onChange={e => handleChange(e)}
        />
      </div>
    </div>
    <button className="flex items-center"><PlusIcon className="h-8 w-8"/>Todo</button>
      </form>
      {content}
    </div>
  )
}

export default TodoList