const { default: axios } = require("axios");

exports.getProfile = async (token) => {
  try {
    const profile = await axios.get("https://moon.popp.club/moon/asset", {
      headers: {
        Authorization: `${token}`,
      },
    });
    return profile.data.data;
  } catch (error) {
    console.log(error.message);
  }
};

exports.getPlanet = async (token) => {
  try {
    const planet = await axios.get(
      "https://moon.popp.club/moon/planets",

      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return planet.data.data;
  } catch (error) {
    console.log(error.message);
  }
};

exports.explorePlanet = async (token, planetId) => {
  try {
    const explore = await axios.get(
      `https://moon.popp.club/moon/explorer?plantId=${planetId}`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return explore.data.data;
  } catch (error) {
    console.log(error.message);
  }
};
