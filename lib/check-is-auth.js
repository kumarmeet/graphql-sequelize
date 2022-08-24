const isAuth = (isLoggedIn) => {
  if (!isLoggedIn) {
    throw new Error("You are not authenticated!");
  }
};

module.exports = isAuth;
