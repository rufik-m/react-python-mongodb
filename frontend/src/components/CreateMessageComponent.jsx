

import React, { Component } from 'react'
import MessageService from '../services/MessageService';

class CreateMessageComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            name: '',
            text: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeTextHandler = this.changeTextHandler.bind(this);
        this.saveOrUpdateMessage = this.saveOrUpdateMessage.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            MessageService.getMessageById(this.state.id).then( (res) =>{
                let message = res.data;
                this.setState({name: message.name,
                    text : message.text
                });
            });
        }        
    }
    saveOrUpdateMessage = (e) => {
        e.preventDefault();
        let message = {name: this.state.name, text: this.state.text};
        console.log('message => ' + JSON.stringify(message));

        // step 5
        if(this.state.id === '_add'){
            MessageService.createMessage(message).then(res =>{
                this.props.history.push('/messages');
            });
        }else{
            MessageService.updateMessage(message, this.state.id).then( res => {
                this.props.history.push('/messages');
            });
        }
    }
    
    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changeTextHandler= (event) => {
        this.setState({text: event.target.value});
    }

    cancel(){
        this.props.history.push('/messages');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Message</h3>
        }else{
            return <h3 className="text-center">Update Message</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Name: </label>
                                            <input placeholder="Name" name="name" className="form-control" 
                                                value={this.state.name} onChange={this.changeNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Text: </label>
                                            <input placeholder="Text" name="text" className="form-control" 
                                                value={this.state.text} onChange={this.changeTextHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateMessage}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateMessageComponent

