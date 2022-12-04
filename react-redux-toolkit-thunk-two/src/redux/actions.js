import { create as todoCreate, toggle as todoToggle, remove as todoRemove } from './todoSlice.js';
import { login as userLogin, logout as userLogout } from './userSlice.js';

export const actions = {
    todo: {
        create: todoCreate,
        toggle: todoToggle,
        remove: todoRemove,
    },
    user: {
        login: userLogin,
        logout: userLogout,
    },
};
