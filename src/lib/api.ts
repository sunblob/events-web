import { FetchError, ofetch } from 'ofetch';

import { API_URL } from './constants';

import type {
  ConferencePage,
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
      if (error instanceof FetchError) {
        throw error.data;
      }
      throw new Error('Failed to login');
    }
  }

  static async logout() {
    await ofetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      responseType: 'json',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
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

  static async getEvents() {
    try {
      const response = await ofetch<ConferenceResponse>(`${API_URL}/event-years`, {
        method: 'GET',
        responseType: 'json',
      });

      return response;
    } catch (error) {
      if (error instanceof FetchError) {
        throw error.data;
      }
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
      if (error instanceof FetchError) {
        throw error.data;
      }
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
      if (error instanceof FetchError) {
        throw error.data;
      }
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
      if (error instanceof FetchError) {
        throw error.data;
      }
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
      if (error instanceof FetchError) {
        throw error.data;
      }
      throw new Error('Failed to update user');
    }
  }

  static async createEvent(payload: Partial<ConferenceYear>) {
    try {
      const response = await ofetch<{ data: ConferenceYear }>(`${API_URL}/event-years`, {
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
      if (error instanceof FetchError) {
        throw error.data;
      }
      throw new Error('Failed to create event');
    }
  }

  static async updateEvent(id: number | string, payload: Partial<ConferenceYear>) {
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
      if (error instanceof FetchError) {
        throw error.data;
      }
      throw new Error('Failed to update conference year');
    }
  }

  static async deleteEvent(id: number | string) {
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
      if (error instanceof FetchError) {
        throw error.data;
      }
      throw new Error('Failed to delete conference year');
    }
  }

  static async getEventByYear(year: number) {
    const response = await ofetch<{ data: ConferenceYear }>(`${API_URL}/event-years/year/${year}`, {
      method: 'GET',
      responseType: 'json',
    });
    return response;
  }

  static async deleteEventPage(pageId: string | number) {
    try {
      const response = await ofetch(`${API_URL}/pages/${pageId}`, {
        method: 'DELETE',
        responseType: 'json',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response;
    } catch (error) {
      if (error instanceof FetchError) {
        throw error.data;
      }
      throw new Error('Failed to delete event page');
    }
  }

  static async getPageById(pageId: string | number) {
    const response = await ofetch<{ data: ConferencePage }>(`${API_URL}/pages/${pageId}`, {
      method: 'GET',
      responseType: 'json',
    });
    return response;
  }

  static async getPageBySlug(slug: string) {
    const response = await ofetch<{ data: ConferencePage }>(`${API_URL}/pages/slug/${slug}`, {
      method: 'GET',
      responseType: 'json',
    });
    return response;
  }

  static async createPage(payload: Partial<ConferencePage>) {
    try {
      const response = await ofetch<{ data: ConferencePage }>(`${API_URL}/pages`, {
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
      if (error instanceof FetchError) {
        throw error.data;
      }
      throw new Error('Failed to create page');
    }
  }

  static async updatePage(pageId: string | number, payload: Partial<ConferencePage>) {
    try {
      const response = await ofetch<{ data: ConferencePage }>(`${API_URL}/pages/${pageId}`, {
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
      if (error instanceof FetchError) {
        throw error.data;
      }
      throw new Error('Failed to update page');
    }
  }

  static async deleteFile(fileId: number | string) {
    try {
      const response = await ofetch(`${API_URL}/files/${fileId}`, {
        method: 'DELETE',
        responseType: 'json',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response;
    } catch (error) {
      if (error instanceof FetchError) {
        throw error.data;
      }
      throw new Error('Failed to delete file');
    }
  }

  static async addUserToEvent(userId: number | string, eventId: number | string) {
    try {
      const response = await ofetch(`${API_URL}/event-years/${eventId}/add-user/${userId}`, {
        method: 'POST',
        responseType: 'json',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response;
    } catch (error) {
      if (error instanceof FetchError) {
        throw error.data;
      }
      throw new Error('Failed to add user to event');
    }
  }

  static async removeUserFromEvent(userId: number | string, eventId: number | string) {
    try {
      const response = await ofetch(`${API_URL}/event-years/${eventId}/remove-user/${userId}`, {
        method: 'DELETE',
        responseType: 'json',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response;
    } catch (error) {
      if (error instanceof FetchError) {
        throw error.data;
      }
      throw new Error('Failed to remove user from event');
    }
  }

  static async getPageByYearAndSlug(year: string, slug: string) {
    const response = await ofetch<{ data: ConferencePage }>(`${API_URL}/pages/year/${year}/slug/${slug}`, {
      method: 'GET',
      responseType: 'json',
    });
    return response;
  }
}
