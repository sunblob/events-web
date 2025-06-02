import { ofetch } from 'ofetch';
import { API_URL } from './constants';
import type { ConferenceResponse, FileResponse, LoginResponse, User } from './types';

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
        Authorization: `Bearer ${localStorage.getItem('token')}`,
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

  static async uploadImage(pageId: string, file: File) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('page_id', pageId);

      const response = await ofetch<FileResponse>(`${API_URL}/files/upload`, {
        method: 'POST',
        headers: {
          Accept: 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        responseType: 'json',
        body: formData,
      });

      return response;
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to upload image');
    }
  }
}
