import { apiClient } from '@/lib/apiClient';
import { apiList } from '@/lib/apiList';

export const signup = (data: { email: string; password: string }) =>
  apiClient.post(apiList.register, data);

export const login = (data: { email: string; password: string }) =>
  apiClient.post(apiList.login, data);

export const getUsers = () => apiClient.get(apiList.users);

export const updateUser = (id: string, data: any) =>
  apiClient.put(`${apiList.usersById}/${id}`, data);

export const getuserById = (id: string) =>
  apiClient.get(`${apiList.usersById}/${id}`);

export const getalltestbyId = (id: string) =>
  apiClient.get(`${apiList.testGetAll}/${id}`);

export const getUserByEmail = (email: string) =>
  apiClient.get(`${apiList.usersByEmail}/${email}`);

export const createRoom = (data: {
  code: string;
  name: string;
  mode: string;
  modeOption: string;
  userId: string;
}) => apiClient.post(apiList.createRoom, data);

export const getAllRooms = () => apiClient.get(apiList.getAllRooms);

export const getRoomByCode = (code: string) =>
  apiClient.get(`${apiList.getRoomByCode}/${code}`);
