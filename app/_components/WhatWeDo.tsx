
"use client"


import React from 'react'
import {
  Home,
  Key,
  Building2,
  TrendingUp,
  ShieldCheck,
  Users,
} from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Property Sales",
    description:
      "Find your dream home with Real Estate - our expert team will guide you through the process and ensure a smooth transaction.",
  },
  {
    icon: Key,
    title: "Property Rentals",
    description:
      "Find your dream rental property with Real Estate, offering a variety of options to suit your needs and preferences.",
  },
  {
    icon: Building2,
    title: "Property Management",
    description:
      "Trust Real Estate to handle the day-to-day management of your property, maximizing its value and minimizing your stress.",
  },
  {
    icon: TrendingUp,
    title: "Lucrative Investments",
    description:
      "Real Estate presents lucrative investment opportunities in the real estate market, providing high returns on investments.",
  },
];

export default function WhatWeDo() {
  return (
    <div className="bg-white shadow-lg rounded-3xl p-8">
      {/* Top */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-[#e04141]/10 p-3 rounded-full">
            <ShieldCheck className="w-8 h-8 text-[#e04141]" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          What We Do
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
          Simplifying the journey of buying, selling, and renting properties.
          Our expert team provides comprehensive real estate solutions tailored
          to your needs.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => {
          const IconComponent = service.icon;

          return (
            <div
              className="group p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-[#e04141]/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              key={index}
            >
              {/* icon */}
              <div className="mb-6">
                <div className="w-16 h-16 bg-[#e04141]/10 group-hover:bg-[#e04141]/20 rounded-xl flex items-center justify-center transition-colors duration-300">
                  <IconComponent className="w-8 h-8 text-[#e04141] group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>

              {/* content */}
              <h3 className="text-[#e04141] font-bold text-xl mb-3 group-hover:text-[#c73636] transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {service.description}
              </p>

              {/* Decorative element */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center text-[#e04141] text-sm font-medium group-hover:text-[#c73636] transition-colors duration-300">
                  <span>Learn More</span>
                  <svg
                    className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-12 pt-8 border-t border-gray-100">
        <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
          <Users className="w-5 h-5" />
          <span className="text-sm">Trusted by 1000+ satisfied clients</span>
        </div>
        <button className="bg-[#e04141] hover:bg-[#c73636] text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
          Get Started Today
        </button>
      </div>
    </div>
  );
}
