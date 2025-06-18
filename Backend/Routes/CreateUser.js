let express = require("express");
const User = require("../Models/User");
let { body, validationResult } = require("express-validator");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
let router = express.Router();
let jwtSecret = "MyNameIsFaizan";
// Signup
router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password", "Incorrect Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    let { name, location, email, password } = req.body;
    let secPassword = await bcrypt.hash(password, 12);
    try {
      await User.create({
        name: name,
        location: location,
        email: email,
        password: secPassword,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

// Login
router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password", "Incorrect Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    let { email } = req.body;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Try logging with correct credentials" });
      }
      let findPassword = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      if (!findPassword) {
        return res
          .status(400)
          .json({ errors: "Try logging with correct credentials" });
      }

      const data = {
        user: {
          id: userData.id,
        },
      };

      let authToken = jwt.sign(data, jwtSecret);

     return res.json({ success: true, authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
