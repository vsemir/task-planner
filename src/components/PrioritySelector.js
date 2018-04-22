import React, { Component } from 'react'
import { PRIORITY } from '../consts'

class PrioritySelector extends Component {
    render() {
        const { onChange } = this.props

        return (
            <div style={{marginTop: '-2.5em', marginLeft: '7em'}}>
                <select onChange={onChange}
                        data-toggle="tooltip"
                        title="Важность задачи">
                    {PRIORITY.map((filter, index) => (
                        <option key={index} value={filter}>
                            {filter}
                        </option>
                    ))}
                </select>
            </div>
        )
    }
}

export default PrioritySelector