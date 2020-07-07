

export const returnErrors = (msg, status, id = null) => {
  // console.log(msg,status)
  return {
    type: "GET_ERRORS",
    payload: { msg, status, id },
  };
};

export const clearErrors = () => {
  return {
    type: "CLEAR_ERRORS",
  };
};
