/* Atlas - shared content data */
window.ATLAS_DATA = {
  name: "Panav Arpit Raaj",
  role: "Robotics software engineer",
  location: "Bangalore, India",
  status: { date: "Sep 2026", text: "Building the autonomy stack for agricultural robots at Eternal.ag." },
  contact: {
    email: "praajarpit@gmail.com",
    altEmail: "panav.raaj@hotmail.com",
    github: "https://github.com/Pana1v",
    linkedin: "https://linkedin.com/in/panavraaj",
    handbook: "https://panav.gitbook.io/robotics-handbook",
    substack: "https://substack.com/@panav1"
  },

  /* One index. Everything on the site is an entry here.
     kinds drives the glyphs: build | essay | paper | tool | competition.
     An entry can carry more than one kind - it then surfaces under every
     matching filter and its row shows one icon and one color segment per kind. */
  index: [
    { id: "intrinsic-challenge", kinds: ["essay"], year: "2026", title: "A Journey Through the Intrinsic AI for Industry Challenge",
      summary: "Dodging the data wall in imitation learning by exhausting classical methods first.",
      facts: ["Final week sprint", "Classical before learned", "Substack, May 2026"],
      body: "A sprint through the last week before the deadline. Rather than starting from imitation learning and hitting the data wall, I iterated classical and alternative approaches first, and only reached for learned policies where the classical stack genuinely ran out.",
      href: "https://substack.com/@panav1/p-198501217", hrefLabel: "Read on Substack", hrefKind: "substack",
      tags: ["Imitation Learning", "Manipulation"], showcase: true },

    { id: "robotics-handbook", kinds: ["essay"], year: "Ongoing", title: "The Ultimate Robotics Handbook",
      summary: "A living field guide: kinematics, SLAM, controls, perception.",
      facts: ["Open, ongoing", "Kinematics to perception", "GitBook"],
      body: "Notes I keep adding to as I learn. Written as the reference I wanted when I started: derivations kept, shortcuts flagged, and each section standing on its own.",
      href: "https://panav.gitbook.io/robotics-handbook", hrefLabel: "Read the handbook", hrefKind: "gitbook",
      tags: ["Reference", "Robotics"], showcase: true },

    { id: "lichtblick", kinds: ["build", "tool"], year: "2025", title: "Lichtblick",
      summary: "A ROS 2 visualization stack that cut peak compute by 4.6x against Foxglove.",
      facts: ["120% to 26% peak CPU", "Browser and Android", "MoveIt2 + pose recovery"],
      body: "A TypeScript and ROS 2 visualization tool built at 10xConstruction. Pose recovery, MoveIt2 support, and a render path that holds up on the low-power compute actually mounted on the robot.",
      lesson: "I rewrote the transport layer before profiling the render loop. The bottleneck was never where I assumed.",
      repo: "https://github.com/Pana1v/lichtblick",
      tags: ["TypeScript", "ROS 2", "WebSockets"], showcase: true },

    { id: "gnn", kinds: ["paper"], year: "2025", title: "Graph-Learned Manipulation",
      summary: "NP-hard pick-and-place sequencing recast as graph classification with GATv2.",
      facts: ["Under 2% gap to ILP at 40 objects", "Under 400ms inference", "Scales 5 to 200+ objects"],
      body: "Formulated NP-hard pick-and-place sequencing as a graph classification task using GATv2, trained via imitation on ILP demonstrations with a curriculum from 5 to 200+ objects. It stays within 2% of the ILP optimum at 40 objects and returns in under 400ms where the solver stalls outright.",
      lesson: "The curriculum schedule mattered more than the architecture. I spent too long tuning GATv2 depth and not enough on how examples were ordered.",
      repo: "https://github.com/Pana1v/graph-manipulation",
      tags: ["PyTorch", "GATv2", "Imitation"], showcase: false },

    { id: "slam", kinds: ["build"], year: "2024", title: "Autonomous Nav and SLAM",
      summary: "A differential-drive AMR built from URDF to hardware interface, as a thesis.",
      facts: ["micro-ROS on ESP32", "EKF wheel + IMU fusion", "Parametric URDF/Xacro"],
      body: "A differential-drive AMR built from scratch: parametric URDF and Xacro with real inertia and collision geometry for both Gazebo and hardware, a micro-ROS hardware interface on ESP32 bridging drivers and encoders through ros2_control for real-time velocity control, and EKF fusion on top.",
      lesson: "I should have written the hardware interface against a simulated encoder first. Debugging timing on real silicon cost weeks I did not have.",
      repo: "https://github.com/Pana1v/autonomous-nav-slam",
      tags: ["ROS 2", "Nav2", "Gazebo", "ESP32"], showcase: true },

    { id: "polka", kinds: ["tool"], year: "Ongoing", title: "Polka",
      summary: "Composable ROS 2 node for real-time pointcloud pre-processing.",
      facts: ["45 stars", "C++ / PCL", "Tuned for field latency"],
      body: "An efficient, composable ROS 2 node for filtering, downsampling, and transforming 3D LiDAR data. Built for real-time perception pipelines where the pre-processing budget is measured in single-digit milliseconds.",
      repo: "https://github.com/Pana1v/polka",
      tags: ["C++", "ROS 2", "PCL"], showcase: false },

    { id: "robocon", kinds: ["competition", "build"], year: "2023-24", title: "ABU Robocon",
      summary: "Captained IIT Patna to the National Finals; built the boards and the vision stack.",
      facts: ["National Finals", "Highest IIT score, 2024", "Led 60+ students"],
      body: "I designed the motor-control, power, and sensor-integration PCBs, and wrote the vision and multi-bot coordination running across Cube Orange, Raspberry Pi, Arduino, and ESP32. As captain I owned the build schedule and the subsystem handoffs across a team of 60+, and we finished as one of only two IITs to qualify for the National Finals.",
      lesson: "We froze the mechanical design too late. Every electronics revision after that was reactive.",
      repo: "https://github.com/Pana1v/robocon",
      tags: ["PCB", "Multi-Robot", "Vision"], showcase: false },

    { id: "bridge", kinds: ["tool"], year: "2024", title: "Phone-ROS Bridge",
      summary: "Turns a phone into a ROS 2 sensor source over WebSocket.",
      facts: ["WebSocket + REST", "Three.js 3D dashboard", "SSL/TLS, ROS Humble"],
      body: "A Node.js and Python server for real-time mobile sensor collection, with a Three.js dashboard for 3D visualization of the incoming streams.",
      lesson: "The REST path was dead weight. WebSocket alone would have halved the surface area.",
      repo: "https://github.com/Pana1v/phone-ros-bridge",
      tags: ["Node.js", "WebSockets", "Three.js"], showcase: false }],

  experience: [
    { org: "Eternal.ag", role: "Robotics Engineer Level II", period: "Jan 2026", end: "", current: true,
      note: "Autonomy stack for agricultural robots in unstructured outdoor environments." },
    { org: "10xConstruction.ai", role: "Robotics Software Apprentice", period: "Jul 2025", end: "Jan 2026",
      note: "Swerve-drive motion model in Nav2 MPPI. Ambiguity detection and ROI auto-initialization by genetic algorithm. Multi-modal EKF fusion with 3D ICP. Built Lichtblick." },
    { org: "Addverb Technologies", role: "Mobile Robotics Intern", period: "May 2024", end: "Aug 2024",
      note: "AMR localization and mapping with 2D LiDAR, RealSense, monocular cameras. FLIRT and FALKO features, graph optimization on IRIS LaMa." }],

  education: [
    { org: "IIT Patna", role: "B.Tech, Electrical and Electronics Engineering", period: "2021", end: "2025",
      note: "Robotics and AI. Gold Medalist, Inter IIT Tech 12.0. Robocon captain. Founded IIT Patna's Rover Team for IRoC-U 2024." },
    { org: "Clarence High School, Bangalore", role: "Indian School Certificate", period: "2019", end: "2020",
      note: "95.5%. Karnataka Rank 8, NSTSE 2020." }],

  upstream: [
    { title: "Nav2", note: "Swerve-drive motion model for the MPPI controller; collision-monitor modules.", link: "https://github.com/ros-navigation/navigation2" },
    { title: "PlotJuggler", note: "Bug fixes, plugin improvements, schema support for custom message types.", link: "https://github.com/facontidavide/PlotJuggler" },
    { title: "AV Control Beginners Guide", note: "Maintaining educational implementations of planning, SLAM, localization.", link: "https://github.com/ShisatoYano/AutonomousVehicleControlBeginnersGuide" }],

  skills: {
    "Systems": ["C/C++", "Python", "ROS 2 Humble", "Nav2", "CMake", "Docker", "Linux"],
    "Autonomy": ["SLAM", "AMCL", "Path Planning", "EKF", "MPPI", "Motion Models"],
    "Perception": ["OpenCV", "YOLO v9/v11", "DeepSort", "U-Net", "PyTorch", "GATv2"],
    "Simulation": ["Gazebo", "RViz2", "Foxglove", "Isaac Sim"],
    "Embedded": ["micro-ROS", "ESP32", "Raspberry Pi", "KiCAD"]
  }
};

window.ATLAS_KINDS = {
  build: "Build", essay: "Writing", paper: "Paper", tool: "Tool", competition: "Competition"
};

window.ATLAS_SECTIONS = [
  { id: "index-section", label: "Index" },
  { id: "ledger-section", label: "Ledger" },
  { id: "toolkit-section", label: "Toolkit" },
  { id: "colophon-section", label: "Colophon" }
];
