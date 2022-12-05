import axios from 'axios'

const todosApi = axios.create({
  baseURL: process.env.NODE_ENV === "development"
    ? 'http://localhost:8000/api/v1'
    : process.env.REACT_APP_BASE_URL
})

export const getTodos = async () => {
  const response = await todosApi.get("/todos")
  return response.data
}

export const getTodo = async (id) => {
  return await todosApi.get(`/todos/${id}`)
}

export const addTodo = async (todo) => {
  return await todosApi.post("/todos", todo)
}

export const updateTodo = async (todo) => {
  return await todosApi.patch(`/todos/${todo._id}`, todo)
}

export const deleteTodo = async (id) => {
  return await todosApi.delete(`/todos/${id}`, id)
}

export default todosApi

