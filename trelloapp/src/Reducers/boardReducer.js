let intialState = {
  allBoard: [],
};

export default function boardReducer(state = intialState, action) {
  let stateCopy = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case "ADD_BOARD":
      stateCopy.allBoard = [...stateCopy.allBoard, action.payload];
      return stateCopy;
    case "GET_BOARD":
      stateCopy.allBoard = action.payload;
      return stateCopy;
    case "DELETE_BOARD":
      stateCopy.allBoard = stateCopy.allBoard.filter(el=>el._id !== action.payload)  
      return stateCopy
    default:
      return stateCopy;
  }
}
