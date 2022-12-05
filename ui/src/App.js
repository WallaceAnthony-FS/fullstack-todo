import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import TodoList from './components/TodoList.js';
import EditTodo from './components/EditTodo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="todo/:id" element={<EditTodo />}/>
        <Route path="/" exact element={<TodoList />}/>
      </Routes>
    </Router>
  );
}

export default App;
