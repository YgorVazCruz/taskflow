import { useState, useEffect } from 'react';

export default function Home({ logout }) {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('taskflow-tasks');
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('taskflow-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: input,
        createdAt: new Date().toLocaleString(),
        completedAt: null,
        done: false
      }
    ]);
    setInput('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t =>
      t.id === id ? {
        ...t,
        done: !t.done,
        completedAt: !t.done ? new Date().toLocaleString() : null
      } : t
    ));
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-700">Minhas Tarefas</h1>
          <button onClick={logout} className="text-sm text-red-500 hover:underline">Sair</button>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            className="flex-1 p-2 border rounded"
            type="text"
            placeholder="Digite uma tarefa"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={addTask}
            className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
          >
            Adicionar
          </button>
        </div>

        <ul className="space-y-2">
          {tasks.map(task => (
            <li key={task.id} className="p-3 border rounded flex flex-col bg-gray-50">
              <div className="flex justify-between items-center">
                <span
                  onClick={() => toggleTask(task.id)}
                  className={`cursor-pointer text-lg ${task.done ? 'line-through text-gray-400' : ''}`}
                >
                  {task.text}
                </span>
                <button
                  onClick={() => removeTask(task.id)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Remover
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Criada: {task.createdAt}</p>
              {task.completedAt && (
                <p className="text-xs text-green-500">Concluída: {task.completedAt}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
