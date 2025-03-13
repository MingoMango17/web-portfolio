// Main.jsx
import { Github, Linkedin, MapPin } from "lucide-react";
import React from "react";
import Nav from "./Nav";

const Main = () => {
  return (
    <div className="bg-[#030712]">
      <Nav />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div className="flex flex-col gap-8 md:w-1/2">
            <div className="flex flex-col gap-5">
              <h1 className="font-bold text-5xl">Hi, I'm Junry</h1>
              <p className="text-gray-300">
                I'm a Full Stack Web Developer (Django & Vue) and a graduating
                student in University of the Philippines Cebu. I thrive at the
                intersection of creative problem-solving and technical
                implementation. While having a full time job, I also use my
                spare time on coding or developing projects that implements
                Artificial Intelligence and Machine Learning.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-2">
                <MapPin size={18} />
                <p>Cebu City, Cebu</p>
              </span>

              <div className="flex gap-4 mt-2">
                <a href="https://github.com/MingoMango17">
                  <Github className="cursor-pointer hover:text-gray-400 transition-colors" />
                </a>
                <a href="https://www.linkedin.com/feed/">
                  <Linkedin className="cursor-pointer hover:text-gray-400 transition-colors" />
                </a>
              </div>
            </div>
          </div>

          <div className="relative h-80 w-64 self-center md:self-auto">
            <div className="w-64 h-80 bg-gray-700 absolute right-4 bottom-4 translate-x-8 translate-y-8 rounded-md"></div>
            <img
              src="/unnamed.jpg"
              className="w-64 h-80 object-cover relative z-10 rounded-md"
              alt="Profile picture"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
