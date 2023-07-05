const ALL_MESSAGES = 'messages/allMessages';
const CLEAR_MESSAGES = 'messages/clearMessages';

const allMessages = (messages) => {
    return {
        type: ALL_MESSAGES,
        messages
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

        case CLEAR_MESSAGES:
            newState = { messages: {} };
            return newState;

        default:
            return state;
    }
};

export default messageReducer;
