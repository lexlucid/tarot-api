import mongoose from "mongoose";

// Tarot card schema
const cardSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  arcana: {
    type: String,
    enum: ['major', 'minor'], // Validates that arcana is either 'major' or 'minor'
    required: true
  },
  number: {
    type: String,
    required: true
  },
  suit: {
    type: String,
    default: null // Allows null for cards without a suit
  },
  description: {
    type: String,
    required: true
  },
  meanings: {
    upright: {
      type: [String], // Array of strings for upright meanings
      required: true
    },
    reversed: {
      type: [String], // Array of strings for reversed meanings
      required: true
    }
  },
  image: {
    type: String,
    required: true
  },
  keywords: {
    type: [String], // Array of strings for keywords
    required: true
  },
  element: {
    type: String,
    required: false // Optional field
  },
  astrologicalSign: {
    type: String,
    required: false // Optional field
  }
});

// Create and export the model
const Card = mongoose.model('Card', cardSchema);

export default Card;