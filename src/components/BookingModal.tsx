import React, { useState } from 'react';
import { bookRoom } from '../api/bookings';

interface BookingModalProps {
  roomId: number;
  roomName: string;
  onClose: () => void;
  onBook: (success: boolean, message: string) => void;
  username: string;
  password: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ 
  roomId, roomName, onClose, onBook, username, password 
}) => {
  const [date, setDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await bookRoom(roomId, date, username, password);
      onBook(result.success, result.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Бронирование: {roomName}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Дата/строка брони:
            <input 
              type="text" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              required 
            />
          </label>
          <div className="modal-actions">
            <button type="button" onClick={onClose}>Отмена</button>
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Загрузка...' : 'Подтвердить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;