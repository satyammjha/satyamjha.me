
import { Code, Layout, Server, GitBranch, PenTool, Award, Sparkles } from "lucide-react";

export const skills = {
    languages: [
        "JavaScript (ES6+)",
        "TypeScript",
        "C++",
        "Python"
    ],
    frontend: [
        "React.js",
        "React Native",
        "Next.js",
        "Redux",
        "Context API",
        "Tailwind CSS",
        "Material UI",
        "Chakra UI",
        "HTML5",
        "CSS3"
    ],
    backend: [
        "Node.js",
        "Express.js",
        "REST APIs",
        "MongoDB",
        "Mongoose",
        "Prisma",
        "JWT",
        "Auth0"
    ],
    devOps: [
        "Docker",
        "AWS EC2",
        "AWS S3",
        "AWS SES",
        "GitHub Actions",
        "Render",
        "Netlify"
    ],
    tools: [
        "Git",
        "GitHub",
        "Postman",
        "VS Code",
        "Chrome Extensions",
        "Figma"
    ],
    others: [
        "API Reverse Engineering (Ethical)",
        "AI APIs (Gemini, Hugging Face)",
        "WebSockets",
        "NPM Package Publishing",
        "SEO Fundamentals"
    ]
};

export const skillDescriptions: Record<string, string> = {
    // Languages
    "JavaScript (ES6+)": "Modern JavaScript with ES6+ features like async/await",
    "TypeScript": "Typed superset of JavaScript for safer code",
    "C++": "High-performance language used in system and competitive programming",
    "Python": "Versatile, easy-to-read scripting language",
  
    // Frontend
    "React.js": "UI library for building component-based interfaces",
    "React Native": "Framework for building native apps using React",
    "Next.js": "React framework with SSR and file-based routing",
    "Redux": "State management library for JavaScript apps",
    "Context API": "Built-in React state sharing solution",
    "Tailwind CSS": "Utility-first CSS framework for rapid UI development",
    "Material UI": "React UI components following Google’s Material Design",
    "Chakra UI": "Accessible, customizable React component library",
    "HTML5": "Standard markup language for web documents",
    "CSS3": "Style sheet language for designing web pages",
  
    // Backend
    "Node.js": "JavaScript runtime for server-side development",
    "Express.js": "Minimalist backend framework for Node.js",
    "REST APIs": "Standard for building stateless backend APIs",
    "MongoDB": "NoSQL database for storing JSON-like documents",
    "Mongoose": "MongoDB ODM for schema modeling in Node.js",
    "Prisma": "Type-safe ORM for working with databases",
    "JWT": "Token-based authentication standard",
    "Auth0": "Auth service for login, signup, and identity management",
  
    // DevOps
    "Docker": "Container platform for packaging applications",
    "AWS EC2": "Virtual cloud servers on AWS",
    "AWS S3": "Object storage service for files and media",
    "AWS SES": "Email sending service from AWS",
    "GitHub Actions": "CI/CD workflows for automation",
    "Render": "Cloud platform for hosting apps",
    "Netlify": "Frontend-focused hosting with CI/CD",
  
    // Tools
    "Git": "Version control system",
    "GitHub": "Code hosting and collaboration platform",
    "Postman": "API testing and debugging tool",
    "VS Code": "Popular code editor by Microsoft",
    "Chrome Extensions": "Custom tools built into Chrome",
    "Figma": "Design tool for UI/UX collaboration",
  
    // Others
    "API Reverse Engineering (Ethical)": "Understanding and replicating API behavior legally",
    "AI APIs (Gemini, Hugging Face)": "Pre-trained AI models for NLP and ML tasks",
    "WebSockets": "Protocol for real-time communication",
    "NPM Package Publishing": "Creating and sharing reusable code modules",
    "SEO Fundamentals": "Best practices to optimize websites for search engines"
  };
  

export const categoryIcons = {
    languages: Code,
    frontend: Layout,
    backend: Server,
    devOps: GitBranch,
    tools: PenTool,
    others: Award,
};

export const categoryGradients = {
    languages: "from-blue-600 to-cyan-500",
    frontend: "from-purple-600 to-pink-500",
    backend: "from-green-600 to-emerald-500",
    devOps: "from-orange-600 to-amber-500",
    tools: "from-indigo-600 to-blue-500",
    others: "from-rose-600 to-red-500",
};

export const categoryColors = {
    languages: "bg-blue-500",
    frontend: "bg-purple-500",
    backend: "bg-green-500",
    devOps: "bg-orange-500",
    tools: "bg-indigo-500",
    others: "bg-rose-500",
};

export const categories = Object.keys(skills) as Array<keyof typeof skills>;