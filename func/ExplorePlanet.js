const { validateToken } = require("./CheckValidToken");
const { getProfile, getPlanet, explorePlanet } = require("./repo");

const planetGame = async (token, planetId) => {
  try {
    const tokens = await validateToken();

    for (const token of tokens) {
      try {
        const probe = await getProfile(token.token).then((data) => {
          return data.probe;
        });
        while (true) {
          if (probe > 0) {
            console.log(`[ Game ] Probe : ${probe} left.`);
            const planets = await getPlanet(token.token).then((data) => {
              return data;
            });
            if (planets.length > 0) {
              const explore = await explorePlanet(
                token.token,
                planets[0].id
              ).then((data) => {
                return data;
              });
              console.log(
                `[ Game ] Explore planet successfully. Reward : ${explore.amount} ${explore.award}`
              );
            } else {
              console.log(`[ Game ] Planet not found`);
              console.log(`[ Loading ] please wait...`);
              await new Promise((resolve) => setTimeout(resolve, 900000));
            }
          } else {
            console.log(`[ Game ] No probe left`);
            break;
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { planetGame };
