export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Post {
  _id: string;
  title: string;
  imageURL?: string;
  content: string;
  username: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

export interface PostPayload {
  title: string;
  imageURL?: string;
  content: string;
}

export interface ApiError {
  message: string;
  details?: unknown;
}

