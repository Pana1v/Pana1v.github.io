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

export interface Publication {
  title: string;
  venue: string;
  year: string;
  coAuthors?: string;
  link?: string;
}

export interface Award {
  title: string;
  issuer: string;
  year: string;
  description?: string;
}

export interface SiteContent {
  personal: {
    name: string;
    tagline: string;
    credentials: string;
    bio: string;
    researchStatement: string;
    email: string;
    phone: string;
    location: string;
    linkedinUrl: string;
    githubUrl: string;
    mediumUrl: string;
  };
  researchInterests: string[];
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skill[];
  publications: Publication[];
  awards: Award[];
  professionalAffiliations: string[];
  certifications: { name: string; issuer: string }[];
}

export const defaultContent: SiteContent = {
  personal: {
    name: "Panav Arpit Raaj",
    tagline: "Robotics Software Engineer",
    credentials: "B.Tech, IIT Patna",
    bio: "A dedicated robotics engineer specializing in autonomous systems, SLAM, sensor fusion, and computer vision. Graduate from the Indian Institute of Technology Patna, currently building the future of construction robotics at 10xConstruction.ai.",
    researchStatement: "My work lies at the intersection of robotics, computer vision, and machine learning—with a particular emphasis on enabling machines to perceive, understand, and navigate complex real-world environments autonomously.",
    email: "praajarpit@gmail.com",
    phone: "+91 9606158818",
    location: "Bangalore, KA, India",
    linkedinUrl: "https://www.linkedin.com/in/panavraaj/",
    githubUrl: "https://github.com/Pana1v",
    mediumUrl: "https://medium.com/@praajarpit"
  },
  researchInterests: [
    "Simultaneous Localization & Mapping (SLAM)",
    "Autonomous Mobile Robots",
    "Computer Vision & Perception",
    "Deep Learning for Robotics",
    "Multi-Sensor Fusion",
    "Motion Planning & Navigation"
  ],
  education: [
    {
      degree: "B.Tech in Electrical & Electronics Engineering",
      institution: "Indian Institute of Technology Patna",
      period: "2021 – 2025",
      description: "Focus: Robotics, Control Systems, Embedded Systems"
    },
    {
      degree: "Indian School Certificate (ISC)",
      institution: "Clarence High School, Bangalore",
      period: "2019 – 2020",
      description: "Percentage: 95.5%"
    }
  ],
  experience: [
    {
      role: "Robotics Software Engineer",
      company: "10xConstruction.ai",
      period: "July 2025 – Present",
      description: "Developed customized MPPI motion model for swerve drives. Engineered multi-modal sensor fusion pipeline (EKF) with 3D ICP for stable localization. Built Lichtblick - a custom visualization stack (TypeScript/ROS2) reducing compute usage by 78%. Implemented real-time collision monitor with <100ms latency integrating Behavior Trees and Nav2."
    },
    {
      role: "Mobile Robotics Intern",
      company: "Addverb Technologies",
      period: "May 2024 – August 2024",
      description: "Developed and tested localization and mapping algorithms for AMRs using 2D LiDAR, Intel RealSense, and monocular cameras. Implemented FLIRT and FALKO feature detection algorithms for robust SLAM. Developed graph optimization techniques using IRIS LaMa framework."
    },
    {
      role: "Captain — ABU Robocon & Rover Team",
      company: "IIT Patna Robotics Society",
      period: "Dec 2022 – May 2024",
      description: "Led 60+ students to ABU Robocon National Finals, achieving highest score among IIT teams. Founded and led IIT Patna's Rover Team for IRoC-U 2024. Designed PCBs for motor control, sensor integration, and power management. Developed multi-bot coordination and path planning algorithms using ROS."
    }
  ],
  projects: [
    {
      id: "gnn-manipulation",
      title: "GNN-based Combinatorial Optimization for Robotic Manipulation",
      description: "Formulated NP-Hard Pick-and-Place sequencing as graph classification using GATv2. Achieved near-optimal performance (<2% gap to ILP for 40 objects) with 400ms inference time, surpassing greedy heuristics.",
      technologies: ["PyTorch Geometric", "GATv2", "Imitation Learning", "Path Planning"],
      githubUrl: "https://github.com/Pana1v"
    },
    {
      id: "autonomous-navigation",
      title: "B.Tech Project: Autonomous Robot Navigation & SLAM",
      description: "Architected custom differential drive AMR with parametric URDF/Xacro. Developed hardware interface using micro-ROS on ESP32 with ros2_control for real-time velocity control loops and sensor fusion (EKF).",
      technologies: ["ROS 2 Humble", "Nav2", "Gazebo", "micro-ROS", "Sensor Fusion"],
      githubUrl: "https://github.com/Pana1v"
    },
    {
      id: "flipkart-robotics",
      title: "Flipkart Grid Robotics 6.0",
      description: "Utilized Mistral LLM, GPT-2, Gemini and PyTorch for product text extraction. Trained YOLOv11 and YOLOv9 models for freshness assessment. Implemented U-Net and CNN for segmentation and OCR.",
      technologies: ["Computer Vision", "Mistral LLM", "YOLOv11", "PyTorch", "OCR"],
      githubUrl: "https://github.com/Pana1v"
    },
    {
      id: "sensor-server",
      title: "Mobile Phone Sensor Data Server",
      description: "Built flexible server with Node.js/Python backends for real-time sensor data. Implemented WebSocket and REST APIs, 3D dashboard visualization, SSL/TLS support, and ROS Humble integration.",
      technologies: ["Node.js", "Python", "WebSocket", "ROS 2", "3D Visualization"],
      githubUrl: "https://github.com/Pana1v"
    },
    {
      id: "inter-iit-13",
      title: "RigBetel Labs Inter IIT Tech Meet 13.0",
      description: "Implemented multi-robot mapping and localization using TurtleBot3 specification robots running ROS 2 Humble in a simulated environment.",
      technologies: ["ROS 2 Humble", "Multi-Robot SLAM", "TurtleBot3", "Simulation"],
      githubUrl: "https://github.com/Pana1v"
    }
  ],
  skills: [
    { name: "C/C++", category: "Languages" },
    { name: "Python", category: "Languages" },
    { name: "Bash", category: "Languages" },
    { name: "ROS 2 (Humble)", category: "Robotics" },
    { name: "Nav2 Stack", category: "Robotics" },
    { name: "SLAM & Localization (AMCL)", category: "Robotics" },
    { name: "Path Planning", category: "Robotics" },
    { name: "Sensor Fusion", category: "Robotics" },
    { name: "Custom Motion Models", category: "Robotics" },
    { name: "Gazebo", category: "Simulation & Visualization" },
    { name: "RViz2", category: "Simulation & Visualization" },
    { name: "Foxglove", category: "Simulation & Visualization" },
    { name: "NVIDIA Isaac Sim", category: "Simulation & Visualization" },
    { name: "OpenCV", category: "Computer Vision" },
    { name: "YOLO (v9/v11)", category: "Computer Vision" },
    { name: "Image Segmentation (U-Net)", category: "Computer Vision" },
    { name: "Feature Detection", category: "Computer Vision" },
    { name: "OCR", category: "Computer Vision" },
    { name: "Linux (Ubuntu)", category: "Systems & Embedded" },
    { name: "Docker", category: "Systems & Embedded" },
    { name: "Microcontrollers (ESP32, Arduino)", category: "Systems & Embedded" },
    { name: "SBCs (Raspberry Pi, Cube Orange)", category: "Systems & Embedded" },
    { name: "PCB Design (KiCAD)", category: "Systems & Embedded" },
    { name: "Git", category: "Software Engineering" },
    { name: "CI/CD (GitHub Actions, GitLab CI)", category: "Software Engineering" },
    { name: "Unit Testing (GTest, PyTest)", category: "Software Engineering" },
    { name: "CMake, Colcon", category: "Software Engineering" },
    { name: "Agile/Scrum", category: "Tools & Workflow" }
  ],
  publications: [
    {
      title: "GNN-based Combinatorial Optimization for Robotic Manipulation",
      venue: "Manuscript in preparation",
      year: "2024",
      coAuthors: "Research Team, IIT Patna",
      link: ""
    }
  ],
  awards: [
    {
      title: "Gold Medalist — Inter IIT Tech Meet 12.0",
      issuer: "Inter IIT Tech Meet",
      year: "2023",
      description: "Won gold medal in the prestigious Inter IIT Technical Meet competition"
    },
    {
      title: "ABU Robocon 2024 — Highest Score Among IITs",
      issuer: "Asia-Pacific Broadcasting Union",
      year: "2024",
      description: "Captain of IIT Patna team, achieved highest score among all IIT teams in National Finals"
    },
    {
      title: "ABU Robocon 2023 — 4th Nationally (Stage 1)",
      issuer: "Asia-Pacific Broadcasting Union",
      year: "2023",
      description: "Vice-Captain, ranked 4th nationally in Asia's oldest robotics competition"
    },
    {
      title: "IRoC-U 2024 Founder & Team Lead",
      issuer: "ISRO",
      year: "2024",
      description: "Founded and led IIT Patna's Rover Team for ISRO Robotics Challenge"
    },
    {
      title: "Karnataka Rank 8th — NSTSE",
      issuer: "Unified Council",
      year: "2020",
      description: "Achieved 8th rank in Karnataka in the National Science Talent Search Examination"
    }
  ],
  professionalAffiliations: [
    "IIT Patna Robotics Society",
    "Open Source Contributor — PlotJuggler",
    "ROS Community Contributor"
  ],
  certifications: [
    { name: "Deep Learning: Model Optimization and Tuning", issuer: "LinkedIn Learning" },
    { name: "Fundamentals of Accelerated Data Science with RAPIDS", issuer: "NVIDIA Deep Learning Institute" }
  ]
};
