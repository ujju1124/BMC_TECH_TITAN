import React from "react";

const AboutSection = () => {
  return (
    <section className="relative z-10 mt-[90px] px-6 w-full text-center">
      <h2 className="text-3xl font-bold mb-4 pt-2 text-white lg:text-black">
        About Our Solution
      </h2>
      <p className="text-lg mb-6 max-w-3xl mx-auto text-white lg:text-black">
        We use real-time data, user-driven reporting, and smart technology to improve urban transport. Our platform helps commuters find the best routes, report issues like overcrowding and pollution, and make public transport safer and more efficient.
      </p>
    </section>
  );
};

export default AboutSection;
