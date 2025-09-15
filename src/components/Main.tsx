// Main.jsx
import { Github, Linkedin, MapPin } from "lucide-react";
import React from "react";
import Nav from "./Nav";
import Image from "next/image";

const Main = () => {
  return (
    <div className="bg-[#030712]">
      <Nav />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div className="flex flex-col gap-8 md:w-1/2">
            <div className="flex flex-col gap-5">
              <h1 className="font-bold text-5xl">Hi, I&apos;m Junry</h1>
              <p className="text-gray-300">
                I&apos;m a Full Stack Web Developer (Django & Vue) and a
                graduating student in University of the Philippines Cebu. I
                thrive at the intersection of creative problem-solving and
                technical implementation. While having a full time job, I also
                use my spare time on coding or developing projects that
                implements Artificial Intelligence and Machine Learning.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-2">
                <MapPin size={18} />
                <a href="https://www.google.com/maps/place/Cebu+City,+6000+Cebu/@10.3787539,123.7638937,36124m/data=!3m2!1e3!4b1!4m6!3m5!1s0x33a999258dcd2dfd:0x4c34030cdbd33507!8m2!3d10.3156992!4d123.8854366!16zL20vMDFwX2x5?entry=ttu&g_ep=EgoyMDI1MDMxMS4wIKXMDSoASAFQAw%3D%3D">
                  <p>Cebu City, Cebu, Philippines</p>
                </a>
              </span>

              <div className="flex gap-4 mt-2">
                <a href="https://github.com/MingoMango17">
                  <Github className="cursor-pointer hover:text-gray-400 transition-colors" />
                </a>
                <a href="https://www.linkedin.com/in/junry-mingo-2bb819246/">
                  <Linkedin className="cursor-pointer hover:text-gray-400 transition-colors" />
                </a>
              </div>
            </div>
          </div>

          <div className="relative h-80 w-64 self-center md:self-auto">
            <div className="w-64 h-80 bg-gray-700 absolute right-4 bottom-4 translate-x-8 translate-y-8 rounded-md"></div>
            <div className="w-64 h-80 object-cover relative z-10 rounded-md">
              <Image
                className="w-64 h-80 object-cover relative z-10 rounded-md"
                src="/MINGO_JUNRY.jpg"
                alt="Profile picture"
                height={128}
                width={160}
                quality={100}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
