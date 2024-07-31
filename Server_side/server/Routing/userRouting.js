const express = require("express");
const userController = require("../Controller/userController");
const ticketController = require("../Controller/ticketController");
const authController = require("../Controller/authController");

const router = express.Router();

// router.route("/:userId").get(userController.getUser);
router.post("/signup", authController.signup);
router.post("/signin", authController.login);
router.post("/signout", authController.signout);

router.get(
  "/getMyEvents",
  authController.protect,
  authController.restrictTo("User"),
  ticketController.getEventsUserRelated
);

// getting user data
router.get(
  "/getUserData",
  authController.protect,
  authController.restrictTo("User"),
  userController.getUserData
);

// updating user password
router.patch(
  "/changeUserPassword",
  authController.protect,
  authController.restrictTo("User"),
  authController.updateUserPassowrd
);

// updating user Data
router.patch(
  "/updateUserAllData",
  authController.protect,
  authController.restrictTo("User"),
  userController.updateUserAllData
);

router.post("/forgotPassword", authController.forgotPassowrd); //email sending
router.get("/isValidToken/:token", authController.isValidToken); //Route Token validation
router.patch("/resetPassword/:token", authController.resetPassword); //Updating new password

router.post(
  "/signup-EventOrganizer",
  authController.protect,
  authController.restrictTo("Admin"),
  authController.EventOrganizerSignup
);

module.exports = router;
