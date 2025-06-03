import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getRooms } from '../api/rooms';
import { Room } from '../types/room';
import BookingModal from '../components/BookingModal';
import RoomCard from '../components/RoomCard';

interface HomePageProps {
  isLoggedIn: boolean;
  authData: { username: string; password: string };
}

const HomePage: React.FC<HomePageProps> = ({ isLoggedIn, authData }) => {
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [bookingResult, setBookingResult] = useState<{success: boolean; message: string} | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchRooms = async () => {
      try {
        const data = await getRooms(authData.username, authData.password);
        setRooms(data);
      } catch (err) {
        setError('Ошибка при загрузке комнат');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [isLoggedIn, authData.username, authData.password]);

  const handleBookClick = (room: Room) => {
    setSelectedRoom(room);
    setBookingResult(null);
  };

  const handleBookingComplete = (success: boolean, message: string) => {
    setBookingResult({ success, message });
    if (success) {
      setSelectedRoom(null);
    }
  };

  if (!isLoggedIn) return null;
  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="home-page">
      <h1>Доступные комнаты</h1>
      {bookingResult && (
        <div className={`alert ${bookingResult.success ? 'success' : 'error'}`}>
          {bookingResult.message}
        </div>
      )}
      <div className="rooms-grid">
        {rooms.map((room) => (
          <RoomCard 
            key={room.id} 
            room={room} 
            onBookClick={() => handleBookClick(room)} 
          />
        ))}
      </div>
      
      {selectedRoom && (
        <BookingModal
          roomId={selectedRoom.id}
          roomName={selectedRoom.name}
          onClose={() => setSelectedRoom(null)}
          onBook={handleBookingComplete}
          username={authData.username}
          password={authData.password}
        />
      )}
    </div>
  );
};

export default HomePage;