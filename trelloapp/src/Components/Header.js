import React from 'react';
import '../App.css'
import {Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {logoutUser} from '../actionCreators/authAction'
class Header extends React.Component{
    
    render(){
        return (
          <div>
            <nav class="navbar navbar-expand-md  navbar-dark sticky-top  overlay1">
              <Link class="navbar-brand text-dark " to="/dashboard">
                Trello
              </Link>
              <button
                className="navbar-toggler navbar-toggler-right"
                type="button"
                data-toggle="collapse"
                data-target="#navb"
                aria-expanded="true"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div id="navb" className="navbar-collapse collapse hide">
                <ul className="navbar-nav"></ul>

                <ul className="nav navbar-nav ml-auto">
                 
                  <li className="nav-item">
                    <Link to="/" className="nav-link text-dark " onClick={this.props.logoutUser}>
                      <span className="fas fa-sign-in-alt"></span> Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          
        );
    }
}

const mapStateToProps =(state)=>{
  return state
}
const mapDispatchToProps=(dispatch)=>{
return bindActionCreators({logoutUser},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps) ( Header)