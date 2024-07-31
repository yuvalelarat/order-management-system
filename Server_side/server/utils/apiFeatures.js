const Event = require("../Models/eventModel");
const AppError = require("./appError");

class APIFeatures {
  constructor(query, queryString, isAggregate = false) {
    this.query = query;
    this.queryString = queryString;
    this.isAggregate = isAggregate;
    this.category = "";
  }

  async countEvents() {
    let Counter = 0;
    if (this.category !== "") {
      Counter = await Event.find({ category: this.category }).then((data) => {
        return data.length;
      });
    } else {
      Counter = await Event.find().then((data) => {
        return data.length;
      });
    }
    return await Counter;
  }

  static aggregate(queryString) {
    const features = new APIFeatures(Event.aggregate(), queryString, true);
    return features;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields", "loc"];
    excludedFields.forEach((el) => delete queryObj[el]);
    this.category = queryObj.category;
    if (this.category === undefined) this.category = "";
    const currentDate = new Date();

    if (this.isAggregate) {
      this.query = this.query.match({ date: { $gte: currentDate } });
      this.query = this.query.match(queryObj);
    } else {
      this.query = this.query.find({ date: { $gte: currentDate } });
      this.query = this.query.find(queryObj);
    }

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");

      if (this.isAggregate) {
        this.query = this.query.sort({ [sortBy]: 1 });
      } else {
        this.query = this.query.sort(sortBy);
      }
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = 6;
    const skip = (page - 1) * limit;

    if (this.isAggregate) {
      this.query = this.query.skip(skip).limit(limit);
    } else {
      this.query = this.query.skip(skip).limit(limit);
    }

    return this;
  }


  closest(req, res, next) {
    if (!this.queryString.loc) return this;

    const userCoords = this.queryString.loc.split(",").map(Number);
    if (
      userCoords.length !== 2 ||
      isNaN(userCoords[0]) ||
      isNaN(userCoords[1])
    ) {
      return next(new AppError("Invalid user coordinates", 400));
    }

    const [userLongitude, userLatitude] = userCoords;

    const geoNearStage = {
      $geoNear: {
        near: { type: "Point", coordinates: [userLongitude, userLatitude] },
        distanceField: "distance",
        spherical: true,
        distanceMultiplier: 0.001, // Convert meters to kilometers
      },
    };

    if (this.isAggregate) {
      this.query = this.query.append(geoNearStage);
    } else {
      this.query = Event.aggregate([
        geoNearStage,
        { $match: this.query.getQuery() },
      ]);
      this.isAggregate = true; // Switch to aggregation mode
    }

    return this;
  }
}
module.exports = APIFeatures;
