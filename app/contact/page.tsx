"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent! ✅ (You can connect this to your backend)");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 pt-24 pb-16 px-4 sm:px-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Contact <span className="text-[#e04141]">Real Key</span>
        </h1>
        <p className="text-gray-600">
          Have questions or need help finding your dream home? Our team is here
          to assist you — reach out anytime.
        </p>
      </motion.div>

      {/* Contact Section */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        {/* Left Side - Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-md rounded-2xl p-8 space-y-6"
        >
          <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
          <div className="flex items-start gap-4">
            <MapPin className="w-6 h-6 text-[#e04141] mt-1" />
            <div>
              <h3 className="font-medium text-gray-800">Our Office</h3>
              <p className="text-gray-600">
                123 Real Key Street, New Cairo, Egypt
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Phone className="w-6 h-6 text-[#e04141] mt-1" />
            <div>
              <h3 className="font-medium text-gray-800">Call Us</h3>
              <p className="text-gray-600">+20 100 555 7894</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Mail className="w-6 h-6 text-[#e04141] mt-1" />
            <div>
              <h3 className="font-medium text-gray-800">Email</h3>
              <p className="text-gray-600">support@realkey.com</p>
            </div>
          </div>

          <div className="pt-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.010189706195!2d31.335221175622557!3d30.03787831903703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145840c77e463f09%3A0xa4c1c5ef7db6ef0b!2sNew%20Cairo!5e0!3m2!1sen!2seg!4v1700000000000!5m2!1sen!2seg"
              width="100%"
              height="220"
              allowFullScreen
              loading="lazy"
              className="rounded-lg border border-gray-200"
            ></iframe>
          </div>
        </motion.div>

        {/* Right Side - Form */}
        <motion.form
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-2xl p-8"
        >
          <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e04141] focus:outline-none"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e04141] focus:outline-none"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e04141] focus:outline-none resize-none"
                placeholder="Write your message..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#e04141] text-white font-medium py-2.5 rounded-lg hover:bg-[#ae2a2a] transition duration-300"
            >
              Send Message
            </button>
          </div>
        </motion.form>
      </div>
    </main>
  );
}
