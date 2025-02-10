"use client";
import React from "react";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Head from "next/head";

import { MapPin, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Background from "@/public/background.jpg";
import UserLayout from "@/components/layouts/UsersLayout";
import Link from 'next/link';
import About from "@/app/About/page"

export default function Home() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => [
      "Safer Travel",
      "Cleaner Cities",
      "Smarter Commutes",
      "Efficient Routes",
      "Sustainable Mobility",
    ],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev === titles.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <UserLayout>
       <Head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap');
          .bebas-neue {
            font-family: 'Bebas Neue', sans-serif;
          }
        `}</style>
      </Head>
      <main className="relative min-h-screen flex flex-col items-center justify-center pt-8">
        {/* Background Image */}
        <Image
          src={Background}
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="absolute inset-0 -z-10 max-h-[100vh] lg:max-h-[70vh]"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/55 max-h-[100vh] lg:max-h-[70vh] -z-10"></div>

        {/* Hero Section */}
        <div className="relative z-10 text-center text-white px-6 pt-28">
          <h1 className="bebas-neue text-4xl md:text-6xl font-bold mb-4">
            Smart Mobility for
            <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
              &nbsp;
              {titles.map((title, index) => (
                <motion.span
                  key={index}
                  className="absolute font-semibold"
                  initial={{ opacity: 0, y: "-100" }}
                  transition={{ type: "spring", stiffness: 50 }}
                  animate={
                    titleNumber === index
                      ? { y: 0, opacity: 1 }
                      : { y: titleNumber > index ? -150 : 150, opacity: 0 }
                  }
                >
                  {title}
                </motion.span>
              ))}
            </span>
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-3xl mx-auto">
            Enhancing urban transport by making it safer, cleaner, and more comfortable for everyone.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-row gap-3 relative z-10">
        <Link href="/locations" passHref>
    <Button size="lg" className="gap-4" variant="outline">
      Find Routes <MapPin className="w-4 h-4" />
    </Button>
  </Link>
  <Link href="/ComplainBox" passHref>
    <Button size="lg" className="gap-4">
      Report Issue <AlertCircle className="w-4 h-4" />
    </Button>
  </Link>
        </div>

        {/* About Section */}
        {/* <section className="relative z-10 pt-12 mt-[90px] px-6 w-full text-center">
          <h2 className="text-3xl font-bold mb-4 pt-24 text-white lg:text-black">
            About Our Solution
          </h2>
          <p className="text-lg mb-6 max-w-3xl mx-auto text-white lg:text-black">
            We use real-time data, user-driven reporting, and smart technology to improve urban transport. Our platform helps commuters find the best routes, report issues like overcrowding and pollution, and make public transport safer and more efficient.
          </p>
        </section> */}
        <About />

      </main>
    </UserLayout>
  );
}
