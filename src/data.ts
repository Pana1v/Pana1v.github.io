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
  name: "Panav Arpit Raaj",
  title: "Robotics Software Engineer",
  bio: "B.Tech from IIT Patna specializing in autonomous systems, SLAM, and computer vision. Gold Medalist at Inter IIT Tech 12.0. Captain of IIT Patna's Robocon team — highest score among IITs at ABU Robocon 2024. Karnataka Rank 8 in NSTSE. Building intelligent robots that navigate the real world.",
  profilePhoto: "https://media.licdn.com/dms/image/v2/D5603AQGCl7j-Me2BgA/profile-displayphoto-scale_200_200/B56Z0jA8LaJIAY-/0/1774408947635?e=1777507200&v=beta&t=2-Qd6e8dugygWKfj6WVyRCMCeBJxM9KBzRdkbPGl77Q",
  contact: {
    email: "praajarpit@gmail.com",
    location: "Bangalore, India",
    github: "github.com/Pana1v",
    linkedin: "linkedin.com/in/panavraaj",
  },
  experience: [
    {
      company: "10xConstruction.ai",
      role: "Robotics Software Engineer",
      period: "July 2025 – Present",
      description: "Developed a custom swerve drive motion model in Nav2 MPPI Controller with steering angle and speed limits for constrained-space navigation. Built ambiguity detection and region-of-interest auto-initialization with genetic algorithm optimization. Engineered a multi-modal EKF sensor fusion pipeline with 3D ICP for stable high-frequency localization. Created Lichtblick, a custom TypeScript/ROS2 visualization stack that cut peak compute from 120% to 26% vs Foxglove, with pose recovery and MoveIt2 support for browser/Android. Implemented real-time collision monitoring with <100ms latency using Behavior Trees, composable nodes, and tuned MPPI parameters for narrow passage navigation.",
    },
    {
      company: "Addverb Technologies",
      role: "Mobile Robotics Intern",
      period: "May 2024 – August 2024",
      description: "Developed and tested localization and mapping algorithms for AMRs using 2D LiDAR, Intel RealSense, and monocular cameras in dynamic industrial environments. Implemented FLIRT and FALKO feature detection for robust LiDAR feature extraction and SLAM registration. Built graph optimization techniques with the IRIS LaMa framework for scalable localization accuracy.",
    },
  ],
  education: [
    {
      institution: "Indian Institute of Technology (IIT), Patna",
      degree: "B.Tech in Electrical and Electronics Engineering",
      period: "2021 – 2025",
      description: "Specializing in Robotics and AI. Gold Medalist at Inter IIT Tech 12.0. Captain of Robocon team — highest IIT score at ABU Robocon 2024. Founded and led IIT Patna's Rover Team for IRoC-U 2024.",
    },
    {
      institution: "Clarence High School, Bangalore",
      degree: "Indian School Certificate (ISC)",
      period: "2019 – 2020",
      description: "Percentage: 95.5%. Karnataka Rank 8 in NSTSE (2020).",
    },
  ],
  skills: [
    "C/C++",
    "Python",
    "Bash",
    "ROS 2 Humble",
    "Nav2",
    "SLAM",
    "Localization (AMCL)",
    "Path Planning",
    "Sensor Fusion (EKF)",
    "Custom Motion Models",
    "Gazebo",
    "RViz2",
    "Foxglove",
    "NVIDIA Isaac Sim",
    "OpenCV",
    "YOLO v9/v11",
    "DeepSort",
    "U-Net",
    "OCR",
    "PyTorch",
    "GNN (GATv2)",
    "Linux",
    "Git",
    "Docker",
    "CI/CD",
    "micro-ROS",
    "ESP32",
    "Raspberry Pi",
    "PCB Design (KiCAD)",
    "TypeScript",
    "Node.js",
    "WebSockets",
    "CMake",
    "Colcon",
  ],
  openSource: [
    {
      title: "Nav2 (Navigation2)",
      description: "Developed a custom swerve drive motion model for the MPPI Controller and implemented collision-monitor modules for the ROS 2 navigation stack.",
      link: "https://github.com/ros-navigation/navigation2",
    },
    {
      title: "PythonRobotics (Autonomous Beginners Guide)",
      description: "Contributing to and maintaining educational resources for autonomous systems algorithms — path planning, SLAM, and localization.",
      link: "https://github.com/AtsushiSakai/PythonRobotics",
    },
    {
      title: "Polka",
      description: "Efficient pointcloud pre-processing ROS 2 node for filtering, downsampling, and transforming 3D LiDAR data.",
      link: "https://github.com/Pana1v/Polka",
    },
  ],
  projects: [
    {
      id: "lichtblick",
      title: "Lichtblick — Custom ROS 2 Visualization Stack",
      description: "Engineered a TypeScript/ROS2 visualization tool that reduced peak compute usage from 120% to 26% compared to Foxglove. Integrates pose recovery, MoveIt2 support, and runs in browser and Android apps.",
      tags: ["TypeScript", "ROS 2", "WebSockets", "MoveIt2"],
      image: "https://picsum.photos/seed/lichtblick/800/600",
      status: "Active Development",
    },
    {
      id: "gnn-robotic-manipulation",
      title: "GNN-based Combinatorial Optimization for Robotic Manipulation",
      description: "Formulated NP-Hard Pick-and-Place sequencing as a graph classification task using GATv2. Trained via supervised learning on ILP solver demonstrations with curriculum learning, scaling from 5 to 200+ objects. Achieved <2% gap to ILP for 40 objects and <400ms inference where ILP failed to produce solutions.",
      tags: ["PyTorch Geometric", "GATv2", "Imitation Learning", "Path Planning"],
      image: "https://picsum.photos/seed/gnn/800/600",
      github: "https://github.com/Pana1v",
      status: "Manuscript in Preparation",
    },
    {
      id: "autonomous-nav-slam",
      title: "Autonomous Robot Navigation & SLAM (B.Tech Project)",
      description: "Architected a custom differential drive AMR from scratch with parametric URDF/Xacro, accurate inertia matrices, and collision geometries for Gazebo and hardware. Developed micro-ROS hardware interface on ESP32 bridging motor drivers and encoders with ros2_control for real-time velocity control. Implemented EKF sensor fusion.",
      tags: ["ROS 2 Humble", "Nav2", "Gazebo", "micro-ROS", "ESP32", "Sensor Fusion"],
      image: "https://picsum.photos/seed/slam/800/600",
      github: "https://github.com/Pana1v",
      status: "Completed",
    },
    {
      id: "abu-robocon",
      title: "ABU Robocon 2023 & 2024 — Captain, IIT Patna",
      description: "Led 60+ students to the National Finals of ABU Robocon, one of only two IITs to qualify in Asia's largest robotics event. Achieved the highest score among IIT teams in 2024. Designed PCBs for motor control, sensor integration, and power management. Programmed Cube Orange, Raspberry Pi, Arduino, ESP32 for image processing, sensor interfacing, and multi-bot coordination with ROS.",
      tags: ["Robotics", "ROS", "PCB Design", "Multi-Robot", "Path Planning"],
      image: "https://picsum.photos/seed/robocon/800/600",
    },
    {
      id: "phone-ros-bridge",
      title: "Phone-ROS Bridge — Mobile Sensor Server",
      description: "Built a flexible server (Node.js + Python) for real-time mobile sensor data collection with WebSocket and REST API endpoints. Developed a 3D dashboard visualization for intuitive real-time sensor readings. Integrated SSL/TLS encryption and designed for ROS Humble interoperability with robotics perception stacks.",
      tags: ["Node.js", "Python", "WebSockets", "Three.js", "ROS 2"],
      image: "https://picsum.photos/seed/bridge/800/600",
      github: "https://github.com/Pana1v",
      status: "Active",
    },
    {
      id: "flipkart-grid",
      title: "Flipkart Grid Robotics 6.0",
      description: "Utilized Mistral LLM, GPT-2, Gemini, and PyTorch for product text extraction and image processing. Trained YOLOv11/v9 models with OpenCV to assess freshness indices of consumables. Implemented U-Net for segmentation and CNN for OCR.",
      tags: ["Computer Vision", "Mistral LLM", "YOLO v11/v9", "PyTorch", "U-Net"],
      image: "https://picsum.photos/seed/flipkart/800/600",
      status: "Completed",
    },
    {
      id: "rigbetel-inter-iit",
      title: "RigBetel Labs — Inter IIT Tech Meet 13.0",
      description: "Implemented multi-robot mapping and localization using TurtleBot3 specification robots running ROS 2 Humble in a simulated environment. No-prep problem statement challenge.",
      tags: ["ROS 2 Humble", "Multi-Robot", "SLAM", "Gazebo"],
      image: "https://picsum.photos/seed/interiit/800/600",
    },
    {
      id: "polka",
      title: "Polka — Pointcloud Pre-processing",
      description: "Efficient, composable ROS 2 node for pointcloud filtering, downsampling, and coordinate transformation of 3D LiDAR data. Designed for real-time robotics perception pipelines.",
      tags: ["C++", "ROS 2", "PCL", "LiDAR"],
      image: "https://github.com/Pana1v/polka/raw/master/images/polka.png",
      github: "https://github.com/Pana1v/polka",
      status: "Active Development",
    },
  ],
  blogs: [
    {
      id: "intro-to-slam",
      title: "Introduction to SLAM Algorithms",
      date: "2024-03-15",
      excerpt: "Exploring the fundamentals of Simultaneous Localization and Mapping in robotics.",
      tags: ["Robotics", "Algorithms", "Math"],
      content: `
# Simultaneous Localization and Mapping (SLAM)

SLAM is a computational problem of constructing or updating a map of an unknown environment while simultaneously keeping track of an agent's location within it.

## The Mathematical Foundation

The state vector at time $t$ can be represented as:
$$ x_t = [p_t, \\theta_t, m_1, m_2, ..., m_n]^T $$

Where $p_t$ is the position, $\\theta_t$ is the orientation, and $m_i$ are the landmarks in the map.

### Kalman Filter Update
The prediction step of an Extended Kalman Filter (EKF) SLAM is:
$$ \\hat{x}_{t|t-1} = f(\\hat{x}_{t-1|t-1}, u_t) $$
$$ P_{t|t-1} = F_t P_{t-1|t-1} F_t^T + Q_t $$

Stay tuned for more deep dives into robotics!
      `,
    },
  ],
};
