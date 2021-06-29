import React, { useEffect, useState } from "react";
import Amplify, { Auth } from "aws-amplify";
import {
  AmplifyAuthenticator,
  AmplifySignUp,
  AmplifySignIn,
} from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import awsconfig from "./aws-exports.js";
import QuickSight from "aws-sdk/clients/quicksight";

import "./App.scss";

Amplify.configure(awsconfig);

const getDashboardParams = {
  AwsAccountId: "641758013508", // req
  DashboardId: "c84f964d-f305-459e-8bc2-e6dc3802ee23", // req
  IdentityType: "ANONYMOUS", // req
};

const getEmbedUrl = async () => {
  const credentials = await Auth.currentCredentials();
  console.log(credentials);

  var quicksight = new QuickSight({
    region: "eu-west-1",
    credentials: {
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
    },
  });
  try {
    const resp = await quicksight
      .getDashboardEmbedUrl(getDashboardParams)
      .promise();
    console.log(resp);
  } catch (err) {
    console.log("Error");
    console.error(err);
  }
};

getEmbedUrl();

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

  return authState === AuthState.SignedIn && user ? (
    <div className="AppContainer">
      <h1>Hello world!</h1>
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
