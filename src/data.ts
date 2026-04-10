export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  github?: string;
  demo?: string;
  interactiveHtml?: string;
  status?: string;
}

export interface Blog {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  image?: string;
}

export interface OpenSourceContribution {
  title: string;
  description: string;
  link?: string;
}

export interface DataStructure {
  name: string;
  title: string;
  bio: string;
  profilePhoto: string;
  contact: {
    email: string;
    location: string;
    github: string;
    linkedin: string;
  };
  experience: Experience[];
  education: Education[];
  projects: Project[];
  blogs: Blog[];
  skills: string[];
  openSource: OpenSourceContribution[];
}

export const DATA: DataStructure = {
  "name": "Panav Arpit Raaj",
  "title": "Robotics Engineer Level II at eternal.ag",
  "bio": "Robotics and Open Source",
  "profilePhoto": "https://media.licdn.com/dms/image/v2/D5603AQGCl7j-Me2BgA/profile-displayphoto-scale_200_200/B56Z0jA8LaJIAY-/0/1774408947635?e=1777507200&v=beta&t=2-Qd6e8dugygWKfj6WVyRCMCeBJxM9KBzRdkbPGl77Q",
  "contact": {
    "email": "praajarpit@gmail.com",
    "location": "Bangalore, India",
    "github": "github.com/Pana1v",
    "linkedin": "linkedin.com/in/panavraaj"
  },
  "experience": [
    {
      "company": "10xConstruction.ai",
      "role": "Robotics Software Apprentice",
      "period": "2025",
      "description": "Developed a Swerve Drive motion model for Nav2 MPPI Controller. Built Lichtblick, a custom TypeScript/ROS2 interface, reducing CPU usage by 78%. Implemented customized Nav2 collision-monitor and auto-initialization modules using Genetic Algorithms."
    },
    {
      "company": "Addverb Technologies",
      "role": "Mobile Robotics Intern",
      "period": "May 2024 - Aug 2024",
      "description": "Developed localization and mapping algorithms for AMRs using 2D LiDAR and monocular cameras. Implemented feature detection using FLIRT/FALKO and integrated PyTorch-based deep learning models. Created Feature and Graph Optimization algorithms using IRIS LaMa."
    }
  ],
  "education": [
    {
      "institution": "Indian Institute of Technology (IIT), Patna",
      "degree": "B.Tech in Electrical and Electronics Engineering",
      "period": "2021 - 2025",
      "description": "Specializing in Robotics and AI. Relevant coursework: Control Systems, Computer Vision, SLAM, and Embedded Systems."
    }
  ],
  "skills": [
    "ROS 2",
    "ROS Noetic",
    "SLAM",
    "Computer Vision",
    "PyTorch",
    "GNN",
    "Nav2",
    "C++",
    "Python",
    "TypeScript",
    "Node.js",
    "WebSockets",
    "Three.js",
    "Gazebo",
    "Kalman Filter",
    "YOLO"
  ],
  "openSource": [
    {
      "title": "Nav2",
      "description": "Developed Swerve Drive motion model for MPPI Controller and customized collision-monitor modules.",
      "link": "https://github.com/ros-navigation/navigation2"
    },
    {
      "title": "Autonomous Beginners Guide (Shisato Yano)",
      "description": "Contributing to and maintaining educational resources for autonomous systems based on Shisato Yano's methodologies.",
      "link": "https://github.com/AtsushiSakai/PythonRobotics"
    },
    {
      "title": "Polka",
      "description": "A specialized robotics project focused on precision movement and autonomous navigation.",
      "link": "https://github.com/Pana1v/Polka"
    }
  ],
  "projects": [
    {
      "id": "polka",
      "title": "Polka",
      "description": "A one for all; efficient pointcloud pre-processing node.",
      "tags": [
        "Robotics",
        "C++",
        "ROS2"
      ],
      "image": "https://github.com/Pana1v/polka/raw/master/images/polka.png",
      "status": "Active Development",
      "github": "https://github.com/Pana1v/polka"
    },
    {
      "id": "gnn-robotic-manipulation",
      "title": "GNN-based Combinatorial Optimization",
      "description": "Formulated NP-Hard Pick-and-Place sequencing as a graph classification task using GATv2. Engineered a Supervised Learning pipeline with Curriculum Learning, scaling to 200+ objects with <400ms inference.",
      "tags": [
        "Graph Neural Networks",
        "PyTorch",
        "Robotics"
      ],
      "image": "https://picsum.photos/seed/gnn/800/600",
      "github": "https://github.com/Pana1v"
    },
    {
      "id": "autonomous-nav-slam",
      "title": "Autonomous Robot Navigation & SLAM",
      "description": "Constructed a custom AMR using 2D LiDARs and wheel encoders. Implemented autonomous navigation and a Kalman Filter-based tracking system for dynamic obstacle avoidance in Gazebo and real-world.",
      "tags": [
        "ROS Noetic",
        "Gazebo",
        "Kalman Filter",
        "LiDAR"
      ],
      "image": "https://picsum.photos/seed/slam/800/600",
      "github": "https://github.com/Pana1v"
    },
    {
      "id": "phone-ros-bridge",
      "title": "Phone-ROS Bridge",
      "description": "Developed a real-time sensor streaming server using Node.js, WebSockets, and Socket.IO. Built an interactive 3D visualization dashboard using Three.js and Leaflet for mobile-based perception.",
      "tags": [
        "Node.js",
        "WebSockets",
        "Three.js",
        "ROS 2"
      ],
      "image": "https://picsum.photos/seed/bridge/800/600",
      "github": "https://github.com/Pana1v",
      "interactiveHtml": "<div style='background:#111; padding:20px; color:#0f0; font-family:monospace; border:1px solid #0f0;'>[SYSTEM_STATUS: ACTIVE]<br/>[STREAMING_DATA: IMU, GPS, CAMERA]<br/>[LATENCY: 12ms]</div>"
    },
    {
      "id": "flipkart-grid",
      "title": "Flipkart Grid Robotics 6.0",
      "description": "Optimized image processing using Mistral LLM and Gemini. Trained YOLOv11/v9 models for freshness indices and implemented U-Net for precise segmentation.",
      "tags": [
        "Computer Vision",
        "LLM",
        "YOLO",
        "PyTorch"
      ],
      "image": "https://picsum.photos/seed/flipkart/800/600"
    }
  ],
  "blogs": [
    {
      "id": "intro-to-slam",
      "title": "Introduction to SLAM Algorithms",
      "date": "2024-03-15",
      "excerpt": "Exploring the fundamentals of Simultaneous Localization and Mapping in robotics.",
      "tags": [
        "Robotics",
        "Algorithms",
        "Math"
      ],
      "content": "\n# Simultaneous Localization and Mapping (SLAM)\n\nSLAM is a computational problem of constructing or updating a map of an unknown environment while simultaneously keeping track of an agent's location within it.\n\n## The Mathematical Foundation\n\nThe state vector at time $t$ can be represented as:\n$$ x_t = [p_t, \theta_t, m_1, m_2, ..., m_n]^T $$\n\nWhere $p_t$ is the position, $\theta_t$ is the orientation, and $m_i$ are the landmarks in the map.\n\n### Kalman Filter Update\nThe prediction step of an Extended Kalman Filter (EKF) SLAM is:\n$$ hat{x}_{t|t-1} = f(hat{x}_{t-1|t-1}, u_t) $$\n$$ P_{t|t-1} = F_t P_{t-1|t-1} F_t^T + Q_t $$\n\nStay tuned for more deep dives into robotics!\n      "
    }
  ]
};
