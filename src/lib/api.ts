import { ofetch } from 'ofetch';

export class Api {
  private static BASE_URL = 'http://localhost:3000';

  static async login({ email, password }: { email: string; password: string }) {
    const response = await ofetch(`${this.BASE_URL}/login`, {
      method: 'POST',
      responseType: 'json',
      body: { email, password },
    });

    return response;
  }

  static async logout() {
    const response = await ofetch(`${this.BASE_URL}/logout`, {
      method: 'POST',
      responseType: 'json',
    });
  }
}
