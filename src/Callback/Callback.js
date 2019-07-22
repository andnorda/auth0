import React, { Component } from "react";

class Callback extends Component {
  render() {

    return (
      <div
        style={{
          color: "white",
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
    );
  }
}

export default Callback;
