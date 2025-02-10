"use client";
import React from "react";
import { StickyScroll } from "../../components/ui/sticky-scroll-reveal";
import Image from "next/image";
import One from "@/public/TrafficImage/_0dc41859-2d15-4f9b-93b4-d2ec42615a6d.jpeg";
import Two from "@/public/TrafficImage/_3fe98b7e-e1ce-49be-9140-12d48f084e40.jpeg";
import Three from "@/public/TrafficImage/_68f373f6-282a-490d-8bea-d121085324e8.jpeg";
import Four from "@/public/TrafficImage/_ccd55106-13df-412f-a7ef-1b5e54589451.jpeg";
import Five from "@/public/TrafficImage/_f709387b-767e-4abb-98db-7923c3d59e38.jpeg";
import Six from "@/public/TrafficImage/safetyAndAccessibility.svg";

const content = [
  {
    title: "Smart Route Navigation",
    description:
      "Find the best route to your destination with ease. Our platform helps commuters, tourists, and new residents navigate public transportation effortlessly, ensuring faster and more efficient travel throughout the city.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white relative">
        <Image
          src={One}
          width={300}
          height={300}
          className="h-full w-full object-cover absolute inset-0"
          alt="Smart route navigation"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
{/*           <span className="text-2xl font-bold">Smart Route Navigation</span>
 */}        </div>
      </div>
    ),
  },
  {
    title: "Traffic Violation Reporting",
    description:
      "Report traffic rule violations quickly and easily. Our system ensures accuracy by collecting essential details such as vehicle number, location, and time, enabling authorities to take timely action against reckless driving and illegal parking.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white relative">
        <Image
          src={Two}
          width={300}
          height={300}
          className="h-full w-full object-cover absolute inset-0"
          alt="Traffic violation reporting"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
{/*           <span className="text-2xl font-bold">Traffic Violation Reporting</span>
 */}        </div>
      </div>
    ),
  },
  {
    title: "Overcrowding and Passenger Comfort",
    description:
      "Complain about overcrowded buses or unsafe passenger conditions. Our platform allows commuters to report overloads, helping transport authorities manage fleet resources more efficiently, ensuring a safer and more comfortable commute.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white relative">
        <Image
          src={Three}
          width={300}
          height={300}
          className="h-full w-full object-cover absolute inset-0"
          alt="Overcrowding and passenger comfort"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
{/*           <span className="text-2xl font-bold">Overcrowding and Passenger Comfort</span>
 */}        </div>
      </div>
    ),
  },
  {
    title: "Pollution Reporting",
    description:
      "Submit evidence of vehicles emitting excessive pollution. Using our system, users can capture videos or photos of polluting vehicles and report them with essential data like vehicle number, time, and location, ensuring effective action against environmental violations.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white relative">
        <Image
          src={Four}
          width={300}
          height={300}
          className="h-full w-full object-cover absolute inset-0"
          alt="Pollution reporting"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
{/*           <span className="text-2xl font-bold">Pollution Reporting</span>
 */}        </div>
      </div>
    ),
  },
  {
    title: "Carpooling for a Greener Commute",
    description:
      "Join our carpooling system to reduce traffic congestion and carbon footprint. Our platform connects people traveling in the same direction, promoting eco-friendly shared rides and providing safer, verified options for women and children.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white relative">
        <Image
          src={Five}
          width={300}
          height={300}
          className="h-full w-full object-cover absolute inset-0"
          alt="Carpooling for greener commute"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
{/*           <span className="text-2xl font-bold">Carpooling for a Greener Commute</span>
 */}        </div>
      </div>
    ),
  },
  {
    title: "Safety and Accessibility for All",
    description:
      "Ensure safer travel for vulnerable groups like women and children by offering verified transport options. Our platform also helps people from outside the city navigate the local transport system with ease, making urban travel accessible to everyone.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white relative">
        <Image
          src={Six}
          width={300}
          height={300}
          className="h-full w-full object-cover absolute inset-0"
          alt="Safety and accessibility"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
{/*           <span className="text-2xl font-bold">Safety and Accessibility for All</span>
 */}        </div>
      </div>
    ),
  },
];

export default function StickyScrollRevealDemo() {
  return (
    <div className="p-10">
      <StickyScroll content={content} />
    </div>
  );
}