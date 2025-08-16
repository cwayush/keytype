import { apiClient } from '@/lib/apiClient';
import { endPoints } from '@/constants/endpoints';

export const signup = (data: { username: string; password: string }) =>
  apiClient.post(endPoints.REGISTER, data);

export const login = (data: { username: string; password: string }) =>
  apiClient.post(endPoints.LOGIN, data);

export const getUsers = () => apiClient.get(endPoints.USERS);

export const updateUser = (data: { username: string; password: string }) =>
  apiClient.put(endPoints.USERS_PASSWORD, data);
