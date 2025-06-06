import React from 'react';

interface TodoItemProps {
  todo: string;
  completed: boolean;
  onToggle: () => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, completed, onToggle }) => {
  return (
    <li onClick={onToggle} style={{ textDecoration: completed ? 'line-through' : 'none', cursor: 'pointer' }}>
      {todo}
    </li>
  );
};
