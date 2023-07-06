const ALL_MESSAGES = 'messages/allMessages';
const ADD_MESSAGE = 'messages/addMessage';
const DELETE_MESSAGE = 'messages/deleteMessage';
const UPDATE_MESSAGE = 'messages/updateMessage';
const CLEAR_MESSAGES = 'messages/clearMessages';


const allMessages = (messages) => {
    return {
        type: ALL_MESSAGES,
        messages
    }
};

export const addMessage = (message) => {
    return {
        type: ADD_MESSAGE,
        message
    }
};

export const updateMessage = (message) => {
    return {
        type: UPDATE_MESSAGE,
        message
    }
};

export const deleteMessage = (messageId) => {
    return {
        type: DELETE_MESSAGE,
        messageId
    }
};

export const clearMessages = () => {
    return {
        type: CLEAR_MESSAGES,
    }
};


export const addAllMessages = (messages) => async dispatch => {
    if (messages.length > 0) {
        dispatch(allMessages(messages));
    }
};


const initialState = { messages: {} };

const messageReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {

        case ALL_MESSAGES:
            newState = { messages: {} };
            action.messages.forEach(message => {
                newState.messages[message.id] = message;
            });
            return newState;

        case ADD_MESSAGE:
            newState = { messages: { ...state.messages } };
            newState.messages[action.message.id] = action.message;
            return newState;

        case DELETE_MESSAGE:
            newState = { messages: { ...state.messages } };
            delete newState.messages[action.messageId];
            return newState;

        case UPDATE_MESSAGE:
            newState = { messages: { ...state.messages } };
            newState.messages[action.message.id] = action.message;
            return newState;

        case CLEAR_MESSAGES:
            newState = { messages: {} };
            return newState;

        default:
            return state;
    }
};

export default messageReducer;
