const { default: axios } = require("axios");
const { validateToken } = require("./CheckValidToken");

const farming = async () => {
  try {
    const tokens = await validateToken();

    for (const token of tokens) {
      try {
        const start = await axios.get(
          "https://moon.popp.club/moon/farming",

          {
            headers: {
              Authorization: `${token.token}`,
            },
          }
        );

        const claim = await axios.get(
          "https://moon.popp.club/moon/claim/farming",

          {
            headers: {
              Authorization: `${token.token}`,
            },
          }
        );
        const code = start.data.code;

        if (code === "400") {
          console.log(
            `[ Completed ] : Farming already running!. Response code : ${code} `
          );
          console.log(
            `[ Running ] : Farming claimed. Response code : ${claim.data.code} `
          );
        } else {
          console.log(`[ Running ] : Farming started... ${code}`);
        }
      } catch (error) {
        console.log(`[ Error ] : Farming failed. ${error.message}`);
      }
    }
  } catch (error) {
    console.log(`[ Error ] : Farming failed. ${error.message}`);
  }
};

module.exports = { farming };
