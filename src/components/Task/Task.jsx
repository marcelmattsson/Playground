import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { putChangeStatus, deleteTask } from '../../../redux/tasks/tasks_actions';

const Task = (props) => {
    return (
        <div className="row">
            <div className="task__button-group">
                <button
                    type="button"
                    onClick={() => { props.putChangeStatus(props.Obj, props.isComplete); }}
                    className="task__button"
                >
                    {props.isComplete ? 'Undo' : 'Complete'}
                </button>
                <button type="button" onClick={() => props.deleteTask(props.Obj.slug)} className="task__button">Delete</button>
            </div>
            <h3 style={{ textDecoration: props.isComplete ? 'line-through' : 'none' }}>{props.name}</h3>
        </div>
    );
};

const mapStateToProps = { putChangeStatus, deleteTask };
Task.propTypes = {
    putChangeStatus: PropTypes.func,
    deleteTask: PropTypes.func,
    Obj: PropTypes.shape(),
    isComplete: PropTypes.bool,
    name: PropTypes.string,
};
export default connect(null, mapStateToProps)(Task);
