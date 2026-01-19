import { 
  FaBox, FaCalendarCheck, FaGlobe, FaRoute, 
  FaSearchLocation, FaShieldAlt, FaShippingFast, 
  FaSmile, FaStar, FaTrophy 
} from "react-icons/fa";
import React from "react";

const SectionAchievement = () => {
  return (
    <section className="py-20 bg-linear-to-br from-primary-600 to-primary-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div 
          className="text-center mb-10" 
          data-aos="fade-up"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Impact & Achievements
          </h2>
          <p className="text-xl text-primary-200 max-w-2xl mx-auto">
            Delivering excellence across the globe with industry-leading standards
          </p>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {[
            { icon: <FaBox />, number: "101,273+", label: "Delivered Packages", delay: 200 },
            { icon: <FaRoute />, number: "673,754+", label: "KM Per Year", delay: 400 },
            { icon: <FaSmile />, number: "16,714+", label: "Happy Clients", delay: 600 },
            { icon: <FaGlobe />, number: "160+", label: "Countries Served", delay: 800 },
          ].map((stat, i) => (
            <div 
              key={i} 
              className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/15 transition-all duration-300" 
              data-aos="fade-up"
              data-aos-delay={stat.delay}
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                {React.cloneElement(stat.icon, { className: "text-white text-2xl" })}
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-2">
                {stat.number}
              </div>
              <div className="text-primary-200 text-sm md:text-base font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Professional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { icon: <FaShippingFast />, title: "Delivery Performance", stat: "99.8%", desc: "On-Time Delivery", delay: 200 },
            { icon: <FaSearchLocation />, title: "Tracking Precision", stat: "Real-time", desc: "GPS Accuracy", delay: 400 },
            { icon: <FaStar />, title: "Client Satisfaction", stat: "4.9/5", desc: "Average Rating", delay: 600 },
          ].map((item, i) => (
            <div 
              key={i} 
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-all duration-300" 
              data-aos="fade-up"
              data-aos-delay={item.delay}
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-4">
                  {React.cloneElement(item.icon, { className: "text-white" })}
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
              </div>
              <div className="flex items-center mb-2">
                <div className="text-3xl font-bold mr-2">{item.stat}</div>
                <div>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Industry Recognition */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <FaCalendarCheck />, stat: "11+ Years", label: "Industry Experience", delay: 200 },
            { icon: <FaShieldAlt />, stat: "ISO 27001", label: "Security Certification", delay: 400 },
            { icon: <FaTrophy />, stat: "8+ Awards", label: "Industry Recognition", delay: 600 },
          ].map((item, i) => (
            <div 
              key={i} 
              className="flex items-center bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/15 transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={item.delay}
            >
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mr-4 shrink-0">
                {React.cloneElement(item.icon, { className: "text-white text-xl" })}
              </div>
              <div>
                <div className="text-2xl font-bold">{item.stat}</div>
                <div className="text-primary-200 text-sm">{item.label}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SectionAchievement;
