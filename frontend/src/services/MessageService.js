import axios from 'axios';

const MESSAGE_API_BASE_URL = "http://localhost:3000/api";

class MessageService {

    getMessages(){
        return axios.get(MESSAGE_API_BASE_URL);
    }

    createMessage(message){
        return axios.post(MESSAGE_API_BASE_URL, message);
    }

    getMessageById(messageId){
        return axios.get(MESSAGE_API_BASE_URL + '/' + messageId);
    }

    updateMessage(message, messageId){
        return axios.put(MESSAGE_API_BASE_URL + '/' + messageId, message);
    }

    deleteMessage(messageId){
        return axios.delete(MESSAGE_API_BASE_URL + '/' + messageId);
    }
}

export default new MessageService()

