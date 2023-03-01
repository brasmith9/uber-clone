import { Router } from "express";
import passport from "passport";

const router = Router();

router.post("/login", (re, res) => {
  res.json({
    message: "Logged in",
  });
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

export default router;
