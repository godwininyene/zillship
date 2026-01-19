'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import company_slide_1 from '@/assets/images/company-slide-1.jpg';
import company_slide_2 from '@/assets/images/company-slide-2.jpg';
import company_slide_3 from '@/assets/images/company-slide-3.jpg';

const CompanyProfileSection = () => {
  const slides = [company_slide_1, company_slide_2, company_slide_3];
  const [current, setCurrent] = useState(0);

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000); // every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Company Description */}
          <div className="space-y-6" data-aos="fade-up">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Company Profile
              </h2>
              <h3 className="text-xl font-semibold text-primary-600 mb-6">
                Zill ship is a privately owned, premier international freight forwarder,
                delivery and logistics service provider.
              </h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Zill ship has extensive experience handling and delivering sensitive domestic
                  and industrial products including consumer technology products like networking equipment,
                  desktop and mobile computers, servers, cell phones and more.
                </p>
                <p>
                  Zill ship delivers real-time, actionable information reliably and
                  ensures optimal efficiency and on-time activities by utilizing advanced,
                  custom software systems. Fully EDI capable, Zill ship's systems interface with your
                  trading partners to provide unprecedented product visibility throughout the supply chain.
                </p>
                <p>
                  Our global regional hubs offer a wide range of mission-critical technology,
                  logistic, IT and security services to clients and its partners overseas.
                  Through our overseas secure services to more than 250 diplomatic offices,
                  across 160 countries, we support around 14,000 staff globally, as well as
                  many more from other government departments co-located at posts under the One HMG ethos.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link 
                  href='/contact' 
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium inline-flex items-center justify-center"
                >
                  Get In Touch <FaArrowRight className="ml-2" />
                </Link>
                <Link 
                  href='/service' 
                  className="border border-primary-600 text-primary-600 px-6 py-3 rounded-lg hover:bg-primary-50 transition-colors font-medium inline-flex items-center justify-center"
                >
                  Our Services
                </Link>
              </div>
            </div>
          </div>

          {/* Slider */}
          <div className="relative" data-aos="fade-left">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === current ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <Image
                    src={slide}
                    alt={`Company slide ${index + 1}`}
                    className="w-full h-96 object-cover rounded-2xl"
                    priority
                  />
                </div>
              ))}

              {/* Optional navigation dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      idx === current ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CompanyProfileSection;
