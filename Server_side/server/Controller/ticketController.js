const mongoose = require("mongoose");
const APIFeatures = require("../utils/apiFeatures");
const reservedTicket = require("../Models/TicketsModel");
const Event = require("../Models/eventModel");
const userModel = require("../Models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

//Reserving tickets
exports.reserveTickets = catchAsync(async (req, res, next) => {
  const currentDate = new Date();
  const { ticketsAmount, userID, totalPrice } = req.body;
  const eventID = req.params.eventId;

  //Checking if all data is provided correctly
  if (!ticketsAmount || !userID || !totalPrice)
    return next(new AppError("Please Provide All Data", 404));
  if (
    !mongoose.Types.ObjectId.isValid(userID) ||
    !mongoose.Types.ObjectId.isValid(eventID)
  )
    return next(new AppError("Invalid User or Event ID", 404));

  //event and user exist:
  const event = await Event.findById(eventID);
  const user = await userModel.findById(userID);
  if (!event || !user)
    return next(new AppError("Event or User not found", 404));

  //Checking Ticket amount
  if (event.emptyTickets < ticketsAmount)
    return next(new AppError("Too many tickets requested", 404));
  else if (ticketsAmount <= 0) return next(new AppError("Invalid amount", 404));

  // checking total price:
  if (totalPrice != event.Cost * ticketsAmount)
    return next(new AppError("Invalid Total Price", 404));

  //saving tickets
  const newTicket = await reservedTicket.create({
    eventID: req.params.eventId,
    ticketsAmount: req.body.ticketsAmount,
    userID: req.body.userID,
    date: currentDate,
    totalPrice: req.body.totalPrice,
  });

  res.status(200).json({
    status: "success",
    data: {
      newTicket,
    },
  });
});

exports.getEventsUserRelated = catchAsync(async (req, res, next) => {
  const currentDate = new Date();
  const AllEventsID = await reservedTicket
    .find({ userID: req.user.id })
    .select("eventID");

  if (!AllEventsID) return next(new AppError("No Events found", 404));

  const eventIds = [];
  Object.keys(AllEventsID).forEach((key) => {
    eventIds.push(AllEventsID[key].eventID);
  });

  // getting all events
  const AllEvents = await Event.find({
    _id: { $in: eventIds },
  });

  const FutureEvents = AllEvents.filter((event) => {
    return event.date > currentDate;
  });
  const PastEvents = AllEvents.filter((event) => {
    return event.date <= currentDate;
  });

  res.status(200).json({
    status: "success",
    results: AllEvents.length,
    data: {
      FutureEvents,
      PastEvents,
    },
  });
});
