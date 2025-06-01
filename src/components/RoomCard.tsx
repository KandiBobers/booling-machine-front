import React from 'react';
import { Room } from '../types/room';

interface RoomCardProps {
  room: Room;
  onBookClick: () => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onBookClick }) => {
  return (
    <div className="room-card">
      <img src={room.photo_url} alt={room.name} />
      <h3>{room.name}</h3>
      <p>ID: {room.id}</p>
      <button onClick={onBookClick}>Забронировать</button>
    </div>
  );
};

export default RoomCard;