const { default: axios } = require("axios");
const { validateToken } = require("./CheckValidToken");

const farming = async () => {
  try {
    const tokens = await validateToken();
    console.log(tokens);
    for (const token of tokens) {
      try {
        const claim = await axios.get(
          "https://moon.popp.club/moon/farming",

          {
            headers: {
              Authorization: `${token.token}`,
            },
          }
        );
        const code = claim.data.code;

        if (code === "400") {
          console.log(
            `[ Completed ] : Farming already running!. Response code : ${code} `
          );
        } else {
          console.log(
            `[ Running ] : Daily rewards successfully claimed. ${code}`
          );
        }
      } catch (error) {
        console.log(`[ Error ] : Daily rewards failed. ${error.message}`);
      }
    }
  } catch (error) {
    console.log(`[ Error ] : Daily rewards failed. ${error.message}`);
  }
};

module.exports = { farming };
