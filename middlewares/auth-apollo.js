const jwt = require("jsonwebtoken");

const auth = async (token) => {
  if (!token) {
    return false;
  }
  try {
    const { userId } = await jwt.verify(token, "somesupersecretsecret");
    return !userId ? false : userId;
  } catch (e) {
    return false;
  }
};

module.exports = auth;
