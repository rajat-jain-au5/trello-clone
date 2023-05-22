import axios from "axios";
import { returnErrors } from "./errorActions";

//check token and load user

export const loadUser = () => (dispatch, getState) => {
  //user loading
  dispatch({ type: "USER_LOADING" });

  //get token

  axios
    .get("https://trello-clone-2ff5.onrender.com/user", tokenConfig(getState))

    .then((res) => {
      //     console.log(res)
      dispatch({
        type: "USER_LOADED",
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      console.log(err);
      dispatch({
        type: "AUTH_ERROR",
      });
    });
};

export function registerUser(user) {
  console.log(user);
  let request = axios({
    method: "POST",
    url: "https://trello-clone-2ff5.onrender.com/register",
    data: user,
  });
  return (dispatch) => {
    request
      .then((res) => {
        console.log(res);
        return dispatch({
          type: "REGISTER_SUCCESS",
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch(
          returnErrors(err.response.data, err.response.status, "Register_Fail")
        );
        
        dispatch({
          type: "REGISTER_FAIL",
        });
      });
  };
}

export function loginUser(user) {
  let request = axios({
    method: "POST",
    url: "https://trello-clone-2ff5.onrender.com/login",
    data: user,
  });
  return (dispatch) => {
    request
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        return dispatch({
          type: "LOGIN_SUCCESS",
          payload: res.data,
        });
      })
      .catch((err) => {
         dispatch(
           returnErrors(err.response.data, err.response.status, "Login_Fail")
         );
        dispatch({
          type: "LOGIN_FAIL",
        });
      });
  };
}

export function logoutUser() {
  return {
    type: "LOGOUT_SUCCESS",
  };
}

export const tokenConfig = (getState) => {
  const token = getState().auth.token;
  // console.log(token, "g", getState(), "t", token);

  //headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};
