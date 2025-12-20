// Centralized site content - editable via CMS mode
export interface Education {
  degree: string;
  institution: string;
  period?: string;
  description?: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
}

export interface Skill {
  name: string;
  category: string;
}

export interface SiteContent {
  personal: {
    name: string;
    tagline: string;
    bio: string;
    email: string;
    phone: string;
    location: string;
    linkedinUrl: string;
    githubUrl: string;
    mediumUrl: string;
  };
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skill[];
  certifications: { name: string; issuer: string }[];
}

export const defaultContent: SiteContent = {
  personal: {
    name: "Panav Arpit Raaj",
    tagline: "Robotics Engineer & AI Enthusiast",
    bio: "B.Tech student at IIT Patna specializing in Electrical & Electronics Engineering with a passion for robotics, SLAM, and autonomous systems.",
    email: "praajarpit@gmail.com",
    phone: "+91 9606158818",
    location: "Bangalore, KA, India",
    linkedinUrl: "https://www.linkedin.com/in/panavraaj/",
    githubUrl: "https://github.com/Pana1v",
    mediumUrl: "https://medium.com/@praajarpit"
  },
  education: [
    {
      degree: "B.Tech in Electrical & Electronics Engineering",
      institution: "IIT Patna",
      period: "2020 - Present",
      description: "CPI: 7.5"
    },
    {
      degree: "Indian School Certificate (ISC)",
      institution: "Clarence High School",
      period: "2019 - 2020",
      description: "Percentage: 95.5%"
    }
  ],
  experience: [
    {
      role: "Mobile Robotics Intern",
      company: "Addverb Technologies",
      period: "May 2024 – August 2024",
      description: "Developed and tested localization and mapping algorithms for Autonomous Mobile Robots (AMR) using LIDAR and cameras."
    },
    {
      role: "Team Captain, ABU Robocon & Rover Team",
      company: "IIT Patna",
      period: "Dec 2022 – May 2023",
      description: "Led a team of 60 students for ABU Robocon, designed and developed a lunar rover prototype for ISRO Robotics Challenge."
    },
    {
      role: "BTech Project: Autonomous Robot Navigation & SLAM",
      company: "IIT Patna",
      period: "May 2024 – August 2024",
      description: "Implemented ORB SLAM on a monocular camera and RTAB-Map with a depth camera for mapping and localization."
    }
  ],
  projects: [
    {
      id: "isro-lunar-mapping",
      title: "ISRO USRC Lunar Elemental Mapping",
      description: "Conducting Multi-Shot Super-resolution on lunar X-Ray fluorescence (XRF) data to enhance spatial resolution in mapping elemental distribution.",
      technologies: ["Python", "PyTorch", "Computer Vision"],
      githubUrl: "https://github.com/Pana1v"
    },
    {
      id: "autonomous-navigation",
      title: "Autonomous Robot Navigation and SLAM",
      description: "Implemented SLAM on a robot using ROS Humble and ORB SLAM for navigation and localization.",
      technologies: ["ROS2", "C++", "Python", "SLAM"],
      githubUrl: "https://github.com/Pana1v"
    },
    {
      id: "flipkart-robotics",
      title: "Flipkart Grid Robotics 6.0",
      description: "Utilized PyTorch and YOLOV11 for object detection and product text extraction in robotics applications.",
      technologies: ["PyTorch", "YOLO", "Python", "Computer Vision"],
      githubUrl: "https://github.com/Pana1v"
    }
  ],
  skills: [
    { name: "C/C++", category: "Languages" },
    { name: "Python", category: "Languages" },
    { name: "Java", category: "Languages" },
    { name: "MATLAB", category: "Languages" },
    { name: "Docker", category: "Technologies" },
    { name: "ROS (1 and 2)", category: "Technologies" },
    { name: "OpenCV", category: "Technologies" },
    { name: "Linux", category: "Technologies" },
    { name: "SQL", category: "Technologies" },
    { name: "PyTorch", category: "Technologies" },
    { name: "YOLO (V9, V11)", category: "Technologies" },
    { name: "TensorFlow", category: "Technologies" }
  ],
  certifications: [
    { name: "Deep Learning: Model Optimization and Tuning", issuer: "LinkedIn" },
    { name: "Fundamentals of Accelerated Data Science with RAPIDS", issuer: "Nvidia" }
  ]
};
