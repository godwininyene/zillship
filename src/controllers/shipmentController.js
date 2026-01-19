import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Shipment from "@/models/shipment";
import ShipmentHistory from "@/models/shipmentHistory";
import { connectDB } from "@/lib/db";
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";
import { catchAsync } from "@/lib/catchAsync";
import { AppError } from "@/lib/appError";
import { notFound } from "next/navigation";

export const createShipment = catchAsync(async (req) => {
  await connectDB();

  const formData = await req.formData();
  const photo = formData.get("photo");

  const body = Object.fromEntries(formData.entries());
  delete body.photo;

  // Upload image only if it exists
  if (photo && typeof photo !== "string") {
    const uploadResult = await uploadToCloudinary(
      photo,
      "zillShip/shipmentPhoto",
      "photo"
    );

    body.photo = uploadResult?.secure_url;
  }

  // Create shipment first
  const shipment = await Shipment.create(body);

  // Immediately create first history
  const history = await ShipmentHistory.create({
    shipmentId: shipment._id,
    location: body.sender_origin || "N/A",
    status: shipment.status || "Picked by Courier",
    remark: "Shipment information has been created"
  });

  // sync shipment current status
  shipment.status = history.status;
  await shipment.save();

  return NextResponse.json(
    {
      status: "success",
      data: {
        shipment,
        history
      }
    },
    { status: 201 }
  );
});


export const getAllShipments = catchAsync(async () => {
  await connectDB();
  const shipments = await Shipment.find();
  return JSON.parse(JSON.stringify(shipments));

  //For API
  return NextResponse.json(
    {
      status: "success",
      result: shipments.length,
      data: { shipments }
    },
    { status: 200 }
  );
})

export const getShipmentByTracking = async (tracking_num) => {
  await connectDB();
  const shipment = await Shipment.findOne({ tracking_number: tracking_num }).populate("histories");
  if (!shipment) {
    notFound();
  }

  return JSON.parse(JSON.stringify(shipment));
  // if (!shipment) throw new AppError('No shipment was found with that tracking code', '', 404);

  // return NextResponse.json(
  //   {
  //     status: "success",
  //     data: { shipment }
  //   },
  //   { status: 200 }
  // );

};

export const getShipment = async (id) => {
  await connectDB();
  // ✅ 1. Check if ObjectId is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    notFound();
  }
  const shipment = await Shipment.findById(id);
  if (!shipment) {
    notFound();
  }

  return JSON.parse(JSON.stringify(shipment));
  // if (!shipment) throw new AppError('No shipment was found with that tracking code', '', 404);

  // return NextResponse.json(
  //   {
  //     status: "success",
  //     data: { shipment }
  //   },
  //   { status: 200 }
  // );

};


export const updateShipment = catchAsync(async (req, { params }) => {
  await connectDB();

  const { id } = await params;

  // ✅ 1. Check if ObjectId is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    notFound();
  }

  const formData = await req.formData();
  const photo = formData.get("photo");

  const body = Object.fromEntries(formData.entries());
  delete body.photo; // remove file from normal fields

  // 🔁 If a new image was uploaded, send to Cloudinary
  if (photo && typeof photo === "object" && photo.size > 0) {
    const uploadResult = await uploadToCloudinary(
      photo,
      "zillShip/shipmentPhoto",
      "photo"
    );

    body.photo = uploadResult?.secure_url;
  }

  const shipment = await Shipment.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  if (!shipment) {
    throw new AppError("No shipment was found with that id", "", 404);
  }

  return NextResponse.json(
    {
      status: "success",
      data: { shipment },
    },
    { status: 200 }
  );
});



export const updateShipmentHistory = catchAsync(async (req, id) => {
  await connectDB();

  const shipment = await Shipment.findById(id);
  if (!shipment) {
    throw new AppError("No shipment was found with that id", "", 404);
  }

  const body = await req.json();

  // 1. Create history
  const history = await ShipmentHistory.create({
    shipmentId: shipment._id,
    location: body.location,
    status: body.status,
    remark: body.remark,
  });

  // 2. Update shipment current status
  shipment.status = body.status;
  await shipment.save();

  return NextResponse.json(
    {
      status: "success",
      data: {
        history,
        shipmentStatus: shipment.status,
      },
    },
    { status: 200 }
  );
});
