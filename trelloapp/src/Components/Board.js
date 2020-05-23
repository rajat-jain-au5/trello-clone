import React, { Component } from 'react'
import AddActionButton from './AddActionButton'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAllBoard} from "../actionCreators/actions";
import Header from './Header'

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
                <br/>
                <br/>
                <div className="container">
                  <div className="row">
                    {this.props.board.allBoard.map((board, index) => (
                      <div className="col-md-2 border mr-2 board" key={index}>
                        <Link to={`/dashboard/${board._id}`}>
                          {board.boardtitle}
                        </Link>
                        {/* <List/> */}
                      </div>
                    ))}

                    <AddActionButton board boardType={this.state.type} />
                  </div>
                </div>
              </div>
            );
      }
}

const mapStateToProps=(state)=>{
      return state
}
const mapDispatchToProps=(dispatch)=>{
      return bindActionCreators({ getAllBoard }, dispatch);
}

export default  connect(mapStateToProps,mapDispatchToProps)(Board)