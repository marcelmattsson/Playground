import {
    GET_ALL_TASKS,
    POST_TASK,
    CHANGE_STATUS,
    DELETE_TASK,
} from './tasks_types';
// ///////////////REDUCER/////////////////////
// initiate your starting state
const initial = {
    tasks: [],
};
const reducer = (state = initial, action) => {
    switch (action.type) {
        case GET_ALL_TASKS: {
            return Object.assign({}, state, { tasks: action.tasks.objects });
        }
        case POST_TASK: {
            const updatedTasks = [action.task].concat(state.tasks);
            return Object.assign({}, state, { tasks: updatedTasks });
        }
        case CHANGE_STATUS: {
            const newArr = state.tasks.map((task) => {
                if (task.slug === action.task.slug) task.metafields[0].value = !task.metafields[0].value;
                return task;
            });
            return Object.assign({}, state, { tasks: newArr });
        }
        case DELETE_TASK: {
            const arr = state.tasks.filter((task) => {
                return !(task.slug === action.slug);
            });
            return Object.assign({}, state, { tasks: arr });
        }
        default:
            return state;
    }
};
export default reducer;
