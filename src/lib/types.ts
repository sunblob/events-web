export type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: User;
};

export type User = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  role: 'admin' | 'editor';
};

export type ConferenceYear = {
  id: number;
  year: number;
  title: string;
  description: string;
  is_active: number;
  created_at: string;
  updated_at: string;
  pages?: ConferencePage[];
};

export type ConferencePage = {
  id: number;
  title: string;
  slug: string;
  content: string;
  event_year_id: number;
  files?: PageFile[];
};

export type PageFile = {
  id: number;
  filename: string;
  path: string;
  mimetype: string;
  page_id: number;
  created_at: string;
  updated_at: string;
};

export type BaseResponse<T> = {
  data: T[];
  count: number;
};

export type FileResponse = {
  message: string;
  file: {
    id: number;
    original_name: string;
    path: string;
    url: string;
    size: number;
    mime_type: string;
    page_id: number;
  };
};

export type ConferenceResponse = BaseResponse<ConferenceYear>;
export type ConferencePageResponse = BaseResponse<ConferencePage>;
export type PageFileResponse = BaseResponse<PageFile>;
