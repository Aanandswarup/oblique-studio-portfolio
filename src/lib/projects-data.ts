export interface Project {
  id: string;
  number: string;
  title: string;
  client: string;
  year: string;
  category: string;
  tags: string[];
  tagline: string;
  image: string;
  accent: string;
  role: string;
  awards: string[];
  metrics: { label: string; value: string }[];
  overview: string;
  challenge: string;
  craftDetails: string[];
}

export const PROJECTS: Project[] = [
  {
    id: "aura-neural",
    number: "01",
    title: "AURA NEURAL ARCHITECTURE",
    client: "Aura Neural Foundation — Zurich",
    year: "2026",
    category: "Spatial Computing / WebGL",
    tags: ["Three.js", "GLSL Raymarching", "Spatial Audio", "GSAP"],
    tagline: "An interactive spatial monument translating synthetic neural weights into habitable digital architecture.",
    image: "/works/aura.jpg",
    accent: "#d4ff00",
    role: "Lead Creative Direction & Interactive Architecture",
    awards: ["Awwwards Site of the Month", "FWA of the Day", "Developer Award"],
    metrics: [
      { label: "Render Frame Rate", value: "120 FPS" },
      { label: "Geometry Complexity", value: "240k Polys" },
      { label: "Shader Passes", value: "6 Custom Post-FX" },
      { label: "Initial Load", value: "< 780ms" }
    ],
    overview:
      "Aura Neural is an architectural visualization system built for researchers exploring deep neural latent topology. We engineered a spatial web environment where visitors navigate non-Euclidean brutalist geometries that pulse and recalibrate in real-time based on multidimensional tensor vectors.",
    challenge:
      "Translating complex high-dimensional activation matrices into intuitive, tactile 3D forms without sacrificing 60fps performance across mobile and desktop devices.",
    craftDetails: [
      "Procedural volumetric raymarching for bioluminescent neural filament paths",
      "Dynamic physical glass refraction calculating real-time chromatic aberration",
      "Web Audio binaural spatialization tied directly to camera orbital velocity"
    ]
  },
  {
    id: "kinesis-chrono",
    number: "02",
    title: "KINESIS CHRONO MONOLITH",
    client: "Kinesis Chronométrie — Genève",
    year: "2026",
    category: "Interactive Horology / Physics",
    tags: ["React Three Fiber", "Verlet Physics", "Custom Shaders", "Lenis"],
    tagline: "Deconstructed mechanical horology suspended in zero gravity with real-time liquid mercury physics.",
    image: "/works/kinesis.jpg",
    accent: "#d4ff00",
    role: "Technical Direction & 3D Interactive Engineering",
    awards: ["Awwwards Site of the Day", "CSSDA Best UI / UX", "FWA of the Day"],
    metrics: [
      { label: "Physics Calculations", value: "1000 iter/s" },
      { label: "Material Fidelity", value: "PBR Titanium" },
      { label: "Input Latency", value: "2.4ms" },
      { label: "Scrollytelling Sync", value: "Zero Drift" }
    ],
    overview:
      "Commissioned by haute horlogerie atelier Kinesis to announce their first gravity-defying balance wheel escapement. We developed an exploded mechanical viewport where users can disassemble, scrub through temporal gears, and manipulate floating mercury orbs with cursor inertia.",
    challenge:
      "Synchronizing micro-mechanical tooth engagements with scroll velocity while preserving realistic metallic reflections under varying synthetic studio lighting.",
    craftDetails: [
      "Rigid body Verlet integration computed directly in Web Workers for silky UI thread headroom",
      "Anisotropic brushed titanium and forged carbon fiber physical shader materials",
      "Elastic magnetic snap zones that pull the user camera to critical gear train complications"
    ]
  },
  {
    id: "hyperion-sound",
    number: "03",
    title: "HYPERION SOUND LAB",
    client: "Hyperion Acoustic Systems — Berlin",
    year: "2025",
    category: "Acoustic Generative / Web Audio",
    tags: ["Web Audio API", "Three.js", "FFT Analysis", "Kinetic Type"],
    tagline: "A brutalist acoustic cathedral visualizing sound wave propagation across undulating liquid chrome topography.",
    image: "/works/hyperion.jpg",
    accent: "#d4ff00",
    role: "Creative Development & Generative Audio Synth",
    awards: ["FWA of the Month", "Awwwards Developer Award"],
    metrics: [
      { label: "Audio Engine", value: "Pure Web Audio" },
      { label: "FFT Bins", value: "2048 Realtime" },
      { label: "Vertex Displacement", value: "GPU Compute" },
      { label: "Lighthouse Performance", value: "98 / 100" }
    ],
    overview:
      "A digital monument celebrating 50 years of German acoustic engineering. The experience converts microphone input or curated synthetic soundscapes into undulating chrome wave topography that physically bends the surrounding brutalist architecture.",
    challenge:
      "Achieving instant audio-visual synchronization without noticeable delay between sound transients and vertex shader displacement.",
    craftDetails: [
      "Real-time Fast Fourier Transform (FFT) analysis mapped directly to vertex shader uniforms",
      "Dynamic specular highlights with metallic environment mapping on fluid chrome surfaces",
      "Integrated analog synthesizer allowing visitors to manipulate resonance, cutoff, and delay"
    ]
  },
  {
    id: "void-spectra",
    number: "04",
    title: "VOID SPECTRA ATELIER",
    client: "Spectra Digital Haute Couture — Paris",
    year: "2025",
    category: "Computational Fashion / Materiality",
    tags: ["WebGL", "Cloth Simulation", "Spectral Refraction", "GSAP"],
    tagline: "Autonomous digital couture sculpted from dark glass and suspended refracted light spectrums.",
    image: "/works/void.jpg",
    accent: "#d4ff00",
    role: "Concept, Computational Design & Web Experience",
    awards: ["Awwwards Site of the Day", "Tokyo TDC Annual", "FWA of the Day"],
    metrics: [
      { label: "Cloth Mesh Nodes", value: "48,000" },
      { label: "Refraction Index", value: "IOR 1.52 Glass" },
      { label: "DPR Cap", value: "2.0 Retina" },
      { label: "A11y Rating", value: "WCAG AAA" }
    ],
    overview:
      "An experimental digital showroom showcasing an autonomous algorithmic fashion collection. Each silhouette breathes and flows in computational wind currents, reacting to cursor proximity with iridescent chromatic dispersion.",
    challenge:
      "Rendering translucent glass textiles with convincing physical weight, thickness, and caustics within a lightweight web canvas.",
    craftDetails: [
      "Curvature-based Fresnel transmission shader simulating dual-layered dark organza and quartz glass",
      "Kinetic typography layout that morphs as the garment billows across the viewport",
      "Haptic micro-audio clicks accompanying every material warp and fold"
    ]
  }
];
