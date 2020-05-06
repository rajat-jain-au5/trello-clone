let intialState = {
  list:[],
  isEdit:"",
  isEditListCard:"",
  isEditCard:"",
editData:"",
editTitle:""
}


function stateReducers(state = intialState, action) {
  let stateCopy = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case "Get_title":
      stateCopy.list = [...stateCopy.list,action.payload]
      return stateCopy
    
    case "get_lists":
      stateCopy.list = [...stateCopy.list,...action.payload]
      return stateCopy  

    case "get_card":
      if (stateCopy.list[action.payload.index]._id === action.payload.listId) {
         stateCopy.list[action.payload.index].cards=[...stateCopy.list[action.payload.index].cards, action.payload.data]
       }
      return stateCopy

    case "Draggable_Happen":
      const { droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        draggableId,
        type
      } = action.payload
      // console.log(draggableId ,droppableIdStart, droppableIdEnd, droppableIndexStart, droppableIndexEnd)
      if(type==="list"){
        const lists = stateCopy.list.splice(droppableIndexStart,1)
        stateCopy.list.splice(droppableIndexEnd, 0, ...lists)
        return stateCopy
      }
      // in same list
      if (droppableIdStart === droppableIdEnd) {
        let li = stateCopy.list.find(list => droppableIdStart === list._id)
        const removed = li.cards.splice(droppableIndexStart, 1);
        li.cards.splice(droppableIndexEnd, 0, ...removed)
       
      }

    // in other list
      if (droppableIdStart !== droppableIdEnd) {
        //find list where drag happened
        let listStart = stateCopy.list.find(list => droppableIdStart === list._id)

        // pull out card from list
        let removed = listStart.cards.splice(droppableIndexStart, 1)

        // find list where drag end
        let listEnd = stateCopy.list.find(list => droppableIdEnd === list._id)
        
        //put the card in new list
        listEnd.cards.splice(droppableIndexEnd, 0, ...removed)
      }
      return stateCopy

    case "Remove_Card":
      let li1 = stateCopy.list.find(list => list._id === action.payload.listId)
      li1.cards.splice(action.payload.index, 1);
      return stateCopy 
    
    case "Delete_List":
      stateCopy.list.splice(action.payload.data.index,1)
      return stateCopy 
    
    case "Edit_Card":
      // console.log(action.payload.index)
      stateCopy.isEditListCard=action.payload.listId
      stateCopy.isEditCard=action.payload.cardId
      stateCopy.editData=stateCopy.list.find(el=>el._id===action.payload.listId).cards[action.payload.index]
      return stateCopy  
    
    case "Update_Card":
      stateCopy.editData.text =action.payload
      return stateCopy
  
    case "Save_Update_Data":
      let li2 = stateCopy.list.find(el=>el._id === action.payload.listId)
      li2.cards[action.payload.index].text=stateCopy.editData.text
      stateCopy.isEditListCard=""
      return stateCopy  

    case "Edit_Title":
    stateCopy.isEdit= action.payload.listId
      stateCopy.editTitle=stateCopy.list[action.payload.index].title
      // console.log(stateCopy.editTitle)
      return stateCopy

    case "Update_title":
      stateCopy.editTitle= action.payload
    return stateCopy
    
    case "Save_Update_Title":
      stateCopy.list[action.payload.index].title = stateCopy.editTitle
      stateCopy.isEdit= ""
      return stateCopy
    
      default:
      return stateCopy
  }
}


export default stateReducers