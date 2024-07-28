const { default: axios } = require("axios");
const { validateToken } = require("./CheckValidToken");

const rewardDaily = async () => {
  try {
    const tokens = await validateToken();

    for (const token of tokens) {
      try {
        const claim = await axios.post(
          "https://moon.popp.club/moon/sign/in",
          {},
          {
            headers: {
              Authorization: `${token.token}`,
            },
          }
        );
        const code = claim.data.code;
        if (code === "400") {
          console.log(
            `[ Completed ] : Checked in today. Response code : ${code} `
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

module.exports = { rewardDaily };
