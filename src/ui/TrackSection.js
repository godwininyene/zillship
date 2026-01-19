'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image"
import { FaBarcode } from "react-icons/fa"
import tracking from '@/assets/images/tracking.jpg'

const TrackSection = () => {
  const router = useRouter();
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!trackingNumber.trim()) return;

    router.push(`/trackingResult?tracking=${trackingNumber.trim()}`);
  };

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Tracking form */}
          <div
            className="lg:col-span-5 order-2 lg:order-1"
            data-aos="fade-right"
          >
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">

              <div
                className="text-center lg:text-left mb-8"
                data-aos="fade-up"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Track Your Shipment
                </h2>
                <p className="text-gray-600">
                  Here's the fastest way to check the status of your shipment.
                  No need to call Customer Service – our online results give you real-time,
                  detailed progress as your shipment speeds through
                  the <strong className="text-primary-600"> Zill ship</strong> network.
                </p>
              </div>

              <form
                className="space-y-6"
                data-aos="fade-up"
                data-aos-delay="150"
                onSubmit={handleSubmit}
              >
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tracking Number
                  </label>

                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaBarcode className="text-gray-400" />
                    </div>


                    <input
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      placeholder="Enter your tracking number"
                      className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-gray-900"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-6 cursor-pointer flex justify-center items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                    data-aos="zoom-in"
                    data-aos-delay="300"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    Track Shipment
                  </button>
                </div>
              </form>

              {/* Tracking Tips */}
              <div
                className="mt-8 pt-6 border-t border-gray-200"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Tracking Tips
                </h3>

                <ul className="space-y-2 text-sm text-gray-600">
                  {[
                    "Your tracking number can be found on your shipping confirmation email",
                    "Tracking numbers typically contain 10-15 characters",
                    "Updates are available 24/7 and reflect real-time status"
                  ].map((tip, i) => (
                    <li
                      key={i}
                      className="flex items-start"
                      data-aos="fade-up"
                      data-aos-delay={500 + i * 100}
                    >
                      <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd" />
                      </svg>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          {/* Illustration */}
          <div
            className="lg:col-span-7 order-1 lg:order-2 flex justify-center lg:justify-end"
            data-aos="fade-left"
          >
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary-100 rounded-full opacity-70"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-50 rounded-full opacity-70"></div>

              <Image
                src={tracking}
                alt='Package Tracking'
                className="relative z-10 rounded-xl shadow-lg max-w-full lg:max-w-lg xl:max-w-xl"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default TrackSection
