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
            <nav class="navbar navbar-expand-lg  navbar-dark sticky-top  overlay1">
              <Link
                class="navbar-brand "
                style={{ fontSize: 30, fontWeight: 600 }}
                to="/dashboard"
              >
                Trello
              </Link>
              <button
                className="navbar-toggler "
                type="button"
                data-toggle="collapse"
                data-target="#navb"
                aria-controls="navb"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div id="navb" className="navbar-collapse collapse">
                {/* <ul className="navbar-nav"></ul> */}

                <ul className="nav navbar-nav ml-auto">
                  <li
                    className="nav-item text-white"
                    style={{ fontSize: 30, fontWeight: 600, marginTop: 7 }}
                                   >
                    <i className="fas fa-user "> </i>
                    {localStorage.getItem("name")}
                    {/* </Link> */}
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/"
                      style={{ fontSize: 30, fontWeight: 600,}}
                      className="nav-link  "
                      onClick={this.props.logoutUser}
                    >
                      <span></span> Logout
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