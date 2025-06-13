import React from "react";

const Template = ({ children }) => {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-200 flex items-center justify-center overflow-hidden p-4">
      <div className="absolute top-[-150px] left-[-100px] w-[300px] h-[300px] bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse z-0"></div>
      <div className="absolute bottom-[-150px] right-[-100px] w-[300px] h-[300px] bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-75 z-0"></div>

      <div className="relative z-10 w-screen flex justify-center items-center">
        {children}
      </div>
    </main>
  );
};

export default Template;
