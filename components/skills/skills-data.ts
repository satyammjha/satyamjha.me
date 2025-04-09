
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
        "Figma (Basics)"
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
    "JavaScript (ES6+)": "Modern JavaScript with ES6+ features including async/await, destructuring, and more",
    "TypeScript": "Strongly typed programming language that builds on JavaScript",
    "React.js": "JavaScript library for building user interfaces with components",
    "Next.js": "React framework with SSR, SSG, and file-based routing",
    "Docker": "Platform for developing, shipping, and running applications in containers",
    "MongoDB": "NoSQL document database with scalability and flexibility",

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