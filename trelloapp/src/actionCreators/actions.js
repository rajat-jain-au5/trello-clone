import axios from "axios";


// add board
export function addBoard(boardtitle) {
  let request = axios({
    method: "POST",
    url: "http://localhost:5000/board/addboard",
    data: { boardtitle },
    headers: {
      "x-auth-token": window.localStorage.getItem("token"),
    },
  });
  return (dispatch) => {
    request.then((res) => {
      // console.log(res);
      return dispatch({
        type: "ADD_BOARD",
        payload: res.data,
      });
    });
  };
}
// get board 
export function getAllBoard() {
  var temp = window.localStorage.getItem("token");
  return function (dispatch) {
    return axios
      .get("http://localhost:5000/board/all", {
        headers: {
          "x-auth-token": temp,
        },
      })
      .then(({ data }) => {
        // console.log(data);
        dispatch(get(data));
      });
  };
}

function get(data) {
  // console.log(data);
  return {
    type: "GET_BOARD",
    payload: data,
  };
}

// get board according to id
export function getListsById(id) {
  var temp = window.localStorage.getItem("token");
  return function (dispatch) {
    return axios
      .get(`http://localhost:5000/list/boardId/${id}`, {
        headers: {
          "x-auth-token": temp,
        },
      })
      .then(({ data }) => {
        // console.log(data);
        dispatch(getById(data.data));
      });
  };
}
function getById(data) {
  return {
    type: "GET_BY_ID",
    payload: data,
  };
}

//Delete board

export function deleteBoard(boardId) {
  // console.log(boardId)
         var temp = window.localStorage.getItem("token");
         return function (dispatch) {
           return axios
             .delete(`http://localhost:5000/board/delete/${boardId}`, {
               headers: {
                 "x-auth-token": temp,
               },
             })
             .then(({ data }) => {
              //  console.log(data); 
               dispatch(setDeleteBoard(boardId));
             });
         };
       }

function setDeleteBoard(boardId){
  return{
    type:"DELETE_BOARD",
    payload:boardId
  }
}
// Add the title
export function addList(title, id, index, boardId, uid) {
  let request = axios({
    method: "POST",
    url: "http://localhost:5000/list/add",
    data: { title, id, index, boardId, uid },
    headers: {
      "x-auth-token": window.localStorage.getItem("token"),
    },
  });
  return (dispatch) => {
    request.then((res) => {
      // console.log(res);
      dispatch(setTitle(res.data, boardId));
    });
  };
}
 function setTitle(data,boardId) { 
return {
  type: "Get_title",
  payload: {data,boardId},
};
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

export function saveTitle(boardId, listId, index, title) {
  let data = axios.post(
    `http://localhost:5000/list/updatetitle/${listId}`,
    {
      boardId,
      title,
      index,
    },
    {
      headers: {
        "x-auth-token": window.localStorage.getItem("token"),
      },
    }
  );
  // console.log(data);
  return {
    type: "Save_Update_Title",
    payload: { boardId, listId, index, data },
  };
}

// delete the list
export function handleDeleteList(listId, boardId) {
  var temp = window.localStorage.getItem("token");
  return function (dispatch) {
    return axios
      .delete(`http://localhost:5000/list/delete/${listId}`, {
        headers: {
          "x-auth-token": temp,
        },
      })
      .then(({ data }) => {
        // console.log(data);
        dispatch(setDeleteList(data.data, listId, boardId));
      });
  };
}

function setDeleteList(data, listId, boardId) {
  return {
    type: "Delete_List",
    payload: { data, listId, boardId },
  };
}

//Add the card
export function addCard(text, listId, index, boardId) {
  let request = axios({
    method: "POST",
    url: "http://localhost:5000/list/addcard",
    data: { text, listId, index, boardId },
    headers: {
      "x-auth-token": window.localStorage.getItem("token"),
    },
  });
  return (dispatch) => {
    request.then((res) => {
      // console.log(res);
      dispatch(setCard(res.data, listId, index, boardId));
      //  dispatch(setCard(data.cards[data.cards.length - 1], listId, index));
    });
  };
}

function setCard(data, listId, index) {
  return {
    type: "get_card",
    payload: { data, listId, index },
  };
}

//Delete the card
export function handleDeleteCard(listId, cardId, index) {
  return function (dispatch) {
    return axios
      .delete(`http://localhost:5000/list/delete/${listId}/${cardId}`, {
        headers: {
          "x-auth-token": window.localStorage.getItem("token"),
        },
      })

      .then(({ data }) => {
        // console.log(data);
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
    `http://localhost:5000/list/updatecard/${listId}/${cardId}`,{ text },{
        headers: {
          "x-auth-token": window.localStorage.getItem("token"),
        },
      },
    
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




// when draggable happens

export function sort(
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  type,
  listId,
  boardId
) {
  axios.post(
    `http://localhost:5000/list/dragginlist`,
    {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd,
      draggableId,
      type,
      listId,
      boardId
    },
    {
      headers: {
        "x-auth-token": window.localStorage.getItem("token"),
      },
    }
  ).then(res=>console.log(res))
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
      boardId
    },
  };
}
