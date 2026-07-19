"""
Master resume data — single source of truth for all resume generation.
Edit your experience here; both the base PDF generator and the tailoring script read from this.

This is the COMPLETE POOL of content. The tailoring script picks the most relevant subset.
The base PDF generator (generateResume.py) uses DEFAULT_PROJECTS to select which projects
appear on the non-tailored version.
"""

CONTACT = {
    "name": "Eli Schiffler",
    "website": "https://elischiffler.dev",
    "phone": "(612) 704-6616",
    "email": "schifflereli@gmail.com",
    "linkedin": "https://linkedin.com/in/eli-schiffler",
    "github": "https://github.com/elischiffler",
}

EDUCATION = {
    "school": "California Polytechnic State University, San Luis Obispo",
    "degree": "B.S. in Computer Science",
    "graduation": "May 2027",
    "gpa": "3.70",
    "honors": "Dean's List: 8/8",
    "extras": ["Study Abroad: CEA CAPA Barcelona, Fall 2025"],
}

# Full pool of relevant coursework — the tailoring script picks the most relevant subset.
COURSEWORK = [
    "Data Structures",
    "Object-Oriented Programming & Design",
    "Computer Organization",
    "Discrete Structures",
    "Systems Programming",
    "Design & Analysis of Algorithms",
    "Database Systems",
    "Software Engineering I & II",
    "Computer Security",
    "Programming Languages",
    "Knowledge Discovery from Data",
    "Theory of Computation",
    "Operating Systems",
    "Modern Application Development",
    "User-Centered UI/UX Design",
    "Linear Analysis",
    "Statistical Methods for Engineers",
    "Philosophy of AI",
]

WORK_EXPERIENCE = [
    {
        "company": "Robert Half",
        "title": "Software Engineering Intern (Remote)",
        "dates": "Summer 2026 \u2013 Present",
        "bullets": [
            "Built an employee verification portal serving Robert Half and Protiviti with dynamic brand switching and full internationalization support.",
            "Implemented Microsoft Entra ID authentication with custom role-based access control for secure enterprise user management.",
            "Designed responsive HTML/CSS interfaces for mobile and desktop, writing production-quality, single-responsibility code with thorough Jest test coverage.",
            "Delivered an end-to-end CI/CD pipeline in Azure DevOps, deploying Jest-tested Node.js applications to AWS Lightsail.",
            "Built a chat agent in Microsoft Copilot Studio replacing the existing contact form, routing validated inquiries through Drupal to Salesforce for lead generation.",
        ],
    },
    {
        "company": "Sandia National Laboratories",
        "title": "Quantum Engineering Intern (Albuquerque, NM)",
        "dates": "Summer 2025",
        "bullets": [
            "Aligned optical systems to trap and cool barium ions using precise laser beam paths for quantum hardware experiments.",
            "Optimized single-mode optical fiber coupling through iterative micro-positioning, achieving up to 80% light collection efficiency.",
            "Collaborated daily with doctoral researchers to troubleshoot and optimize experimental quantum hardware setups.",
        ],
    },
]

SKILLS = {
    "Languages": "Python, TypeScript, JavaScript, C/C++, Java, SQL, HTML/CSS",
    "Frameworks & Tools": "React, Node.js, Express, FastAPI, Vite, Jest, Cypress, Playwright, Qiskit",
    "Cloud & Platforms": "AWS (Lightsail, Cognito), Azure (DevOps, Static Web Apps), Supabase, PostgreSQL, GitHub Actions",
    "Methodologies": "Full-Stack Development, CI/CD Pipelines, Agile/Scrum, RESTful APIs, AI/LLM Integration",
}

PROJECTS = [
    {
        "name": "Mentro",
        "subtitle": "Chrome Extension",
        "tech": "TypeScript, React, Chrome MV3, Vite, Supabase, LLM APIs",
        "bullets": [
            "Shipped a Chrome Web Store extension that scores AI prompts in real time across ChatGPT, Gemini, Perplexity, and Claude.",
            "Engineered a hybrid scoring engine combining instant heuristic analysis with async LLM feedback to surface suggestions before send.",
            "Built full CI/CD pipeline with Vitest unit tests and Playwright end-to-end coverage.",
        ],
    },
    {
        "name": "UMami",
        "subtitle": "Campus Dining Platform",
        "tech": "React, Node.js, Express, Supabase, PostgreSQL, Jest, Cypress",
        "bullets": [
            'Developed a "Yelp for Cal Poly dining" with verified student reviews, nutrition labels, allergen info, and real-time restaurant hours.',
            "Built interactive campus map with Google Maps directions, automated menu scrapers, photo uploads, and a social following system.",
            "Deployed to Azure Static Web Apps with Jest and Cypress test suites running in CI/CD.",
        ],
    },
    {
        "name": "RoadtripsAreFun",
        "subtitle": "Travel Planner",
        "tech": "React, Python, FastAPI, AWS Cognito, SQL, REST APIs",
        "bullets": [
            "Built a full-stack road trip planner with conversational chat interface that generates personalized itineraries in real time.",
            "Integrated Google Maps, TripAdvisor, and lodging APIs for route recommendations and attraction discovery.",
            "Deployed frontend to Vercel with AWS Cognito authentication and a Python FastAPI backend.",
        ],
    },
    {
        "name": "IBM Quantum Benchmarking Tool",
        "subtitle": "CLI Research Tool",
        "tech": "Python, Qiskit, IBM Quantum API, Data Analysis",
        "bullets": [
            "Built a Python CLI tool automating randomized benchmarking across IBM Quantum superconducting processors (ibm_marrakesh, ibm_fez, ibm_torino).",
            "Measured gate fidelity and Error Per Clifford scores, identifying optimal run windows and processor stability patterns.",
            "Discovered timing-dependent error rates (lowest near 11 PM, spikes at 7 AM and 8 PM) and recommended processors for complex workloads.",
        ],
    },
]

CAMPUS_INVOLVEMENT = [
    {
        "org": "Quantum Computing Club",
        "role": "President",
        "dates": "January 2024 \u2013 June 2026",
        "bullets": [
            "Grew club membership 400% by introducing hands-on projects that give members practical quantum computing experience.",
            "Built a Python CLI tool using Qiskit to automate randomized benchmarking across IBM Quantum processors, identifying optimal run windows and processor stability patterns.",
            "Developed original lesson plans making complex topics like quantum gates, circuits, and algorithms approachable for all levels.",
            "Organized lab tours with university partners so students could observe quantum research environments and explore career paths.",
        ],
    },
]

# Projects to include in the default (non-tailored) base resume PDF.
# The IBM Quantum project overlaps with Campus Involvement, so we omit it from the default.
DEFAULT_PROJECTS = ["Mentro", "UMami", "RoadtripsAreFun"]

# Max bullets per section for the base resume (one-page constraint)
DEFAULT_MAX_WORK_BULLETS = 4
DEFAULT_MAX_PROJECT_BULLETS = 3
DEFAULT_MAX_CAMPUS_BULLETS = 3
