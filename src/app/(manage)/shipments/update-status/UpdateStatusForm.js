'use client'
import InputField from "@/ui/InputField"
import SelectField from "@/ui/SelectField"
import { useState } from "react";
import {
    FaTruck,
    FaShippingFast,
    FaCheckCircle,
    FaClock,
    FaExclamationTriangle,
} from "react-icons/fa";



const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
        case 'delivered': return <FaCheckCircle className="h-4 w-4" />
        case 'in transit':
        case 'on the way': return <FaTruck className="h-4 w-4" />
        case 'picked by courier': return <FaShippingFast className="h-4 w-4" />
        case 'custom hold': return <FaExclamationTriangle className="h-4 w-4" />
        case 'order confirmed': return <FaClock className="h-4 w-4" />
        default: return <FaBox className="h-4 w-4" />
    }
}

const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    try {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    } catch {
        return 'Invalid Date'
    }
}

// Status options for the form
const statusOptions = [
    { label: 'Order Confirmed', value: 'Order Confirmed' },
    { label: 'Picked by Courier', value: 'Picked by Courier' },
    { label: 'On The Way', value: 'On The Way' },
    { label: 'Custom Hold', value: 'Custom Hold' },
    { label: 'Delivered', value: 'Delivered' }
]


const UpdateStatusForm = ({ shipment }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({})
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        setSuccess(false);

        try {
            const formData = new FormData(e.currentTarget);
            const dataTosend = Object.fromEntries(formData);

            const res = await fetch(`/api/shipments/history/${shipment._id}`, {
                method: "PATCH",
                body: JSON.stringify(dataTosend),
            });
            const data = await res.json();
            if (!res.ok) {
                setErrors(data.errors || { message: data.message });
                if (data?.errors) {
                    setErrors(data.errors)
                }
                alert(data?.message || 'Could not create shipment. Please try again!')
            }
            setSuccess(true);
            e.target.reset();

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Current Status */}
            <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Current Status </p>
                <div className="flex items-center">
                    {getStatusIcon(shipment.status)}
                    <span className="ml-2 font-medium">{shipment.status}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Last updated: {formatDate(shipment.updatedAt)}</p>
            </div>


            {/* New Status */}
            <SelectField
                label="Shipment Status"
                name="status"
                options={[
                    { value: "", label: "Select shipment status" },
                    ...statusOptions.map(status => ({
                        value: status.value,
                        label: status.label
                    }))
                ]}

                error={errors.status}
            />
            {/* Current Location */}
            <InputField
                label="Current Location"
                placeholder="e.g., Sorting Facility, London"
                name="location"
                error={errors.location}
            />


            {/* Remarks/Comment */}
            <InputField
                label="Remarks / Comment"
                name="remark"
                as="textarea"
                placeholder='Add any additional notes or comments about the status update...'
                error={errors.remark}
            />

            {/* Form Actions */}
            <div className="space-y-3">


                <button
                    disabled={loading}
                    className="w-full bg-primary-600 cursor-pointer hover:bg-primary-700 disabled:opacity-50 text-white px-8 py-3 rounded-lg"
                >
                    {loading ? "Updating status..." : " Update Status"}
                </button>

                {success && (
                    <p className="text-green-600 mt-3 text-sm">
                        Shipment status updated successfully ✅
                    </p>
                )}

            </div>
        </form>
    )
}

export default UpdateStatusForm