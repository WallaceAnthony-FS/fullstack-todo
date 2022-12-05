import Todo from "../models/Todo.js"
import CRUD from "../helpers/crud.js"

const router = CRUD(Todo)

export default router