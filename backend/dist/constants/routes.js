"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROUTES = void 0;
exports.ROUTES = {
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
        CREATE: '/room/create',
        GET_ALL: '/room/all/:userId',
        FETCH_BY_CODE: '/room/code/:code',
    },
};
//# sourceMappingURL=routes.js.map