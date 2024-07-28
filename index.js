const cron = require("node-cron");
const express = require("express");

const { configDotenv } = require("dotenv");
const { rewardDaily } = require("./func/DailyReward");
const { farming } = require("./func/farming");
const playGame = require("./func/playgame");

configDotenv();
// Schedule the task to run every hour on the hour

rewardDaily();
farming();
playGame();
cron.schedule("0 * * * *", rewardDaily);
cron.schedule("0 * * * *", farming);
cron.schedule("0 * * * *", playGame);

// Start the server
const port = process.env.PORT || 104;
const app = express();

app.get("/", (req, res) => {
  res.send("API cron job server is running");
});

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});
