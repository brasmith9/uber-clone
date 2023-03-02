export default class Authentication {
  public static isLoggedIn(req, res, next): void {
    if (req.user) {
      next();
    } else {
      res.status(401).json({
        message: "You must login to preceed!",
      });
    }
  }
}
