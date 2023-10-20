export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case "REGISTER_USER_REQUEST":
            return {
                loading: true
            }
        case "REGISTER_USER_SUCCESS":
            return {
                loading: false,
                success: true
            }
        case "REGISTER_USER_ERROR":
            return {
                loading: false,
                error: action.payload
            }
        default: return {
            state
        }
    }
}

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case "USER_LOGIN_REQUEST":
            return {
                loading: true
            }
        case "USER_LOGIN_SUCCESS":
            return {
                loading: false,
                success: true,
                currentUser: action.payload
            }
        case "USER_LOGIN_FAIL":
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const getAllUsersReducer = (state = { allUsers: [] }, action) => {
    switch (action.type) {
        case "GET_ALL_USERS_REQ":
            return {
                loading: true
            }

        case "GET_ALL_USERS_SUCCESS":
            return {
                allUsers: action.payload,
                loading: false,
                success: true
            }
        case "GET_ALL_USER_FAIL":
            return {
                error: action.payload,
                loading: false
            }
        default:
            return state;
    }
}

export const getUsersByCollageReducer = (state = { allColleagues: [] }, action) => {
    switch (action.type) {
        case "GET_ALL_COLLEAGUES_REQ":
            return {
                loading: true
            }
        case "GET_ALL_COLLEAGUES_SUCCESS":
            return {
                allColleagues: action.payload,
                loading: false,
                success: true,
            }
        case "GET_ALL_COLLEAGUES_FAIL":
            return {
                error: action.payload,
                loading: false
            }
        default:
            return state;
    }
}