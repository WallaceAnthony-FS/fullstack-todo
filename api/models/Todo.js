import mongoose from "mongoose"
const { Schema } = mongoose;

const todoSchema = Schema({
  task: {
    type: String,
    required: true
  },
  priority: {
    type: Number,
    default: 1
  },
  completed: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now()
  }
})

const Todo = mongoose.model("Todo", todoSchema)
export default Todo