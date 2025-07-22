import React from "react";
import TailwindJS from "./tailwindjs";

export default function Navbar () {
  return (
    <>
      <TailwindJS />
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/" className="text-white text-lg font-semibold">ProJuven</a>
          <div>
            <a href="/login" className="text-white px-4">Login</a>
            <a href="/register" className="text-white px-4">Register</a>
          </div>
        </div>
      </nav>
    </>
  );
};

