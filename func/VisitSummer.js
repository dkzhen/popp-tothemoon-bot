const { default: axios } = require("axios");
const { validateToken } = require("./CheckValidToken");

exports.SocialSummerTask = async () => {
  try {
    const tokens = await validateToken();
    for (const token of tokens) {
      const list = await axios.get("https://moon.popp.club/moon/task/list", {
        headers: {
          Authorization: `${token.token}`,
        },
      });
      const data = list.data.data.filter((item) => item.taskId == 1);
      if (data.length > 0) {
        if (data.status == 0) {
          await axios.get("https://moon.popp.club/moon/task/visit/ss", {
            headers: {
              Authorization: `${token.token}`,
            },
          });
          console.log(`[ Running ] : Visit Summer successfully.`);
        } else {
          console.log(`[ Completed ] : Visit Summer already visited`);
        }
        if (data.status == 1) {
          await axios.get("https://moon.popp.club/moon/task/claim?taskId=1", {
            headers: {
              Authorization: `${token.token}`,
            },
          });
          console.log(`[ Running ] : Visit Summer Claimed.`);
        } else {
          console.log(`[ Completed ] : Visit Summer Claimed.`);
        }
        if (data.status == 2) {
          console.log(`[ Completed ] : Visit Summer already Completed.`);
        }
      } else {
        console.log(`[ Error ] Task not found.`);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};
