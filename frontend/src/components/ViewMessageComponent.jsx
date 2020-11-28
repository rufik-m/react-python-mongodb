

import React, { Component } from 'react'
import MessageService from '../services/MessageService'

class ViewMessageComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            message: {}
        }
    }

    componentDidMount(){
        MessageService.getMessageById(this.state.id).then( res => {
            this.setState({message: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Message Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Message Name: </label>
                            <div> { this.state.message.name }</div>
                        </div>
                        <div className = "row">
                            <label> Message Text: </label>
                            <div> { this.state.message.text }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewMessageComponent

