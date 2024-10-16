// frontend/src/App.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:5000/tasks');
    setTasks(res.data);
  };

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.title && form.description) {
      await axios.post('http://localhost:5000/tasks', form);
      setForm({ title: '', description: '' });
      fetchTasks();
    }
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="title" 
          placeholder="Title" 
          value={form.title}
          onChange={handleChange}
          required 
        />
        <input 
          type="text" 
          name="description" 
          placeholder="Description" 
          value={form.description}
          onChange={handleChange}
          required 
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id}><strong>{task.title}:</strong> {task.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
