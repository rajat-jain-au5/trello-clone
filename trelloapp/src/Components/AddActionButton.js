import React from "react";
import Icon from "@material-ui/core/Icon";
import Card from "@material-ui/core/Card";
import Textarea from "react-textarea-autosize";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addList, addCard, addBoard } from "../actionCreators/actions";
// import axios from 'axios'
const styles = {
  open: {
    display: "flex",
    alignItems: "center",
    marginTop: 10,
    cursor: "pointer",
    height: 70,
    width: 272,
    paddingLeft: 10,
  },
  buttonGroup: {
    marginTop: 8,
    display: "flex",
    alignItems: "center",
  },
};
class AddActionButton extends React.Component {
  state = {
    cardOpen: false,
    text: "",
  };

  openForm = () => {
    this.setState({
      cardOpen: true,
    });
  };

  closeForm = () => {
    this.setState({
      cardOpen: false,
    });
  };
  handleInputChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  handleAddList = () => {
    const { text } = this.state;
    const {
      listId,
      lists: { list },
      boardId,
      uid,
    } = this.props;
    if (text) {
      this.props.addList(text, listId, list.length, boardId, uid);
    }

    return;
  };
  handleboard = () => {
    const { text } = this.state;

    if (text) {
      this.props.addBoard(text);
    }

    return;
  };
  handleAddCard = () => {
    const { text } = this.state;
    const { listId, index, boardId } = this.props;

    if (text) {
      this.props.addCard(text, listId, index, boardId);
    }

    return;
  };
  addButton = () => {
    const { list, boardType } = this.props;
    const buttonText = list
      ? "Add Another List"
      : boardType
      ? "Add board"
      : "Add Another Card";

    const buttonBgColor = list ? "#dfe3e6" : boardType ? "#dfe3e6" : "inherit";
    const buttonTextColor = list ? "white" : boardType ? "white" : "inherit";
    const opacity = list ? 1 : 0.5;
    return (
      <div
        onClick={this.openForm}
        style={{
          ...styles.open,
          opacity: opacity,
          color: buttonTextColor,
          backgroundColor: buttonBgColor,
        }}
      >
        <Icon>add</Icon>
        <p style={{marginTop:-1,marginBottom:-1}}>{buttonText}</p>
      </div>
    );
  };

  renderForm = () => {
    const { list, boardType } = this.props;
    const placeholder = list
      ? "enter list title.."
      : boardType
      ? "enter title for board"
      : "enter a title for this card";
    let buttonTitle = list ? "Add List" : boardType ? "Add Board" : "Add Card";

    return (
      <div>
        <Card
          style={{
            minHeight: 80,
            minWidth: 272,
            padding: "6px 8px 2px",
          }}
        >
          <Textarea
            placeholder={placeholder}
            autoFocus
            onBlur={this.closeForm}
            onChange={this.handleInputChange}
            style={{
              overflow: "hidden",
              resize: "none",
              outline: "none",
              width: "100%",
              border: "none",
            }}
          />
        </Card>
        <div style={styles.buttonGroup}>
          <Button
            onMouseDown={
              list
                ? this.handleAddList
                : boardType
                ? this.handleboard
                : this.handleAddCard
            }
            style={{ color: "white", backgroundColor: "green" }}
          >
            {buttonTitle}
          </Button>
          <Icon style={{ marginLeft: 8, cursor: "pointer" }}>close</Icon>
        </div>
      </div>
    );
  };

  render() {
    return this.state.cardOpen ? this.renderForm() : this.addButton();
  }
}

const mapStateToProps = (state) => {
  return state;
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addList, addCard, addBoard }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AddActionButton);
