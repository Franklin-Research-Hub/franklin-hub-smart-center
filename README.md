# Franklin HUB SMART Center™

**Interconnected Knowledge • Infinite Possibilities**

🌐 **Website:** https://franklinhubsmartcenter.com · Nashville, Tennessee

Franklin HUB SMART Center™ is an interdisciplinary collaboration, research, innovation, and mentorship hub connecting professionals, empowering youth, and advancing knowledge across generations.

*Connecting Professionals. Mentoring Generations. Advancing Innovation.*

---

## Pages

| Page | Address | File | What's on it |
|---|---|---|---|
| Home | [franklinhubsmartcenter.com](https://franklinhubsmartcenter.com/) | `index.html` | The story map: "Knowledge is interconnected." hero, then the Knowledge Helix™ ("How knowledge becomes impact" beside the interactive helix; "Every layer connects" with the five pathways, where choosing a layer opens its description, programs and "I'm interested" link), and the "What's your Knowledge Code?" quiz on black |
| About | [/about](https://franklinhubsmartcenter.com/about) | `about.html` | Why we exist: purpose, mission, vision, Three Pillars, From curiosity to contribution, and the four outcomes (Education, Careers, Business, Sustainability) |
| Programs | [/programs](https://franklinhubsmartcenter.com/programs) | `programs.html` | 11 program cards in three families (Science, Data & Technology; Health & Living Systems; Arts, Culture & Music) with family filters and a "Join as" strip (youth, professional or mentor, partner, career and college seeker) |
| Program pages | e.g. [/steam-360](https://franklinhubsmartcenter.com/steam-360) | `ai-data-science-lab.html`, `digital-innovation-studio.html`, `cybersecurity-academy.html`, `logic-systems-thinking.html`, `smart-research-academy.html`, `public-health-environment.html`, `living-systems-collaborative.html`, `coded-culture.html`, `steam-360.html`, `dear-music.html` | One page per program, all built on the same five parts: People (youth, professionals, mentors), Learn by Doing experiences, Skills, Partners we seek, Projects, and Resources and outcomes. Arts & Design uses `arts-design.html` |
| Arts & Design | [/arts-design](https://franklinhubsmartcenter.com/arts-design) | `arts-design.html` | The Arts & Design Innovation Studio program first: overview, skills, two tracks (Youth Creative Academy, Professional Creative Collaborative), Learn by Doing with museums, galleries, independent artists and public art, the Small Business Brand Lab, studio activities, and ways to take part. Below it, The Living Canvas™ interactive space ("Different Faces. Different Perspectives. One Interconnected World."): 19 diverse 3D portraits of about 4,000–4,900 facets each, customize panel, guided tour, Export PNG, The STEM Studio (9 tools: Portraits, Rotate & Angle, Mirror, Color Mixer, Light, Pattern Engine, Depth, Measure, Data Lens; 9 challenges at Explorer, Builder and Innovator levels, progress saved in the visitor's browser), and The Canvas Collection curated by Victoria Love Franklin, Founder. Credit: built and designed by Victoria Love Franklin, Founder |
| Projects | [/projects](https://franklinhubsmartcenter.com/projects) | `projects.html` | Research in action: NWGS Grid™, the Helix in Action (how the project uses four Knowledge Helix pathways), its five ICEPTP 2027 papers, and ways to propose, join, or lead a project |
| Research | [/research](https://franklinhubsmartcenter.com/research) | `research.html` | Research directory with initiative keywords; collaboration pathways |
| Researcher profile | [/victoria-love-franklin](https://franklinhubsmartcenter.com/victoria-love-franklin) | `victoria-love-franklin.html` | Education, honors, research initiatives with keywords, papers |
| Professional Network | [/network](https://franklinhubsmartcenter.com/network) | `network.html` | The people network for every program: Find Your Community (8 roles, including Project Teams) and four community experiences that open as the Center launches |
| Youth Mentorship | [/mentorship](https://franklinhubsmartcenter.com/mentorship) | `mentorship.html` | Everything for youth: pathways, programs, workshops, mentors, partners, safeguards, **Founding Youth** (goal: 25) and its form |
| Events | [/events](https://franklinhubsmartcenter.com/events) | `events.html` | Community experiences, including Toastmasters |
| Partnerships | [/partnerships](https://franklinhubsmartcenter.com/partnerships) | `partnerships.html` | The Experiential Partner Network: what partners give and get, four tiers (Host, Expert, Sponsor, Founding; goal: 10 Founding Partners), nine types of partners we seek with the outcome each serves, ways to start a partnership, and the partner registry |
| Join Our HUB | [/join](https://franklinhubsmartcenter.com/join) | `join.html` | Ways to connect and the interest form |
| Founding Professionals | [/founding-professionals](https://franklinhubsmartcenter.com/founding-professionals) | `founding-professionals.html` | Goal of 100 founding professionals, then a launch information event; interest form |
| Professional Mentorship | [/professional-mentorship](https://franklinhubsmartcenter.com/professional-mentorship) | `professional-mentorship.html` | Mentorship between adult professionals; leading projects |
| Career & College Center | [/careers](https://franklinhubsmartcenter.com/careers) | `careers.html` | K–12 mentoring, college and certificate enrollment support (including HBCUs), career readiness with workforce agencies and employers, hiring and internships, partners we seek, and results we track |

The **Join Our HUB ▾** menu links to: Interest form, Ways to connect, Founding Professionals, Founding Youth, Professional Mentorship, Career & College Center.

**How it all aligns:** the Knowledge Helix™ feeds three program families; every program has the same five parts; the people network (Youth Mentorship and Professional Network) and the partner network (Partnerships) serve every program; and the interest form is the one front door. Founding goals: 100 Founding Professionals, 25 Founding Youth, 10 Founding Partners.

**Retired pages:** Get Involved, The System, Insights & Resources, and the separate Knowledge Helix page are no longer part of the site and have been removed. Their old addresses forward automatically (through `404.html`): /get-involved → /join, /system and /knowledge-helix → the Knowledge Helix on Home, /insights → Home. `404.html` also shows a friendly page for any other address that doesn't exist. Youth & Workforce Pathways and Professional Collaboration & Mentorship became part of the people network: /youth-workforce-pathways → /mentorship and /professional-collaboration-mentorship → /network.

## How the site is built

- Plain HTML pages, no build step. Pages use clean addresses (`/about` instead of `about.html`); GitHub Pages serves the matching `.html` file automatically. All links inside the pages already use clean addresses.
- Images the pages use live in `assets/img/`, so pages load fast and browsers cache them. Keep that folder with the pages.
- `assets/canvas/` holds the 3D facet data for each Living Canvas portrait (loaded only when a portrait is chosen).
- `assets/js/` holds The Living Canvas script (`living-canvas.js`) and the open-source Three.js library (MIT license) it uses for 3D graphics; nothing loads from other websites.
- `assets/logo-franklin-hub-smart-center.png` is the header logo (also used in Google's organization data); `assets/hero-globe-artwork.png` is kept for future edits.
- Program card artwork, portraits, and all other page images are in `assets/img/`.
- Pages are tested on phones, tablets and desktops (360–1920 px wide). Paragraphs and headings avoid single "hanging" words, no text overlaps other text, and banner text never covers a figure.

## Interest forms

There are three forms, all sending to **franklinhubsmartcenter@gmail.com** through [FormSubmit](https://formsubmit.co):

| Form | Page | Email subject |
|---|---|---|
| Interest form | `/join` | New Join Our HUB interest form |
| Founding Professional form | `/founding-professionals` | New Founding Professional interest form |
| Founding Youth form | `/mentorship#founding-youth` | New Founding Youth interest form |

The first submission from the live site sends an **"Activate Form"** email to that address. Confirm it once, and every submission after that arrives by email. Each person who sends a form also gets an automatic confirmation email thanking them and letting them know a real person will reply. Each email includes the person's interest, the programs they picked, the page the form was sent from, and any campaign details (see below).

## Recruitment links and tracking

- Add `?utm_source=...&utm_medium=...&utm_campaign=...` to any link you share, for example `https://franklinhubsmartcenter.com/founding-professionals?utm_source=linkedin&utm_campaign=founding`. The form email shows where the person came from.
- Links can preselect the form's interest: `/join?interest=research-collaboration#interest-form`.
  Links can also tick programs: `/join?program=ai-data-science,research-academy#interest-form`. Program values: `ai-data-science`, `digital-innovation`, `cybersecurity`, `logic-systems`, `research-academy`, `public-health-environment`, `living-systems`, `arts-design`, `coded-culture`, `steam-360`, `dear-music`.
  Interest values (grouped in the form): `founding-professional`, `professional-networking`, `professional-mentorship`, `youth-mentor`, `founding-youth`, `youth`, `career-college`, `artist`, `research-collaboration`, `propose-project`, `project-leadership`, `partner`, `host-experiences`, `school-partner`, `college-partner`, `employer`, `funder`, `agency`, `small-business`, `brand-lab`, `events-community`, `other`.

## Search (SEO)

- `sitemap.xml` (all public pages) and `robots.txt` at the site root. Submit `https://franklinhubsmartcenter.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
- Every page has a page title, meta description, canonical address, Open Graph and Twitter tags, and schema.org structured data (Organization/ResearchOrganization in Nashville, Tennessee; WebSite; WebPage; BreadcrumbList; Person on the researcher profile).
- Titles and descriptions use tech, data science, research, Nashville and Tennessee keywords naturally.

## Icon and social media preview

- Browser tab icon: `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`. Phone home screen: `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `site.webmanifest`.
- Link preview image for LinkedIn, Facebook, X, iMessage and Slack: `og-image.jpg` (1200×630). Each program page and the Career & College Center has its own preview card (program artwork, name and tagline) in `assets/og/`.
- After changing the preview, refresh LinkedIn's copy at https://www.linkedin.com/post-inspector/ and Facebook's at https://developers.facebook.com/tools/debug/.

## Custom domain

The site is served from **franklinhubsmartcenter.com** (registered with GoDaddy) through GitHub Pages. The `CNAME` file holds the domain name; keep it in place, along with `.nojekyll`.

## Updating the site

Download the newest website ZIP to your Downloads folder, then in PowerShell (from your repo folder):

```powershell
git pull
$zip = Get-ChildItem "$HOME\Downloads\franklin-hub-smart-center*.zip" | Sort-Object LastWriteTime -Descending | Select-Object -First 1
Remove-Item "$env:TEMP\fhsc" -Recurse -Force -ErrorAction SilentlyContinue
Expand-Archive $zip.FullName -DestinationPath "$env:TEMP\fhsc" -Force
robocopy "$env:TEMP\fhsc\franklin-hub-smart-center" . /MIR /XD .git
git add -A
git commit -m "Update website"
git push
```

`robocopy /MIR` makes the repo match the ZIP exactly, so pages that were removed from the site are removed from GitHub too. GitHub Pages republishes within a minute or two.

## Contact

📧 franklinhubsmartcenter@gmail.com

© 2026 Franklin HUB SMART Center™ · Nashville, Tennessee · Science • Methods • Analytics • Research • Technology
