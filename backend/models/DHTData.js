import mongoose from "mongoose";

const DHTSchema = new mongoose.Schema({
  temperatura: Number,
  humedad: Number,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("DHTData", DHTSchema);