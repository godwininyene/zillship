import mongoose from "mongoose";
import "@/models/shipment";
import '@/models/shipmentHistory'

let MONGO_URI;

if (process.env.APP_ENV === 'production') {
  //  MONGO_URI = process.env.DB_LOCAL;

  MONGO_URI = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
} else {
  MONGO_URI = process.env.DB_LOCAL;
}

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  await mongoose.connect(MONGO_URI);
};
