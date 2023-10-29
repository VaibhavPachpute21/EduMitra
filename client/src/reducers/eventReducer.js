const initialState = {
    events: [],
    loading: false,
    error: null,
  };
  
  export const eventReducers = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_EVENT_REQUEST":
      case "GET_ALL_EVENTS_REQUEST":
        return { ...state, loading: true, error: null };
  
      case "ADD_EVENT_SUCCESS":
        return { ...state, loading: false, error: null };
  
      case "GET_ALL_EVENTS_SUCCESS":
        return { ...state, events: action.payload, loading: false, error: null };
  
      case "ADD_EVENT_ERROR":
      case "GET_ALL_EVENTS_ERROR":
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  