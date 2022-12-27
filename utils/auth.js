const auth = (req, res, next) => {
  if (!req.session.user) {
      let err = new Error("You are not authenticated");
      res.setHeader("WWW-Authenticate", "Basic");
      err.status = 401;
      res.redirect("/");
      return next(err);
      req.userType = req.session.user.userType;

  }
  return next();
};
module.exports = auth;