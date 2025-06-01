import { BASE_URL } from "./url";

// Войти
export const login = async (username: string, password: string): Promise<boolean> => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'XUI-WEB-NIGOL': username,
        'XUI-WEB-DROWSSAP': password,
        'Content-Type': 'application/json',
      },
    });

    return response.status === 200;
  } catch (error) {
    return false;
  }
};