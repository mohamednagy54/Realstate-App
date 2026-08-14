

"use client";

import { motion } from "framer-motion";
import { Building2, Home, Key, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 pt-24 pb-16 px-4 sm:px-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          About <span className="text-[#e04141]">Real Key</span>
        </h1>
        <p className="text-gray-600 leading-relaxed">
          At <span className="font-semibold text-[#e04141]">Real Key</span>, we
          believe that finding your dream home should be a joyful and easy
          experience. Our mission is to connect people with the perfect
          properties that match their lifestyle, goals, and vision.
        </p>
      </motion.div>

      {/* Our Story Section */}
      <motion.section
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto mb-20 grid md:grid-cols-2 gap-12 items-center"
      >
        <img
          src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"
          alt="Our Story"
          className="rounded-2xl shadow-md w-full object-cover"
        />

        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Our Story
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Real Key was founded with one simple idea — to make real estate
            transparent, reliable, and accessible for everyone. Whether you’re
            buying, selling, or renting, we strive to provide a seamless
            experience powered by trust and technology.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our dedicated team of real estate professionals and designers work
            every day to ensure that our clients have access to accurate data,
            personalized insights, and expert advice.
          </p>
        </div>
      </motion.section>

      {/* Core Values */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white py-16 rounded-2xl shadow-sm max-w-6xl mx-auto text-center mb-20"
      >
        <h2 className="text-3xl font-bold mb-10 text-gray-900">
          Our Core Values
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
          {[
            {
              icon: <Home className="w-10 h-10 text-[#e04141]" />,
              title: "Trust",
              desc: "We build long-term relationships based on honesty and transparency.",
            },
            {
              icon: <Users className="w-10 h-10 text-[#e04141]" />,
              title: "Community",
              desc: "We care deeply about helping people and communities thrive together.",
            },
            {
              icon: <Building2 className="w-10 h-10 text-[#e04141]" />,
              title: "Innovation",
              desc: "We use technology to simplify property buying, selling, and renting.",
            },
            {
              icon: <Key className="w-10 h-10 text-[#e04141]" />,
              title: "Excellence",
              desc: "We’re committed to providing the best possible real estate experience.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Our Mission */}
      <motion.section
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center"
      >
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Our mission is to make property ownership and investment simple and
            stress-free. With Real Key, your journey to finding the perfect
            property is supported by data-driven insights, experienced agents,
            and an intuitive platform.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We aim to redefine how people connect with real estate — putting
            trust, clarity, and ease at the heart of every interaction.
          </p>
        </div>

        <img
          src="https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg"
          alt="Our Mission"
          className="rounded-2xl shadow-md w-full object-cover"
        />
      </motion.section>
    </main>
  );
}
