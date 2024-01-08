export const chatReducer = (state = {}, action) => {
    switch (action.type) {
        case "SEND_MSG_REQUEST":
            return {
                sending: true
            }
        case "SEND_MSG_SUCCESS":
            return {
                sent: true,
                sending: false
            }
        case "SEND_MSG_ERROR":
            return {
                sending: false,
                error: action.payload
            }
        default:
            return {
                state
            }
    }
}

export const getChatsReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_MSG_REQUEST":
            return {
                loading: true
            }
        case "GET_MSG_SUCCESS":
            return {
                loading: false,
                chats: action.payload
            }
        case "GET_MSG_ERROR":
            return {
                loading: false,
                error: action.payload
            }
        default:
            return {
                state
            }


    }

}