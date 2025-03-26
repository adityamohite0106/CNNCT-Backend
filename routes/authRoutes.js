const express = require("express");
const { signup, signin } = require("../controllers/authController");
// const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
// router.post("/check-user", checkUser);
// router.put("/update", authMiddleware, updateUserProfile);

module.exports = router;
