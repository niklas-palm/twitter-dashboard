import React, { useEffect, useState } from "react";
import Amplify from "aws-amplify";
import {
  AmplifyAuthenticator,
  AmplifySignUp,
  AmplifySignIn,
} from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import { embedDashboard } from "amazon-quicksight-embedding-sdk";

import awsconfig from "./aws-exports.js";
import { getUrl } from "./getEmbedUrl";

import "./App.scss";

Amplify.configure(awsconfig);

const App = () => {
  // const [authState, setAuthState] = useState();
  // const [user, setUser] = useState();

  // useEffect(() => {
  //   onAuthUIStateChange((nextAuthState, authData) => {
  //     setAuthState(nextAuthState);
  //     setUser(authData);
  //   });
  // }, []);

  useEffect(() => {
    const visualizeDashboard = async () => {
      const url = await getUrl();
      const options = {
        url,
        container: document.getElementById("dashboard"),
      };
      embedDashboard(options);
    };

    // if (authState === AuthState.SigvisualizeDashboardnedIn) {
    visualizeDashboard();
    // }
  }, []);

  // return authState === AuthState.SignedIn && user ? (
  //   <div className="AppContainer">
  //     <div className="dashboard" id="dashboard"></div>
  //   </div>
  // ) : (
  //   <AmplifyAuthenticator>
  //     <AmplifySignUp
  //       slot="sign-up"
  //       usernameAlias="email"
  //       formFields={[{ type: "email" }, { type: "password" }]}
  //     />
  //     <AmplifySignIn slot="sign-in" usernameAlias="email" />
  //   </AmplifyAuthenticator>
  // );

  return (
    <div className="AppContainer">
      <div className="dashboard" id="dashboard"></div>
    </div>
  );
};

export default App;
sa;
