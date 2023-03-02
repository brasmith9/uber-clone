import { Router } from "express";
import passport from "passport";

const router = Router();

router.post("/login", (req, res) => {
  res.json({
    message: "Logged in",
  });
});

router.get("/login-success", (req, res) => {
  res.json({
    message: "User logged in...",
  });
});

router.get("/login-failure", (req, res) => {
  res.json({
    message: "Login failed...",
  });
});

// GOOGLE AUTHENTICATION
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/api/v1/auth/login-failure",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/api/v1/auth/login-success");
  }
);

// FACEBOOK AUTHENTICATION
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/api/v1/auth/login-failure",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/api/v1/auth/login-success");
  }
);

// router.post("/logout", function (req, res, next) {
//   req.logout(function (err) {
//     if (err) {
//       return next(err);
//     }
//     res.json({
//       message: "User logged out",
//     });
//   });
// });

export default router;
