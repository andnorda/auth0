import React, { Component } from "react";

class Home extends Component {
  constructor() {
    super();

    this.state = {
      user: null
    };
  }

  componentDidMount() {
    this.props.auth.getProfile((err, user) => {
      this.setState({ user });
    });
  }

  renderUser({ profile, app_metadata, user_metadata }) {
    return (
      <div header="Profile">
        <h3>You are logged in to {window.location.origin}</h3>
        <img
          src={profile.picture}
          alt="No profile photo for this user"
          style={{
            display: "block",
            backgroundColor: "#ccc",
            width: "300px",
            height: "200px"
          }}
        />

        <h4>Claims</h4>
        <pre>{JSON.stringify(profile, null, 2)}</pre>

        <h4>app_metadata</h4>
        <pre>{JSON.stringify(app_metadata, null, 2)}</pre>

        <h4>user_metadata</h4>
        <pre>{JSON.stringify(user_metadata, null, 2)}</pre>
      </div>
    );
  }

  render() {
    const { user } = this.state;

    console.dir(user);

    return <div className="container">{user && this.renderUser(user)}</div>;
  }
}

export default Home;
