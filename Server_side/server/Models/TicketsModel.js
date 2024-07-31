const mongoose = require("mongoose");
const validator = require("validator");

const reservedTicketsSchema = new mongoose.Schema(
  {
    eventID: {
      type: String,
      required: true,
    },
    ticketsAmount: {
      type: Number,
      required: true,
    },
    userID: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { collection: "reservedTickets" }
);

const ReservedTickets = new mongoose.model(
  "reservedTickets",
  reservedTicketsSchema
);

// if theres an event
// if there such user
// if ticketsAmount is valid

module.exports = ReservedTickets;
