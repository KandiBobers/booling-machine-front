import React, { useState, useEffect } from 'react';
import { getBookings, cancelBooking, editBooking } from '../api/bookings';
import { Booking } from '../types/booking';
import EditBookingModal from '../components/EditBookingModal';

interface MyBookingsPageProps {
  username: string;
  password: string;
}

const MyBookingsPage: React.FC<MyBookingsPageProps> = ({ username, password }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [notification, setNotification] = useState<{message: string; isSuccess: boolean} | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getBookings(username, password);
        setBookings(data);
      } catch (err) {
        setError('Ошибка при загрузке бронирований');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [username, password]);

  const handleCancel = async (roomId: number, date: string) => {
    try {
      const result = await cancelBooking(roomId, date, username, password);
      if (result.success) {
        setBookings(bookings.filter(b => !(b.id === roomId && b.date === date)));
        showNotification('Бронирование отменено', true);
      } else {
        showNotification(result.message, false);
      }
    } catch (err) {
      showNotification('Ошибка при отмене бронирования', false);
    }
  };

  const handleEditComplete = (success: boolean, message: string) => {
    if (success) {
      setEditingBooking(null);
      // Обновляем список бронирований
      getBookings(username, password).then(data => setBookings(data));
    }
    showNotification(message, success);
  };

  const showNotification = (message: string, isSuccess: boolean) => {
    setNotification({ message, isSuccess });
    setTimeout(() => setNotification(null), 3000);
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="my-bookings-page">
      <h1>Мои бронирования</h1>
      
      {notification && (
        <div className={`notification ${notification.isSuccess ? 'success' : 'error'}`}>
          {notification.message}
        </div>
      )}

      {bookings.length === 0 ? (
        <p>У вас нет активных бронирований</p>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking) => (
            <div key={`${booking.id}-${booking.date}`} className="booking-card">
              <h3>{booking.name}</h3>
              {booking.photo_url && <img src={booking.photo_url} alt={booking.name} />}
              <p>Дата: {booking.date}</p>
              <div className="booking-actions">
                <button onClick={() => setEditingBooking(booking)}>Изменить</button>
                <button onClick={() => handleCancel(booking.id, booking.date)}>
                  Отменить
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingBooking && (
        <EditBookingModal
          booking={{
            roomId: editingBooking.id,
            date: editingBooking.date
          }}
          onClose={() => setEditingBooking(null)}
          onSave={handleEditComplete}
          username={username}
          password={password}
        />
      )}
    </div>
  );
};

export default MyBookingsPage;