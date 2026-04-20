export interface Experience {
  company: string;
  role: string;
  period: string;
  current?: boolean;
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
  n: string;
  title: string;
  subtitle: string;
  description: string;
  year: string;
  tags: string[];
  status?: string;
  image?: string;
  github?: string;
  demo?: string;
}

export interface MyProject {
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  stars: string;
  link: string;
}

export interface OpenSourceContribution {
  title: string;
  description: string;
  link: string;
}

export interface Blog {
  id: string;
  n: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  tags: string[];
  excerpt: string;
  content: string;
  image?: string;
}

export interface DataStructure {
  name: string;
  title: string;
  dateline: string;
  shortBio: string;
  bio: string;
  profilePhoto: string;
  contact: {
    email: string;
    location: string;
    github: string;
    linkedin: string;
  };
  currently: { label: string; value: string }[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: Record<string, string[]>;
  myProjects: MyProject[];
  contributions: OpenSourceContribution[];
  blogs: Blog[];
}

export const DATA: DataStructure = {
  name: "Panav Arpit Raaj",
  title: "Robotics Software Engineer",
  dateline: "Bangalore, Spring 2026",
  shortBio: "Robotics software engineer. I write autonomy stacks for robots that make decisions in unpredictable places — warehouses, farms, construction sites.",
  bio: "B.Tech from IIT Patna specializing in autonomous systems, SLAM, and computer vision. Gold Medalist at Inter IIT Tech 12.0. Captain of IIT Patna's Robocon team — highest score among IITs at ABU Robocon 2024. Karnataka Rank 8 in NSTSE. Building intelligent robots that navigate the real world.",
  profilePhoto: "https://media.licdn.com/dms/image/v2/D5603AQGCl7j-Me2BgA/profile-displayphoto-scale_200_200/B56Z0jA8LaJIAY-/0/1774408947635?e=1777507200&v=beta&t=2-Qd6e8dugygWKfj6WVyRCMCeBJxM9KBzRdkbPGl77Q",
  contact: {
    email: "praajarpit@gmail.com",
    location: "Bangalore, India",
    github: "github.com/Pana1v",
    linkedin: "linkedin.com/in/panavraaj"
  },
  currently: [
    { label: "Currently", value: "Robotics Engineer Level II @ Eternal.ag" },
    { label: "Writing", value: "On MPPI controllers & narrow-passage nav" },
    { label: "Reading", value: "Probabilistic Robotics, Thrun" }
  ],
  experience: [
    {
      company: "Eternal.ag",
      role: "Robotics Engineer Level II",
      period: "January 2026 — Present",
      current: true,
      description: "Architecting a resolute and efficient stack ;)"
    },
    {
      company: "10xConstruction.ai",
      role: "Robotics Software Engineer",
      period: "July 2025 — Present",
      description: "Developed a custom swerve drive motion model in Nav2 MPPI Controller with steering angle and speed limits for constrained-space navigation. Built ambiguity detection and region-of-interest auto-initialization with genetic algorithm optimization. Engineered a multi-modal EKF sensor fusion pipeline with 3D ICP for stable high-frequency localization. Created Lichtblick, a custom TypeScript/ROS2 visualization stack that cut peak compute from 120% to 26% vs Foxglove, with pose recovery and MoveIt2 support for browser/Android. Implemented real-time collision monitoring with <100ms latency using Behavior Trees, composable nodes, and tuned MPPI parameters for narrow passage navigation."
    },
    {
      company: "Addverb Technologies",
      role: "Mobile Robotics Intern",
      period: "May 2024 — August 2024",
      description: "Developed and tested localization and mapping algorithms for AMRs using 2D LiDAR, Intel RealSense, and monocular cameras in dynamic industrial environments. Implemented FLIRT and FALKO feature detection for robust LiDAR feature extraction and SLAM registration. Built graph optimization techniques with the IRIS LaMa framework for scalable localization accuracy."
    }
  ],
  education: [
    {
      institution: "Indian Institute of Technology (IIT), Patna",
      degree: "B.Tech in Electrical and Electronics Engineering",
      period: "2021 — 2025",
      description: "Specializing in Robotics and AI. Gold Medalist at Inter IIT Tech 12.0. Captain of Robocon team — highest IIT score at ABU Robocon 2024. Founded and led IIT Patna's Rover Team for IRoC-U 2024."
    },
    {
      institution: "Clarence High School, Bangalore",
      degree: "Indian School Certificate (ISC)",
      period: "2019 — 2020",
      description: "Percentage: 95.5%. Karnataka Rank 8 in NSTSE (2020)."
    }
  ],
  projects: [
    {
      id: "lichtblick",
      n: "01",
      title: "Lichtblick",
      subtitle: "Custom ROS 2 Visualization Stack",
      description: "Engineered a TypeScript/ROS2 visualization tool that reduced peak compute usage from 120% to 26% compared to Foxglove. Integrates pose recovery, MoveIt2 support, and runs in browser and Android apps.",
      year: "2025",
      tags: ["TypeScript", "ROS 2", "WebSockets", "MoveIt2"],
      status: "Active",
      image: "https://picsum.photos/seed/lichtblick/800/600"
    },
    {
      id: "gnn-robotic-manipulation",
      n: "02",
      title: "Graph-Learned Manipulation",
      subtitle: "GNN Combinatorial Optimization",
      description: "Formulated NP-Hard Pick-and-Place sequencing as a graph classification task using GATv2. Trained via supervised learning on ILP solver demonstrations with curriculum learning, scaling from 5 to 200+ objects. Achieved <2% gap to ILP for 40 objects and <400ms inference where ILP failed to produce solutions.",
      year: "2025",
      tags: ["PyTorch", "GATv2", "Imitation Learning"],
      status: "Manuscript",
      github: "https://github.com/Pana1v"
    },
    {
      id: "autonomous-nav-slam",
      n: "03",
      title: "Autonomous Nav & SLAM",
      subtitle: "B.Tech Thesis Project",
      description: "Architected a custom differential drive AMR from scratch with parametric URDF/Xacro, accurate inertia matrices, and collision geometries for Gazebo and hardware. Developed micro-ROS hardware interface on ESP32 bridging motor drivers and encoders with ros2_control for real-time velocity control. Implemented EKF sensor fusion.",
      year: "2024",
      tags: ["ROS 2", "Nav2", "Gazebo", "ESP32"],
      status: "Completed",
      github: "https://github.com/Pana1v"
    },
    {
      id: "abu-robocon",
      n: "04",
      title: "ABU Robocon",
      subtitle: "Captain, IIT Patna",
      description: "Led 60+ students to the National Finals of ABU Robocon, one of only two IITs to qualify in Asia's largest robotics event. Achieved the highest score among IIT teams in 2024. Designed PCBs for motor control, sensor integration, and power management.",
      year: "2023 — 2024",
      tags: ["PCB", "Multi-Robot", "ROS"]
    },
    {
      id: "phone-ros-bridge",
      n: "05",
      title: "Phone-ROS Bridge",
      subtitle: "Mobile Sensor Server",
      description: "Built a flexible server (Node.js + Python) for real-time mobile sensor data collection with WebSocket and REST API endpoints. Developed a 3D dashboard visualization for intuitive real-time sensor readings. Integrated SSL/TLS encryption and designed for ROS Humble interoperability.",
      year: "2024",
      tags: ["Node.js", "WebSockets", "Three.js"],
      status: "Active",
      github: "https://github.com/Pana1v"
    },
    {
      id: "flipkart-grid",
      n: "06",
      title: "Flipkart Grid Robotics",
      subtitle: "Computer Vision Pipeline",
      description: "Utilized Mistral LLM, GPT-2, Gemini, and PyTorch for product text extraction and image processing. Trained YOLOv11/v9 models with OpenCV to assess freshness indices of consumables. Implemented U-Net for segmentation and CNN for OCR.",
      year: "2024",
      tags: ["YOLO", "PyTorch", "U-Net"],
      status: "Completed"
    },
    {
      id: "rigbetel-inter-iit",
      n: "07",
      title: "RigBetel Labs",
      subtitle: "Inter IIT Tech Meet 13.0",
      description: "Implemented multi-robot mapping and localization using TurtleBot3 specification robots running ROS 2 Humble in a simulated environment. No-prep problem statement challenge.",
      year: "2024",
      tags: ["ROS 2", "Multi-Robot", "SLAM"]
    },
    {
      id: "polka-project",
      n: "08",
      title: "Polka",
      subtitle: "Pointcloud Pre-processing",
      description: "Efficient, composable ROS 2 node for pointcloud filtering, downsampling, and coordinate transformation of 3D LiDAR data. Designed for real-time robotics perception pipelines.",
      year: "2024",
      tags: ["C++", "ROS 2", "PCL"],
      status: "Active",
      github: "https://github.com/Pana1v/polka"
    }
  ],
  skills: {
    "Systems": ["C/C++", "Python", "Bash", "ROS 2 Humble", "Nav2", "CMake", "Colcon", "Docker", "Linux", "Git", "CI/CD"],
    "Autonomy": ["SLAM", "Localization (AMCL)", "Path Planning", "Sensor Fusion (EKF)", "Custom Motion Models"],
    "Perception": ["OpenCV", "YOLO v9/v11", "DeepSort", "U-Net", "OCR", "PyTorch", "GNN (GATv2)"],
    "Simulation": ["Gazebo", "RViz2", "Foxglove", "NVIDIA Isaac Sim"],
    "Embedded": ["micro-ROS", "ESP32", "Raspberry Pi", "PCB Design (KiCAD)"],
    "Web": ["TypeScript", "Node.js", "WebSockets"]
  },
  myProjects: [
    {
      title: "Polka",
      tagline: "Pointcloud pre-processing for ROS 2",
      description: "An efficient, composable ROS 2 node for pointcloud filtering, downsampling, and coordinate transformation of 3D LiDAR data. Designed for real-time perception pipelines — tuned for low latency on field robots.",
      stack: ["C++", "ROS 2", "PCL"],
      stars: "★ 22",
      link: "https://github.com/Pana1v/Polka"
    }
  ],
  contributions: [
    {
      title: "Nav2 (Navigation2)",
      description: "Developed a custom swerve drive motion model for the MPPI Controller and implemented collision-monitor modules for the ROS 2 navigation stack.",
      link: "https://github.com/ros-navigation/navigation2"
    },
    {
      title: "AutonomousVehicleControlBeginnersGuide",
      description: "Contributing to and maintaining educational resources for autonomous systems algorithms — path planning, SLAM, and localization.",
      link: "https://github.com/ShisatoYano/AutonomousVehicleControlBeginnersGuide"
    }
  ],
  blogs: [
    {
      id: "intro-to-slam",
      n: "I",
      title: "Where Am I? Notes on SLAM",
      subtitle: "On the peculiar problem of building a map while you're still inside it.",
      date: "March 15, 2024",
      readTime: "9 min",
      tags: ["Robotics", "Algorithms", "Math"],
      excerpt: "SLAM is a computational problem of constructing or updating a map of an unknown environment while simultaneously keeping track of an agent's location within it.",
      content: "\n# Simultaneous Localization and Mapping (SLAM)\n\nSLAM is a computational problem of constructing or updating a map of an unknown environment while simultaneously keeping track of an agent's location within it.\n\n## The Mathematical Foundation\n\nThe state vector at time $t$ can be represented as:\n$$ x_t = [p_t, \\theta_t, m_1, m_2, ..., m_n]^T $$\n\nWhere $p_t$ is the position, $\\theta_t$ is the orientation, and $m_i$ are the landmarks in the map.\n\n### Kalman Filter Update\nThe prediction step of an Extended Kalman Filter (EKF) SLAM is:\n$$ \\hat{x}_{t|t-1} = f(\\hat{x}_{t-1|t-1}, u_t) $$\n$$ P_{t|t-1} = F_t P_{t-1|t-1} F_t^T + Q_t $$\n\nStay tuned for more deep dives into robotics!\n      "
    }
  ]
};
