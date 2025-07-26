import { Router } from "express";
import db from "../db/queries"
import passport from "passport"
import bcrypt from "bcryptjs"

const router = Router()

router.get("/sign-up", (req, res) => res.render("sign-up-form"));
router.post("/sign-up", async (req, res, next) => {
  try {
    const {username, password} = req.body
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.postNewUser(username, hashedPassword)
    res.redirect("/category");
  } catch(err) {
    return next(err);
  }
});
router.post('/log-in',
  passport.authenticate('local', {
    successRedirect: '/category',
    failureRedirect: '/category',
    failureFlash: false, 
  })
);

router.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/category");
  });
});




export default router