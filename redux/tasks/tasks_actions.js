import axios from 'axios';
import {
    GET_ALL_TASKS,
    POST_TASK,
    CHANGE_STATUS,
    DELETE_TASK,
} from './tasks_types';

// ///////////////ACTIONS//////////////
const getTasks = (tasks) => ({ type: GET_ALL_TASKS, tasks });
const addTask = (task) => ({ type: POST_TASK, task });
const changeStatus = (task) => ({ type: CHANGE_STATUS, task });
const taskDelete = (slug) => ({ type: DELETE_TASK, slug });

const formatSlug = (title) => {
    const lower = title.toLowerCase();
    return lower.split(' ').join('-');
};

// ///////////// ACTION DISPATCHER FUNCTIONS///////////////////
export const getAllTasks = () => dispatch => {
    axios.get('https://api.cosmicjs.com/v1/your-bucket-slug-name/object-type/tasks')
        .then((response) => {
            return response.data;
        })
        .then((tasks) => {
            dispatch(getTasks(tasks));
        })
        .catch((err) => {
            console.error.bind(err);
        });
};
export const postNewTask = (task) => dispatch => {
    dispatch(addTask({ title: task, metafields: [{ value: false }], slug: formatSlug(task) }));
};
export const putChangeStatus = (task, bool) => (dispatch) => {
    dispatch(changeStatus(task));
};
export const deleteTask = (slug) => (dispatch) => {
    dispatch(taskDelete(slug));
    axios.delete(`https://api.cosmicjs.com/v1/your-bucket-slug-name/${slug}`)
        .then((response) => {
            console.log(response.data);
        })
        .catch((err) => {
            console.error.bind(err);
        });
};
