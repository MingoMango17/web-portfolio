import React from "react";
import Image from "next/image";

const Skills = () => {
  const technologies = [
    { name: "JavaScript", icon: "/icons8-javascript-48.png" },
    { name: "Django", icon: "/django.png" },
    { name: "React", icon: "/react.png" },
    { name: "Vue", icon: "/vue.png" },
    { name: "Firebase", icon: "/firebase.png" },
    { name: "PostgreSQL", icon: "/postgres.png" },
    { name: "MongoDB", icon: "/mongo.png" },
    { name: "Python", icon: "/python.png" },
    { name: "Tailwindcss", icon: "/tailwind.png" },
    { name: "Git", icon: "/git.png" },
  ];

  return (
    <div id="skills" className="bg-[#030712] text-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <div className="bg-[#1F2937] text-white rounded-lg px-4 py-2 text-center mb-6">
            Skills
          </div>
          <h2 className="text-2xl text-center">
            The skills, tools and technologies I am really good at:
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {technologies.map((tech) => (
            <div key={tech.name} className="flex flex-col items-center">
              <div className="w-16 h-16 mb-3 flex items-center justify-center">
                <Image
                  src={tech.icon}
                  alt={tech.name}
                  width={64}
                  height={64}
                />
              </div>
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;