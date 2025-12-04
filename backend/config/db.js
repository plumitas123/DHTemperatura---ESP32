import { connect } from "mongoose";

async function connectDB() {
  try {
    await connect("mongodb+srv://canario123:LosMonitos@dht.kaka3wy.mongodb.net/?appName=dht");
    console.log("MongoDB conectado");
  } catch (error) {
    console.error("Error conectando a MongoDB:", error);
  }
}

export default connectDB;