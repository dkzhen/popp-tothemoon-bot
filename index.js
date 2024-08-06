const cron = require("node-cron");
const express = require("express");

const { configDotenv } = require("dotenv");
const { rewardDaily } = require("./func/DailyReward");
const { farming } = require("./func/farming");
const { planetGame } = require("./func/ExplorePlanet");
const { SocialSummerTask } = require("./func/VisitSummer");

configDotenv();
// Schedule the task to run every hour on the hour

rewardDaily();
farming();
planetGame();
SocialSummerTask();
cron.schedule("0 * * * *", rewardDaily);
cron.schedule("0 * * * *", farming);
cron.schedule("0 * * * *", planetGame);
cron.schedule("0 * * * *", SocialSummerTask);

// Start the server
const port = process.env.PORT || 104;
const app = express();

app.get("/", (req, res) => {
  res.send("API cron job server is running");
});

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});
