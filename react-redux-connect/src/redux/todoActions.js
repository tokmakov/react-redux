import { TODO_CREATE, TODO_TOGGLE, TODO_REMOVE } from './todoTypes.js';

export function todoCreate(data) {
    return {
        type: TODO_CREATE,
        payload: data,
    };
}

export function todoToggle(id) {
    return {
        type: TODO_TOGGLE,
        payload: id,
    };
}

export function todoRemove(id) {
    return {
        type: TODO_REMOVE,
        payload: id,
    };
}
