import { DATA } from '../data';

export type Kind = 'build' | 'essay' | 'paper' | 'tool' | 'competition';

export const KINDS: Record<Kind, string> = {
  build: 'Build', essay: 'Writing', paper: 'Paper', tool: 'Tool', competition: 'Competition',
};

export interface Entry {
  id: string;
  kinds: Kind[];
  shape: string;
  year: string;
  title: string;
  summary: string;
  facts: string[];
  body: string;
  lesson?: string;
  tags: string[];
  repo?: string;
  href?: string;
  hrefLabel?: string;
  hrefKind?: string;
  image?: string;
  motion?: string;
  more?: string[];
}

interface Meta {
  kinds: Kind[];
  // ASCII field shape shown while the row is hovered
  shape: string;
  facts: string[];
  summary?: string;
  body?: string;
  lesson?: string;
}

// Presentation-only fields the field layout needs on top of src/data.ts.
// Keyed by data id so the Dashboard's save path keeps working untouched.
const META: Record<string, Meta> = {
  'deskew-lidar': {
    kinds: ['essay'], shape: 'cloud',
    facts: ['0.48 m to 0.10 m object spread', 'Compared with GLIM, rko_lio, LIO-SAM', 'Substack, Oct 2026'],
  },
  'intrinsic-challenge': {
    kinds: ['essay'], shape: 'demo',
    facts: ['Final week sprint', 'Classical before learned', 'Substack, May 2026'],
    summary: 'Dodging the data wall in imitation learning by exhausting classical methods first.',
    body: 'A sprint through the last week before the deadline. Rather than starting from imitation learning and hitting the data wall, I iterated classical and alternative approaches first, and only reached for learned policies where the classical stack genuinely ran out.',
  },
  'robotics-handbook': {
    kinds: ['essay'], shape: 'book',
    facts: ['Open, ongoing', 'Kinematics to perception', 'GitBook'],
    summary: 'A living field guide: kinematics, SLAM, controls, perception.',
    body: 'Notes I keep adding to as I learn. Written as the reference I wanted when I started: derivations kept, shortcuts flagged, and each section standing on its own.',
  },
  'egocentric-pipeline': {
    kinds: ['build'], shape: 'demo',
    facts: ['Dec 2025 - Jan 2026', '$0.30 per video hour, hand tracking', 'Prelabelling $7.00 to $0.80 per hour'],
    summary: 'First-person video to annotated sequences: depth, hand pose, automated prelabelling.',
  },
  'leap': {
    kinds: ['paper'], shape: 'graph',
    facts: ['17.5x speedup at N=200', '0.06% worst-case gap', 'O(N²) to O(Nk) variables'],
    lesson: 'The curriculum schedule mattered more than the architecture. I spent too long tuning GAT depth and not enough on how examples were ordered.',
  },
  'barn-challenge': {
    kinds: ['competition', 'build'], shape: 'plan',
    facts: ['0.3682 / 0.5 score', '76% goal reach, zero-shot', '300 Gazebo courses'],
  },
  'openpi-dora': {
    kinds: ['build'], shape: 'net',
    facts: ['92.0% vs 91.4% at rank 8', 'Wins 3 of 4 LIBERO suites', 'openpi left untouched'],
  },
  'go-slam': {
    kinds: ['build'], shape: 'map',
    facts: ['GICP + pose graph', 'Custom LM solvers', 'Benchmarked on KITTI'],
  },
  'autonomous-nav-slam': {
    kinds: ['build'], shape: 'ekf',
    facts: ['micro-ROS on ESP32', 'EKF wheel + IMU fusion', 'Parametric URDF/Xacro'],
    summary: 'A differential-drive AMR built from URDF to hardware interface, as a thesis.',
    lesson: 'I should have written the hardware interface against a simulated encoder first. Debugging timing on real silicon cost weeks I did not have.',
  },
  'abu-robocon': {
    kinds: ['competition', 'build'], shape: 'bot',
    facts: ['National Finals', 'Highest IIT score, 2024', 'Led 60+ students'],
    summary: 'Captained IIT Patna to the National Finals; built the boards and the vision stack.',
    lesson: 'We froze the mechanical design too late. Every electronics revision after that was reactive.',
  },
  'flipkart-grid': {
    kinds: ['competition'], shape: 'vision',
    facts: ['YOLOv11 / v9 freshness', 'U-Net segmentation', 'CNN OCR'],
  },
  'rigbetel-inter-iit': {
    kinds: ['competition'], shape: 'swarm',
    facts: ['TurtleBot3, ROS 2 Humble', 'Multi-robot mapping', 'No-prep challenge'],
  },
  'polka': {
    kinds: ['tool'], shape: 'cloud',
    facts: ['C++ / PCL / CUDA', 'IMU deskewing', 'Humble and Jazzy'],
  },
};

const compactYear = (y: string) => y.replace(/\s*\u2014\s*/g, '-');

// Entries added through the Dashboard have no META yet; give them a plain default
// so a new project shows up instead of blanking the page.
const meta = (id: string, fallback: Meta): Meta => META[id] ?? fallback;

const essays: Entry[] = DATA.blogs.map(b => {
  const m = meta(b.id, { kinds: ['essay'], shape: 'book', facts: [] });
  return {
    id: b.id, kinds: m.kinds, shape: m.shape, year: b.date, title: b.title,
    summary: m.summary ?? b.excerpt, facts: m.facts, body: m.body ?? b.excerpt, lesson: m.lesson,
    tags: b.tags, href: b.href, hrefLabel: b.readTime, hrefKind: b.source?.toLowerCase(),
    image: b.image, motion: b.motion,
  };
});

const projects: Entry[] = DATA.projects.map(p => {
  const m = meta(p.id, { kinds: ['build'], shape: 'bot', facts: [] });
  return {
    id: p.id, kinds: m.kinds, shape: m.shape, year: compactYear(p.year), title: p.title,
    summary: m.summary ?? p.subtitle, facts: m.facts, body: p.description, lesson: m.lesson,
    tags: p.tags, repo: p.github, href: p.demo, hrefLabel: 'Demo',
    image: p.image, motion: p.motion, more: p.more,
  };
});

const tools: Entry[] = DATA.myProjects.map(t => {
  const id = t.title.toLowerCase();
  const m = meta(id, { kinds: ['tool'], shape: 'cloud', facts: [] });
  return {
    id, kinds: m.kinds, shape: m.shape, year: 'Ongoing', title: t.title,
    summary: t.tagline, facts: [t.stars, ...m.facts].slice(0, 3), body: t.description, lesson: m.lesson,
    tags: t.stack, repo: t.link,
    image: t.image, motion: t.motion, more: t.more,
  };
});

export const INDEX: Entry[] = [...essays, ...projects, ...tools];
