import { courseFees, workshopFees, fmt } from "./pricingConfig";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface SocialIcon {
  id: number;
  class: string;
  href: string;
}

export interface MarqItem {
  id: number;
  name: string;
  img?: string;
  icon?: string;
  color: string;
  darkLogo?: boolean;
}

export interface CurriculumWeek {
  week: string;
  title: string;
  topics: string[];
}

export interface Course {
  id: string;
  slug: string;
  comingSoon?: boolean;
  homepageOrder: number;
  homepageTitle: string;
  badge: string | null;
  badgeColor: string;
  accent: string;
  chapters: string[];
  desc: string;
  category: string;
  categoryLabel: string;
  bannerImage?: string;
  icon: string;
  level: string;
  duration: string;
  modules: number | null;
  color: string;
  enrolledCount: number | null;
  title: string;
  subtitle: string;
  description: string;
  skills: string[];
  outcomes: string[];
  regFee: string | null;
  price: string | null;
  originalPrice: string | null;
  nextBatch: string;
  batchType: string | null;
  instructor: string;
  includes: string[];
  whoIsItFor: string[];
  curriculum: CurriculumWeek[];
}

export interface WorkshopCurriculumItem {
  time: string;
  title: string;
  desc: string;
}

export interface Workshop {
  id: number;
  slug?: string;
  image: string;
  category: string;
  categoryColor: string;
  level?: string;
  title: string;
  desc?: string;
  tags?: string[];
  date: string;
  time?: string;
  duration: string;
  eventMode: string[];
  instructor?: string;
  seatsLeft?: number;
  totalSeats?: number;
  price?: string;
  originalPrice?: string;
  outcomes?: string[];
  curriculum?: WorkshopCurriculumItem[];
  whoIsItFor?: string[];
  attendees?: number;
  rating?: number;
}

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  college?: string;
  image: string;
  bio: string;
  social: { href: string; iconClass: string }[];
}

export interface ContactItem {
  id: number;
  icon: string;
  name: string;
  info: string;
  href?: string;
  alt: string;
}

export interface Testimonial {
  id: number;
  image: string;
  review: string;
  name: string;
  position: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export interface ScrollCard {
  id: number;
  title: string;
  info: string;
}

/* ------------------------------------------------------------------ */
/* Social Icons                                                        */
/* ------------------------------------------------------------------ */

export const socialIconsData: SocialIcon[] = [
  {
    id: 1,
    class: "fab fa-linkedin-in",
    href: "https://www.linkedin.com/company/102031252/admin/dashboard/",
  },
  {
    id: 2,
    class: "fab fa-instagram",
    href: "https://www.instagram.com/analyticshala/",
  },
];

/* ------------------------------------------------------------------ */
/* Hero Marquee                                                        */
/* ------------------------------------------------------------------ */

export const heroMarqData: MarqItem[] = [
  { id: 1, name: "Python", img: "/assets/marq/python.svg", color: "#3776AB" },
  { id: 2, name: "SQL", img: "/assets/marq/postgresql.svg", color: "#4169E1" },
  {
    id: 3,
    name: "TensorFlow",
    img: "/assets/marq/tensorflow.svg",
    color: "#FF6F00",
  },
  { id: 4, name: "PyTorch", img: "/assets/marq/pytorch.svg", color: "#EE4C2C" },
  { id: 5, name: "Jupyter", img: "/assets/marq/jupyter.svg", color: "#F37626" },
  {
    id: 6,
    name: "Scikit-learn",
    img: "/assets/marq/sklearn.svg",
    color: "#F7931E",
  },
  {
    id: 7,
    name: "Pandas",
    img: "/assets/marq/pandas.svg",
    color: "#150458",
    darkLogo: true,
  },
  {
    id: 8,
    name: "NumPy",
    img: "/assets/marq/numpy.svg",
    color: "#4DABCF",
    darkLogo: true,
  },
  {
    id: 9,
    name: "OpenAI",
    img: "/assets/marq/openai.svg",
    color: "#10A37F",
    darkLogo: true,
  },
  {
    id: 10,
    name: "LangChain",
    img: "/assets/marq/langchain.svg",
    color: "#1C3C3C",
    darkLogo: true,
  },
  { id: 11, name: "Excel", icon: "fas fa-file-excel", color: "#217346" },
  { id: 12, name: "Power BI", icon: "fas fa-chart-pie", color: "#F2C811" },
  { id: 13, name: "Tableau", icon: "fas fa-chart-bar", color: "#E97627" },
  { id: 14, name: "ML / AI", icon: "fas fa-brain", color: "#9333EA" },
];

/* ------------------------------------------------------------------ */
/* Courses                                                             */
/* ------------------------------------------------------------------ */

export const coursesData: Course[] = [
  {
    id: "genai-development",
    slug: "genai-development-llm",
    homepageOrder: 1,
    homepageTitle: "GenAI Development",
    badge: "Future Tech",
    badgeColor: "badge-purple",
    accent: "#7209b7",
    chapters: [
      "LLMs",
      "Prompting",
      "APIs",
      "RAG",
      "Agents",
      "MCP",
      "Multimodal",
      "Fine-tuning",
      "Deployment",
    ],
    desc: "Learn how to build real-world applications using Generative AI and Large Language Models.",
    category: "Artificial Intelligence",
    categoryLabel: "AI",
    bannerImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80&auto=format&fit=crop",
    icon: "fas fa-robot",
    level: "Intermediate → Advanced",
    duration: "22 weeks",
    modules: 13,
    color: "card-purple",
    enrolledCount: 120,
    title: "GenAI Development",
    subtitle: "Build AI Apps with LLMs, RAG, Agents, MCP & Production Deployment",
    description:
      "Hands-on program to build production-grade AI applications using LLMs, advanced RAG, agents, MCP, fine-tuning, and multimodal systems.",
    skills: [
      "Generative AI & LLM fundamentals",
      "Prompt engineering & evaluation",
      "LLM APIs & tool calling",
      "Embeddings & vector databases",
      "Advanced & agentic RAG",
      "LLM evaluation & observability",
      "AI agents & workflow automation",
      "MCP (Model Context Protocol)",
      "Multimodal & fine-tuned models",
      "Production deployment & responsible AI",
    ],
    outcomes: [
      "Build real-world AI applications",
      "Create chatbots and assistants",
      "Implement RAG systems",
      "Deploy AI-powered applications",
      "Build portfolio-ready AI projects",
    ],
    regFee: "₹500",
    price: "₹14,999",
    originalPrice: "₹24,999",
    nextBatch: "June 20, 2026",
    batchType: "Weekend Batch",
    instructor: "Faizan Ansari",
    includes: [
      "22 weeks of live sessions",
      "Hands-on AI projects",
      "API access guidance",
      "Deployment support",
      "Capstone project",
      "Career guidance",
    ],
    whoIsItFor: [
      "Developers building AI apps",
      "Data professionals exploring GenAI",
      "Engineers upskilling in AI",
      "Tech enthusiasts",
    ],
    curriculum: [
      {
        week: "Week 1-2",
        title: "Foundations of AI, ML & Generative AI",
        topics: [
          "Introduction to AI, Machine Learning & Deep Learning",
          "Types of ML: Supervised, Unsupervised, Reinforcement Learning",
          "Math essentials for AI: vectors, matrices, probability, optimization intuition",
          "Python for AI: NumPy, Pandas, data handling",
          "Introduction to Generative AI",
          "Understanding LLMs (GPT, Claude, Gemini, open-source models)",
          "Tokens, context windows & transformers (high level)",
          "AI tools ecosystem overview",
          "Real-world AI use cases across industries",
          "AI-assisted coding with GitHub Copilot & Cursor AI",
        ],
      },
      {
        week: "Week 3-4",
        title: "Prompt Engineering & AI Interaction Design",
        topics: [
          "Zero-shot, one-shot & few-shot prompting",
          "Chain-of-thought prompting",
          "Role prompting & instruction hierarchy",
          "Structured outputs & JSON generation",
          "Prompt templates & reusable workflows",
          "Prompt debugging & evaluation",
          "Comparing prompts systematically",
        ],
      },
      {
        week: "Week 5-6",
        title: "Working with LLM APIs",
        topics: [
          "OpenAI API and equivalent providers",
          "Streaming responses",
          "Function/tool calling basics",
          "Token usage & cost optimization",
          "Rate limits & retries",
          "Environment variables & API security",
          "Building simple AI applications",
        ],
      },
      {
        week: "Week 7-8",
        title: "Building AI Applications",
        topics: [
          "Building chatbots & assistants",
          "Memory handling & conversation management",
          "FastAPI / Flask basics",
          "Frontend AI interfaces: Streamlit & Gradio",
          "Logging, debugging & deployment basics",
        ],
      },
      {
        week: "Week 9-10",
        title: "Embeddings, Search & Vector Databases",
        topics: [
          "Embeddings & semantic search",
          "Cosine similarity & distance metrics",
          "Vector databases: FAISS, Pinecone, Weaviate",
          "Chunking strategies",
          "Hybrid search & reranking",
        ],
      },
      {
        week: "Week 11-13",
        title: "Advanced RAG Systems",
        topics: [
          "Naive → advanced → agentic RAG",
          "Document ingestion pipelines",
          "Metadata filtering & retrieval optimization",
          "Guardrails in RAG",
          "Prompt injection protection",
          "GraphRAG basics",
          "Production-grade knowledge systems",
        ],
      },
      {
        week: "Week 14-15",
        title: "LLM Evaluation, Testing & Observability",
        topics: [
          "RAG evaluation metrics",
          "RAGAS, TruLens & DeepEval",
          "A/B testing AI responses",
          "LangSmith tracing & monitoring",
          "Token usage, cost tracking & latency optimization",
        ],
      },
      {
        week: "Week 16",
        title: "AI Agents & Workflow Automation",
        topics: [
          "Agent architectures",
          "Tool calling & orchestration",
          "Planning & execution loops",
          "LangChain & LlamaIndex concepts",
        ],
      },
      {
        week: "Week 17",
        title: "MCP (Model Context Protocol)",
        topics: [
          "MCP architecture: Host, Client & Server",
          "Connecting AI agents to external tools",
          "Building custom MCP servers",
          "Tool interoperability concepts",
        ],
      },
      {
        week: "Week 18",
        title: "Generative Models Beyond Text",
        topics: [
          "Image generation & Stable Diffusion basics",
          "Speech-to-text & text-to-speech",
          "Code generation models",
          "Multimodal AI systems",
        ],
      },
      {
        week: "Week 19",
        title: "Fine-Tuning & Open-Source AI",
        topics: [
          "Prompting vs RAG vs Fine-tuning",
          "LoRA & PEFT",
          "Hugging Face ecosystem",
          "Ollama & local inference",
          "Model selection & quantization",
        ],
      },
      {
        week: "Week 20",
        title: "Production AI Engineering & Deployment",
        topics: [
          "Docker & deployment basics",
          "Caching, retries & fallbacks",
          "Async AI workflows",
          "AI security & jailbreak defense",
          "Responsible AI practices",
        ],
      },
      {
        week: "Week 21-22",
        title: "Capstone Project",
        topics: [
          "End-to-end production-grade AI application",
          "Advanced RAG / Agent workflow / MCP integration",
          "Mandatory deployment & evaluation pipeline",
          "Portfolio preparation & project presentation",
        ],
      },
    ],
  },
  {
    id: "data-analytics-python",
    slug: "data-analytics-with-python",
    homepageOrder: 2,
    homepageTitle: "Data Analytics with Python",
    badge: "Career Focused",
    badgeColor: "badge-blue",
    accent: "#1d3557",
    chapters: [
      "Python Basics",
      "NumPy",
      "Pandas",
      "EDA",
      "Visualization",
      "Projects",
    ],
    desc: "Learn how to analyze real-world data using Python and turn it into meaningful business insights.",
    category: "Data Analytics",
    categoryLabel: "Python",
    bannerImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80&auto=format&fit=crop",
    icon: "fas fa-chart-line",
    level: "Intermediate",
    duration: "8 weeks",
    modules: 8,
    color: "card-blue",
    enrolledCount: 190,
    title: "Data Analytics with Python",
    subtitle: "Real-World Data Analysis, EDA & Visualization using Python",
    description:
      "Learn how to analyze real-world data using Python through practical workflows including cleaning, transformation, EDA, and visualization.",
    skills: [
      "Python for data analysis",
      "NumPy & Pandas",
      "Data cleaning & transformation",
      "Exploratory Data Analysis (EDA)",
      "Data visualization (Matplotlib, Seaborn)",
      "End-to-end data workflows",
    ],
    outcomes: [
      "Analyze and interpret real datasets",
      "Perform data cleaning and transformation",
      "Build impactful visualizations",
      "Solve real-world business problems using data",
      "Create portfolio-ready projects",
    ],
    regFee: "₹500",
    price: "₹6,999",
    originalPrice: "₹9,999",
    nextBatch: "June 20, 2026",
    batchType: "Weekend Batch",
    instructor: "Faizan Ansari",
    includes: [
      "8 weeks of live weekend sessions",
      "Recorded sessions & datasets",
      "Hands-on projects",
      "Real-world case studies",
      "Course completion certificate",
      "Career guidance support",
    ],
    whoIsItFor: [
      "Students building data analysis skills",
      "Professionals transitioning into analytics",
      "People with basic Python knowledge",
      "Aspiring data analysts",
    ],
    curriculum: [
      {
        week: "Week 1",
        title: "Python for Data Analytics (Quick Foundation)",
        topics: [
          "Python essentials for data analysis",
          "Working with Jupyter Notebook",
          "Data structures (lists, dictionaries, tuples)",
          "Functions & basic operations",
          "Introduction to analytics workflow",
        ],
      },
      {
        week: "Week 2",
        title: "NumPy for Data Processing",
        topics: [
          "Introduction to NumPy",
          "Arrays & vectorized operations",
          "Indexing, slicing, reshaping",
          "Mathematical operations on datasets",
          "Performance advantages of NumPy",
        ],
      },
      {
        week: "Week 3",
        title: "Pandas - Data Handling",
        topics: [
          "Introduction to Pandas",
          "Series & DataFrames",
          "Importing data (CSV, Excel, APIs)",
          "Exploring datasets",
          "Filtering & selection",
        ],
      },
      {
        week: "Week 4",
        title: "Data Cleaning & Preparation",
        topics: [
          "Handling missing values",
          "Removing duplicates",
          "Data type conversions",
          "Feature engineering (binning, encoding)",
          "Data transformation techniques",
        ],
      },
      {
        week: "Week 5",
        title: "Exploratory Data Analysis (EDA)",
        topics: [
          "Understanding data distributions",
          "Summary statistics",
          "Correlation & relationships",
          "Grouping & aggregation",
          "Identifying patterns & trends",
        ],
      },
      {
        week: "Week 6",
        title: "Data Visualization with Python",
        topics: [
          "Matplotlib & Seaborn basics",
          "Creating charts (bar, line, scatter, histogram)",
          "Data storytelling using visuals",
          "Customizing plots",
          "Best practices for visualization",
        ],
      },
      {
        week: "Week 7",
        title: "Advanced Analysis & Real-World Scenarios",
        topics: [
          "Working with large datasets",
          "Applying functions across datasets",
          "Time series basics",
          "Business problem-solving with data",
          "End-to-end analysis workflows",
        ],
      },
      {
        week: "Week 8",
        title: "Case Studies & Projects",
        topics: [
          "Real-world data analysis project",
          "Data cleaning → analysis → visualization",
          "Business insights generation",
          "Project presentation & storytelling",
          "Portfolio-ready project",
        ],
      },
    ],
  },
  {
    id: "sql",
    slug: "sql-advanced",
    homepageOrder: 3,
    homepageTitle: "SQL / Advanced SQL",
    badge: "Core Skill",
    badgeColor: "badge-yellow",
    accent: "#f4a261",
    chapters: [
      "SQL Basics",
      "Joins",
      "Aggregation",
      "Advanced Queries",
      "Optimization",
      "Projects",
    ],
    desc: "Master SQL for querying, analyzing, and managing data in real-world systems.",
    category: "Data Analytics",
    categoryLabel: "SQL",
    bannerImage:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&q=80&auto=format&fit=crop",
    icon: "fas fa-database",
    level: "Beginner → Advanced",
    duration: "8 weeks",
    modules: 8,
    color: "card-yellow",
    enrolledCount: 240,
    title: "SQL / Advanced SQL",
    subtitle: "Master SQL for Data Analysis, Querying & Optimization",
    description:
      "Learn SQL from fundamentals to advanced querying techniques used in real-world data systems.",
    skills: [
      "SQL fundamentals",
      "Joins & aggregations",
      "Subqueries & advanced querying",
      "Window functions",
      "Query optimization",
    ],
    outcomes: [
      "Extract insights from databases",
      "Write advanced SQL queries",
      "Work efficiently with large datasets",
    ],
    regFee: "₹500",
    price: "₹5,999",
    originalPrice: "₹8,999",
    nextBatch: "June 20, 2026",
    batchType: "Weekend Batch",
    instructor: "Faizan Ansari",
    includes: [
      "8 weeks of live weekend sessions",
      "Recorded sessions & datasets",
      "Hands-on SQL practice & case studies",
      "Real-world business query examples",
      "Course completion certificate",
      "Career guidance support",
    ],
    whoIsItFor: ["Data analysts", "Developers", "Beginners in data"],
    curriculum: [
      {
        week: "Week 1",
        title: "Introduction to Databases & SQL",
        topics: [
          "What is SQL and why it is used",
          "Basics of RDBMS concepts",
          "Database design fundamentals (Schema, ER diagrams)",
          "Data types, NULL values, constraints",
          "Installing SQL Server & tools (SSMS)",
        ],
      },
      {
        week: "Week 2",
        title: "Getting Started with SQL Queries",
        topics: [
          "SELECT statements",
          "Filtering data (WHERE clause)",
          "Sorting (ORDER BY)",
          "Removing duplicates (DISTINCT)",
          "Basic operators (logical, relational)",
        ],
      },
      {
        week: "Week 3",
        title: "Data Manipulation & Aggregation",
        topics: [
          "INSERT, UPDATE, DELETE statements",
          "GROUP BY & HAVING",
          "Aggregate functions (SUM, COUNT, AVG, MIN, MAX)",
          "Working with multiple conditions",
          "Data summarization",
        ],
      },
      {
        week: "Week 4",
        title: "Working with Multiple Tables",
        topics: [
          "Joins (INNER, LEFT, RIGHT, FULL)",
          "Cross joins & self joins",
          "Combining datasets",
          "Understanding relationships (Primary & Foreign keys)",
          "Real-world data modeling",
        ],
      },
      {
        week: "Week 5",
        title: "Advanced Querying Techniques",
        topics: [
          "Subqueries (nested queries)",
          "Inline views",
          "UNION, UNION ALL",
          "INTERSECT & EXCEPT",
          "Query structuring for readability",
        ],
      },
      {
        week: "Week 6",
        title: "Advanced SQL Concepts",
        topics: [
          "Window functions (ROW_NUMBER, RANK, DENSE_RANK)",
          "LEAD & LAG",
          "Partitioning & ordering",
          "Running totals & cumulative calculations",
          "Analytical queries",
        ],
      },
      {
        week: "Week 7",
        title: "Optimization & Real-World Usage",
        topics: [
          "Query optimization techniques",
          "Indexing basics",
          "Stored procedures",
          "User-defined functions",
          "Working with large datasets",
        ],
      },
      {
        week: "Week 8",
        title: "Case Studies & Projects",
        topics: [
          "End-to-end SQL project",
          "Business problem-solving using SQL",
          "Data extraction for analytics",
          "Writing production-level queries",
          "Best practices & interview preparation",
        ],
      },
    ],
  },
  {
    id: "excel",
    slug: "excel-advanced",
    homepageOrder: 4,
    homepageTitle: "Excel & Advanced Excel",
    badge: "Beginner Friendly",
    badgeColor: "badge-green",
    accent: "#2a9d8f",
    chapters: [
      "Excel Basics",
      "Functions",
      "Pivot Tables",
      "Data Cleaning",
      "Dashboards",
      "Projects",
    ],
    desc: "Master Excel for data analysis, reporting, and dashboard creation.",
    category: "Data Analytics",
    categoryLabel: "Excel",
    bannerImage:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80&auto=format&fit=crop",
    icon: "fas fa-file-excel",
    level: "Beginner → Advanced",
    duration: "8 weeks",
    modules: 8,
    color: "card-green",
    enrolledCount: 300,
    title: "Excel & Advanced Excel",
    subtitle: "Master Excel for Data Analysis, Reporting & Dashboarding",
    description:
      "Learn Excel from fundamentals to advanced data analysis techniques including formulas, pivot tables, data cleaning, and interactive dashboard creation.",
    skills: [
      "Excel fundamentals",
      "Advanced formulas",
      "Pivot tables",
      "Data cleaning",
      "Dashboarding",
    ],
    outcomes: ["Automate reports", "Analyze business data", "Build dashboards"],
    regFee: "₹500",
    price: "₹4,999",
    originalPrice: "₹7,999",
    nextBatch: "June 20, 2026",
    batchType: "Weekend Batch",
    instructor: "Faizan Ansari",
    includes: [
      "8 weeks of live weekend sessions",
      "Recorded sessions & datasets",
      "Hands-on Excel projects",
      "Dashboard templates",
      "Course completion certificate",
      "Career guidance support",
    ],
    whoIsItFor: ["Beginners", "Business professionals", "Analysts"],
    curriculum: [
      {
        week: "Week 1",
        title: "Excel Fundamentals",
        topics: [
          "Introduction to Excel environment",
          "Basic navigation & interface",
          "Data entry & formatting",
          "Sorting, filtering, and data validation",
          "Understanding data types",
        ],
      },
      {
        week: "Week 2",
        title: "Core Functions & Data Handling",
        topics: [
          "Basic functions (SUM, COUNT, AVERAGE, etc.)",
          "Logical functions (IF, AND, OR, NOT)",
          "Text functions (LEFT, RIGHT, MID, TRIM, etc.)",
          "Date & time functions",
          "Named ranges & structured references",
        ],
      },
      {
        week: "Week 3",
        title: "Advanced Functions & Lookups",
        topics: [
          "VLOOKUP, HLOOKUP (use cases & limitations)",
          "INDEX, MATCH (advanced lookup techniques)",
          "Nested functions",
          "Dynamic formulas",
          "Introduction to data modeling in Excel",
        ],
      },
      {
        week: "Week 4",
        title: "Data Analysis & Transformation",
        topics: [
          "Data cleaning techniques",
          "Handling large datasets",
          "Conditional formatting",
          "Data manipulation using formulas",
          "Preparing data for analysis",
        ],
      },
      {
        week: "Week 5",
        title: "Pivot Tables & Reporting",
        topics: [
          "Introduction to Pivot Tables",
          "Row, column, values, and filters",
          "Data summarization & aggregation",
          "Creating summary reports",
          "Cross-tab analysis",
        ],
      },
      {
        week: "Week 6",
        title: "Advanced Pivot & Data Analysis",
        topics: [
          "Calculated fields in Pivot Tables",
          "Grouping & binning",
          "Slicers & timelines",
          "Changing report layouts",
          "Advanced data analysis techniques",
        ],
      },
      {
        week: "Week 7",
        title: "Data Visualization & Dashboarding",
        topics: [
          "Chart types (bar, line, pie, scatter, etc.)",
          "Choosing the right chart",
          "Chart formatting & customization",
          "Introduction to dashboards",
          "Designing interactive dashboards",
        ],
      },
      {
        week: "Week 8",
        title: "Advanced Dashboarding & Projects",
        topics: [
          "Building dynamic dashboards using Pivot controls",
          "Using slicers, timelines, and interactivity",
          "Advanced charts (waterfall, thermometer, etc.)",
          "Dashboard design best practices",
          "End-to-end business dashboard project",
        ],
      },
    ],
  },
  {
    id: "tableau",
    slug: "tableau-visualization-dashboarding",
    comingSoon: true,
    homepageOrder: 5,
    homepageTitle: "Tableau (Visualization & Dashboarding)",
    badge: "Trending",
    badgeColor: "badge-purple",
    accent: "#6a4c93",
    chapters: [
      "Visualization Basics",
      "Design Principles",
      "Tableau Fundamentals",
      "Advanced Tableau",
      "Dashboards",
      "Projects",
    ],
    desc: "Learn how to turn raw data into powerful dashboards that drive decisions using Tableau and visualization best practices.",
    category: "Data Visualization",
    categoryLabel: "BI Tools",
    bannerImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80&auto=format&fit=crop",
    icon: "fas fa-chart-pie",
    level: "Beginner → Intermediate",
    duration: "8 weeks",
    modules: 8,
    color: "card-purple",
    enrolledCount: 185,
    title: "Tableau (Visualization & Dashboarding)",
    subtitle: "Master Data Visualization, Dashboard Design & Storytelling",
    description:
      "Learn how to transform raw data into meaningful insights through powerful visualizations and interactive dashboards.",
    skills: [
      "Data visualization principles",
      "Tableau fundamentals",
      "Dashboard design",
      "Data storytelling",
      "Interactive dashboards",
    ],
    outcomes: [
      "Build professional dashboards",
      "Present insights clearly",
      "Design effective visualizations",
    ],
    regFee: "₹500",
    price: "₹5,999",
    originalPrice: "₹8,999",
    nextBatch: "July 5, 2026",
    batchType: "Weekend Batch",
    instructor: "Faizan Ansari",
    includes: [
      "8 weeks of live weekend sessions",
      "Recorded sessions & datasets",
      "Hands-on dashboard projects",
      "Tableau templates & resources",
      "Course completion certificate",
      "Career guidance support",
    ],
    whoIsItFor: [
      "Analysts",
      "Business professionals",
      "Beginners in visualization",
    ],
    curriculum: [
      {
        week: "Week 1",
        title: "Introduction to Data Visualization",
        topics: [
          "Importance and benefits of data visualization",
          "Types of visualization: exploratory vs explanatory",
          "Basic principles: clarity, simplicity, accuracy",
          "Understanding how data tells a story",
        ],
      },
      {
        week: "Week 2",
        title: "Design Principles for Effective Visualizations",
        topics: [
          "Gestalt principles of visual perception",
          "Use of whitespace, alignment, and balance",
          "Color theory & choosing effective color palettes",
          "Typography, readability, and hierarchy",
          "Avoiding clutter (chartjunk)",
        ],
      },
      {
        week: "Week 3",
        title: "Visualization Ethics & Tools",
        topics: [
          "Common pitfalls (misleading charts, truncation, scaling issues)",
          "Ethical visualization practices (bias, transparency, accuracy)",
          "Overview of visualization tools (Excel, Google Sheets, Tableau, Power BI)",
          "Advanced tools overview",
        ],
      },
      {
        week: "Week 4",
        title: "Getting Started with Tableau",
        topics: [
          "Introduction to Tableau & its architecture",
          "Tableau workspace overview",
          "Connecting to data sources",
          "Dimensions vs Measures",
          "Data types & properties",
          "Using shelves, marks card, and 'Show Me'",
        ],
      },
      {
        week: "Week 5",
        title: "Core Visualizations in Tableau",
        topics: [
          "Bar charts, line charts, scatter plots",
          "Tree maps, cross-tabs, tables",
          "Sorting, filtering, grouping",
          "Totals, subtotals, and aggregations",
          "Trend lines, reference lines, forecasting",
        ],
      },
      {
        week: "Week 6",
        title: "Advanced Tableau Concepts",
        topics: [
          "Sets, bins, hierarchies",
          "Context filters",
          "Drill-down and drill-through",
          "Data blending & joins",
          "Working with large datasets",
        ],
      },
      {
        week: "Week 7",
        title: "Calculations & Interactivity",
        topics: [
          "Calculated fields",
          "Table calculations",
          "LOD (Level of Detail) expressions",
          "Parameters & what-if analysis",
          "Actions (filter, highlight, URL)",
          "Building dynamic dashboards",
        ],
      },
      {
        week: "Week 8",
        title: "Dashboarding & Real-World Projects",
        topics: [
          "Dashboard design principles",
          "Combining multiple visualizations",
          "Interactive dashboard creation",
          "Performance optimization",
          "End-to-end project (Sales/Business dashboard)",
          "Presentation & storytelling",
        ],
      },
    ],
  },

  {
    id: "applied-ai",
    slug: "applied-ai",
    comingSoon: true,
    homepageOrder: 6,
    homepageTitle: "Applied AI",
    badge: "Practical AI",
    badgeColor: "badge-orange",
    accent: "#f77f00",
    chapters: ["Python", "ML", "Deep Learning", "GenAI", "RAG", "Deployment"],
    desc: "Learn how to apply AI techniques to real-world problems including ML, LLMs, and deployment.",
    category: "Artificial Intelligence",
    categoryLabel: "AI",
    bannerImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80&auto=format&fit=crop",
    icon: "fas fa-brain",
    level: "Intermediate",
    duration: "8 weeks",
    modules: 8,
    color: "card-orange",
    enrolledCount: 140,
    title: "Applied AI",
    subtitle: "From ML Basics to GenAI, RAG & Real-World Applications",
    description:
      "A hands-on applied AI course covering machine learning, deep learning basics, generative AI, RAG systems, and real-world deployment.",
    skills: [
      "Python for AI",
      "Machine learning basics",
      "Deep learning fundamentals",
      "Generative AI & LLMs",
      "RAG systems",
      "Deployment (Streamlit, APIs)",
    ],
    outcomes: [
      "Build real-world AI applications",
      "Understand ML to GenAI pipeline",
      "Deploy AI-powered apps",
      "Create portfolio-ready AI projects",
    ],
    regFee: "₹500",
    price: "₹9,999",
    originalPrice: "₹14,999",
    nextBatch: "July 5, 2026",
    batchType: "Weekend Batch",
    instructor: "Faizan Ansari",
    includes: [
      "8 weeks of live sessions",
      "Hands-on AI projects",
      "Deployment support",
      "Real-world datasets",
      "Course completion certificate",
    ],
    whoIsItFor: [
      "Aspiring AI engineers",
      "Developers entering AI",
      "Data professionals",
    ],
    curriculum: [
      {
        week: "Week 1-2",
        title: "Foundations",
        topics: [
          "Python, NumPy, pandas",
          "ML basics (scikit-learn)",
          "First ML model",
        ],
      },
      {
        week: "Week 3",
        title: "Deep Learning",
        topics: ["Neural networks basics", "CNN introduction"],
      },
      {
        week: "Week 4",
        title: "Generative AI & LLMs",
        topics: [
          "What are LLMs",
          "Prompt engineering",
          "OpenAI / HuggingFace APIs",
          "Build simple chatbot",
        ],
      },
      {
        week: "Week 5",
        title: "RAG & AI Systems",
        topics: [
          "Embeddings + vector DB (FAISS)",
          "Document Q&A system",
          "LangChain / LlamaIndex basics",
        ],
      },
      {
        week: "Week 6",
        title: "Applied AI Use Cases",
        topics: [
          "Chatbots",
          "Recommendation systems",
          "Text classification (real dataset)",
        ],
      },
      {
        week: "Week 7",
        title: "Deployment",
        topics: [
          "Streamlit / Gradio apps",
          "Deploy LLM apps",
          "API + UI integration",
        ],
      },
      {
        week: "Week 8",
        title: "Capstone Project",
        topics: [
          "AI chatbot (with memory)",
          "Document Q&A system",
          "Business use-case (sales/HR/analytics AI)",
        ],
      },
    ],
  },
  {
    id: "agentic-ai",
    slug: "agentic-ai",
    comingSoon: true,
    homepageOrder: 8,
    homepageTitle: "Agentic AI",
    badge: "Advanced",
    badgeColor: "badge-purple",
    accent: "#9d4edd",
    chapters: [
      "LLMs",
      "Agents",
      "RAG",
      "LangChain",
      "Multi-Agent",
      "Deployment",
    ],
    desc: "Build intelligent AI agents using LLMs, tools, memory, and multi-step reasoning workflows.",
    category: "Artificial Intelligence",
    categoryLabel: "AI",
    bannerImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80&auto=format&fit=crop",
    icon: "fas fa-robot",
    level: "Advanced",
    duration: "8 weeks",
    modules: 8,
    color: "card-purple",
    enrolledCount: 90,
    title: "Agentic AI",
    subtitle: "Build AI Agents with Tools, Memory, RAG & Multi-Agent Systems",
    description:
      "Learn how to design and build intelligent AI agents using LLMs, tools, workflows, and multi-agent systems.",
    skills: [
      "LLM applications",
      "Agent design",
      "RAG systems",
      "LangChain & LangGraph",
      "Multi-agent systems",
      "Evaluation & guardrails",
    ],
    outcomes: [
      "Build intelligent AI agents",
      "Implement multi-step reasoning systems",
      "Design production-ready AI workflows",
    ],
    regFee: "₹500",
    price: "₹11,999",
    originalPrice: "₹18,999",
    nextBatch: "July 5, 2026",
    batchType: "Weekend Batch",
    instructor: "Faizan Ansari",
    includes: [
      "8 weeks of live sessions",
      "Agent-based projects",
      "Hands-on implementations",
      "Capstone system build",
    ],
    whoIsItFor: [
      "AI engineers",
      "Developers working with LLMs",
      "Advanced learners",
    ],
    curriculum: [
      {
        week: "Week 1",
        title: "LLM Foundations + Prompting",
        topics: [
          "How LLMs work (practical view)",
          "API usage (OpenAI / Anthropic)",
          "Zero-shot, few-shot prompting",
          "Chain-of-thought reasoning",
          "Structured outputs (JSON)",
          "Project: Structured-response chatbot",
        ],
      },
      {
        week: "Week 2",
        title: "From LLM Apps to Agents",
        topics: [
          "LLM app vs agent vs workflow",
          "ReAct pattern",
          "Tool calling & function calling",
          "Project: Tool-using agent",
        ],
      },
      {
        week: "Week 3",
        title: "RAG Systems",
        topics: [
          "Embeddings",
          "Vector databases (FAISS)",
          "Chunking strategies",
          "Semantic search",
          "Project: Document Q&A agent",
        ],
      },
      {
        week: "Week 4",
        title: "LangChain & Tools",
        topics: [
          "Chains vs agents",
          "Memory types",
          "Tools integration",
          "LCEL basics",
          "Project: Conversational agent",
        ],
      },
      {
        week: "Week 5",
        title: "LangGraph & Stateful Agents",
        topics: [
          "Stateless vs stateful agents",
          "Graph workflows",
          "Multi-step pipelines",
          "Error handling & retries",
          "Project: Workflow agent",
        ],
      },
      {
        week: "Week 6",
        title: "Multi-Agent Systems",
        topics: [
          "AutoGen / CrewAI",
          "Agent roles & communication",
          "Tradeoffs (cost, latency)",
          "Project: Multi-agent assistant",
        ],
      },
      {
        week: "Week 7",
        title: "Evaluation & Guardrails",
        topics: [
          "Debugging reasoning",
          "Observability",
          "Evaluation techniques",
          "Output validation",
          "Safety checks",
          "Project: Add guardrails",
        ],
      },
      {
        week: "Week 8",
        title: "Deployment & Capstone",
        topics: [
          "FastAPI backend",
          "Streamlit / Gradio UI",
          "API + UI integration",
          "Cost optimization",
        ],
      },
    ],
  },
  {
    id: "advanced-rag",
    slug: "advanced-rag",
    comingSoon: true,
    homepageOrder: 9,
    homepageTitle: "Advanced RAG",
    badge: "Specialized",
    badgeColor: "badge-red",
    accent: "#e63946",
    chapters: [
      "RAG Basics",
      "Retrieval",
      "Optimization",
      "Architectures",
      "Evaluation",
      "Production",
    ],
    desc: "Master advanced Retrieval-Augmented Generation systems for production-grade AI applications.",
    category: "Artificial Intelligence",
    categoryLabel: "AI",
    bannerImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80&auto=format&fit=crop",
    icon: "fas fa-database",
    level: "Advanced",
    duration: "4 weeks",
    modules: 4,
    color: "card-red",
    enrolledCount: 70,
    title: "Advanced RAG",
    subtitle:
      "Build Production-Ready RAG Systems with Optimization & Evaluation",
    description:
      "Deep dive into advanced RAG systems including retrieval optimization, architectures, evaluation, and production deployment.",
    skills: [
      "RAG architecture",
      "Retrieval optimization",
      "Embeddings & vector DB",
      "Evaluation techniques",
      "Production systems",
    ],
    outcomes: [
      "Build high-accuracy RAG systems",
      "Optimize retrieval pipelines",
      "Deploy production-grade AI systems",
    ],
    regFee: "₹500",
    price: "₹7,999",
    originalPrice: "₹12,999",
    nextBatch: "July 5, 2026",
    batchType: "Weekend Batch",
    instructor: "Faizan Ansari",
    includes: [
      "4 weeks intensive training",
      "Advanced projects",
      "Production-ready systems",
      "Capstone project",
    ],
    whoIsItFor: ["AI engineers", "LLM developers", "Advanced learners"],
    curriculum: [
      {
        week: "Week 1",
        title: "RAG Foundations",
        topics: [
          "What RAG actually is",
          "RAG system architecture",
          "Chunking strategies",
          "Embeddings (OpenAI vs open-source)",
          "Vector DB (FAISS)",
          "Project: Baseline RAG system",
        ],
      },
      {
        week: "Week 2",
        title: "Retrieval Optimization",
        topics: [
          "Similarity & hybrid search",
          "Metadata filtering",
          "Query rewriting",
          "Re-ranking",
          "Token optimization",
          "Project: High-accuracy RAG",
        ],
      },
      {
        week: "Week 3",
        title: "Advanced Architectures",
        topics: [
          "Multi-hop RAG",
          "Agentic RAG",
          "Knowledge graphs",
          "Long-context handling",
          "Project: Multi-step RAG system",
        ],
      },
      {
        week: "Week 4",
        title: "Evaluation & Production",
        topics: [
          "RAG evaluation metrics",
          "Debugging failures",
          "Latency & cost optimization",
          "Caching & observability",
          "Capstone: Production-ready RAG system",
        ],
      },
    ],
  },
  {
    id: "webdev",
    slug: "web-development",
    comingSoon: false,
    homepageOrder: 10,
    homepageTitle: "Web Development",
    badge: null,
    badgeColor: "",
    accent: "#f97316",
    chapters: ["HTML", "CSS", "JavaScript", "ReactJS", "NextJS", "NodeJS"],
    desc: "Build production-ready web apps from scratch. Learn modern frontend and full-stack development with React and Next.js.",
    category: "Web Development",
    categoryLabel: "Web",
    icon: "fas fa-code",
    level: "Beginner",
    duration: "4-5 Months",
    modules: null,
    color: "card-orange",
    enrolledCount: null,
    title: "Web Development",
    subtitle: "Modern Full-Stack Development",
    description:
      "Build production-ready web apps from scratch. Learn modern frontend and full-stack development with React, Next.js, and Node.js.",
    skills: [
      "HTML & CSS",
      "JavaScript (ES6+)",
      "ReactJS",
      "Next.js",
      "Node.js & Express",
      "REST APIs",
    ],
    outcomes: [
      "Build responsive, accessible web interfaces",
      "Create full-stack web applications",
      "Work with APIs and databases",
      "Deploy projects to production",
    ],
    regFee: "₹10",
    price: "₹10",
    originalPrice: "₹199",
    nextBatch: "August 8, 2026",
    batchType: "Weekend Batch",
    instructor: "Riyaz Akhtar",
    includes: [
      "12 weeks of live weekend sessions",
      "Recorded sessions & source code",
      "10+ real-world web projects",
      "Deployment guides (Vercel, Netlify)",
      "Course completion certificate",
      "Career placement support",
    ],
    whoIsItFor: [
      "Complete beginners with no prior coding experience",
      "Students who want to build websites and web apps",
      "Professionals looking to switch into web development",
      "Anyone who wants to launch their own web product",
    ],
    curriculum: [
      {
        week: "Week 1-2",
        title: "HTML & CSS Foundations",
        topics: [
          "Semantic HTML5 structure & elements",
          "CSS box model, specificity & cascade",
          "Flexbox & CSS Grid layouts",
          "Responsive design & media queries",
          "Building pixel-perfect layouts",
        ],
      },
      {
        week: "Week 3-4",
        title: "JavaScript Essentials",
        topics: [
          "Variables, data types & operators",
          "Functions, scope & closures",
          "Arrays & objects",
          "DOM manipulation & events",
          "ES6+ features (arrow functions, destructuring, spread)",
        ],
      },
      {
        week: "Week 5-6",
        title: "ReactJS Fundamentals",
        topics: [
          "Components, props & state",
          "Hooks (useState, useEffect)",
          "React Router for navigation",
          "Lifting state & component composition",
          "Building interactive UIs",
        ],
      },
      {
        week: "Week 7-8",
        title: "Next.js & Modern React",
        topics: [
          "Pages & file-based routing",
          "Server-side rendering & static generation",
          "API routes & data fetching",
          "Image optimisation",
          "Deploying with Vercel",
        ],
      },
      {
        week: "Week 9-10",
        title: "Node.js & Express Backend",
        topics: [
          "Setting up a Node.js server",
          "REST API design & CRUD operations",
          "Middleware & error handling",
          "Authentication with JWT",
          "Connecting to databases",
        ],
      },
      {
        week: "Week 11-12",
        title: "Full-Stack Capstone Project",
        topics: [
          "Plan & scaffold a full-stack application",
          "Build frontend with React / Next.js",
          "Build backend API with Node & Express",
          "Connect database & deploy to production",
        ],
      },
    ],
  },
  {
    id: "leaders",
    slug: "data-science-for-leaders",
    comingSoon: true,
    homepageOrder: 11,
    homepageTitle: "Data Science & AI for Leaders",
    badge: "New",
    badgeColor: "badge-purple",
    accent: "#ec4899",
    chapters: ["ML Strategy", "Model Evaluation", "AI Ethics", "Case Studies"],
    desc: "Designed for managers and senior professionals. Understand AI strategy, model evaluation, and data-driven decision making at scale.",
    category: "Data Science",
    categoryLabel: "Data",
    icon: "fas fa-brain",
    level: "Advanced",
    duration: "Coming Soon",
    modules: null,
    color: "card-purple",
    enrolledCount: null,
    title: "Data Science & AI for Leaders",
    subtitle: "Strategic AI for Decision Makers",
    description:
      "Designed for managers and senior professionals. Understand AI strategy, model evaluation, and data-driven decision making at scale.",
    skills: [
      "ML Strategy",
      "Model Evaluation",
      "AI Ethics",
      "Case Studies",
      "AI for Business",
    ],
    outcomes: [
      "Evaluate AI models and tools critically",
      "Build data-driven strategy for your team",
      "Understand AI limitations and risks",
      "Lead AI-powered business transformations",
    ],
    regFee: null,
    price: null,
    originalPrice: null,
    nextBatch: "Coming Soon",
    batchType: null,
    instructor: "Faizan Ansari",
    includes: [],
    whoIsItFor: [],
    curriculum: [],
  },
];

export const courseListData = coursesData.filter(
  (c) => c.price && c.curriculum.length > 0,
);

export const courseRegData = Object.fromEntries(
  courseListData.map((c) => {
    const fees = courseFees[c.id];
    return [
      c.id,
      {
        regFee: fees ? fmt(fees.regFee) : c.regFee,
        price: fees ? fmt(fees.price) : c.price,
        originalPrice: fees ? fmt(fees.originalPrice) : c.originalPrice,
        nextBatch: c.nextBatch,
        batchType: c.batchType,
        instructor: c.instructor,
        includes: c.includes,
        whoIsItFor: c.whoIsItFor,
        curriculum: c.curriculum,
      },
    ];
  }),
);

export { workshopFees };

/* ------------------------------------------------------------------ */
/* Workshops                                                           */
/* ------------------------------------------------------------------ */

export const workshopData = {
  upcoming: [
    {
      id: 1001,
      slug: "excel-for-data-analysis",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop",
      category: "Data Analytics",
      categoryColor: "#16a34a",
      level: "Beginner",
      title: "Excel for Data Analysis",
      desc: "Master formulas, pivot tables, charts, and dashboards. The fastest path from spreadsheet user to data analyst.",
      tags: ["Excel", "Pivot Tables", "Dashboards", "Data Cleaning"],
      date: "June 6, Saturday",
      time: "10:00 AM - 1:00 PM",
      duration: "3 Hours",
      eventMode: ["Online", "Offline"],
      instructor: "Faizan Ansari",
      seatsLeft: 8,
      totalSeats: 30,
      price: "₹999",
      originalPrice: "₹1,999",
      outcomes: [
        "Master 30+ essential Excel formulas",
        "Build pivot tables to summarise large datasets",
        "Create interactive dashboards",
        "Clean and transform real-world data",
      ],
      curriculum: [
        {
          time: "10:00 - 10:45",
          title: "Excel Foundations & Formula Mastery",
          desc: "VLOOKUP, INDEX-MATCH, IF nesting, SUMIFS",
        },
        {
          time: "10:45 - 11:30",
          title: "Pivot Tables & Data Summarisation",
          desc: "Group, filter, and aggregate large datasets",
        },
        {
          time: "11:30 - 12:00",
          title: "Data Cleaning & Transformation",
          desc: "Remove duplicates, handle blanks, reshape raw data",
        },
        {
          time: "12:00 - 12:45",
          title: "Interactive Dashboard Design",
          desc: "Build a live Excel dashboard with slicers and charts",
        },
        {
          time: "12:45 - 13:00",
          title: "Q&A & Interview Tips",
          desc: "Common Excel interview questions",
        },
      ],
      whoIsItFor: [
        "Freshers entering the job market",
        "Working professionals who use Excel daily",
        "Anyone preparing for analyst interviews",
      ],
    },
    {
      id: 1002,
      slug: "sql-masterclass",
      image:
        "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80&auto=format&fit=crop",
      category: "Data Analytics",
      categoryColor: "#16a34a",
      level: "Intermediate",
      title: "SQL Masterclass for Analysts",
      desc: "From SELECT to advanced window functions - become the SQL analyst every data team wants to hire.",
      tags: ["SQL", "Window Functions", "Query Optimization", "PostgreSQL"],
      date: "June 27, Saturday",
      time: "11:00 AM - 2:00 PM",
      duration: "3 Hours",
      eventMode: ["Online"],
      instructor: "Waseem Ahmad",
      seatsLeft: 12,
      totalSeats: 25,
      price: "₹1,499",
      originalPrice: "₹2,499",
      outcomes: [
        "Write complex multi-table JOINs",
        "Use window functions like a pro",
        "Understand query execution",
        "Master CTEs, subqueries, and conditional aggregations",
      ],
      curriculum: [
        {
          time: "11:00 - 11:40",
          title: "SQL Refresher & Database Setup",
          desc: "PostgreSQL environment, schema navigation, SELECT fundamentals",
        },
        {
          time: "11:40 - 12:15",
          title: "Advanced JOINs & Set Operations",
          desc: "INNER, LEFT, FULL OUTER, CROSS JOIN, UNION vs UNION ALL",
        },
        {
          time: "12:15 - 12:45",
          title: "CTEs, Subqueries & Aggregations",
          desc: "WITH clauses, nested queries, GROUP BY, and HAVING",
        },
        {
          time: "12:45 - 13:25",
          title: "Window Functions Deep Dive",
          desc: "ROW_NUMBER, RANK, DENSE_RANK, LEAD, LAG, running totals",
        },
        {
          time: "13:25 - 14:00",
          title: "Query Optimisation & Interview Problems",
          desc: "EXPLAIN plans, indexing basics, 10 live interview questions",
        },
      ],
      whoIsItFor: [
        "Analysts who know basic SQL",
        "Anyone preparing for data interviews",
        "Developers wanting cleaner queries",
      ],
    },
    {
      id: 1007,
      slug: "intro-to-web-development",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80&auto=format&fit=crop",
      category: "Web Development",
      categoryColor: "#f97316",
      level: "Beginner",
      title: "Intro to Web Development",
      desc: "Build your first webpage from scratch. Learn HTML, CSS, and JavaScript fundamentals in one hands-on session.",
      tags: ["HTML", "CSS", "JavaScript", "Web Dev"],
      date: "July 18, Saturday",
      time: "10:00 AM - 1:00 PM",
      duration: "3 Hours",
      eventMode: ["Online", "Offline"],
      instructor: "Riyaz Akhtar",
      seatsLeft: 20,
      totalSeats: 30,
      price: "₹10",
      originalPrice: "₹299",
      outcomes: [
        "Understand how websites work",
        "Build a structured webpage using HTML5",
        "Style your page with CSS",
        "Add interactivity with JavaScript",
        "Deploy your first webpage live",
      ],
      curriculum: [
        {
          time: "10:00 - 10:45",
          title: "HTML - Structure of the Web",
          desc: "Tags, elements, semantic HTML5, forms",
        },
        {
          time: "10:45 - 11:30",
          title: "CSS - Styling & Layouts",
          desc: "Selectors, box model, flexbox, responsive design",
        },
        {
          time: "11:30 - 12:15",
          title: "JavaScript - Adding Interactivity",
          desc: "Variables, functions, DOM selection, event listeners",
        },
        {
          time: "12:15 - 12:45",
          title: "Build & Deploy Your First Page",
          desc: "Combine HTML, CSS, JS and deploy it live",
        },
        {
          time: "12:45 - 13:00",
          title: "Q&A & Next Steps",
          desc: "Resources to continue learning",
        },
      ],
      whoIsItFor: [
        "Complete beginners",
        "Students who want to understand web dev",
        "Non-technical professionals",
      ],
    },
  ] as Workshop[],
  previous: [
    {
      id: 2001,
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop",
      category: "Data Analytics",
      categoryColor: "#16a34a",
      title: "Data Warehousing for Data Engineering",
      date: "November 15, 2024",
      duration: "3 Hours",
      eventMode: ["Offline", "Online"],
      attendees: 28,
      rating: 4.9,
    },
    {
      id: 2002,
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop",
      category: "Data Science & AI",
      categoryColor: "#0d9488",
      title: "Introduction to Machine Learning",
      date: "December 21, 2024",
      duration: "6 Hours",
      eventMode: ["Online"],
      attendees: 34,
      rating: 4.8,
    },
    {
      id: 2003,
      image:
        "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80&auto=format&fit=crop",
      category: "Data Visualization",
      categoryColor: "#f97316",
      title: "Tableau for Business Intelligence",
      date: "January 18, 2025",
      duration: "3 Hours",
      eventMode: ["Offline", "Online"],
      attendees: 22,
      rating: 5.0,
    },
    {
      id: 2004,
      image:
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80&auto=format&fit=crop",
      category: "Data Analytics",
      categoryColor: "#16a34a",
      title: "Advanced SQL & Query Optimization",
      date: "February 8, 2025",
      duration: "3 Hours",
      eventMode: ["Online"],
      attendees: 31,
      rating: 4.9,
    },
  ] as Workshop[],
};

/* ------------------------------------------------------------------ */
/* Team                                                                */
/* ------------------------------------------------------------------ */

export const teamData: TeamMember[] = [
  {
    id: 1,
    name: "Waseem Ahmad",
    position: "Founder",
    image: "/assets/hobbies/dev_2.jpg",
    bio: "Founder of AnalyticShala and career analytics mentor. With years of hands-on experience in data, Waseem built AnalyticShala to make industry-grade data education accessible to everyone.",
    social: [
      {
        href: "https://www.linkedin.com/in/waseem-ahmad-59386617a/",
        iconClass: "fab fa-linkedin-in",
      },
    ],
  },
  {
    id: 2,
    name: "Faizan Ansari",
    position: "Data Science & AI Trainer, Career Coach",
    college: "ISB Student",
    image: "/assets/hobbies/dev_2.jpg",
    bio: "ISB student and Data Science & AI Trainer with 8+ years of industry experience. Has trained 500+ professionals at Fortune 500 companies.",
    social: [
      {
        href: "https://www.linkedin.com/in/faizan-ansari-8989ab125",
        iconClass: "fab fa-linkedin-in",
      },
    ],
  },
  {
    id: 3,
    name: "Aishvarya Joshi",
    position: "Business Development Manager",
    image: "/assets/hobbies/dev_1.jpg",
    bio: "Drives growth and partnerships at AnalyticShala, connecting aspiring data professionals with the right programs and career opportunities.",
    social: [],
  },
  {
    id: 4,
    name: "Tanfiz Hussain",
    position: "Business Development Manager",
    image: "/assets/hobbies/dev_3.jpg",
    bio: "Helps learners navigate the AnalyticShala ecosystem - from program selection to placement support.",
    social: [],
  },
  {
    id: 5,
    name: "Riyaz Akhtar",
    position: "Web Developer & Trainer",
    image: "/assets/hobbies/dev_3.jpg",
    bio: "Full-stack developer and web technology trainer at AnalyticShala. Builds and maintains the platform while teaching modern web development.",
    social: [
      { href: "https://github.com/SonuAkhtar", iconClass: "fab fa-github" },
      {
        href: "https://www.linkedin.com/in/riyaz-akhtar-03bb59129/",
        iconClass: "fab fa-linkedin-in",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export const contactData: ContactItem[] = [
  {
    id: 0,
    icon: "/assets/contact/call.gif",
    name: "Call",
    info: "+91-88826 41988",
    href: "tel:+918882641988",
    alt: "call",
  },
  {
    id: 1,
    icon: "/assets/contact/email.gif",
    name: "Email",
    info: "team@analyticshala.in",
    href: "mailto:team@analyticshala.in",
    alt: "email",
  },
  {
    id: 2,
    icon: "/assets/contact/location.gif",
    name: "Location",
    info: "Gurgaon, India",
    alt: "location",
  },
];

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

export const testimonyData: Testimonial[] = [
  {
    id: 1,
    image: "/assets/testimony/boy.jpg",
    review:
      "I had a highly positive experience completing the SQL course with AnalyticShala. The instructor is very knowledgeable, clear and responsive, ensuring an engaging and effective learning experience.",
    name: "Sameer",
    position: "Data Analyst @ Infosys",
  },
  {
    id: 2,
    image: "/assets/testimony/girl.webp",
    review:
      "I recently took Data Analytics using Python classes with AnalyticShala, and my experience was exceptional. The course provided a deep and practical understanding of the subject.",
    name: "Neha",
    position: "Manager @ Genpact",
  },
  {
    id: 3,
    image: "/assets/testimony/boy.jpg",
    review:
      "I received excellent support from AnalyticShala in my analytics career. The support was helpful and responsive, with clear explanations throughout. The online format allowed me to learn at my own pace.",
    name: "Tabjeel",
    position: "Data Analyst @ Wipro",
  },
  {
    id: 4,
    image: "/assets/testimony/girl.webp",
    review:
      "Thank you AnalyticShala for providing an outstanding learning experience. The trainer's enthusiasm and passion for Data Science and AI made complex concepts easy to understand.",
    name: "Tavleen",
    position: "Business Analyst @ Accenture",
  },
];

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export const questionsData: FAQ[] = [
  {
    id: 1,
    question:
      "Can I join these classes even if I am from a non-technical background?",
    answer:
      "Yes, absolutely. AnalyticShala is open to everyone, regardless of their technical background. We use straightforward teaching methods to help students understand analytics easily and develop a strong interest in the subject.",
  },
  {
    id: 2,
    question: "What if I miss a class?",
    answer:
      "All live sessions are recorded and shared with enrolled students within 24 hours, so you never miss out on course content. Comprehensive notes are also provided for every session.",
  },
  {
    id: 3,
    question: "Do you offer placement assistance?",
    answer:
      "Yes. We provide resume reviews, LinkedIn profile audits, mock interviews, and introductions to our hiring partners. Our career team stays with you until you land the role.",
  },
  {
    id: 4,
    question:
      "Will I be able to manage these classes alongside my office work?",
    answer:
      "Absolutely. Our classes are held on weekends only, and recorded sessions are shared after every class. With just 1 hour of daily revision on weekdays, you can comfortably keep pace.",
  },
];

/* ------------------------------------------------------------------ */
/* Scroll Cards (Why Us)                                               */
/* ------------------------------------------------------------------ */

export const scrollCardsData: ScrollCard[] = [
  {
    id: 1,
    title: "Live Weekend Batches",
    info: "Join live classes every weekend led by working data professionals - not just teachers. Get real-time feedback, doubt resolution, and a structured learning environment.",
  },
  {
    id: 2,
    title: "Recorded Sessions + Notes",
    info: "Missed a class? No problem. Every session is recorded and paired with comprehensive notes so you can revisit complex topics at your own pace.",
  },
  {
    id: 3,
    title: "Interview Prep & Mock Tests",
    info: "We simulate real data analyst and data science interviews - from SQL rounds and case studies to Python coding challenges.",
  },
  {
    id: 4,
    title: "Real-World Capstone Projects",
    info: "Build a portfolio employers will notice. Work on actual datasets from e-commerce, finance, and healthcare domains.",
  },
  {
    id: 5,
    title: "Career Support & Students Network",
    info: "From resume reviews to LinkedIn profile audits and introductions to hiring partners - our career team stays with you until you land the role.",
  },
];

/* ------------------------------------------------------------------ */
/* About Us                                                            */
/* ------------------------------------------------------------------ */

export const aboutUsText =
  "At AnalyticShala, we empower learners to thrive in today's data-driven and AI-powered world. We offer industry-focused courses in Data Analytics, Data Science, Artificial Intelligence, Generative AI, Data Visualization, and Web Development, designed to turn concepts into real-world skills. Our programs blend hands-on learning, practical projects, and real-life use cases, helping you build strong foundations and stay ahead in a rapidly evolving tech landscape.";
