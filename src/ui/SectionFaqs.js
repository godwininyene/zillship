'use client'
import { useState } from "react"
import { FaArrowDown } from "react-icons/fa"

const faqs = [
  { question: 'What information do I need to track my package?', ans: 'You only need your tracking number to track your shipment. The tracking number is a unique identifier provided to you when you ship a package with us. You can find this number on your shipping receipt, confirmation email, or the shipping label.' },
  { question: 'How often is my tracking information updated?', ans: 'Our tracking system provides real-time updates whenever your package is scanned at various checkpoints throughout its journey. Typically, you\'ll see updates when your package is picked up, arrives at sorting facilities, departs for delivery, and when it\'s delivered.' },
  { question: 'What should I do if my tracking isn\'t working?', ans: 'If your tracking information isn\'t appearing, first verify that you\'ve entered the correct tracking number. There might be a delay between when your package is shipped and when tracking becomes active. If you\'ve recently shipped your package, please allow 24 hours for the tracking information to appear in our system. If problems persist, please contact our customer service team for assistance.' },
  { question: 'Can I track multiple packages at once?', ans: 'Currently, our online tracking system allows you to track one package at a time. If you need to track multiple shipments, you\'ll need to enter each tracking number separately. For business customers with high-volume shipping needs, please contact our business solutions team to discuss our bulk tracking options.' }
]

const SectionFaqs = () => {
  const [openIndex, setOpenIndex] = useState(null) // track which FAQ is open

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div
          className="text-center mb-16"
          data-aos="fade-up"
          data-aos-duration="900"
        >
          <span className='text-primary-600 font-semibold tracking-wider uppercase text-sm'>
            Help Center
          </span>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
            Frequently Asked Questions
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common tracking and shipping questions
          </p>
        </div>

        {/* FAQs List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={faq.question} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="cursor-pointer flex items-center justify-between w-full px-6 py-4 text-lg font-medium text-left text-gray-900 bg-white hover:bg-gray-50 transition-colors"
              >
                <span>{faq.question}</span>
                <FaArrowDown
                  className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96 py-4" : "max-h-0"
                }`}
              >
                <p className="text-gray-600">{faq.ans}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SectionFaqs
