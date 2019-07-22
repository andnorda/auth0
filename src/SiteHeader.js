import React, { Component } from "react";
import { Navbar, Button } from "react-bootstrap";
import runtimeEnv from "@mars/heroku-js-runtime-env";

class SiteHeader extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  render() {
    const env = runtimeEnv();
    const isProd = env.REACT_APP_AUTH0_DOMAIN === "innlogging.obos.no";

    return (
      <div>
        <Navbar>
          <Navbar.Brand>OBOS auth0 tester</Navbar.Brand>

          <Navbar.Brand style={{ color: isProd ? "red" : "inherit" }}>
            env: {isProd ? "PRODUCTION" : "TEST"}
          </Navbar.Brand>

          {this.props.auth.isAuthenticated() ? (
            <Button
              style={{ marginLeft: "20px" }}
              onClick={() => this.props.auth.logout()}
            >
              Log Out
            </Button>
          ) : (
            <Button
              style={{ marginLeft: "20px" }}
              onClick={() => this.props.auth.login()}
            >
              Logg inn
            </Button>
          )}

          {isProd ? (
            <Button
              style={{ marginLeft: "20px" }}
              href="https://auth0-obos-tester-test.herokuapp.com/"
            >
              Change to test environment
            </Button>
          ) : (
            <Button
              style={{
                marginLeft: "20px",
                backgroundColor: "#800000",
                borderColor: "#800000"
              }}
              href="https://auth0-obos-tester.herokuapp.com/"
            >
              Change to production environment
            </Button>
          )}
        </Navbar>
      </div>
    );
  }
}

export default SiteHeader;
