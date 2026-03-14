import { Experience, Project, Skill, Tool } from "@/types";

export const fallbackProjects: Project[] = [
  {
    id: "1",
    name: "Artefy",
    description:
      "A dedicated platform for artists to showcase their work and connect with their audience. Built with Vue.js and Firebase, enabling creative professionals to display portfolios with real-time communication features.",
    link: "https://artefy-8085f.firebaseapp.com/",
    github: "https://github.com/MingoMango17/artFiverr",
    image: "/artefy.png",
    tags: ["Vue.js", "Firebase", "Tailwind CSS"],
    order_index: 1,
  },
  {
    id: "2",
    name: "Payco",
    description:
      "A comprehensive online payment system for university tuition fees. Built for the UNO-R Portal, streamlining financial transactions between students and university administration.",
    link: "https://payco-uno-r.vercel.app/",
    github: "https://github.com/MingoMango17/Exam_Permit",
    image: "/payco.png",
    tags: ["React", "MongoDB", "Tailwind CSS"],
    order_index: 2,
  },
  {
    id: "3",
    name: "Kahayag",
    description:
      "A restaurant website prototype with a focus on clean UI/UX design. Built with React and designed in Figma, showcasing design-to-code workflow.",
    link: "",
    github: "https://github.com/MingoMango17/KahayagFE",
    image: "/kahayag.png",
    tags: ["React", "Tailwind CSS", "Figma"],
    order_index: 3,
  },
  {
    id: "4",
    name: "BiPay Attendance",
    description:
      "A facial recognition-based attendance management system with integrated payroll tracking, built with modern web technologies and computer vision.",
    link: "",
    github: "https://github.com/MingoMango17/face-recognition-attendance-system",
    image: "/face-recog.png",
    tags: ["React", "Django", "ChromaDB"],
    order_index: 4,
  },
];

export const fallbackExperiences: Experience[] = [
  {
    id: "1",
    company: "HQZen / BPOseats",
    role: "Full Stack Developer Intern",
    period: "July 2023 – Present",
    initials: "HQ",
    bullets: [
      "Built a full-stack kanban board application using Vue.js and Django, used by internal teams.",
      "Collaborated with senior developers across the entire development lifecycle.",
      "Integrated REST APIs and managed PostgreSQL databases for production features.",
      "Established Git workflows and best practices across the team.",
    ],
    order_index: 1,
  },
  {
    id: "2",
    company: "University of the Philippines Cebu",
    role: "BS Computer Science",
    period: "2020 – Present",
    initials: "UP",
    bullets: [
      "Pursuing Bachelor of Science in Computer Science.",
      "Developed multiple full-stack projects including facial recognition systems and payment platforms.",
      "Applied machine learning and AI concepts in personal and academic projects.",
    ],
    order_index: 2,
  },
];

export const fallbackSkills: Skill[] = [
  { id: "1", name: "JavaScript", level: 85, order_index: 1 },
  { id: "2", name: "Python", level: 78, order_index: 2 },
  { id: "3", name: "React / Vue", level: 82, order_index: 3 },
  { id: "4", name: "Django", level: 80, order_index: 4 },
  { id: "5", name: "PostgreSQL / MongoDB", level: 72, order_index: 5 },
  { id: "6", name: "Next.js", level: 70, order_index: 6 },
];

export const fallbackTools: Tool[] = [
  { id: "1", name: "JavaScript", icon: "/icons8-javascript-48.png", order_index: 1 },
  { id: "2", name: "Django", icon: "/django.png", order_index: 2 },
  { id: "3", name: "React", icon: "/react.png", order_index: 3 },
  { id: "4", name: "Vue", icon: "/vue.png", order_index: 4 },
  { id: "5", name: "Firebase", icon: "/firebase.png", order_index: 5 },
  { id: "6", name: "PostgreSQL", icon: "/postgres.png", order_index: 6 },
  { id: "7", name: "MongoDB", icon: "/mongo.png", order_index: 7 },
  { id: "8", name: "Python", icon: "/python.png", order_index: 8 },
  { id: "9", name: "Tailwindcss", icon: "/tailwind.png", order_index: 9 },
  { id: "10", name: "Git", icon: "/git.png", order_index: 10 },
  { id: "11", name: "Next.js", icon: "/nextjs.png", order_index: 11 },
];
