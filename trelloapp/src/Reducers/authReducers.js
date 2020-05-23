const intialState = {
  token: localStorage.getItem("token", ""),
  isLogin: localStorage.getItem("isLogin", false),
  name: localStorage.getItem("name", ""),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

export default function (state = intialState, action) {
  switch (action.type) {
    case "USER_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "USER_LOADED":
      // console.log(action.payload);
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      localStorage.setItem("name", action.payload.user.name);
      localStorage.setItem("token", action.payload.token);
    
      return {
        ...state,
        ...action.payload.user,
        isAuthenticated: true,
        isLoading: false,
      };
    case "AUTH_ERROR":
    case "LOGIN_FAIL":
    case "REGISTER_FAIL":
    case "LOGOUT_SUCCESS":
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
