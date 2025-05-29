import { ofetch } from 'ofetch';
import { API_URL } from './constants';
import type { ConferenceResponse, LoginResponse, User } from './types';

export class Api {
  static async login({ email, password }: { email: string; password: string }) {
    try {
      const response = await ofetch<LoginResponse>(`${API_URL}/auth/login`, {
        method: 'POST',
        responseType: 'json',
        body: { email, password },
      });

      return response;
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to login');
    }
  }

  static async logout() {
    await ofetch(`${API_URL}/logout`, {
      method: 'POST',
      responseType: 'json',
    });
  }

  static async getMe() {
    const response = await ofetch<User>(`${API_URL}/auth/me`, {
      method: 'GET',
      responseType: 'json',
      headers: {
        Accept: 'application/json',
      },
    });
    return response;
  }

  static async getConferences() {
    try {
      const response = await ofetch<ConferenceResponse>(`${API_URL}/conferences`, {
        method: 'GET',
        responseType: 'json',
      });

      return response;
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to get conferences');
    }
  }
}
