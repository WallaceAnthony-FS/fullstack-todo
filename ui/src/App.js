import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import TodoList from './components/TodoList.js';
import EditTodo from './components/EditTodo';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="todo/:id" element={<EditTodo />}/>
        <Route path="/" exact element={<TodoList />}/>
      </Routes>
    </Router>
  );
}

export default App;
