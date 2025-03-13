import React from "react";

const About = () => {
  return (
    <div className="bg-[#111827] py-16">
      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center">
        <div className="mb-6">
          <div className="bg-[#374151] text-white rounded-lg px-4 py-2 text-center">
            About me
          </div>
        </div>

        <p className="text-white text-justify text-center max-w-200">
          As a passionate Full Stack Developer currently pursuing my Bachelor's
          in Computer Science at the University of the Philippines Cebu, I
          combine academic knowledge with hands-on industry experience to build
          efficient, user-centered applications.
        </p>
        <br />
        <p className="text-white text-justify text-center max-w-200">
          My development journey began as an intern at HQZen/BPOseats, where I
          built a full-stack kanban board application using Vue.js and Django.
          This experience laid the foundation for my understanding of the entire
          development lifecycle and collaborative workflows using Git.
        </p>
        <br />
        <p className="text-white text-justify text-center max-w-200">
          My interests in video games, emerging technologies, and automotive
          engineering inspire my approach to development—I believe in creating
          solutions that are not just functional, but engaging and
          forward-thinking. I'm constantly learning and expanding my skillset,
          always ready to tackle the next challenge with enthusiasm and
          dedication.
        </p>
      </div>
    </div>
  );
};

export default About;
