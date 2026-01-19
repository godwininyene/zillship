import { getShipmentByTracking } from "@/controllers/shipmentController";


export async function GET(request, { params }) {

    const { tracking_num } = await params;
    return getShipmentByTracking(tracking_num)
}
