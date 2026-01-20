'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSearch } from "react-icons/fa"

const TrackAndTraceSection = () => {
    const router = useRouter();
    const [trackingNumber, setTrackingNumber] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!trackingNumber.trim()) return;

        router.push(`/trackingResult?tracking=${trackingNumber.trim()}`);
    };
    return (
        <section className="relative -mt-16 z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Track & Trace Your Shipment
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Enter your tracking number to get real-time updates on your package
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                                <input
                                    value={trackingNumber}
                                    onChange={(e) => setTrackingNumber(e.target.value)}
                                    placeholder="Enter your tracking number"
                                    className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                />
                            </div>
                            <button className="bg-primary-600 flex cursor-pointer items-center text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl whitespace-nowrap">
                                <FaSearch className="mr-2" />
                                Track shipment

                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </section>
    )
}

export default TrackAndTraceSection