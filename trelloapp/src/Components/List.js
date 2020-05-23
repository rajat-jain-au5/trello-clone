import React, { Component } from "react";
import TrelloList from "./TrelloList";
import AddActionButton from "./AddActionButton";
import { connect } from "react-redux";
import Header from "./Header";
import axios from "axios";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { sort, getListsById } from "../actionCreators/actions";
import { bindActionCreators } from "redux";
class List extends Component {
  //   componentDidMount = () => {
  //   };
  state = { boardId: "", uid: "" };
  onDragEnd = (result) => {
    console.log(result)
    const { destination, source, draggableId, type, listId } = result;
    //  const index = this.props.lists.list.length
    if (!destination) {
      return;
    }
    this.props.sort(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId,
      type,
      listId,
      this.state.boardId
    );
  };
  componentDidMount = () => {
    this.props.getListsById(this.props.match.params.boardId);

    let request = axios({
      method: "GET",
      url: `http://localhost:5000/board/${this.props.match.params.boardId}`,
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    request.then((res) => {
      // console.log(res.data.data);
      this.setState({
        boardId: res.data.data._id,
        uid: res.data.data.uid,
      });
    });
  };
  render() {
    // console.log(this.props.match.params.boardId);
    return (
      <div>
        <Header />
        <DragDropContext onDragEnd={this.onDragEnd}>
          {/* <div> */}
          <Droppable droppableId="all_lists" direction="horizontal" type="list">
            {(provided) => (
              <div
                className="App-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {this.props.lists.map((list, index) => (
                  <TrelloList
                    key={list._id}
                    listId={list._id}
                    index={index}
                    boardId={list.boardId}
                    title={list.title}
                    cards={list.cards}
                  />
                ))}
                {provided.placeholder}

                <AddActionButton
                  list
                  boardId={this.state.boardId}
                  uid={this.state.uid}
                />
              </div>
            )}
          </Droppable>
          {/* </div> */}
        </DragDropContext>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lists: state.lists.list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ sort, getListsById }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(List);
