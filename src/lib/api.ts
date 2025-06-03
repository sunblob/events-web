import { ofetch } from 'ofetch';

import { API_URL } from './constants';

import type {
  ConferenceResponse,
  ConferenceYear,
  FileResponse,
  LoginResponse,
  User,
  UserResponse,
} from './types';

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
      const response = await ofetch<ConferenceResponse>(`${API_URL}/event-years`, {
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

  static async getUsers() {
    const response = await ofetch<UserResponse>(`${API_URL}/users`, {
      method: 'GET',
      responseType: 'json',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    return response;
  }

  static async deleteUser(id: string | number) {
    try {
      const response = await ofetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
        responseType: 'json',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response;
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to delete user');
    }
  }

  static async createUser(payload: Partial<User>) {
    try {
      const response = await ofetch(`${API_URL}/users`, {
        method: 'POST',
        responseType: 'json',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: payload,
      });
      return response;
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to create user');
    }
  }

  static async updateUser(id: string | number, payload: Partial<User>) {
    try {
      const response = await ofetch(`${API_URL}/users/${id}`, {
        method: 'PUT',
        responseType: 'json',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: payload,
      });
      return response;
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to update user');
    }
  }

  static async createConferenceYear(payload: Partial<ConferenceYear>) {
    try {
      const response = await ofetch(`${API_URL}/event-years`, {
        method: 'POST',
        responseType: 'json',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: payload,
      });
      return response;
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to create conference year');
    }
  }

  static async updateConferenceYear(id: number | string, payload: Partial<ConferenceYear>) {
    try {
      const response = await ofetch(`${API_URL}/event-years/${id}`, {
        method: 'PUT',
        responseType: 'json',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: payload,
      });
      return response;
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to update conference year');
    }
  }

  static async deleteConferenceYear(id: number | string) {
    try {
      const response = await ofetch(`${API_URL}/event-years/${id}`, {
        method: 'DELETE',
        responseType: 'json',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response;
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to delete conference year');
    }
  }
}
