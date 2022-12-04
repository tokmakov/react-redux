import {
    all,
    allLength,
    completed,
    completedLength,
    uncompleted,
    uncompletedLength,
    findById,
    ids,
} from './todoSelectors.js';
import { auth } from './userSelectors.js';

export const selectors = {
    todo: {
        all: all,
        allLength: allLength,
        completed: completed,
        completedLength: completedLength,
        uncompleted: uncompleted,
        uncompletedLength: uncompletedLength,
        findById: findById,
        ids: ids,
    },
    user: {
        auth: auth,
    },
};
