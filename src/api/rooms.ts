import { Room } from '../types/room';
import { BASE_URL } from './url';

// Получить всевозможные комнаты
export const getRooms = async (
  username: string,
  password: string
): Promise<Room[]> => {
  try {
    const response = await fetch(`${BASE_URL}/get-rooms`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'XUI-WEB-NIGOL': username,
        'XUI-WEB-DROWSSAP': password,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch rooms');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
};