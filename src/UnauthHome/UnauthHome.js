import React from "react";
import { AVAILABLE_SCOPES } from "../Auth/Auth";
import runtimeEnv from "@mars/heroku-js-runtime-env";

const UnauthHome = () => {
  const env = runtimeEnv();

  return (
    <div>
      <h3>You are not logged in!</h3>
      <p>Once logged in, you will see all possible claims for YOUR user.</p>
      <p>You will request the following scopes:</p>
      <ul>
        {Object.keys(AVAILABLE_SCOPES).map(scope => (
          <li key={scope}>
            <tt>{scope}</tt>
            <span> &mdash; {AVAILABLE_SCOPES[scope]}</span>
          </li>
        ))}
      </ul>
      <p>
        You will always receive a http://obos.no/personId claim. This is either
        the empty string (which means the user was NOT found in the OBOS
        database) or the personId of the user.
      </p>
      <p>
        You will log in to client ID: <tt>{env.REACT_APP_AUTH0_CLIENT_ID}</tt>
      </p>
      <p>
        You will log in via domain: <tt>{env.REACT_APP_AUTH0_DOMAIN}</tt>
      </p>
    </div>
  );
};

export default UnauthHome;
