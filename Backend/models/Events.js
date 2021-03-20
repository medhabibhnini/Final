const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const EventsSchema = new Schema({

  name: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  },
  prize: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  
});

module.exports = Products = mongoose.model("events", EventsSchema);