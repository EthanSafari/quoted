const ALL_USERS = 'users/allUsers';
const ADD_USER = 'users/addUser';
const CLEAR_USERS = 'users/clearUsers';

const allUsers = (users) => {
    return {
        type: ALL_USERS,
        users
    }
};

export const addUSer = (user) => {
    return {
        type: ADD_USER,
        user
    }
};

export const clearUsers = () => {
    return {
        type: CLEAR_USERS,
    }
};

export const addAllUsers = (users) => async (dispatch) => {
    console.log(users)
    if (users.length > 0) {
        dispatch(allUsers(users))
    }
};

const initialState = { users: {} };

const userReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {

        case ALL_USERS:
            newState = { users: {} };
            action.users.forEach(user => {
                newState.users[user.id] = user;
            });
            return newState;

        case ADD_USER:
            newState = { users: { ...state.users } };
            newState.users[action.user.id] = action.user;
            return newState;

        case CLEAR_USERS:
            newState = { users: {} };
            return newState;

        default:
            return state;
    }
};

export default userReducer;
