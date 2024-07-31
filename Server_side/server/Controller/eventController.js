const mongoose = require("mongoose");
const fs = require("fs");
const APIFeatures = require("../utils/apiFeatures");
const Event = require("../Models/eventModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllEvents = catchAsync(async (req, res, next) => {
  let features;

  if (req.query.loc) {
    // Start with an aggregation pipeline if location-based sorting is requested
    features = APIFeatures.aggregate(req.query)
      .closest(res, req, next)
      .filter()
      .sort()
      .paginate();
  } else {
    // Use the normal find operation for other queries
    features = new APIFeatures(Event.find(), req.query)
      .filter()
      .sort()
      .paginate();
  }
  const total = await features.countEvents();

  const events = await features.query.exec();
  res.status(200).json({
    status: "success",
    results: events.length,
    data: {
      total,
      events,
    },
  });
});

exports.getEventById = catchAsync(async (req, res, next) => {
  const eventId = req.params.eventId;
  const event = await Event.findById(eventId);

  if (!event) {
    // If event with provided ID is not found, return 404 Not Found status
    return next(new AppError("Event not found", 404));
  }
  res.status(200).json(event);
});

exports.updateRemainingTickets = catchAsync(async (req, res, next) => {
  const eventId = req.params.eventId;
  const { ticketsAmount } = req.body;
  const event = await Event.findById(eventId);
  if (!event) return next(new AppError("Event not found", 404));

  event.emptyTickets = event.emptyTickets - ticketsAmount;
  await event.save();
  res.status(200).json({
    status: "success",
    data: {
      event,
    },
  });
});
