export const LOG_MESSAGES = {
  // AUTH SUCCESS MESSAGES
  USER: {
    CREATE_REQUEST: 'Processing create user request',
    CREATED: 'User created successfully',
    UPDATE_REQUEST: 'Processing update user request',
    UPDATED: 'User updated successfully',
    FETCH_REQUEST: 'Fetching users',
    FETCHED: 'Users fetched successfully',
    FETCH_BY_ID_REQUEST: 'Fetching user by ID',
    FETCH_BY_ID_SUCCESS: 'User fetched successfully by ID',
    LOGIN_REQUEST: 'Processing user login request',
    LOGIN_SUCCESS: 'User logged in successfully',
  },

  // TEST SUCCESS MESSAGES
  TEST: {
    CREATE_REQUEST: 'Processing create test request',
    CREATED: 'Test created successfully',
    FETCH_REQUEST: 'Fetching tests',
    FETCHED: 'Tests fetched successfully',
    COUNT_REQUEST: 'Fetching total test count',
    COUNT_FETCHED: 'Total test count fetched successfully',
  },

  // ROOM SUCCESS MESSAGES
  ROOM: {
    CREATE_REQUEST: 'Processing create room request',
    CREATED: 'Room created successfully',
    FETCH_REQUEST: 'Fetching rooms',
    FETCHED: 'Rooms fetched successfully',
    FETCH_BY_CODE_REQUEST: 'Fetching room by code',
    FETCH_BY_CODE_SUCCESS: 'Room fetched successfully by code',
  },
};
