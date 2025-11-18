import api from './client';
import type { AuthResponse, PaginatedResponse, Post, PostPayload } from '../types';

export const authApi = {
  register: (payload: { username: string; email: string; password: string }) =>
    api.post<AuthResponse>('/auth/register', payload).then((res) => res.data),
  login: (payload: { identifier: string; password: string }) =>
    api.post<AuthResponse>('/auth/login', payload).then((res) => res.data),
};

export const postApi = {
  list: (params: { page?: number; limit?: number; search?: string }) =>
    api
      .get<PaginatedResponse<Post>>('/posts', { params })
      .then((res) => res.data),
  detail: (id: string) => api.get<{ data: Post }>(`/posts/${id}`).then((res) => res.data.data),
  create: (payload: PostPayload) =>
    api.post<{ data: Post }>('/posts', payload).then((res) => res.data.data),
  update: (id: string, payload: Partial<PostPayload>) =>
    api.put<{ data: Post }>(`/posts/${id}`, payload).then((res) => res.data.data),
  remove: (id: string) => api.delete(`/posts/${id}`),
  mine: () => api.get<{ data: Post[] }>('/posts/me').then((res) => res.data.data),
};

