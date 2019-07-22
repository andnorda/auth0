import React from "react";
// import { AuthLock } from "./AuthLock";
import { Auth } from './Auth'

class AuthWall extends React.Component {
  constructor() {
    super();

    this.auth = new Auth();
    this.state = {
      isAuthenticated: null
    };
    this.monitorLogin = setInterval(() => {
      const isAuthenticated = this.auth.isAuthenticated();
      if (isAuthenticated !== this.state.isAuthenticated) {
        this.setState({ isAuthenticated });
      }
    }, 50);
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }

  componentDidMount() {
    if (localStorage.getItem("isLoggedIn") === "true") {
      this.auth.renewSession();
    }
  }

  render() {
    const { children } = this.props;
    return children(this.auth);
  }
}

export default AuthWall;
