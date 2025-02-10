import React from "react";
import { Loader } from "lucide-react";

// Loading component

const Loading = () => {
  return (
    <main className="min-h-screen w-screen flex justify-center items-center">
      <Loader
        key={"loader"}
        className="size-10 font-bold animate-spin transition-all text-emerald-400 duration-100"
      />
    </main>
  );
};

export default Loading;
