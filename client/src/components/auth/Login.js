import React, { Component } from 'react';
import {
  Form,
  NavLink,
  Container
} from 'reactstrap';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';

const formSignin = {
  width: '100%',
  maxWidth: '330px',
  padding: '15px',
  margin: '15rem auto 0px'
};
const textDarkYellow = {
  color: '#b69535'
};

class Login extends Component {

  state = {
      username: '',
      password: ''
  };

  onChange = e => {
      this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
      e.preventDefault();

      const loginCredentials = {
          username: this.state.username,
          password: this.state.password
      };

      // Add item via addItem action
      this.props.login(loginCredentials);
  };

  componentDidMount(){
    document.title = this.props.title;
    document.body.style.backgroundColor = '#1a1a1a';
  }

  render() {
    return (
        
        <Container>
          <Form style={formSignin} onSubmit={this.onSubmit}>
            <h1 className="h3 mb-3 font-weight-normal text-white text-center">Login</h1>
            <input type="text" name="username" className="form-control mb-2" placeholder="Username" onChange={this.onChange} required autoFocus />
            <input type="password" name="password" className="form-control mb-2" placeholder="Password" onChange={this.onChange} required />
            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            <p className="mt-2 text-center"><a href="/register">Register</a></p>
            <p className="mt-3 mb-3 text-center" style={textDarkYellow}>&copy; 2020-2021</p>
          </Form>
        </Container>
    );
  }
}

export default connect(
  null,
  { login }
)(Login);
