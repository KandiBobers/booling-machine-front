import React, { useState } from 'react';
import { editBooking } from '../api/bookings';

interface EditBookingModalProps {
  booking: {
    roomId: number;
    date: string;
  };
  onClose: () => void;
  onSave: (success: boolean, message: string) => void;
  username: string;
  password: string;
}

const EditBookingModal: React.FC<EditBookingModalProps> = ({ 
  booking, onClose, onSave, username, password 
}) => {
  const [newDate, setNewDate] = useState(booking.date);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await editBooking(
        booking.roomId, 
        booking.date, 
        newDate, 
        username, 
        password
      );
      onSave(result.success, result.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Редактировать бронь</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Новая дата/строка брони:
            <input 
              type="text" 
              value={newDate} 
              onChange={(e) => setNewDate(e.target.value)} 
              required 
            />
          </label>
          <div className="modal-actions">
            <button type="button" onClick={onClose}>Отмена</button>
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Сохранение...' : 'Сохранить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookingModal;