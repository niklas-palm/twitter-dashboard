import axios from "axios";
import { Auth } from "aws-amplify";

const API_URL = "https://0xz8bvrpr7.execute-api.eu-west-1.amazonaws.com/prod/";

const getUserData = async () => {
  return (await Auth.currentSession()).getIdToken();
};

export const getUrl = async () => {
  const userData = await getUserData();
  console.log(userData);
  const { jwtToken } = userData;

  const headers = {
    Authorization: jwtToken,
  };
  try {
    const { data, status } = await axios.get(API_URL, { headers });
    console.log("statusCode: ", status);
    console.log("Response body: ", data);

    return data.message;
  } catch (err) {
    console.log("ERROR:");
    console.log(err);
    return "error";
  }
};
