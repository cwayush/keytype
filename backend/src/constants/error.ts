export const ERR_MESSAGES = {
  // USER ERROR MESSAGES
  USER: {
    USER_EXISTS: 'User already exists',
    CREATE_FAILED: 'Failed to create user',
    UPDATE_FAILED: 'Failed to update user',
    FETCH_FAILED: 'Failed to fetch users',
    FETCH_BY_ID_FAILED: 'Failed to fetch user by ID',
    INVALID_PASSWORD: 'Invalid password provided',
    USER_NOT_FOUND: 'User not found',
    EMAIL_NOT_VERIFIED: 'Email address not verified',
  },

  // TEST ERROR MESSAGES
  TEST: {
    CREATE_FAILED: 'Failed to create test',
    FETCH_FAILED: 'Failed to fetch tests',
    COUNT_FAILED: 'Failed to fetch test count',
  },

  // ROOM ERROR MESSAGES
  ROOM: {
    CREATE_FAILED: 'Failed to create room',
    FETCH_FAILED: 'Failed to fetch rooms',
    FETCH_BY_CODE_FAILED: 'Failed to fetch room by code',
  },

};
