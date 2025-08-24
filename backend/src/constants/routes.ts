export const ROUTES = {
  // USER ROUTES
  USER: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    RESET_PASSWORD: '/auth/users/:userId/password',
    GET_USERS: 'users',
    GET_USER_BY_ID: '/auth/users/:userId',
  },

  // TEST ROUTES
  TEST: {
    CREATE: '/test/create',
    GET_ALL: '/test/all/:userId',
    COUNT: '/test/count',
  },

  // ROOM ROUTES
  ROOM: {
    CREATE: '/api/room/create',
    GET_ALL: '/api/room',
    FETCH_BY_CODE: '/api/room/code/:code',
  },
};
