import React, { Component } from 'react'
import Datetime from 'react-datetime'
import 'bootstrap/dist/css/bootstrap.css'
import DatetimeRangePicker from 'react-datetime-range-picker'


class DeadlinePicker extends Component {
    render() {

        var moment = require('moment');
        require('moment/locale/ru');

        const { onChange, show, onClick, value } = this.props

        return show ? (
            <Datetime locale="ru"
                      onChange={onChange}
                      value={value}/>

        ) : (
            <div >
                <button className="btn btn-primary"
                        data-toggle="tooltip"
                        title="Срок за который нужно выполнить задание"
                        style={{width: '20%', marginTop: '-2.9em', marginLeft: '15.5em'}}
                        onClick={onClick}>Срок</button>

            </div>
        )
    }
}

export default DeadlinePicker