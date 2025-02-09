"use client";
import React from "react";
import Image from "next/image";
import Background from "@/public/background.jpg";
import UserLayout from "@/components/layouts/UsersLayout";

export default function Home() {
  return (
    <UserLayout>
      <main className="relative min-h-screen flex-col flex-grow flex items-center justify-center pt-8">
        {/* Background Image */}
        <Image
          src={Background}
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="absolute inset-0 -z-10 max-h-[100vh] lg:max-h-[70vh]"
        />

        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-black/55 max-h-[100vh] md:max-h-[100vh] lg:max-h-[70vh] -z-10 font-Poppins"></div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-6 pt-28">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Innovative Solutions for Modern Problems
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Transforming ideas into reality with cutting-edge technology.
          </p>
        </div>
        <section className="relative z-10 pt-12 mt-[90px] px-6 w-full text-center">
          <h2 className="text-3xl font-bold mb-4 pt-24 lg:text-black text-white">
            About Us
          </h2>
          <p className="text-lg mb-6 max-w-3xl mx-auto lg:text-black text-white">
            Path Finder is an intuitive platform that helps users locate public
            transport routes in real time. Our goal is to make city commuting
            efficient by providing accurate and up-to-date bus route
            information.
          </p>
        </section>
      </main>
    </UserLayout>
  );
}
