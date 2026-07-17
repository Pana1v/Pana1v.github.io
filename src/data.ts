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
  motion?: string;
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
  substackUrl?: string;
  source?: string;
  href?: string;
}

export interface DataStructure {
  name: string;
  title: string;
  dateline: string;
  coords: string;
  shortBio: string;
  bio: string;
  profilePhoto: string;
  contact: {
    email: string;
    altEmail: string;
    location: string;
    github: string;
    linkedin: string;
    handbook: string;
  };
  currently: { label: string; value: string; href?: string }[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: Record<string, string[]>;
  myProjects: MyProject[];
  contributions: OpenSourceContribution[];
  blogs: Blog[];
  achievements: string[];
}

export const DATA: DataStructure = {
  name: "Panav Arpit Raaj",
  title: "Robotics Software Engineer",
  dateline: "Bangalore, Spring 2026",
  coords: "12.97° N · 77.59° E",
  shortBio: "Robotics software engineer. I write autonomy stacks for robots that make decisions in unpredictable places: warehouses, farms, construction sites.",
  bio: "B.Tech from IIT Patna specializing in autonomous systems, SLAM, and computer vision. Gold Medalist at Inter IIT Tech 12.0. Captain of IIT Patna's Robocon team, highest score among IITs at ABU Robocon 2024. Karnataka Rank 8 in NSTSE. Building intelligent robots that navigate the real world.",
  profilePhoto: "https://media.licdn.com/dms/image/v2/D5603AQGCl7j-Me2BgA/profile-displayphoto-scale_200_200/B56Z0jA8LaJIAY-/0/1774408947635?e=1777507200&v=beta&t=2-Qd6e8dugygWKfj6WVyRCMCeBJxM9KBzRdkbPGl77Q",
  contact: {
    email: "praajarpit@gmail.com",
    altEmail: "panav.raaj@hotmail.com",
    location: "Bangalore, India",
    github: "github.com/Pana1v",
    linkedin: "linkedin.com/in/panavraaj",
    handbook: "https://panav.gitbook.io/robotics-handbook"
  },
  currently: [
    { label: "Currently", value: "Robotics Engineer Level II @ Eternal.ag" },
    { label: "Writing", value: "The Robotics Handbook — my field guide ↗", href: "https://panav.gitbook.io/robotics-handbook" },
    { label: "Reading", value: "Probabilistic Robotics, Thrun" }
  ],
  experience: [
    {
      company: "Eternal.ag",
      role: "Robotics Engineer Level II",
      period: "Jan 2026 — May 2026",
      current: true,
      description: "Architecting a GPU-accelerated SLAM and navigation stack integrating Nav2 with SOTA mapping techniques, consuming <40% CPU on Jetson Orin. Automated per-robot extrinsic calibration (LiDAR-to-IMU, LiDAR-to-LiDAR). Setting up CI/CD pipelines with parameter snapshots in rosbags. Built a CUDA-accelerated pointcloud processing and deskewing node, cutting pipeline latency to 40ms."
    },
    {
      company: "10xConstruction.ai",
      role: "Robotics Software Apprentice",
      period: "Jul 2025 — Jan 2026",
      description: "Developed a swerve-drive motion model for the Nav2 MPPI Controller with steering-angle and speed limits for constrained-space navigation. Built ambiguity detection and ROI auto-initialization via genetic algorithm optimization to solve the kidnapped robot problem. Engineered a multi-modal EKF sensor fusion pipeline with 3D ICP for stable high-frequency localization. Created Lichtblick, a TypeScript/ROS2 visualization stack that cut peak compute from 120% to 26% vs Foxglove, with pose recovery and MoveIt2 support for browser/Android. Implemented real-time collision monitoring with <100ms latency using Behavior Trees and tuned MPPI parameters for narrow passage navigation. Owned the full 2D LiDAR pipeline from driver integration to filtering, processing, and planner-level usage."
    },
    {
      company: "Addverb Technologies",
      role: "Mobile Robotics Intern",
      period: "May 2024 — Aug 2024",
      description: "Developed and tested localization and mapping algorithms for AMRs using 2D LiDAR, Intel RealSense, and monocular cameras in dynamic industrial environments. Implemented FLIRT and FALKO feature detection for robust LiDAR feature extraction and SLAM registration. Built graph optimization techniques with the IRIS LaMa framework for scalable localization accuracy."
    }
  ],
  education: [
    {
      institution: "Indian Institute of Technology (IIT), Patna",
      degree: "B.Tech in Electrical and Electronics Engineering",
      period: "2021 — 2025",
      description: "Specialized in Robotics and AI. Gold Medalist at Inter IIT Tech 12.0. Captain of Robocon team, highest IIT score at ABU Robocon 2024. Founded and led IIT Patna's Rover Team for IRoC-U 2024."
    },
    {
      institution: "Clarence High School, Bangalore",
      degree: "Indian School Certificate (ISC)",
      period: "2019 — 2020",
      description: "95.5%. Karnataka Rank 8 in NSTSE (2020)."
    }
  ],
  projects: [
    {
      id: "leap",
      n: "01",
      title: "LEAP",
      subtitle: "Learning-Augmented Exact Optimization for Pick-and-Place",
      description: "Formulated robotic pick-and-place sequencing as an asymmetric TSP with bin-dependent transition costs. Replaced MTZ subtour constraints with a CP-SAT Hamiltonian circuit formulation for 5-7x solver speedup. Designed LEAP (Learning-Enhanced Arc Pruning) using imitation-learned GNN logits to reduce decision variables from O(N\u00B2) to O(Nk). Achieved 17.5x speedup at N=200 with worst-case optimality gap of 0.06%.",
      year: "2025 — 2026",
      tags: ["PyTorch", "GATv2", "CP-SAT", "Imitation Learning"],
      status: "Manuscript"
    },
    {
      id: "barn-challenge",
      n: "02",
      title: "ICRA BARN Challenge 2026",
      subtitle: "Breadcrumb Explorer for Mapless Navigation",
      description: "Solo-developed a Breadcrumb Explorer architecture for mapless navigation without SLAM or laser odometry in dynamic obstacle fields. Achieved 0.3682/0.5 on the first IEEE ICRA submission, the highest score by an Indian team since 2022. Designed an odom-frame breadcrumb memory marking trajectories as tasty or stale. Validated across 300 randomly generated Gazebo courses with 76% goal-reach rate in zero-shot runs.",
      year: "2026",
      tags: ["ROS 2", "Nav2", "Gazebo", "Jackal"],
      status: "Active",
      image: "/projects/barn.png",
      motion: "/projects/barn-motion.gif"
    },
    {
      id: "openpi-dora",
      n: "03",
      title: "openpi-dora",
      subtitle: "DoRA Fine-Tuning for Robot Policies",
      description: "Bolted DoRA (Weight-Decomposed Low-Rank Adaptation) onto Physical Intelligence's openpi pi0.5 policy as a standalone overlay, keeping openpi itself an untouched pinned submodule. Reimplemented DoRA in Flax over Gemma's einsum projections and benchmarked against LoRA on the LIBERO manipulation suite: a slight edge for DoRA at rank 8 (92.0% vs 91.4%, winning 3 of 4 suites), roughly tied at rank 16.",
      year: "2026",
      tags: ["JAX/Flax", "LoRA/DoRA", "LIBERO", "openpi"],
      status: "Active",
      github: "https://github.com/Pana1v/openpi-dora",
      image: "/projects/openpi-dora-still.png",
      motion: "/projects/openpi-dora-motion.gif"
    },
    {
      id: "go-slam",
      n: "04",
      title: "GO-SLAM",
      subtitle: "Graph Optimization + Generalized ICP SLAM",
      description: "Built a complete SLAM system from scratch combining a GICP front-end, pose-graph back-end, and loop-closure detection. Implemented custom Levenberg-Marquardt solvers for both Generalized ICP alignment and global graph optimization without external libraries. Integrated with ROS 2 Humble using deskewed LiDAR from Polka, benchmarked on KITTI sequences.",
      year: "2024",
      tags: ["ROS 2", "GICP", "Pose Graph", "KITTI"],
      status: "Completed",
      github: "https://github.com/Pana1v/go-slam",
      image: "/projects/go-slam.png"
    },
    {
      id: "gnn-robotic-manipulation",
      n: "05",
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
      n: "06",
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
      n: "07",
      title: "ABU Robocon",
      subtitle: "Captain, IIT Patna",
      description: "Led 60+ students to the National Finals of ABU Robocon, one of only two IITs to qualify in Asia's largest robotics event. Achieved the highest score among IIT teams in 2024. Designed PCBs for motor control, sensor integration, and power management. Founded a 35-student team for ISRO Robotics Challenge 2024.",
      year: "2022 — 2024",
      tags: ["PCB", "Multi-Robot", "ROS", "Path Planning"]
    },
    {
      id: "flipkart-grid",
      n: "08",
      title: "Flipkart Grid Robotics",
      subtitle: "Computer Vision Pipeline",
      description: "Utilized Mistral LLM, GPT-2, Gemini, and PyTorch for product text extraction and image processing. Trained YOLOv11/v9 models with OpenCV to assess freshness indices of consumables. Implemented U-Net for segmentation and CNN for OCR.",
      year: "2024",
      tags: ["YOLO", "PyTorch", "U-Net"],
      status: "Completed"
    },
    {
      id: "rigbetel-inter-iit",
      n: "09",
      title: "RigBetel Labs",
      subtitle: "Inter IIT Tech Meet 13.0",
      description: "Implemented multi-robot mapping and localization using TurtleBot3 specification robots running ROS 2 Humble in a simulated environment. No-prep problem statement challenge.",
      year: "2024",
      tags: ["ROS 2", "Multi-Robot", "SLAM"]
    }
  ],
  skills: {
    "Systems": ["C/C++", "Python", "Bash", "ROS 2 Humble", "Nav2", "CMake", "Colcon", "Docker", "Linux", "Git", "CI/CD"],
    "Autonomy": ["SLAM", "Localization (AMCL)", "Path Planning", "Sensor Fusion (EKF)", "Custom Motion Models", "MPPI"],
    "Perception": ["OpenCV", "YOLO v9/v11", "DeepSort", "U-Net", "OCR", "PyTorch", "GNN (GATv2)"],
    "Simulation": ["Gazebo", "RViz2", "Foxglove", "NVIDIA Isaac Sim"],
    "Embedded": ["micro-ROS", "ESP32", "Raspberry Pi", "PCB Design (KiCAD)"],
    "Web": ["TypeScript", "Node.js", "WebSockets"],
    "Engineering": ["GTest", "PyTest", "GitHub Actions", "GitLab CI", "Agile/Scrum", "Asana", "Confluence"]
  },
  myProjects: [
    {
      title: "Polka",
      tagline: "Multi-LiDAR fusion & pointcloud processing for ROS 2",
      description: "A ROS 2 multi-LiDAR fusion node that merges heterogeneous PointCloud2 and LaserScan streams into unified outputs with a single composable pipeline. Features per-source filtering, TF2-aligned fusion, optional CUDA acceleration, and IMU-based deskewing with per-source IMU overrides for articulated platforms. Supports ROS 2 Humble and Jazzy.",
      stack: ["C++", "ROS 2", "PCL", "CUDA"],
      stars: "\u2605 22",
      link: "https://github.com/Pana1v/Polka"
    }
  ],
  contributions: [
    {
      title: "Nav2 (Navigation2)",
      description: "Custom swerve drive motion model for the MPPI Controller; collision-monitor modules for the ROS 2 navigation stack.",
      link: "https://github.com/ros-navigation/navigation2"
    },
    {
      title: "PlotJuggler",
      description: "Contributions to the popular time-series visualization tool for ROS: bug fixes, plugin improvements, and schema support for custom message types.",
      link: "https://github.com/facontidavide/PlotJuggler"
    },
    {
      title: "AutonomousVehicleControlBeginnersGuide",
      description: "Contributing to and maintaining educational resources for autonomous systems algorithms: path planning, SLAM, and localization.",
      link: "https://github.com/ShisatoYano/AutonomousVehicleControlBeginnersGuide"
    }
  ],
  blogs: [
    {
      id: "intrinsic-challenge",
      n: "01",
      title: "A Journey Through the Intrinsic AI for Industry Challenge",
      subtitle: "A sprint through the final week before the deadline, iterating classical and alternative approaches first to dodge the data wall for imitation learning.",
      date: "May 2026",
      readTime: "Read on Substack",
      tags: ["Imitation Learning", "Manipulation"],
      excerpt: "A sprint through the final week before the deadline, iterating classical and alternative approaches first to dodge the data wall for imitation learning.",
      source: "Substack",
      href: "https://substack.com/@panav1/p-198501217",
      content: ""
    },
    {
      id: "robotics-handbook",
      n: "02",
      title: "The Ultimate Robotics Handbook",
      subtitle: "A living field guide to robotics, from kinematics and SLAM to controls and perception. Notes I keep adding to as I learn.",
      date: "Ongoing",
      readTime: "Read the handbook",
      tags: ["Reference", "Robotics"],
      excerpt: "A living field guide to robotics, from kinematics and SLAM to controls and perception. Notes I keep adding to as I learn.",
      source: "GitBook",
      href: "https://panav.gitbook.io/robotics-handbook",
      content: ""
    },
  ],
  achievements: [
    "Gold Medal at Inter IIT Tech 12.0 (Jaguar Land Rover Chiplet Challenge for ADAS Solutions)",
    "Karnataka Rank 8 in NSTSE 2020",
    "Top 0.5% in JEE Advanced 2021",
    "Captain of IIT Patna's Robocon team, highest IIT score at ABU Robocon 2024",
    "Highest score by an Indian team in IEEE ICRA BARN Challenge since 2022"
  ]
};
