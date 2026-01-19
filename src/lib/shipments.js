import { connectDB } from "@/lib/db";
import Shipment from "@/models/shipment";
import { notFound } from "next/navigation";

export async function trackShipment(tracking) {
    await connectDB();
    const shipment = await Shipment.findOne({ tracking_number: tracking }).populate("histories");

    if (!shipment) {
        notFound();
    }

    return JSON.parse(JSON.stringify(shipment));
}



