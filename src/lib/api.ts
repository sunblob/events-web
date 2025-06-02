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
          // TODO: remove this
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0L2V2ZW50cy1hcGkvcHVibGljL2FwaS9hdXRoL2xvZ2luIiwiaWF0IjoxNzQ4ODc4MDM0LCJleHAiOjE3NDg4ODE2MzQsIm5iZiI6MTc0ODg3ODAzNCwianRpIjoiQld0Z2lxSGlpUGlBSGp5SCIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.PkRMk_1FjdyFLOBYbmDkrkxspEfpgM7IJulhs2ygnB0`,
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
