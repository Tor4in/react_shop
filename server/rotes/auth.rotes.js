const Router = require("express");
const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const router = new Router();


router.post(
  "/registrations",
  [
    check("email", "uncorect email").isEmail(),
    check(
      "password",
      "password must be longer then 3 and shorten then 12 "
    ).isLength({ min: 3, max: 12 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ massage: "Uncorect request", errors });
      }
      const { email, password, nickname} = req.body;

			const candidateEmail = await User.findOne({ email });

      if (candidateEmail) {
        return res
          .status(400)
          .json({ massage: `User with email ${email} allredy exist` });
      }
			 
			const candidateNick = await User.findOne({ nickname });

      if (candidateNick) {
        return res
          .status(400)
          .json({ massage: `User with nickname ${nickname} allredy exist` });
      }
      const hashPassword = await bcryptjs.hash(password, 8);
      const user = new User({
        email,
				nickname,
        password: hashPassword,
      });
      await user.save();
      return res.json({ massage: "User was created" });
    } catch (e) {
      console.log(e);
      res.send({ massage:`Server error` });
    }
  }
);


router.post(
  "/login",
  async (req, res) => {
    try {
      
			const {email, password} = req.body

			const user = await User.findOne({email})
			if(!user){
				return res.status(404).json({massage: ""})
      }
			const isPassValid = bcryptjs.compareSync(password, user.password)
			if(!isPassValid){
				return res.status(400).json({massage: "password is incorect"})
			}
			const token = jwt.sign({id: user.id}, config.get("secretkey"), {expiresIn: "1h"})
			return res.json({
				token,
				user:{
					id: user.id,
					nickname: user.nickname
				}
			})
    } catch (e) {
      console.log(e);
      res.send({ massage:`Server error` });
    }
  }
);
module.exports = router;
