import React, { Component } from 'react'
import MessageService from '../services/MessageService'

class ListMessageComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                messages: []
        }
        this.addMessage = this.addMessage.bind(this);
        this.editMessage = this.editMessage.bind(this);
        this.deleteMessage = this.deleteMessage.bind(this);
    }

    deleteMessage(id){
        MessageService.deleteMessage(id).then( res => {
            this.setState({messages: this.state.messages.filter(message => message.id !== id)});
        });
    }
    viewMessage(id){
        this.props.history.push(`/view-message/${id}`);
    }
    editMessage(id){
        this.props.history.push(`/add-message/${id}`);
    }

    componentDidMount(){
        MessageService.getMessages().then((res) => {
            this.setState({ messages: res.data});
        });
    }

    addMessage(){
        this.props.history.push('/add-message/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Messages List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addMessage}> Add Message</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Message First Name</th>
                                    <th> Message Last Name</th>
                                    <th> Message Email Id</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.messages.map(
                                        message => 
                                        <tr key = {message.id}>
                                             <td> { message.firstName} </td>   
                                             <td> {message.lastName}</td>
                                             <td> {message.emailId}</td>
                                             <td>
                                                 <button onClick={ () => this.editMessage(message.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteMessage(message.id)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewMessage(message.id)} className="btn btn-info">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListMessageComponent

