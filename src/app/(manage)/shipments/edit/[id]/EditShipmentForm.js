"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import InputField from "@/ui/InputField"
import SelectField from "@/ui/SelectField"

const paymentMethods = [
    { label: 'To pay (Receiver Pays)', value: 'Receiver Pays' },
    { label: 'Prepaid', value: 'Sender Pays' },
    { label: 'Third Party', value: 'Third Party' }
]


const statuses = [
    { label: 'Order Confirmed', value: 'Order Confirmed' },
    { label: 'Picked by Courier', value: 'Picked by Courier' },
    { label: 'On The Way', value: 'On The Way' },
    { label: 'Custom Hold', value: 'Custom Hold' },
    { label: 'Delivered', value: 'Delivered' }
]

const EditShipmentForm = ({ shipment }) => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        setSuccess(false);

        try {
            const formData = new FormData(e.currentTarget);


            const res = await fetch(`/api/shipments/${shipment._id}`, {
                method: "PATCH",
                body: formData,
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
            //e.target.reset();
            setTimeout(() => {
                router.push("/shipments");
            }, 1500);


        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white  overflow-hidden shadow-sm rounded-2xl">
            <div className="p-6 text-gray-900">
                <div className='text-sm font-semibold'>Shipment Details</div>
                <hr className='border-gray-300 mb-5' />
                <form onSubmit={handleSubmit}>
                    {/* Sender information*/}
                    <div className="mb-4">
                        <h3 className='font-black uppercase mb-4 text-gold'>Sender Information:</h3>

                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-5 mt-5'>
                            <InputField
                                label="Sender Name"
                                placeholder="Enter sender name"
                                name="sender_name"
                                error={errors.sender_name}
                                value={shipment.sender_name}
                                classNames="mb-5 lg:mb-0"
                            />
                            <InputField
                                label="Sender Email"
                                placeholder="Enter sender email"
                                name="sender_email"
                                type="email"
                                error={errors.sender_email}
                                value={shipment.sender_email}
                            />
                        </div>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-5 mt-5'>
                            <InputField
                                label="Origin Location"
                                placeholder="Enter sender origin"
                                name="sender_origin"
                                error={errors.sender_origin}
                                value={shipment.sender_origin}
                                classNames="mb-5 lg:mb-0"
                            />

                            <InputField
                                label="Sender Phone"
                                placeholder="Enter sender phone number"
                                name="sender_phone"
                                type="tel"
                                error={errors.sender_phone}
                                value={shipment.sender_phone}
                            />

                        </div>

                        <div className="mt-5">
                            <InputField
                                label="Sender Address"
                                name="sender_address"
                                as="textarea"
                                placeholder='Enter sender address'
                                error={errors.sender_address}
                                value={shipment.sender_address}

                            />
                        </div>
                    </div>

                    {/* Receiver information*/}
                    <div className="mb-4">
                        <h3 className='font-black uppercase mb-4 text-gold'>Receiver Information:</h3>

                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-5 mt-5'>

                            <InputField
                                label="Receiver Name"
                                placeholder="Enter receiver name"
                                name="receiver_name"
                                error={errors.receiver_name}
                                value={shipment.receiver_name}
                                classNames="mb-5 lg:mb-0"

                            />
                            <InputField
                                label="Receiver Email"
                                placeholder="Enter receiver email"
                                name="receiver_email"
                                type='email'
                                error={errors.receiver_email}
                                value={shipment.receiver_email}
                            />
                        </div>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-5 mt-5'>
                            <InputField
                                label="Destination Location"
                                placeholder="Enter receiver destination"
                                name="receiver_destination"
                                error={errors.receiver_destination}
                                value={shipment.receiver_destination}
                                classNames="mb-5 lg:mb-0"
                            />

                            <InputField
                                label="Receiver Phone"
                                placeholder="Enter receiver phone number"
                                name="receiver_phone"
                                type='tel'
                                error={errors.receiver_phone}
                                value={shipment.receiver_phone}
                            />

                        </div>

                        <div className="mt-5">
                            <InputField
                                label="Receiver Address"
                                name="receiver_address"
                                as="textarea"
                                placeholder='Enter receiver address'
                                error={errors.receiver_address}
                                value={shipment.receiver_address}

                            />
                        </div>
                    </div>

                    {/* Shipment information*/}
                    <div className="mb-4">
                        <h3 className='font-black uppercase mb-4 text-gold'>Shipment Information:</h3>

                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-5 mt-5'>

                            <InputField
                                label="Quantity"
                                placeholder="Enter item quantity"
                                name="quantity"
                                error={errors.quantity}
                                value={shipment.quantity}
                                classNames="mb-5 lg:mb-0"
                            />
                            <InputField
                                label="Weight"
                                placeholder="Enter item weight"
                                name="weight"
                                error={errors.weight}
                                value={shipment.weight}
                                isRequired={false}
                            />
                        </div>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-5 mt-5'>
                        
                            <InputField
                                label="Dimensions (LxWxH)"
                                placeholder="e.g 30x20x15 cm"
                                name="dimension"
                                error={errors.dimension}
                                value={shipment.dimension}
                                isRequired={false}
                                classNames="mb-5 lg:mb-0"
                            />

                            <InputField
                                label="Item Photo (Optional)"
                                name="photo"
                                type='file'
                                error={errors.photo}
                                isRequired={false}
                            />
                        </div>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-5 mt-5'>
                            <SelectField
                                label="Payment Method"
                                name="payment_method"
                                defaultValue={shipment.payment_method}
                                options={[
                                    { value: "", label: "Select payment method" },
                                    ...paymentMethods.map(method => ({
                                        value: method.value,
                                        label: method.label
                                    }))
                                ]}

                                error={errors.payment_method}
                                isRequired={false}
                                classNames="mb-5"
                            />
                            <div className="col-span-2">
                                <InputField
                                    label="Package Description"
                                    name="description"
                                    as="textarea"
                                    placeholder='Enter details package description'
                                    error={errors.description}
                                    value={shipment.description}
                                    isRequired={false}
                                />
                            </div>
                        </div>
                    </div>



                    {/* Cost information*/}
                    <div className="mb-4">
                        <h3 className='font-black uppercase mb-4 text-red-500'>Cost Information:</h3>

                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-7'>

                            <InputField
                                label="Shipping Cost (USD)"
                                placeholder="Enter shipping cost"
                                name="shipping_cost"
                                error={errors.shipping_cost}
                                value={shipment.shipping_cost}
                            />
                            <InputField
                                label="Clearance cost (USD)"
                                placeholder="Enter clearance cost"
                                name="clearance_cost"
                                error={errors.clearance_cost}
                                value={shipment.clearance_cost}
                            />

                            <InputField
                                label="Total Cost"
                                placeholder="e.g $100"
                                name="total_cost"
                                disabled
                                error={errors.total_cost}
                                value={shipment.total_cost}
                                isRequired={false}
                            />

                            <InputField
                                label="Date Shipped"
                                name="shipped_date"
                                type='date'
                                error={errors.shipped_date}
                                value={shipment.shipped_date}
                                isRequired={false}
                            />

                            <InputField
                                label="Expected Delivery Date"
                                name="expected_date"
                                type='date'
                                error={errors.expected_date}
                                value={shipment.expected_date}
                                isRequired={false}
                            />
                            <InputField
                                label="Pickup Date"
                                name="pickup_date"
                                type='date'
                                error={errors.pickup_date}
                                value={shipment.pickup_date}
                                isRequired={false}
                            />

                            {/* <div className="col-span-2">

                                <SelectField
                                    label="Shipment Status"
                                    name="status"
                                    defaultValue={shipment.status}
                                    options={[
                                        { value: "", label: "Select shipment status" },
                                        ...statuses.map(status => ({
                                            value: status.value,
                                            label: status.label
                                        }))
                                    ]}

                                    error={errors.status}
                                    isRequired={false}
                                />

                            </div> */}
                        </div>
                    </div>


                    <div className="mt-10 mb-8">
                        <button
                            disabled={loading}
                            className="bg-primary-600 cursor-pointer hover:bg-primary-700 disabled:opacity-50 text-white px-8 py-3 rounded-lg"
                        >
                            {loading ? "Updating..." : "Update Shipment"}
                        </button>

                        {success && (
                            <p className="text-green-600 mt-3 text-sm">
                                Shipment Updated successfully ✅
                            </p>
                        )}
                    </div>

                </form>

            </div>
        </div>


    )
}

export default EditShipmentForm