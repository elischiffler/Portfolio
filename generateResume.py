from xhtml2pdf import pisa

def compile_resume():
    # 1. Define the production-ready styled template string
    html_template = """
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8">
    <style>
      @page { size: letter; margin: 9mm 13mm 5mm 13mm; }
      *, *::before, *::after { box-sizing: border-box; }
      body { font-family: 'Times New Roman', Times, serif; color: #111111; line-height: 1.25; font-size: 10pt; margin: 0; padding: 0; }
      .header { text-align: center; margin-bottom: 4px; }
      h1 { font-size: 18pt; margin: 0 0 1px 0; font-weight: normal; letter-spacing: 0.5px; color: #0f172a; }
      .contact-info { font-size: 9pt; color: #475569; margin: 0; }
      .contact-info a { color: #475569; text-decoration: none; }
      h2 { font-size: 10.5pt; font-weight: bold; color: #1e3a8a; border-bottom: 1px solid #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 7px; margin-bottom: 2px; padding-bottom: 1px; }
      .entry-table { width: 100%; margin-bottom: 1px; }
      .entry-table td { padding: 0; vertical-align: top; }
      .entry-left { text-align: left; font-size: 10pt; }
      .entry-right { text-align: right; font-size: 10pt; color: #334155; }
      .entry-title { font-weight: bold; color: #0f172a; }
      .entry-subtitle { font-style: italic; color: #334155; }
      ul { margin: 1px 0 2px 0; padding-left: 14px; }
      li { margin-bottom: 1px; text-align: justify; }
      .skills-section { margin-bottom: 1px; }
      .skills-row { margin-bottom: 1px; font-size: 10pt; }
      .skills-category { font-weight: bold; color: #0f172a; }
    </style>
    </head>
    <body>
      <div class="header">
        <h1>Eli Schiffler</h1>
        <p class="contact-info">
          <a href="https://elischiffler.dev">elischiffler.dev</a> &nbsp;|&nbsp; 
          (612) 704-6616 &nbsp;|&nbsp; 
          <a href="mailto:schifflereli@gmail.com">schifflereli@gmail.com</a> &nbsp;|&nbsp; 
          <a href="https://linkedin.com/in/eli-schiffler">linkedin.com/in/eli-schiffler</a> &nbsp;|&nbsp;
          <a href="https://github.com/elischiffler">github.com/elischiffler</a>
        </p>
      </div>

      <h2>Education</h2>
      <table class="entry-table">
        <tr>
          <td class="entry-left">
            <span class="entry-title">California Polytechnic State University, San Luis Obispo</span><br>
            <span class="entry-subtitle">B.S. in Computer Science</span>
          </td>
          <td class="entry-right">Graduation: May 2027<br>GPA: 3.70 | Dean's List: 8/8</td>
        </tr>
      </table>

      <h2>Work Experience</h2>
      <table class="entry-table">
        <tr>
          <td class="entry-left"><span class="entry-title">Robert Half</span><br><span class="entry-subtitle">Software Engineering Intern (Remote)</span></td>
          <td class="entry-right">Summer 2026</td>
        </tr>
      </table>
      <ul>
        <li>Built an employee verification portal serving Robert Half and Protiviti with dynamic brand switching and full internationalization support.</li>
        <li>Implemented Microsoft Entra ID authentication with custom role-based access control for secure enterprise user management.</li>
        <li>Delivered an end-to-end CI/CD pipeline in Azure DevOps, deploying Jest-tested Node.js applications to AWS Lightsail.</li>
        <li>Built a chat agent in Microsoft Copilot Studio that routes validated customer inquiries through Drupal to Salesforce for lead generation.</li>
      </ul>

      <table class="entry-table">
        <tr>
          <td class="entry-left"><span class="entry-title">Sandia National Laboratories</span><br><span class="entry-subtitle">Quantum Engineering Intern (Albuquerque, NM)</span></td>
          <td class="entry-right">Summer 2025</td>
        </tr>
      </table>
      <ul>
        <li>Aligned optical systems to trap and cool barium ions using precise laser beam paths for quantum hardware experiments.</li>
        <li>Optimized single-mode optical fiber coupling through iterative micro-positioning, achieving up to 80% light collection efficiency.</li>
        <li>Collaborated daily with doctoral researchers to troubleshoot and optimize experimental quantum hardware setups.</li>
      </ul>

      <h2>Technical Skills</h2>
      <div class="skills-section">
        <div class="skills-row"><span class="skills-category">Languages:</span> Python, TypeScript, JavaScript, C/C++, Java, SQL, HTML/CSS</div>
        <div class="skills-row"><span class="skills-category">Frameworks & Tools:</span> React, Node.js, Express, FastAPI, Vite, Jest, Cypress, Playwright, Qiskit</div>
        <div class="skills-row"><span class="skills-category">Cloud & Platforms:</span> AWS (Lightsail, Cognito), Azure (DevOps, Static Web Apps), Supabase, PostgreSQL, GitHub Actions</div>
        <div class="skills-row"><span class="skills-category">Methodologies:</span> Full-Stack Development, CI/CD Pipelines, Agile/Scrum, RESTful APIs, AI/LLM Integration</div>
      </div>

      <h2>Programming Projects</h2>
      <table class="entry-table">
        <tr>
          <td class="entry-left"><span class="entry-title">Mentro</span> &ndash; <span class="entry-subtitle">Chrome Extension</span></td>
          <td class="entry-right">TypeScript, React, Supabase, LLM APIs</td>
        </tr>
      </table>
      <ul>
        <li>Shipped a Chrome Web Store extension that scores AI prompts in real time across ChatGPT, Gemini, Perplexity, and Claude.</li>
        <li>Engineered a hybrid scoring engine combining instant heuristic analysis with async LLM feedback to surface suggestions before send.</li>
        <li>Built full CI/CD pipeline with Vitest unit tests and Playwright end-to-end coverage.</li>
      </ul>

      <table class="entry-table">
        <tr>
          <td class="entry-left"><span class="entry-title">UMami</span> &ndash; <span class="entry-subtitle">Campus Dining Platform</span></td>
          <td class="entry-right">React, Node.js, Express, PostgreSQL</td>
        </tr>
      </table>
      <ul>
        <li>Developed a "Yelp for Cal Poly dining" with verified student reviews, nutrition labels, allergen info, and real-time restaurant hours.</li>
        <li>Built interactive campus map with Google Maps directions, automated menu scrapers, photo uploads, and a social following system.</li>
        <li>Deployed to Azure Static Web Apps with Jest and Cypress test suites running in CI/CD.</li>
      </ul>

      <table class="entry-table">
        <tr>
          <td class="entry-left"><span class="entry-title">RoadtripsAreFun</span> &ndash; <span class="entry-subtitle">Travel Planner</span></td>
          <td class="entry-right">React, Python, FastAPI, AWS Cognito</td>
        </tr>
      </table>
      <ul>
        <li>Built a full-stack road trip planner with conversational chat interface that generates personalized itineraries in real time.</li>
        <li>Integrated Google Maps, TripAdvisor, and lodging APIs for route recommendations and attraction discovery.</li>
        <li>Deployed frontend to Vercel with AWS Cognito authentication and a Python FastAPI backend.</li>
      </ul>

      <h2>Campus Involvement</h2>
      <table class="entry-table">
        <tr>
          <td class="entry-left"><span class="entry-title">Quantum Computing Club</span> &ndash; <span class="entry-subtitle">President</span></td>
          <td class="entry-right">January 2024 &ndash; June 2026</td>
        </tr>
      </table>
      <ul>
        <li>Grew club membership 400% by introducing hands-on projects that give members practical quantum computing experience.</li>
        <li>Built a Python CLI tool using Qiskit to automate randomized benchmarking across IBM Quantum processors, identifying optimal run windows and processor stability patterns.</li>
        <li>Developed original lesson plans making complex topics like quantum gates, circuits, and algorithms approachable for all levels.</li>
        <li>Organized lab tours with university partners so students could observe quantum research environments and explore career paths.</li>
      </ul>
    </body>
    </html>
    """
    
    # 2. Compile to PDF using xhtml2pdf
    output_path = "public/EliSchifflerResume.pdf"
    with open(output_path, "w+b") as output:
        status = pisa.CreatePDF(html_template, dest=output)
    
    if status.err:
        print(f"Error generating PDF: {status.err}")
    else:
        print(f"Generated {output_path}")

if __name__ == "__main__":
    compile_resume()