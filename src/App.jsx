import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatPrompt from './components/ChatPrompt';
import './App.css';

function App() {
  const [selectedRoom, setSelectedRoom] = useState('');
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedRoom) {
      navigate(`/salon/${selectedRoom}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-indigo-100 flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-indigo-700 mb-4 mt-2">
        Chat con IA
      </h1>

      <div className="w-full max-w-2xl mx-auto bg-white p-4 rounded-xl shadow-xl mb-4">
        <label htmlFor="room" className="block text-lg font-semibold mb-2 text-gray-700">
          Seleccione el salón
        </label>
        <select
          id="room"
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">-- Seleccione una opción --</option>
          <option value="EC-2.1">EC-2.1</option>
          <option value="EC-2.2">EC-2.2</option>
          <option value="EC-2.3">EC-2.3</option>
          <option value="EC-2.4">EC-2.4</option>
          <option value="EC-3.1">EC-3.1</option>
          <option value="EC-3.2">EC-3.2</option>
          <option value="EC-3.3">EC-3.3</option>
          <option value="EC-3.5">EC-3.5</option>
          <option value="EC-A1-A2">EC-A1-A2</option>
        </select>

        <button
          onClick={handleContinue}
          disabled={!selectedRoom}
          className="mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition disabled:opacity-50"
        >
          Continuar
        </button>
      </div>

      <div className="w-full max-w-2xl mx-auto flex-1 flex flex-col">
        <div className="flex-1 flex flex-col pb-4">
          <ChatPrompt selectedRoom={selectedRoom} />
        </div>

        <p className="text-center text-purple-600 font-medium text-sm my-2">
          Desarrollado con ❤️ para UNICATOLICA 2025
        </p>
      </div>
    </div>
  );
}

export default App;
