import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import moment from 'moment'
import { TYPE, FILTER } from '../consts'
import PrioritySelector from './PrioritySelector'
import DeadlinePicker from './DeadlinePicker'
import 'bootstrap/dist/css/bootstrap.css'
import 'tooltip'

import stile from './style.css'


const Title = styled.input`
  font-size: 20px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-width: 2px;
  outline: none;
  width: 350px;
  margin-top: 1em;
  
  background-color: ${props => (props.late ? 'red' : 'none')};
  color: ${props => (props.late ? 'white' : 'black')};
`

const Description = styled.input`
  font-size: 16px;
  color: gray;
  border-top: none;
  border-left: none;
  border-right: none;
  border-width: 2px;
  outline: none;
  width: 350px;
`



class TodoItem extends Component {
    render() {
        const {
            title,
            description,
            finished,
            index,
            addTodo,
            removeTodo,
            filter,
            priority,
            deadlinePicker,
            updateDeadlinePicker,
            deadline,
        } = this.props

        const first = index === 0


        if (filter !== FILTER[0] && !first && filter !== priority) return null

        return <div className="container" style={{
            backgroundColor: 'rgb(220,220,220,0.3)',
            width: '25em',
            marginLeft: '1em',
            marginTop: '1em',
            borderRadius: '2em'
        }}>

            <input
                data-toggle="tooltip"
                title="Готово"
                style={{marginLeft: '24em'}}
                id="goned"
                type="checkbox"

            />
            <Title
                data-toggle="tooltip"
                title="Красный цвет означает, что задание просрочена. Зеленый, что задание выполнено"
                className="card-title list-inline Green"
                defaultValue={title}
                placeholder="Название"
                late={moment().isAfter(deadline)}

                onChange={this._updateTitle.bind(this)}
            />

            <br/>
            <Description
                defaultValue={description}
                placeholder="Описание"
                data-toggle="tooltip"
                title="Описание задачи"
                onChange={this._updateDescription.bind(this)}
            />
            <br/>
            <div style={{height: '3em', marginLeft: '1em'}}>
                <input

                    type="checkbox"
                    defaultChecked={!!finished}
                    onChange={this._updateFinished.bind(this)}
                /><p style={{marginTop: '-1.6em', marginLeft: '1em'}}>Отображать дату</p>
            </div>


            {first ? (
                <div>
                    <button data-toggle="tooltip"
                            title="Добавить Задание"
                            className="btn btn-primary"
                            style={{width: '25%', marginTop: '-1.9em', marginLeft: '1em'}}
                            onClick={addTodo}>Добавить
                    </button>
                </div>
            ) : (
                <div>
                    <button className="btn btn-primary"
                            data-toggle="tooltip"
                            title="удалить Задачу"
                            style={{width: '25%', marginTop: '-1.9em', marginLeft: '1em'}}
                            onClick={() => removeTodo(index)}>Удалить
                    </button>
                </div>
            )}

            <PrioritySelector onChange={this._updatePriority.bind(this)}/>
            <DeadlinePicker
                value={deadline}
                locale="ru"
                show={deadlinePicker === index}
                onChange={this._updateDeadline.bind(this)}
                onClick={() => updateDeadlinePicker(index)}
            />

            <h6>{finished}</h6>
        </div>
    }

    _updateTitle(e) {
        const { updateTodo, index } = this.props

        updateTodo({
            index,
            value: e.target.value,
            field: 'title',
        })
    }

    _updateDescription(e) {
        const { updateTodo, index } = this.props

        updateTodo({
            index,
            value: e.target.value,
            field: 'description',
        })
    }

    _updatePriority(e) {
        const { updateTodo, index } = this.props

        updateTodo({
            index,
            value: e.target.value,
            field: 'priority',
        })
    }

    _updateFinished(e) {
        const { updateTodo, index } = this.props

        updateTodo({
            index,
            value: e.target.checked ? moment().toString() : null,
            field: 'finished',
        })
    }

    _updateDeadline(datetime) {
        const { updateTodo, index, updateDeadlinePicker } = this.props

        updateTodo({
            index,
            value: datetime.toString(),
            field: 'deadline',
        })

        updateDeadlinePicker(null)
    }
}

function mapStateToProps(state, ownProps) {
    return {
        title: state.getIn(['todos', ownProps.index, 'title']),
        description: state.getIn(['todos', ownProps.index, 'description']),
        finished: state.getIn(['todos', ownProps.index, 'finished']),
        priority: state.getIn(['todos', ownProps.index, 'priority']),
        deadline: state.getIn(['todos', ownProps.index, 'deadline']),
        filter: state.get('filter'),
        deadlinePicker: state.get('deadlinePicker'),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addTodo: () =>
            dispatch({
                type: TYPE.ADD_TODO,
            }),
        removeTodo: payload =>
            dispatch({
                type: TYPE.REMOVE_TODO,
                payload,
            }),
        updateTodo: payload =>
            dispatch({
                type: TYPE.UPDATE_TODO,
                payload,
            }),
        updateDeadlinePicker: payload =>
            dispatch({
                type: TYPE.UPDATE_DEADLINE_PICKER,
                payload,
            }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem)