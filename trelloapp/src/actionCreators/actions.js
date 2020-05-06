import axios from "axios";

// Get all lists
export function getLists() {
  return function (dispatch) {
    return axios.get("http://localhost:5000/list/all").then(({ data }) => {
      // console.log(data)
      dispatch(setList(data));
    });
  };
}

function setList(data) {
  return {
    type: "get_lists",
    payload: data,
  };
}

// Add the title
export function addList(title, id, index) {
  return function (dispatch) {
    return axios
      .post("http://localhost:5000/list/add", { title, id, index })
      .then(({ data }) => {
        // console.log(data)
        dispatch(setTitle(data));
      });
  };
}

export function setTitle(data) {
  return {
    type: "Get_title",
    payload: data,
  };
}

//Add the card
export function addCard(text, listId, index) {
  return function (dispatch) {
    return axios
      .post(`http://localhost:5000/list/addcard`, { text, listId })
      .then(({ data }) => {
        // console.log(data)
        dispatch(setCard(data.cards[data.cards.length - 1], listId, index));
      });
  };
}

export function setCard(data, listId, index) {
  return {
    type: "get_card",
    payload: { data, listId, index },
  };
}

//Delete the card
export function handleDeleteCard(listId, cardId, index) {
  return function (dispatch) {
    return axios
      .delete(`http://localhost:5000/list/delete/${listId}/${cardId}`)
      .then(({ data }) => {
        // console.log(data)
        dispatch(deleteCard(index, listId, cardId));
      });
  };
}

function deleteCard(index, listId, cardId) {
  return {
    type: "Remove_Card",
    payload: { index, listId, cardId },
  };
}

//Edit card and Input

export function handleEditCard(cardId, listId, index) {
  return {
    type: "Edit_Card",
    payload: { cardId, listId, index },
  };
}

export function editCardInput(text) {
  return {
    type: "Update_Card",
    payload: text,
  };
}



export function handleSubmit(listId, index, text, cardId) {
  const data = axios.post(
    `http://localhost:5000/list/updatecard/${listId}/${cardId}`,
    { text }
  );
  return {
    type: "Save_Update_Data",
    payload: {
      listId,
      index,
      data,
    },
  };
}
export function handleDeleteList(listId) {
    return function (dispatch) {
        return axios.delete(`http://localhost:5000/list/delete/${listId}`)
            .then(({ data }) => {
                // console.log(data)
                dispatch(setDeleteList(data, listId));
            });
    }

    function setDeleteList(data,listId) {
      return{
        type:"Delete_List",
        payload:{data,listId}
      }
    }
  
}

// edit and update the title
export function handleEditTitle(listId, index) {
  return {
    type: "Edit_Title",
    payload: { listId, index },
  };
}

export function editTitleInput(val) {
  return {
    type: "Update_title",
    payload: val,
  };
}

export function saveTitle(listId, index, title) {
  let data = axios.post(`http://localhost:5000/list/updatetitle/${listId}`, {
    title,
    index,
  });
  return {
    type: "Save_Update_Title",
    payload: { listId, index, data },
  };
}

// when draggable happens

export function sort(
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  type,
  listId
) {
  axios.post(`http://localhost:5000/list/dragginlist`, {
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    draggableId,
    type,
    listId,
  });
  return {
    type: "Draggable_Happen",
    payload: {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd,
      draggableId,
      type,
      listId,
    },
  };
}
