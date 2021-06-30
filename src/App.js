import React, { useEffect, useState } from "react";
import Amplify from "aws-amplify";
import {
  AmplifyAuthenticator,
  AmplifySignUp,
  AmplifySignIn,
} from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import awsconfig from "./aws-exports.js";
import { embedDashboard } from "amazon-quicksight-embedding-sdk";

import { getUrl } from "./getEmbedUrl";

import "./App.scss";

Amplify.configure(awsconfig);

const App = () => {
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  console.log(user);

  const onClick = async () => {
    const url = await getUrl();
    const options = {
      url,
      container: document.getElementById("dashboard"),
      scrolling: "no",
    };
    console.log(options);
    const dashboard = embedDashboard(options);
    console.log(dashboard);
  };

  return authState === AuthState.SignedIn && user ? (
    <div className="AppContainer">
      <div className="dashboard" id="dashboard"></div>
      <button onClick={onClick}>click me</button>
    </div>
  ) : (
    <AmplifyAuthenticator>
      <AmplifySignUp
        slot="sign-up"
        usernameAlias="email"
        formFields={[{ type: "email" }, { type: "password" }]}
      />
      <AmplifySignIn slot="sign-in" usernameAlias="email" />
    </AmplifyAuthenticator>
  );
};

export default App;
