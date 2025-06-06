import { useState, useEffect } from 'react';
import { TodoItem } from '../components/TodoItem';

interface Todo {
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('todos');
    if (stored) {
      try {
        setTodos(JSON.parse(stored));
      } catch {
        // ignore parsing errors
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { text: input.trim(), completed: false }]);
    setInput('');
  };

  const toggleTodo = (index: number) => {
    setTodos(todos.map((todo, i) => i === index ? { ...todo, completed: !todo.completed } : todo));
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '0 1rem' }}>
      <h1>Todo App</h1>
      <button onClick={() => setDarkMode(!darkMode)} style={{ marginBottom: '1rem' }}>
        Toggle {darkMode ? 'Light' : 'Dark'} Mode
      </button>
      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add todo"
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo.text}
            completed={todo.completed}
            onToggle={() => toggleTodo(index)}
          />
        ))}
      </ul>
    </div>
  );
}
