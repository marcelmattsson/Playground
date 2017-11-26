import { combineReducers } from 'redux';
import tasks from './tasks/tasks_reducer';

const reducers = combineReducers({
    tasks,
});

export default reducers;
