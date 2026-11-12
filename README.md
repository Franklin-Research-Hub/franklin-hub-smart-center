# Franklin HUB SMART Center™

**Interconnected Knowledge • Infinite Possibilities**

🌐 **Website:** https://franklinhubsmartcenter.com · Nashville, Tennessee

Franklin HUB SMART Center™ is an interdisciplinary collaboration, research, innovation, and mentorship hub connecting professionals, empowering youth, and advancing knowledge across generations.

*Connecting Professionals. Mentoring Generations. Advancing Innovation.*

---

## Pages

| Page | Address | File | What's on it |
|---|---|---|---|
| Home | [franklinhubsmartcenter.com](https://franklinhubsmartcenter.com/) | `index.html` | The story map: "Knowledge is interconnected." hero, then the Knowledge Helix™ ("How knowledge becomes impact" beside the interactive helix and "Every layer connects"), the five pathways, links to About / Programs / Join, and the "What's your Knowledge Code?" quiz |
| About | [/about](https://franklinhubsmartcenter.com/about) | `about.html` | Why we exist: purpose, mission, vision, Three Pillars, From curiosity to contribution |
| Programs | [/programs](https://franklinhubsmartcenter.com/programs) | `programs.html` | Our SMART Program Pathways: 11 cinematic program cards (number, audience, four skills, Explore Program, I'm Interested) with All / Youth / Professionals filters |
| Program pages | e.g. [/steam-360](https://franklinhubsmartcenter.com/steam-360) | `steam-360.html`, `coded-culture.html`, `logic-systems-thinking.html`, `smart-research-academy.html`, `ai-data-science-lab.html`, `digital-innovation-studio.html`, `public-health-environment.html`, `cybersecurity-academy.html`, `youth-workforce-pathways.html`, `professional-collaboration-mentorship.html` | One page per program: overview, skills, ways to take part (youth, professionals, mentors, collaborators), project ideas, and registration links. Arts & Design uses `arts-design.html` |
| Arts & Design | [/arts-design](https://franklinhubsmartcenter.com/arts-design) | `arts-design.html` | The Living Canvas™ — "Different Faces. Different Perspectives. One Interconnected World.": 19 diverse portraits, each an interactive 3D sculpture of about 4,000 facets (choose a portrait, rotate, zoom, Cubist/Abstract/Modern, palettes, depth, motion, knowledge layers, Reimagine, Export PNG, guided tour), The Canvas Collection curated by Victoria Love Franklin, Founder, studio pathways, five dimensions. Reached from Programs |
| Projects | [/projects](https://franklinhubsmartcenter.com/projects) | `projects.html` | Research in action: NWGS Grid™, the Helix in Action (how the project uses four Knowledge Helix pathways), its five ICEPTP 2027 papers, and ways to propose, join, or lead a project |
| Research | [/research](https://franklinhubsmartcenter.com/research) | `research.html` | Research directory with initiative keywords; collaboration pathways |
| Researcher profile | [/victoria-love-franklin](https://franklinhubsmartcenter.com/victoria-love-franklin) | `victoria-love-franklin.html` | Education, honors, research initiatives with keywords, papers |
| Professional Network | [/network](https://franklinhubsmartcenter.com/network) | `network.html` | Find Your Community (7 roles) and proposed community experiences |
| Youth Mentorship | [/mentorship](https://franklinhubsmartcenter.com/mentorship) | `mentorship.html` | Everything for youth: pathways, programs, workshops, mentors, partners, safeguards, **Founding Youth** (goal: 25) and its form |
| Events | [/events](https://franklinhubsmartcenter.com/events) | `events.html` | Community experiences, including Toastmasters |
| Partnerships | [/partnerships](https://franklinhubsmartcenter.com/partnerships) | `partnerships.html` | Partnership opportunities and partner registry |
| Join Our HUB | [/join](https://franklinhubsmartcenter.com/join) | `join.html` | Ways to connect and the interest form |
| Founding Professionals | [/founding-professionals](https://franklinhubsmartcenter.com/founding-professionals) | `founding-professionals.html` | Goal of 100 founding professionals, then a launch information event; interest form |
| Professional Mentorship | [/professional-mentorship](https://franklinhubsmartcenter.com/professional-mentorship) | `professional-mentorship.html` | Mentorship between adult professionals; leading projects |

The **Join Our HUB ▾** menu links to: Interest form, Ways to connect, Founding Professionals, Founding Youth, Professional Mentorship.

**Retired pages:** Get Involved, The System, Insights & Resources, and the separate Knowledge Helix page are no longer part of the site and have been removed. Their old addresses forward automatically (through `404.html`): /get-involved → /join, /system and /knowledge-helix → the Knowledge Helix on Home, /insights → Home. `404.html` also shows a friendly page for any other address that doesn't exist.

## How the site is built

- Plain HTML pages, no build step. Pages use clean addresses (`/about` instead of `about.html`); GitHub Pages serves the matching `.html` file automatically. All links inside the pages already use clean addresses.
- Images the pages use live in `assets/img/`, so pages load fast and browsers cache them. Keep that folder with the pages.
- `assets/canvas/` holds the 3D facet data for each Living Canvas portrait (loaded only when a portrait is chosen).
- `assets/js/` holds The Living Canvas script (`living-canvas.js`) and the open-source Three.js library (MIT license) it uses for 3D graphics; nothing loads from other websites.
- `assets/` also holds the original logo, hero artwork, headshot and program illustrations for future edits.
- Pages are tested on phones, tablets and desktops (360–1920 px wide). Paragraphs and headings avoid single "hanging" words, and banner text never covers the hero figure.

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
  Links can also tick programs: `/join?program=ai-data-science,research-academy#interest-form`. Program values: `steam-360`, `coded-culture`, `logic-systems`, `research-academy`, `ai-data-science`, `digital-innovation`, `public-health-environment`, `cybersecurity`, `youth-workforce`, `arts-design`, `professional-collab`.
  Interest values: `founding-professional`, `professional-networking`, `research-collaboration`, `propose-project`, `project-leadership`, `professional-mentorship`, `youth-mentor`, `founding-youth`, `youth`, `small-business`, `partner`, `events-community`, `other`.

## Search (SEO)

- `sitemap.xml` (all public pages) and `robots.txt` at the site root. Submit `https://franklinhubsmartcenter.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
- Every page has a page title, meta description, canonical address, Open Graph and Twitter tags, and schema.org structured data (Organization/ResearchOrganization in Nashville, Tennessee; WebSite; WebPage; BreadcrumbList; Person on the researcher profile).
- Titles and descriptions use tech, data science, research, Nashville and Tennessee keywords naturally.

## Icon and social media preview

- Browser tab icon: `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`. Phone home screen: `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `site.webmanifest`.
- Link preview image for LinkedIn, Facebook, X, iMessage and Slack: `og-image.jpg` (1200×630).
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
