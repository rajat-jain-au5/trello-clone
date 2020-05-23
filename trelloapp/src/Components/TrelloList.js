import React from "react";
import "../App.css";
import Cards from "./Cards";
import AddActionButton from "./AddActionButton";
import { connect } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";
import {
  handleEditTitle,
  editTitleInput,
  saveTitle,
  handleDeleteList,
} from "../actionCreators/actions";
import { bindActionCreators } from "redux";
import DeleteIcon from "@material-ui/icons/Delete";

class TrelloList extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();

    this.props.saveTitle(
      this.props.boardId,
      this.props.listId,
      this.props.index,
      this.props.lists.editTitle
    );
  };

  render() {
    const { title, cards, listId, index, boardId } = this.props;
    return (
      <Draggable draggableId={listId} index={index}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Droppable droppableId={String(listId)}>
              {(provided) => (
                <div
                  className="list-container"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <DeleteIcon
                    className="del"
                    onClick={() => this.props.handleDeleteList(listId,boardId)}
                  ></DeleteIcon>
                  {this.props.lists.isEdit ===
                  this.props.lists.list[this.props.index]._id ? (
                    <form
                      onSubmit={(event) => {
                        this.handleSubmit(event);
                      }}
                    >
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Please enter Title name"
                        value={this.props.lists.editTitle}
                        onChange={(e) => {
                          this.props.editTitleInput(e.target.value);
                        }}
                      />
                    </form>
                  ) : (
                    <h4
                      onClick={() => this.props.handleEditTitle(listId, index)}
                    >
                      {title}
                    </h4>
                  )}

                  {cards.map((card, index) => (
                    <Cards
                      key={card._id}
                      listId={listId}
                      index={index}
                      cardId={card._id}
                      text={card.text}
                    />
                  ))}
                  <AddActionButton listId={listId} card index={index} />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { handleEditTitle, editTitleInput, saveTitle, handleDeleteList },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(TrelloList);
