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
  substackUrl?: string;
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
  achievements: string[];
}

export const DATA: DataStructure = {
  name: "Panav Arpit Raaj",
  title: "Robotics Software Engineer",
  dateline: "Bangalore, Spring 2026",
  shortBio: "Robotics software engineer. I write autonomy stacks for robots that make decisions in unpredictable places: warehouses, farms, construction sites.",
  bio: "B.Tech from IIT Patna specializing in autonomous systems, SLAM, and computer vision. Gold Medalist at Inter IIT Tech 12.0. Captain of IIT Patna's Robocon team, highest score among IITs at ABU Robocon 2024. Karnataka Rank 8 in NSTSE. Building intelligent robots that navigate the real world.",
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
      image: "/projects/barn.png"
    },
    {
      id: "lichtblick",
      n: "03",
      title: "Lichtblick",
      subtitle: "Custom ROS 2 Visualization Stack",
      description: "Engineered a TypeScript/ROS2 visualization tool that reduced peak compute usage from 120% to 26% compared to Foxglove. Integrates pose recovery, MoveIt2 support, and runs in browser and Android apps.",
      year: "2025",
      tags: ["TypeScript", "ROS 2", "WebSockets", "MoveIt2"],
      status: "Active",
      image: "/projects/lichtblick.png"
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
      id: "phone-ros-bridge",
      n: "08",
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
      n: "09",
      title: "Flipkart Grid Robotics",
      subtitle: "Computer Vision Pipeline",
      description: "Utilized Mistral LLM, GPT-2, Gemini, and PyTorch for product text extraction and image processing. Trained YOLOv11/v9 models with OpenCV to assess freshness indices of consumables. Implemented U-Net for segmentation and CNN for OCR.",
      year: "2024",
      tags: ["YOLO", "PyTorch", "U-Net"],
      status: "Completed"
    },
    {
      id: "rigbetel-inter-iit",
      n: "10",
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
      id: "intro-to-slam",
      n: "I",
      title: "Where Am I? Notes on SLAM",
      subtitle: "On the peculiar problem of building a map while you're still inside it.",
      date: "March 15, 2024",
      readTime: "9 min",
      tags: ["Robotics", "Algorithms"],
      excerpt: "A robot entering an unknown room faces a chicken-and-egg problem. To know where it is, it needs a map. To build a map, it needs to know where it is. SLAM is the elegant, uneasy resolution.",
      substackUrl: "https://substack.com/@panav1",
      content: `A robot entering a room it has never seen before faces a peculiar epistemological problem. To know where it is, it needs a map. To build a map, it needs to know where it is. SLAM — Simultaneous Localization and Mapping — is the field's uneasy, elegant resolution to this chicken-and-egg situation.

The trick is to treat both the robot's pose and the map as random variables, and to update our beliefs about them jointly, every time a new sensor reading arrives. Uncertainty in one infects the other; that is the whole story.

## A State Vector That Grows

At time t we write the state as a vector containing the robot's pose and every landmark we have so far encountered:

$$x_t = [ p_t, \\theta_t, m_1, m_2, \\ldots, m_n ]^T$$

where $p_t$ is the position, $\\theta_t$ the orientation, and each $m_i$ a landmark in the global frame. The dimensionality grows as the robot explores — and with it, the cost of every update.

## The Extended Kalman Filter

The classical EKF-SLAM formulation linearizes the motion and measurement models around the current estimate. The prediction step propagates the prior:

$$\\hat{x}_{t|t-1} = f( \\hat{x}_{t-1|t-1}, u_t )$$

$$P_{t|t-1} = F_t P_{t-1|t-1} F_t^T + Q_t$$

It works, with caveats. The linearization breaks down under large heading errors; the covariance matrix is dense and grows quadratically. Modern systems — graph-SLAM, factor graphs, iSAM2 — address this with sparsity, but the EKF remains the conceptual point of entry.

> Every map is a hypothesis the robot is still testing.

## What I Think About Now

Most of the interesting questions in SLAM are no longer about filters. They are about representation — when is a voxel grid the right primitive, when is a mesh, when a neural field — and about degeneracy, the moments when sensor geometry stops constraining your estimate and you need to know, silently, that you are drifting.

The robots that will matter over the next decade will be the ones that know what they don't know. SLAM, done well, is the substrate for that kind of humility.`
    },
    {
      id: "narrow-passages",
      n: "II",
      title: "The Tyranny of Narrow Passages",
      subtitle: "What happens to your sampling-based controller when the free space shrinks.",
      date: "February 2, 2026",
      readTime: "7 min",
      tags: ["Controls", "MPPI"],
      excerpt: "In open space, MPPI is a joy — throw noise at the control, watch the best rollout emerge. In a doorway, it collapses. Here's what I learned tuning it for construction sites.",
      substackUrl: "https://substack.com/@panav1",
      content: `There is a particular kind of heartbreak reserved for people who have tuned a Model Predictive Path Integral controller for the first time. In open space, MPPI is a joy. You throw Gaussian noise at the control, you score each rollout with a hand-crafted cost, and — as if by arithmetic magic — a smooth, near-optimal trajectory crystallizes out of the mean.

Then you put the robot in a doorway, and the magic stops.

## Why It Breaks

Sampling-based controllers are, at heart, Monte Carlo estimators. They need variance. They need enough rollouts to collide with the walls on both sides so the safe ones can dominate the softmax. In a narrow passage the viable set is a thin sliver of configuration space, and uniform noise in control space produces a distribution that mostly misses it.

The symptom is oscillation: the robot enters the passage, clips a wall in its rollouts, the cost spikes, the mean veers, it clips the other wall, and so on. You watch it wobble down a corridor you could walk through blindfolded.

## What Actually Helped

Three changes moved the needle. First: state-dependent noise. In open space we let the controller breathe with a wide covariance; near obstacles we shrink it in the direction of the passage axis. Second: a forward-looking cost term — not just "don't hit anything now" but "don't box yourself in." Third: a swerve-drive motion model with the actual steering-angle and speed limits, not an idealized holonomic proxy.

None of this is clever. It's the unglamorous work of making a controller take the robot seriously as an object with inertia and joints.

> A good controller is one that knows the shape of its own failures.`
    },
    {
      id: "lichtblick-notes",
      n: "III",
      title: "On Writing Your Own Foxglove",
      subtitle: "A short defense of building tools in-house when the off-the-shelf ones stop fitting.",
      date: "December 18, 2025",
      readTime: "6 min",
      tags: ["Tooling", "TypeScript"],
      excerpt: "We built a custom ROS 2 visualization stack in TypeScript. It cut peak compute from 120% to 26% and changed how the team debugs.",
      substackUrl: "https://substack.com/@panav1",
      content: `There is a well-worn piece of advice about not building your own tools. Use the good ones that exist. Don't waste your engineers on yak-shaves. For a long time I agreed with it. I still mostly do. But there's a point — and you recognize it when you hit it — where the off-the-shelf tool starts shaping your work in ways you don't want.

For us, that was visualization. Foxglove is a beautiful piece of software. It is also, for our use case, heavy. On a field laptop running next to a live robot, it was taking 120% of one CPU just to render what was happening. That's not a bug, it's a mismatch.

## What We Kept

Lichtblick — the thing we built — is a thin TypeScript layer over the ROS 2 WebSocket protocol. We kept the panel model, the layout persistence, and the message schema awareness. We threw out the rendering pipeline and rebuilt it around a single WebGL scene with explicit frame budgeting.

The result: 26% peak CPU on the same laptop. Pose recovery that actually recovers. MoveIt2 integration that doesn't freeze when the trajectory is long. And — this surprised me — it runs on Android, because once you've committed to a browser-native stack, the mobile tax is nearly zero.

## What I Took Away

Build the tool when the tool is the bottleneck, not before. And when you build it, keep it small. Lichtblick is a fraction of Foxglove's feature surface — on purpose. The features we don't have are the features we don't need yet.`
    }
  ],
  achievements: [
    "Gold Medal at Inter IIT Tech 12.0 (Jaguar Land Rover Chiplet Challenge for ADAS Solutions)",
    "Karnataka Rank 8 in NSTSE 2020",
    "Top 0.5% in JEE Advanced 2021",
    "Captain of IIT Patna's Robocon team, highest IIT score at ABU Robocon 2024",
    "Highest score by an Indian team in IEEE ICRA BARN Challenge since 2022"
  ]
};
