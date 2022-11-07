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
      // TODO add tags array
      return {
        ...state,
        tags: action.payload,
      };
    case "SHOW_ALERT":
      return {
        ...state,
        alertContent: action.payload,
        showAlert: true,
      };

    case "HIDE_ALERT":
      return {
        ...state,
        alertContent: "",
        showAlert: false,
      };
    default:
      return state;
  }
};

export default postAddedReducer;
