import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import TodoItem from './TodoItem'
import { FILTER, TYPE } from '../consts'

const Header = styled.h1``
const List = styled.ul`list-style-type: none;`

class App extends Component {
    render() {
        const { todos, updateFilter } = this.props

        return (
            <div>
                <Header className="card-title" style={{marginLeft:'3.5em'}} >Список задач</Header>
                {this._renderFilter(updateFilter)}
                {this._renderTodos(todos)}
            </div>
        )
    }

    _renderTodos(todos) {
        return (
            <List>
                {todos.map((todo, index) => (
                    <li key={todo.get('id')}>
                        <TodoItem index={index} />
                    </li>
                ))}
            </List>
        )
    }

    _renderFilter(updateFilter) {
        return (
            <div className="card-title" style={{marginLeft:'7em'}}>
                <p>Фильтр важности:
                    <select onChange={updateFilter}
                            data-toggle="tooltip"
                            title="Отфильтровать по важности задач">
                        {FILTER.map((filter, index) => (
                            <option key={index} value={filter}>
                                {filter}
                            </option>
                        ))}
                    </select>
                </p>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        todos: state.get('todos'),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateFilter: e => {
            const payload = e.target.value

            dispatch({
                type: TYPE.UPDATE_FILTER,
                payload,
            })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)