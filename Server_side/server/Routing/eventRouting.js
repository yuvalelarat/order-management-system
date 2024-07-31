const express = require("express");
const eventController = require("../Controller/eventController");
const authController = require("../Controller/authController");
const ticketController = require("../Controller/ticketController");

const router = express.Router();

router.get("/", eventController.getAllEvents);

// authController.restrictTo("user") -> middlewere that restricts access to users
// authController.protect -> middlewere that checks if user is logged in
// for authrization both has to come together protect than restrictTo

/*
example of protected route
router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    eventController.getAllEvents
  );
*/

router.get("/event/:eventId", eventController.getEventById);

// reserving Tickets
router
  .route("/event/:eventId/reserve")
  .post(authController.protect, ticketController.reserveTickets)
  .patch(eventController.updateRemainingTickets);

module.exports = router;
