const API_KEY = process.env.AUTH_TOKEN;

module.exports = (req, res, next) => {
  const token = req.headers.token;
  if (token !== API_KEY) {
    return res.status(401).send("Unauthorized!!!");
  }
  next();
};
