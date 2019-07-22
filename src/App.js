import React from "react";
import { Router, Route } from "react-router-dom";
import SiteHeader from "./SiteHeader";
import AuthWall from "./Auth/AuthWall";
import Callback from "./Callback/Callback";
import Home from "./Home/Home";
import history from "./history";
import UnauthHome from "./UnauthHome/UnauthHome";

class App extends React.Component {
  render() {
    return (
      <AuthWall>
        {auth => (
          <div
            style={{
              backgroundColor: "white",
              display: "flex"
            }}
          >
            {auth.isAuthenticated() === null ? (
              <div
                style={{
                  flexGrow: 1,
                  height: "100vh",
                  display: "flex",
                  paddingTop: "20vh",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <img
                  src="/loading-animation.gif"
                  alt="Loading"
                  style={{ width: "80px", height: "80px" }}
                />
                <span style={{ marginLeft: "20px" }}>Loading ...</span>
              </div>
            ) : (
              <div style={{ maxWidth: "800px", margin: "auto" }}>
                <Router history={history}>
                  <div>
                    <SiteHeader auth={auth} history={history} />
                    <Route
                      path="/"
                      render={props =>
                        auth.isAuthenticated() ? (
                          <Home
                            auth={auth}
                            history={history}
                            {...props}
                          />
                        ) : (
                          <UnauthHome />
                        )
                      }
                    />
                    <Route
                      path="/callback"
                      render={props => {
                        if (/access_token|id_token|error/.test(window.location.hash)) {
                          auth.handleAuthentication()
                        }

                        return <Callback {...props} />
                      }}
                    />
                  </div>
                </Router>
              </div>
            )}
          </div>
        )}
      </AuthWall>
    );
  }
}

export default App;
