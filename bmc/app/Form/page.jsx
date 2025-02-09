import React from "react";

export default function Page() {
  return (
    <div className="p-8">
      <h1 className="heading-step text-3xl font-bold">Welcome to Joyride</h1>
      <h2 className="subheading-step text-2xl mt-4">Your guided tour starts here!</h2>
      <p className="paragraph-step mt-2 text-gray-600">
        This is a paragraph that explains something important about the page.
      </p>
      <button className="button-step mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
        Get Started
      </button>

    </div>
  );
}
