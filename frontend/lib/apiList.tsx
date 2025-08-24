import { apiRoot } from './root';
// import { apiVersionControl } from "./versionControl";

export const apiList = {
  login: `${apiRoot.baseAPI}/auth/login`,
  register: `${apiRoot.baseAPI}/auth/register`,
  users: `${apiRoot.baseAPI}/users`,
  usersById: `${apiRoot.baseAPI}/auth/users`,
  usersByEmail: `${apiRoot.baseAPI}/users`,
  usersPassword: `${apiRoot.baseAPI}/users/:userId/password`,
  testGetAll: `${apiRoot.baseAPI}/test/all`,
  testCreate: `${apiRoot.baseAPI}/test/create`,
  // roomGetAll: `${apiRoot.baseAPI}/room/all/`,
  // roomCreate: `${apiRoot.baseAPI}/room/create`,
  resetPassword: `${apiRoot.baseAPI}/users/:userId/password`,

  // Room Routes
  createRoom: `${apiRoot.baseAPI}/room/create`,
  getAllRooms: `${apiRoot.baseAPI}/room`,
  getRoomByCode :`${apiRoot.baseAPI}/room/code`
};
