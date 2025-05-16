import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function SalonInfo() {
  const { roomId } = useParams();
  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const roomImages = {
    "EC-2.1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvaityRWgRGwStKGvzI1HA6LNkm2BUWVdnGg&s",
    "EC-2.2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvaityRWgRGwStKGvzI1HA6LNkm2BUWVdnGg&s",
    "EC-2.3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvaityRWgRGwStKGvzI1HA6LNkm2BUWVdnGg&s",
    "EC-2.4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvaityRWgRGwStKGvzI1HA6LNkm2BUWVdnGg&s",
    "EC-3.1": "https://res.cloudinary.com/liaison-inc/image/upload/c_fit,f_auto,q_auto,w_1200/services/fash/backgrounds/hair-salon.jpg",
    "EC-3.2": "https://res.cloudinary.com/liaison-inc/image/upload/c_fit,f_auto,q_auto,w_1200/services/fash/backgrounds/hair-salon.jpg",
    "EC-3.3": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/EC-+3.3.jpg",
    "EC-3.5": "https://noutube-aplicaciones-moviles.s3.us-east-2.amazonaws.com/EC-3.5.jpg",
    "EC-A1-A2": "https://res.cloudinary.com/liaison-inc/image/upload/c_fit,f_auto,q_auto,w_1200/services/fash/backgrounds/hair-salon.jpg"
  };

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axios.get(`/api/auditoriums/code/${roomId}`);
        setRoomData(response.data);
      } catch (err) {
        setError('Error al cargar los datos del salón');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomData();
  }, [roomId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p>Cargando información del salón...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Información del Salón {roomData?.code}</h2>

        <img
          src={roomImages[roomId] || 'https://via.placeholder.com/300'}
          alt={`Imagen del salón ${roomData?.code}`}
          className="rounded shadow-md max-h-64 object-contain mx-auto mb-4"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-lg mb-2">Información General</h3>
            <p><strong>Nombre:</strong> {roomData?.name}</p>
            <p><strong>Piso:</strong> {roomData?.floor}</p>
            <p><strong>Capacidad:</strong> {roomData?.capacity}</p>
            <p><strong>Asientos contados:</strong> {roomData?.countedSeats}</p>
            <p><strong>Estado:</strong> {roomData?.status}</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Características</h3>
            <p><strong>Tipo:</strong> {roomData?.type}</p>
            <p><strong>Mesas:</strong> {roomData?.tableType}</p>
            <p><strong>Sillas:</strong> {roomData?.chairType}</p>
            <p><strong>Pizarra:</strong> {roomData?.boardType}</p>
            <p><strong>Equipamiento:</strong> {roomData?.equipment}</p>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold text-lg mb-2">Contacto para reservas</h3>
          <p>{roomData?.reservationContact}</p>
        </div>

        {roomData?.comments && (
          <div className="mt-4 p-3 bg-yellow-50 rounded">
            <h3 className="font-semibold text-lg mb-1">Comentarios</h3>
            <p>{roomData?.comments}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SalonInfo;