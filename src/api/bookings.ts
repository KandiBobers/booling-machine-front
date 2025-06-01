import { Booking } from '../types/booking';
import { BASE_URL } from './url';

// Получить список броней пользователя
export const getBookings = async (
  username: string,
  password: string
): Promise<Booking[]> => {
  try {
    const response = await fetch(`${BASE_URL}/get-booked`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'XUI-WEB-NIGOL': username,
        'XUI-WEB-DROWSSAP': password
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

// Забронировать комнату
export const bookRoom = async (
  roomId: number,
  date: string,
  username: string,
  password: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(
      `${BASE_URL}/book?id=${roomId}&date=${encodeURIComponent(date)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'XUI-WEB-NIGOL': username,
          'XUI-WEB-DROWSSAP': password,
        },
      }
    );

    switch (response.status) {
      case 200:
        return { success: true, message: 'Комната успешно забронирована!' };
      case 228:
        return { success: false, message: 'Комната уже занята на эту дату' };
      case 404:
        return { success: false, message: 'Комната не найдена' };
      default:
        return { success: false, message: 'Неизвестная ошибка' };
    }
  } catch (error) {
    console.error('Booking error:', error);
    return { success: false, message: 'Ошибка сети' };
  }
};

// Отменить бронирование
export const cancelBooking = async (
  roomId: number,
  date: string,
  username: string,
  password: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(
      `${BASE_URL}/remove?id=${roomId}&date=${encodeURIComponent(date)}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'XUI-WEB-NIGOL': username,
          'XUI-WEB-DROWSSAP': password,
        },
      }
    );

    switch (response.status) {
      case 200:
        return { success: true, message: 'Бронирование успешно отменено' };
      case 404:
        return { success: false, message: 'Бронирование не найдено' };
      default:
        return { 
          success: false, 
          message: 'Неизвестная ошибка' 
        };
    }
  } catch (error) {
    console.error('Cancel booking error:', error);
    return { success: false, message: 'Ошибка сети' };
  }
};

// Редактировать бронь
export const editBooking = async (
  roomId: number,
  fromDate: string,
  toDate: string,
  username: string,
  password: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(
      `${BASE_URL}/edit?id=${roomId}&from_date=${encodeURIComponent(fromDate)}&to_date=${encodeURIComponent(toDate)}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'XUI-WEB-NIGOL': username,
          'XUI-WEB-DROWSSAP': password,
        },
      }
    );

    switch (response.status) {
      case 200:
        return { success: true, message: 'Бронь успешно изменена' };
      case 228:
        return { success: false, message: 'Новая дата уже занята' };
      case 404:
        return { success: false, message: 'Бронь не найдена' };
      default:
        return { success: false, message: 'Неизвестная ошибка' };
    }
  } catch (error) {
    console.error('Edit booking error:', error);
    return { success: false, message: 'Ошибка сети' };
  }
};