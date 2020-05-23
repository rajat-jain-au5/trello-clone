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
      console.log(action.payload)
      stateCopy.allBoard = action.payload;
      console.log(stateCopy);
      return stateCopy;
    default:
      return stateCopy;
  }
}
