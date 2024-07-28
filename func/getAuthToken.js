const axios = require("axios");
const { configDotenv } = require("dotenv");
const fs = require("fs").promises;
configDotenv();

exports.getAuthToken = async () => {
  const API_AUTH = "https://moon.popp.club/pass/login";

  try {
    const data = await fs.readFile("configs/config.json", "utf-8");
    const tokens = JSON.parse(data);

    const authToken = [];

    for (const token of tokens) {
      const body = {
        initData: token.token,
      };
      try {
        const response = await axios.post(API_AUTH, body);
        const auth = response.data.data.token;

        authToken.push({ token: auth });
      } catch (error) {
        console.log(`[ Error ] : Token not valid. Message : ${error.message} `);
      }
    }
    return authToken;
  } catch (error) {
    console.log(error.message);
  }
};
