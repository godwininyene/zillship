import { updateShipmentHistory } from "@/controllers/shipmentController";


export async function PATCH(request, { params }) {

    const { id } = await params;
    return updateShipmentHistory(request, id)
}
