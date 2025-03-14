import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import React from "react";

const Projects = () => {
  const projectsData = [
    {
      id: 1,
      name: "Artefy",
      description:
        "Artefy is a dedicated platform for artists to showcase their work and connect with their audience. Built with Vue.js and Firebase, this portfolio application enables creative professionals to display their portfolios in a visually appealing interface while offering real-time communication features.",
      cta: "View here",
      link: "https://artefy-8085f.firebaseapp.com/",
      github: "https://github.com/MingoMango17/artFiverr",
      image: "/artefy.png",
      tags: [
        "User Interface",
        "User Centric Design",
        "User Experience",
        "Tailwindcss",
        "Vue",
        "Firebase",
        "Git",
      ],
    },
    {
      id: 2,
      name: "Payco",
      description:
        "PayCo is a comprehensive online payment system designed specifically for university tuition fees. Built for the UNO-R Portal, this application streamlines the financial transaction process between students and the university administration.",
      cta: "View here",
      link: "https://payco-uno-r.vercel.app/",
      github: "https://github.com/MingoMango17/Exam_Permit",
      image: "/payco.png",
      tags: [
        "Figma",
        "User Interface",
        "User Centric Design",
        "User Experience",
        "Tailwindcss",
        "React",
        "MongoDB",
        "Git",
      ],
    },
    {
      id: 3,
      name: "Kahayag",
      description: "A simple restaurant website prototype",
      cta: "View here",
      link: "",
      github: "https://github.com/MingoMango17/KahayagFE",
      image: "/kahayag.png",
      tags: [
        "Figma",
        "User Interface",
        "User Centric Design",
        "Tailwindcss",
        "React",
        "Git",
      ],
    },
  ];

  return (
    <div className="bg-[#111827] py-16">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center">
        <div className="mb-12">
          <div className="bg-[#374151] text-white rounded-lg px-4 py-2 text-center">
            Projects
          </div>
        </div>

        <div className="w-full space-y-12">
          {projectsData.map((project, index) => (
            <div
              key={project.id}
              className={`flex flex-col lg:flex-row gap-8 bg-[#1F2937] rounded-xl overflow-hidden ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="lg:w-1/2 p-6 flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {project.name}
                </h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="rounded-md w-fit mb-6 flex gap-2">
                  {project.github && (
                    <a href={project.github}>
                      <Github size={20} />
                    </a>
                  )}
                  {project.link && (
                    <a href={project.link}>
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 rounded-full text-xs ${
                        i === 0
                          ? "bg-indigo-600 text-white"
                          : i === 1
                            ? "bg-blue-600 text-white"
                            : i === 2
                              ? "bg-purple-600 text-white"
                              : "bg-gray-700 text-gray-300"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2 bg-gradient-to-br from-pink-500/20 to-purple-500/20">
                <div className="w-full h-full flex items-center justify-center">
                  <Image
                    src={project.image}
                    alt={project.name}
                    width={1200}
                    height={800}
                    className="w-full h-auto object-contain rounded-lg"
                    style={{ aspectRatio: "3/2" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
