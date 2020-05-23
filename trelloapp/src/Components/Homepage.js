import React, { Component } from "react";
import { connect } from "react-redux";
import { Link ,Redirect} from "react-router-dom";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { registerUser, loginUser } from "../actionCreators/authAction";
import '../App.css'
class Homepage extends Component {
  state = {
    modal: false,
    name: "",
    email: "",
    password: "",
    msg: null,
    show: false,
    isLoggedIn: false,
    showLogin: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();

    var user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };

    this.props.registerUser(user);

    this.setState({
      name: "",
      email: "",
      password: "",
    });
  };

  haandleLogin = (e) => {
    e.preventDefault();

    var user = {
      email: this.state.email,
      password: this.state.password,
    };
    //     this.props.history.push("/home");

    this.props.loginUser(user);
  };

  // open and close login model
  handleShowLogin = () => {
    this.setState({
      showLogin: true,
      show: false,
    });
  };
  handleCloseLogin = () => {
    this.setState({
      showLogin: false,
    });
  };

  // open and close register model
  handleShow = () => {
    this.setState({
      show: true,
      showLogin: false,
    });
  };
  handleClose = () => {
    this.setState({
      show: false,
    });
  };
  render() {
    if (localStorage.getItem("token")) {
      // toast.success("you are logged in succesfully Thank you ):");
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className="register">
        <nav class="navbar navbar-expand-md  navbar-dark sticky-top  overlay">
          <Link class="navbar-brand text-dark " to="/">
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
            {/* <ul className="navbar-nav"></ul> */}
            {/* Signup model */}
            <ul className="nav navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link text-dark " onClick={this.handleShow}>
                  <span className="fas fa-user"></span> Sign Up
                </Link>

                <Modal show={this.state.show} onHide={this.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group controlId="formBasicname">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder=" enter name..."
                          onChange={(e) =>
                            this.setState({ name: e.target.value })
                          }
                        />
                      </Form.Group>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          onChange={(e) =>
                            this.setState({ email: e.target.value })
                          }
                        />
                        <Form.Text className="text-muted">
                          We'll never share your email with anyone else.
                        </Form.Text>
                      </Form.Group>

                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          onChange={(e) =>
                            this.setState({ password: e.target.value })
                          }
                        />
                      </Form.Group>
                      <Button
                        variant="primary"
                        className="mt-3"
                        type="submit"
                        block
                        onClick={(e) => this.handleSubmit(e)}
                      >
                        Submit
                      </Button>
                      <br />
                      <p>
                        if you are already registered click here
                        <Link
                          style={{ color: "blue" }}
                          onClick={this.handleShowLogin}
                        >
                          Login
                        </Link>
                      </p>
                    </Form>
                  </Modal.Body>
                </Modal>
              </li>
              {/* Login Model */}

              <li className="nav-item">
                <Link
                  className="nav-link text-dark "
                  // href="/login"
                  onClick={this.handleShowLogin}
                >
                  <span className="fas fa-sign-in-alt"></span> Login
                </Link>
                <Modal
                  show={this.state.showLogin}
                  onHide={this.handleCloseLogin}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Log In</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {this.state.msg ? (
                      <Alert variant="danger">{this.state.msg}</Alert>
                    ) : null}
                    <Form>
                      <Form.Group role="form" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          onChange={(e) =>
                            this.setState({ email: e.target.value })
                          }
                        />
                        <Form.Text className="text-muted">
                          We'll never share your email with anyone else.
                        </Form.Text>
                      </Form.Group>
                      <Form.Group role="form" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          onChange={(e) =>
                            this.setState({ password: e.target.value })
                          }
                        />
                      </Form.Group>
                      <Button
                        variant="primary"
                        className="mt-3"
                        type="submit"
                        onClick={(e) => this.haandleLogin(e)}
                        block
                      >
                        Submit
                      </Button>
                      <br />
                      <p>
                        if you are not login click here
                        <Link
                          style={{ color: "blue" }}
                          onClick={this.handleShow}
                        >
                          Signup
                        </Link>
                      </p>
                    </Form>
                  </Modal.Body>
                </Modal>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapdispatchToProps = (dispatch) => {
  return bindActionCreators({ registerUser, loginUser }, dispatch);
};
export default connect(mapStateToProps, mapdispatchToProps)(Homepage);
