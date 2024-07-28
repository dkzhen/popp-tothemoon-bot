const { default: axios } = require("axios");
const { configDotenv } = require("dotenv");
const { getAuthToken } = require("./getAuthToken");
configDotenv();

exports.validateToken = async () => {
  const API_URL = "https://moon.popp.club/moon/asset";
  const tokens = await getAuthToken();

  const validToken = [];
  for (const token of tokens) {
    try {
      await axios.get(API_URL, {
        headers: {
          Authorization: `${token.token}`,
        },
      });

      console.log(`[ BOT ] : Checking token done..`);
      validToken.push(token);
    } catch (error) {
      console.log(`[ Error ] : validate token failed`);
    }
  }
  return validToken;
};
