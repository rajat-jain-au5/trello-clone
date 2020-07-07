import React, { Component } from 'react'
import AddActionButton from './AddActionButton'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAllBoard, deleteBoard } from "../actionCreators/actions";
import Header from './Header'
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import PersonIcon from "@material-ui/icons/Person";
import {Link } from 'react-router-dom'
class Board extends Component {
   state={type:"board"}
      componentDidMount=()=>{
            this.props.getAllBoard();
          
            
      }
      render() {
            // console.log(this.props.board.allBoard);
            return (
              <div>
                <Header />

                <div style={{ height: 150, backgroundColor: "#c6d7eb" }}></div>
                <br />

                {/* <div className="main mr-2"> */}
                  <div className="container">
                    <div className="row">
                      <div className="col-md-2"></div>
                      <div className="col-8">
                      <div className="row">
                        <h1 className="broadtitle">
                          <PersonIcon style={{ marginBottom: 3 }}></PersonIcon>
                          Personal Boards
                        </h1>
                      </div><br/>
                      <div className="row">
                        
                        {this.props.board.allBoard.map((board, index) => (
                          <div
                            className="col-md-3 mr-2 board"
                            style={{
                              backgroundImage: `url(' https://picsum.photos/id/${getRandomNum(
                                1
                              )}/200/300')`,
                            }}
                            key={index}
                          >
                            <div className="float-right">
                              <HighlightOffIcon
                                onClick={() =>
                                  this.props.deleteBoard(board._id)
                                }
                                className="close"
                              ></HighlightOffIcon>
                            </div>
                            <Link to={`/dashboard/${board._id}`}>
                              <div className="boardname">
                                {board.boardtitle}
                              </div>
                            </Link>
                          </div>
                        ))}
                        <AddActionButton board boardType={this.state.type} />
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            );
      }
}
// const cubes = document.getElementsByClassName("board");
const getRandomNum = (i) => {
  return Math.floor(Math.random() * 206);
}

const mapStateToProps=(state)=>{
      return state
}
const mapDispatchToProps=(dispatch)=>{
      return bindActionCreators({ getAllBoard, deleteBoard }, dispatch);
}

export default  connect(mapStateToProps,mapDispatchToProps)(Board)