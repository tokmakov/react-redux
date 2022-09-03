import { todoCreate, todoToggle, todoRemove } from './todoActions.js';
import { userLogin, userLogout } from './userActions.js';

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

