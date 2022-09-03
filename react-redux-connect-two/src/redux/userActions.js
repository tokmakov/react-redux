import { USER_LOGIN, USER_LOGOUT } from './userTypes.js';

export function userLogin(data) {
    return {
        type: USER_LOGIN,
    };
}

export function userLogout(id) {
    return {
        type: USER_LOGOUT,
    };
}
