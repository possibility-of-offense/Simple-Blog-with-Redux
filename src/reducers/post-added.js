const postAddedReducer = (state, action) => {
  switch (action.type) {
    case "SET_AUTHOR":
      return {
        ...state,
        author: action.payload,
      };

    case "SET_TITLE":
      return {
        ...state,
        title: action.payload,
      };

    case "SET_CONTENT":
      return {
        ...state,
        content: action.payload,
      };

    case "SET_TAGS":
      return {
        ...state,
        tags: action.payload,
      };

    case "SHOW_ALERT":
      return {
        ...state,
        alertText: action.payload,
        showAlert: true,
      };

    case "HIDE_ALERT":
      return {
        ...state,
        alertText: "",
        showAlert: false,
      };

    case "SET_IS_FORM_VALID":
      return {
        ...state,
        isFormValid: action.payload.bool,
        showAlert: action.payload.bool === false ? true : false,
        alertText: action.payload.text ? action.payload.text : "",
      };
    default:
      return state;
  }
};

export default postAddedReducer;
