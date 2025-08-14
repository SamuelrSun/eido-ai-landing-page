export const howSteps = [
  {
    id: 1,
    title: "Upload your materials",
    description:
      "Import PDFs, PPTs, notes, and past assignments into organized classes.",
    icon: "FileUp",
  },
  {
    id: 2,
    title: "Ask the Oracle",
    description:
      "Chat with an AI trained only on your class content. Get precise, citable answers.",
    icon: "MessageSquare",
  },
  {
    id: 3,
    title: "Master your courses",
    description:
      "Generate flashcards, quizzes, and a unified calendar of deadlines.",
    icon: "GraduationCap",
  },
];

export const features = {
  oracle: {
    title: "Chat with your coursework, not the entire web.",
    subtitle:
      "Eido's Oracle answers using your uploaded materials only, and cites sources for trust.",
    genericExample:
      "The mitochondria is the powerhouse of the cell. Sources include general biology websites.",
    oracleExample:
      "Based on Lecture 03 (Slide 14) and Chapter 2 notes, oxidative phosphorylation increases ATP yield during aerobic respiration (Smith 2023, p. 45).",
    citations: [
      { label: "Lecture 03", meta: "Slide 14" },
      { label: "Chapter 2 notes", meta: "Smith 2023, p.45" },
    ],
  },
  calendar: {
    title: "Never miss a deadline again.",
    subtitle:
      "Upload your syllabus and let Eido AI auto-populate your calendar with key dates.",
    sampleDates: [
      { date: "Sep 12", label: "Problem Set 1 due" },
      { date: "Oct 03", label: "Midterm Exam" },
      { date: "Nov 21", label: "Project Milestone" },
    ],
  },
  extension: {
    title: "Your AI copilot, everywhere you go.",
    subtitle:
      "Access the Oracle from any website with our Chrome extension for frictionless study.",
  },
  faqs: [
    {
      q: "How is my data secured?",
      a: "Your uploads are private to your account. We use encrypted storage and never train global models on your data.",
    },
    {
      q: "Can classmates collaborate?",
      a: "Yes. Create shared classes so everyone can contribute materials and benefit from the same Oracle context.",
    },
    {
      q: "Do I need to install anything?",
      a: "No to start—Eido runs in the browser. The Chrome extension is optional for on-the-go access.",
    },
  ],
};

export const testimonials = [
  {
    name: "Sarah J.",
    role: "University Student",
    quote:
      "Eido's Oracle saved me hours of digging through lecture notes. The citations are a game-changer for papers.",
  },
  {
    name: "Mike T.",
    role: "College Student",
    quote:
      "The syllabus-to-calendar feature is a lifesaver. I finally feel organized and on top of deadlines.",
  },
  {
    name: "Ava K.",
    role: "CS Undergrad",
    quote:
      "I love how specific the answers are—it's like chatting with my course, not the internet.",
  },
  {
    name: "David L.",
    role: "Medical Student",
    quote:
      "Generating flashcards from my lecture PDFs is incredibly fast and effective for studying.",
  },
  {
    name: "Chloe M.",
    role: "Law Student",
    quote:
      "Being able to ask questions about specific case files and get cited answers is indispensable.",
  },
  {
    name: "Ethan P.",
    role: "Engineering Student",
    quote:
      "Eido helps me quickly find formulas and concepts from past assignments. It's my go-to study tool.",
  },
  {
    name: "Olivia R.",
    role: "History Major",
    quote:
      "The ability to consolidate all my readings and notes into one searchable place is amazing.",
  },
  {
    name: "Ben S.",
    role: "PhD Candidate",
    quote:
      "I use this for my literature reviews. Asking the Oracle complex questions saves me so much time.",
  },
  {
    name: "Mia W.",
    role: "Business Student",
    quote:
      "The Chrome extension is fantastic for quick questions while I'm doing research online.",
  },
   {
    name: "Noah G.",
    role: "Art History Student",
    quote:
      "It's brilliant for finding specific details about artworks across dozens of lecture slides.",
  },
  {
    name: "Isabella H.",
    role: "Psychology Student",
    quote:
      "Creating practice quizzes based on my actual course material has been key to my exam prep.",
  },
  {
    name: "Liam F.",
    role: "Physics Undergrad",
    quote:
      "Finally, I don't have to skim through 20 different PDFs to find one equation. A total lifesaver.",
  },
];