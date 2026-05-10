/* =========================================================================
   script.js — Catherine Boss Portfolio (Lemonade Edition)
   =========================================================================
   This file powers the whole site. It is intentionally written without
   any frameworks (no React, no jQuery) so a beginner can read it linearly.

   How to read this file:
     1) ASSETS         — every image path in one place, easy to swap
     2) PROJECTS       — array of project data (carousel + recipe book + detail)
     3) EXPERIENCE     — array of timeline entries
     4) THEMES         — mapping of project ID → dessert theme + corner asset
     5) Bootstrapping  — figure out which page we're on and call the right
                         renderers. Each renderer is a small named function.
     6) Microinteractions — splash on click, scroll fade-up, etc.
     7) Easter eggs     — pink mode, lemon counter, wordmark triple-click, etc.

   Everything is wrapped in a single IIFE so we don't pollute window.
   ========================================================================= */
(function () {
  'use strict';

  /* =====================================================================
     1.  ASSETS — every image file the site uses, in one place.
     ---------------------------------------------------------------------
     Swap a placeholder for one of your own Procreate PNGs by saving the
     new file into ./img/ with the same filename. Nothing else changes.
     ===================================================================== */
  const ASSETS = {
    // Hero stage
    branches:    './img/branches.png',
    basket:      './img/basket.png',
    headshot:    './img/headshot.png',
    chefHat:     './img/chef-hat.png',

    // About
    cuttingBoard:   './img/cutting-board.png',
    lemonSliceHover:'./img/lemon-slice-hover.png',

    // Timeline (3 frames of a spoon stirring)
    stir1: './img/stir-1.png',
    stir2: './img/stir-2.png',
    stir3: './img/stir-3.png',

    // Contact
    pitcher: './img/pitcher.png',

    // Recipe-book decor
    lemonDecor: './img/lemon-decor.png',

    // Default project thumbnail (used until each project's image is added)
    projectFallback: './img/project-placeholder.png',

    // Per-project thumbnails. Keys match project IDs in the PROJECTS array.
    // Replace with your final PNGs in ./img/ to swap.
    'project-40': './img/project-matlab.png',
    'project-35': './img/project-karaoke.png',
    'project-30': './img/project-portfolio.png',
    'project-25': './img/project-hovercraft.png',
    'project-20': './img/project-elsa-d.png',
    'project-15': './img/project-penny-boat.png',
    'project-5':  './img/project-gingerbread.png',

    // Company logos for the timeline.
    'company-arl':     './img/company-arl.png',
    'company-cpi':     './img/company-cpi.png',
    'company-nuwc':    './img/company-nuwc.png',
    'company-sky':     './img/company-sky.png',
    'company-flambo':  './img/company-flambeaux.png',

    // Theme illustrations (used on the project detail page hero banner).
    'theme-meringue':   './img/theme-meringue.png',
    'theme-popsicle':   './img/theme-popsicle.png',
    'theme-lemon-tea':  './img/theme-lemon-tea.png',
    'theme-lemon-bar':  './img/theme-lemon-bar.png',
    'theme-lemon-tart': './img/theme-lemon-tart.png',
    'theme-sorbet':     './img/theme-sorbet.png',

    // Documents
    resume: './img/CBoss_Resume.pdf',
  };

  /* =====================================================================
     2.  PROJECTS — full project content. Sorted newest first.
     ---------------------------------------------------------------------
     Each project has: id, title, date, short tagline, image key (resolved
     from ASSETS), tech tag array, longer overview/body/outcomes text,
     gallery image array, optional pdfUrl.
     ===================================================================== */
  const PROJECTS = [
    {
      id: 40,
      title: 'MATLAB Tech Talk',
      date: 'October 2025',
      short: 'ASME Tech Talk on the practical utility of MATLAB.',
      image: ASSETS['project-40'],
      tech: ['Tech Talk', 'Public Speaking', 'Professional Communication', 'AI Integration', 'Technical Presentation', 'MATLAB'],
      overview: "As the Dual Secretary for the Penn State chapter of ASME, I work closely with both the executive board and multiple design teams to support technical engagement within the organization. Early in the semester, I delivered a large-scale technical presentation focused on MATLAB, a tool that many undergraduate engineers approach with hesitation or frustration. My goal was to reframe MATLAB as an accessible, powerful engineering resource when used correctly, and to demonstrate its relevance across coursework, design teams, and real-world engineering applications.",
      body: [
        "This presentation took place during the second week of classes at one of our early design team meetings and was attended by roughly 100 ASME members, ranging from first-year students to seniors. I spent a significant amount of time preparing custom MATLAB scripts, slides, and demonstrations designed to meet students at different experience levels. Rather than assuming prior comfort with the software, I focused on fundamentals, clarity, and practical use cases, emphasizing that many frustrations stem from how MATLAB is introduced rather than from the tool itself.",
        "To make the talk concrete and engaging, I built live demonstrations drawing from thermodynamics, vibrations, and data visualization. These examples reflected coursework I was actively using MATLAB for, particularly in my junior-year vibrations class, and showcased how the software can streamline problem-solving and enhance understanding. I also discussed how MATLAB concepts translate cleanly into other programming languages and how it can interface with hardware platforms such as Raspberry Pi and Arduino, broadening its usefulness beyond purely academic settings.",
        "A key section of the presentation addressed the responsible use of AI in programming. I emphasized using AI as a learning aid rather than a replacement for understanding, showing how it can support debugging, exploration, and efficiency without undermining engineering intuition or problem-solving skills. Throughout the process, I coordinated with ASME leadership and design team leads, balancing stakeholder input while maintaining clear boundaries so the presentation remained focused, cohesive, and true to my original intent. The result was one of the most well-attended Tech Talks hosted by an ASME member that semester."
      ],
      outcomes: "This project strengthened my ability to plan and deliver a large technical talk to a diverse audience while maintaining confidence and clarity. I gained experience communicating with multiple stakeholders, defending my technical perspective professionally, and presenting content I genuinely care about. I also deepened my own understanding of MATLAB and emerging AI-assisted workflows, which made the project both educational and enjoyable. Most importantly, the experience reinforced the value of advocacy for good tools and good practices (especially when they are misunderstood), and showed me how thoughtful communication can shift perspectives and encourage growth within an engineering community.",
      gallery: [
        './img/gallery-matlab-1.png',
        './img/gallery-matlab-2.png',
        './img/gallery-matlab-3.png',
        './img/gallery-matlab-4.png'
      ],
      pdfUrl: './img/matlab_talk.pdf'
    },
    {
      id: 35,
      title: 'EE210 Karaoke Machine',
      date: 'Summer 2025',
      short: 'Designed, prototyped, and soldered a five-block op-amp karaoke machine with tone, volume, and LED display.',
      image: ASSETS['project-35'],
      tech: ['Soldering', 'PCB Assembly', 'Mechatronics', 'Op-Amps', 'Circuit Design'],
      overview: "In my EE210 Circuits and Devices course, I worked on a semester-long project that brought together the key concepts we learned throughout the class. The goal was to design and build a working karaoke machine by applying fundamentals like op-amps, resistors, capacitors, potentiometers, LEDs, and switches. This was one of my first major hands-on experiences with electronics, and it gave me a chance to see how classroom theory connects to real-world applications.",
      body: [
        "The circuit design was divided into five main parts: a mixer for combining microphone and music signals, a tone control stage for treble and bass adjustments, a volume control stage, a volume display using LEDs that responded to loudness, and an output driver with attenuation. I began the process by sketching the blocks on paper, then recreated the design in Multisim to simulate the system and troubleshoot potential issues. Once the simulation was complete, I tested the circuit on a breadboard to confirm that it worked before finally moving to a PCB. On the PCB, I soldered all the components and built a semi-functional karaoke machine that could play music with or without vocals and adjust the tone and volume in real time."
      ],
      outcomes: "This project pushed me out of my comfort zone, since I started the class with very little electrical knowledge. Along the way, I learned how to work with op-amps in different configurations, how to approach problems methodically through simulation and testing, and how to solder and assemble a functional PCB. While the final result was not perfect, it gave me confidence in my ability to learn new technical skills, and it reinforced my interest in exploring the electrical side of my Mechatronics minor. Overall, I walked away with a stronger foundation in circuit design and an appreciation for the problem-solving process that comes with building hardware.",
      gallery: [
        './img/gallery-karaoke-1.png',
        './img/gallery-karaoke-2.png',
        './img/gallery-karaoke-3.png',
        './img/gallery-karaoke-4.png',
        './img/gallery-karaoke-5.png'
      ],
      pdfUrl: './img/karaoke_final.pdf'
    },
    {
      id: 30,
      title: 'Student Portfolio Upgrade',
      date: 'Summer 2025',
      short: 'Used AI-assisted coding tools to grow a beginner template into a custom-domain portfolio site.',
      image: ASSETS['project-30'],
      tech: ['TypeScript', 'Website Development', 'Coding', 'AI Integration', 'bolt.new'],
      overview: "To showcase my engineering work in a professional way, I built my own portfolio website. The project began as an update to my old high school resume. My old portfolio was made in Google Sites and no longer felt representative of my skill level in college. While I had little prior web development experience, I used an AI-assisted coding platform to generate the base structure of the site, then gradually refined and expanded it. Over the course of about a month, I went from a template-driven beginner to someone much more confident navigating code, AI tools, and web publishing.",
      body: [
        "The process began with the AI platform, which helped me generate the initial framework of the site. This gave me a template to build on, since I wasn't yet proficient enough in coding to design everything from scratch. On the baseline plan I had access to a very limited number of tokens, which forced me to dive into the raw code myself and save those tokens for when I was truly stuck. I migrated everything into GitHub and began manually editing and adjusting the site. This was slow and sometimes frustrating, but it gave me an accelerated learning curve by working off an existing base. I gradually became more comfortable making changes, fixing errors, and customizing the site to better fit my needs. Along the way, I picked up foundational skills in TypeScript and strengthened my ability to work with AI as a collaborative tool rather than a crutch.",
        "Another important step was learning how to buy a custom domain and publish the site under it. That process gave me hands-on experience with web infrastructure and the practical side of making a site accessible to the public. To tie it all together, I also created a laser-engraved NFC business card linked directly to my website. While NFC tags are simple and easy to make, the card felt like a fun, modern touch that makes sharing my portfolio both practical and memorable."
      ],
      outcomes: "This project taught me far more than I expected going in. On the technical side, I gained confidence working with TypeScript, GitHub, and the basics of deploying a live website. I also saw firsthand how AI can accelerate learning when used thoughtfully, but that it can't replace the need to understand and engage with the material yourself. Beyond the technical lessons, I walked away with a tangible, professional portfolio that reflects my growth as an engineer, and a set of skills that I know will be useful moving forward. More broadly, this project reinforced the importance of adaptability—especially as AI becomes a bigger part of the engineering world—and showed me the value of persistence when facing something outside my comfort zone.",
      gallery: [
        './img/gallery-portfolio-1.png',
        './img/gallery-portfolio-2.png',
        './img/gallery-portfolio-3.png',
        './img/gallery-portfolio-4.png'
      ],
      pdfUrl: 'https://sites.google.com/view/cboss-hs-en/home'
    },
    {
      id: 25,
      title: 'ASME Hovercraft Project',
      date: 'Spring 2025',
      short: 'Contributed to a winning team hovercraft through fabrication, design file management, and final competition prep.',
      image: ASSETS['project-25'],
      tech: ['Fusion 360', 'Teamwork', 'Organization', 'Fabrication'],
      overview: "Through Penn State's ASME (American Society of Mechanical Engineers) club, I contributed to a team project focused on designing and competing with a small hovercraft. The challenge involved three teams each building a shoebox-sized hovercraft from scratch, with a competition taking place in March 2025. I joined the project in the spring semester after much of the core design work was completed, which gave me the opportunity to support the team through final iterations and preparation for the event.",
      body: [
        "The hovercraft, named Driftstorm, pulled inspiration from fan boat acceleration structures. It featured two fan systems: one directed downward to inflate a skirt of nylon fabric that allowed the craft to hover above the floor, and another pointed backward to generate forward thrust. Steering was achieved by adjusting blades behind the rear fan, and the system was powered by lithium batteries. The skirt was a key component in ensuring the hovercraft could glide smoothly and maintain stability during operation.",
        "My contributions included fabricating a new skirt using the Penn State Learning Factory's laser cutter, which provided precise cuts in the nylon material. I also helped reorganize the Fusion 360 project files, streamlining them so only current versions of the design were accessible while removing outdated or obsolete parts. Beyond those specific tasks, I supported the team by taking on smaller jobs as needed to keep the project moving.",
        "The team consisted of around sixteen members, which required a significant amount of coordination and logistics to keep the work on track. While I wasn't one of the primary contributors to the early design, I played a role in the final stages leading up to the competition. In the end, our team's hovercraft performed well and Team Driftstorm won the event, which was highlighted on Penn State's LinkedIn profile."
      ],
      outcomes: "This project gave me exposure to a collaborative engineering environment outside the classroom, where the dynamics of teamwork, iteration, and rapid problem-solving were front and center. I gained hands-on experience with fabrication tools like the laser cutter and saw firsthand how small adjustments (such as tweaking a skirt design) can make a significant impact on performance. Working with this group was truly incredible and was part of my inspiration to join leadership within ASME. Overall, the experience reinforced the importance of contributing wherever possible, even in a supporting role, and showed me how rewarding it can be to be part of a large, successful engineering team.",
      gallery: [
        './img/gallery-hovercraft-1.png',
        './img/gallery-hovercraft-2.png',
        './img/gallery-hovercraft-3.png',
        './img/gallery-hovercraft-4.png',
        './img/gallery-hovercraft-5.png'
      ]
    },
    {
      id: 20,
      title: 'ELSA-d LEO Engineering Presentation',
      date: 'Fall 2024',
      short: 'Presented a professional, research-driven talk on ELSA-d satellite retrieval and orbital debris.',
      image: ASSETS['project-20'],
      tech: ['Academic Research', 'Public Speaking', 'Professional Communication', 'Technical Presentation', 'Aerospace Engineering'],
      overview: "In a technical speech class at Penn State, I completed a semester-long project that culminated in a single, intensive speech of approximately twelve minutes. The project challenged me to conduct high-level engineering research and synthesize complex information into a clear and engaging presentation. The speech focused on the ELSA-d (End-of-Life Service by Astroscale Demonstration) mission and the broader challenges of space pollution, a growing concern as we approach critical limits in orbital debris.",
      body: [
        "Preparing this speech was a rigorous process that demanded extensive research, careful source evaluation, and meticulous organization. I had to hunt for academic and engineering sources, ensuring that every point I made was accurate, well-supported, and relevant to the broader context of space sustainability. This required more effort than typical course projects, as I needed to translate highly technical material into language that could be understood and appreciated by a general engineering audience.",
        "The speech itself was very intense, as it required sustained focus for twelve minutes, memorizing key statistics and facts for precise, accurate delivery, and strict timing to ensure clarity and impact. I practiced repeatedly, refining my timing, pacing, and slides to maximize comprehension and engagement. The culmination of this work was my nomination as a semifinalist in the Penn State College of Engineering Speech Competition, an honor that recognized me for my hard work and natural talents speaking publicly. Though I did not advance into the next stage, I am very proud of myself for how far I went.",
        "I find this style of communication and presentation comes naturally, and after this project I have continued to hone my skills speaking in public and talking to larger groups of people. In engineering, soft skills are often harder to learn. Being an engineer with high-level communication skills is a valuable combination I want to maintain."
      ],
      outcomes: "This project taught me how to tackle challenging technical material and present it in a compelling way, emphasizing clarity without sacrificing depth. I gained experience in academic research, public speaking, and time management under high-pressure conditions. More broadly, I learned the value of persistence and preparation when faced with a demanding task, and I gained confidence in my ability to communicate sophisticated engineering topics to large audiences.",
      gallery: [
        './img/gallery-elsa-1.png',
        './img/gallery-elsa-2.png',
        './img/gallery-elsa-3.png',
        './img/gallery-elsa-4.png'
      ],
      pdfUrl: './img/elsa-d-presentation.pdf'
    },
    {
      id: 15,
      title: '3D Printed Penny Boats',
      date: 'Fall 2023 / 2024',
      short: 'Designed and 3D printed two competition-winning penny boats that doubled as everyday organizers.',
      image: ASSETS['project-15'],
      tech: ['SolidWorks', '3D Printing', 'Sustainable Design', 'Artistic Flair', 'Rapid Prototyping'],
      overview: "Through Penn State's 3D Printing Club, I participated in the annual Penny Boat competition during both my freshman and sophomore years. The challenge was to design and 3D print a small boat that could hold as many pennies as possible before sinking and staying within strict competition rules. These projects gave me the chance to combine creativity, engineering problem-solving, and practical design considerations while also thinking about sustainability and long-term use.",
      body: [
        "During my freshman year, I designed the Queen Bee Barge, a honeycomb-inspired boat that featured hexagonal cells resembling a beehive. This design not only gave the boat strength and structure but also required no supports during printing, making it material efficient and easier to process. The design was a success, and my boat won the competition. Afterward, I repurposed it into an organizer, with each honeycomb cell holding small bathroom and makeup items.",
        "In my sophomore year, I designed the Bathtub Boat, inspired by antique clawfoot tubs. I incorporated small sections into the design so that after the competition, the boat could continue serving as a functional organizer. This focus on reuse was intentional — I wanted my design to avoid being a single-use item, given how much plastic waste is generated by projects like these. Both boats continue to serve as everyday organizers, which I see as just as important as their performance in the competition.",
        "From a technical perspective, I considered weight distribution and buoyancy in both designs. I placed pennies evenly across the hull and used an infill pattern that maximized air pockets without sacrificing too much structural strength, allowing the boats to float effectively while still holding a significant number of pennies."
      ],
      outcomes: "These projects taught me creative problem-solving, practical 3D printing techniques, and how to balance competition goals with sustainability and real-world use. Beyond the technical lessons, I gained an appreciation for designing with purpose: making something that not only performs well in a challenge but also has long-term utility. The Penny Boat projects showed me how engineering can be fun, resourceful, and environmentally thoughtful all at the same time.",
      gallery: [
        './img/gallery-penny-1.png',
        './img/gallery-penny-2.png',
        './img/gallery-penny-3.png',
        './img/gallery-penny-4.png',
        './img/gallery-penny-5.png'
      ]
    },
    {
      id: 5,
      title: 'Gingerbread Greenhouse Dream',
      date: 'Fall 2022',
      short: 'Designed and built a complex edible greenhouse with sloped roofs, gelatin windows, and integrated lights.',
      image: ASSETS['project-5'],
      tech: ['Architectural Design', 'Food Engineering', 'Passion Project', 'Project Planning'],
      overview: "For a high school creative engineering challenge, I designed and constructed a fully edible, architecturally complex gingerbread greenhouse. The structure featured sloped roofs, a small entry hall with swinging double doors, integrated lighting beneath a 'tiled' floor, and window panels made of gelatin sheets to create a realistic greenhouse effect. I am extremely proud of the results and used this project as a great chance to show off how I can work with limiting materials.",
      body: [
        "In my senior year of high school, I challenged myself to build an architecturally ambitious gingerbread structure. Inspired by greenhouse design, the final build featured sloped roofs, gelatin sheet windows, and a fully edible entry hall with swinging double doors.",
        "To make the project work, I relied on careful geometric planning. The intersection of angled rooflines required advanced 3D visualization and some hand-calculated trigonometry. I sketched ideas, tested with paper templates, and created a scaled cardboard mockup before baking.",
        "Structurally, the greenhouse walls acted more like frames than solid panels, which introduced challenges in maintaining stability. I experimented with icing formulations to ensure strong adhesion between gelatin windows and gingerbread without sacrificing edibility.",
        "I installed a patterned peppermint \"tile\" floor and embedded fairy lights beneath it, using frosting as grout. When lit, the floor glowed between tiles for a blinking effect. The interior was fully decorated, complete with an ice cream cone tree and small wrapped \"gifts.\"",
        "Though it began as a seasonal build, the final structure held together beautifully and became a winter centerpiece for months."
      ],
      outcomes: "The purpose of this project was mainly fun; while I did learn some new geometry to calculate the roof shape, the overall project was mostly creative/art rather than engineering/calculation based. This project and other physical projects I have done have strengthened my spatial reasoning skills, and ultimately made me a more skilled designer when I learned CAD at a higher level. Not every project has to be extremely productive, but I am so happy I made this.",
      gallery: [
        './img/gallery-ginger-1.png',
        './img/gallery-ginger-2.png',
        './img/gallery-ginger-3.png',
        './img/gallery-ginger-4.png',
        './img/gallery-ginger-5.png',
        './img/gallery-ginger-6.png'
      ]
    }
  ];

  /* =====================================================================
     3.  EXPERIENCE — entries shown in the timeline section.
     ===================================================================== */
  const EXPERIENCE = [
    {
      id: 1,
      role: 'Research & Development Intern',
      company: 'Applied Research Laboratory at Penn State',
      location: 'State College, PA',
      duration: 'October 2025 – Present',
      logo: ASSETS['company-arl'],
      description: "As an R&D Engineering Intern I learned FPV drone fabrication and operation with preparation for FAA Part 107 certification, was selected as a Pipeline Student, and hold an active security clearance."
    },
    {
      id: 2,
      role: 'Mechanical Engineering Intern',
      company: 'Communications & Power Industries',
      location: 'State College, PA',
      duration: 'Summer 2025',
      logo: ASSETS['company-cpi'],
      description: "Designed components for manufacturability, supported satellite systems, and integrated mechanical and electronic knowledge. My work included SolidWorks modeling and simulation, detailed documentation, and backend tasks like BOM management."
    },
    {
      id: 3,
      role: 'Student Trainee',
      company: 'Naval Undersea Warfare Center (NUWC)',
      location: 'Newport, RI',
      duration: 'Summer 2024',
      logo: ASSETS['company-nuwc'],
      description: "Updated legacy designs into detailed 3D models and drawings, developed and critiqued assembly guides for technician use, and collaborated with electrical engineers to deliver cross-disciplinary solutions."
    },
    {
      id: 4,
      role: 'Drone Crew Member',
      company: 'Sky Elements Drone Shows',
      location: 'Dallas, TX',
      duration: 'April 2021 – January 2023',
      logo: ASSETS['company-sky'],
      description: "As a drone crew member, I maintained and prepared UAVs for live shows, ensured safe operation of hazardous equipment, and arranged preparatory formations — an experience that sparked my passion for drone technology."
    },
    {
      id: 5,
      role: 'Pyrotechnic Assistant',
      company: 'Flambeaux Fireworks',
      location: 'Texas',
      duration: '2018 – 2020',
      logo: ASSETS['company-flambo'],
      description: "Assisted in wiring and setting up professional fireworks displays using COBRA modules and e-fuses, while following fire safety protocols and hands-on training to ensure safe and successful shows."
    }
  ];

  /* =====================================================================
     4.  THEMES — which dessert theme each project gets on its detail page.
     ---------------------------------------------------------------------
     The keys here match project IDs above. style.css picks up the matching
     body class (`theme-<name>`) and tweaks accent color + decorations.
     ===================================================================== */
  const THEMES = {
    40: { name: 'lemon-tea',  illo: ASSETS['theme-lemon-tea']  },
    35: { name: 'lemon-bar',  illo: ASSETS['theme-lemon-bar']  },
    30: { name: 'sorbet',     illo: ASSETS['theme-sorbet']     },
    25: { name: 'lemon-tart', illo: ASSETS['theme-lemon-tart'] },
    20: { name: 'meringue',   illo: ASSETS['theme-meringue']   },
    15: { name: 'popsicle',   illo: ASSETS['theme-popsicle']   },
    5:  { name: 'meringue',   illo: ASSETS['theme-meringue']   }
  };

  /* =====================================================================
     5.  TINY DOM HELPERS — short aliases to keep code below readable.
     ===================================================================== */
  const $  = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const make = (tag, cls, html) => {
    const el = document.createElement(tag);
    if (cls)  el.className = cls;
    if (html != null) el.innerHTML = html;
    return el;
  };

  /* =====================================================================
     6.  CAROUSEL — the 3D project showcase on the homepage.
     ---------------------------------------------------------------------
     Conceptually: imagine the project cards laid out in a circle around
     a central axis. The card at "index 0" is the one facing the camera.
     As the carousel "rotates" we change which card has offset 0.

     For visual layout we compute a transform per card:
       - rotateY around the central axis (relative to the active card)
       - translateZ to push side cards away from camera
       - scale + opacity so the active card stands out

     The user can drag horizontally to spin; release applies momentum
     (velocity-based decay) until the carousel snaps to the nearest card.
     ===================================================================== */
  function initCarousel() {
    const track = $('#carouselTrack');
    if (!track) return;            // not on the home page

    const prevBtn = $('#carouselPrev');
    const nextBtn = $('#carouselNext');
    const count = PROJECTS.length;

    // angleStep: how many degrees apart each card sits on the arc.
    const angleStep = 22;
    // currentAngle: the carousel's current rotation in degrees.
    let currentAngle = 0;
    // target: the rotation we are smoothly easing toward.
    let targetAngle = 0;
    // velocity carried after a drag release for momentum.
    let velocity = 0;

    // Build a card element per project and append to the track.
    PROJECTS.forEach((p, i) => {
      const card = make('a', 'carousel__card');
      card.href = `./pages/project-detail-template.html?id=${p.id}`;
      card.setAttribute('role', 'listitem');
      card.dataset.index = String(i);
      card.innerHTML = `
        <img src="${p.image}" alt="${p.title} thumbnail" loading="lazy" />
        <div class="carousel__card-body">
          <p class="carousel__card-date">${p.date}</p>
          <h3 class="carousel__card-title">${p.title}</h3>
          <p class="carousel__card-tag">${p.short}</p>
          <span class="carousel__card-cta">View Recipe →</span>
        </div>`;
      track.appendChild(card);
    });

    const cards = $$('.carousel__card', track);

    /* layoutCards
       ----------
       Positions every card based on its index vs. the active index.
       offset is normalized to (-count/2 .. count/2] so the math wraps
       around the back of the arc and the loop feels infinite. */
    function layoutCards() {
      const activeIndex = Math.round(-currentAngle / angleStep);
      cards.forEach((card, i) => {
        // Distance from the active index, signed and wrapped.
        let offset = i - ((activeIndex % count) + count) % count;
        if (offset > count / 2)  offset -= count;
        if (offset < -count / 2) offset += count;

        // Visual transforms.
        const rotateY = offset * angleStep;
        const translateX = offset * 60;       // sideways spacing
        const translateZ = -Math.abs(offset) * 80; // push back
        const scale = offset === 0 ? 1.15 : 0.85;
        const opacity = offset === 0 ? 1 : 0.55;
        const zIndex = 100 - Math.abs(offset);

        card.style.transform =
          `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${-rotateY}deg) scale(${scale})`;
        card.style.opacity = String(opacity);
        card.style.zIndex = String(zIndex);
      });
    }

    /* tick — runs on requestAnimationFrame.
       Eases currentAngle toward targetAngle and applies momentum
       decay. The carousel always snaps to the nearest card. */
    function tick() {
      // If we have leftover velocity from a drag release, decay it.
      if (Math.abs(velocity) > 0.05) {
        targetAngle += velocity;
        velocity *= 0.94; // friction
      } else {
        // Snap target to the nearest multiple of angleStep.
        targetAngle = Math.round(targetAngle / angleStep) * angleStep;
      }
      // Ease current toward target.
      currentAngle += (targetAngle - currentAngle) * 0.18;
      layoutCards();
      requestAnimationFrame(tick);
    }

    /* Arrow click handlers: move target one step in the requested direction. */
    function step(dir) { targetAngle -= dir * angleStep; velocity = 0; }
    if (prevBtn) prevBtn.addEventListener('click', () => step(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => step(+1));

    /* Drag (pointer + touch). pointerdown captures start position,
       pointermove tracks horizontal delta, pointerup releases with
       a velocity equal to the last frame's delta. */
    let dragging = false, startX = 0, lastX = 0, lastDX = 0;
    track.addEventListener('pointerdown', (e) => {
      dragging = true;
      track.classList.add('is-dragging');
      startX = lastX = e.clientX;
      lastDX = 0;
      velocity = 0;
      track.setPointerCapture(e.pointerId);
    });
    track.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastDX = dx;
      lastX = e.clientX;
      // Drag right (positive dx) should rotate cards to the right.
      targetAngle += dx * 0.4;
    });
    function endDrag(e) {
      if (!dragging) return;
      dragging = false;
      track.classList.remove('is-dragging');
      // Release with last frame's delta as momentum.
      velocity = lastDX * 0.5;
      try { track.releasePointerCapture(e.pointerId); } catch (_) {}
    }
    track.addEventListener('pointerup', endDrag);
    track.addEventListener('pointercancel', endDrag);
    track.addEventListener('pointerleave', endDrag);

    // Keyboard support — left/right arrows step the carousel.
    track.tabIndex = 0;
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft')  step(-1);
      if (e.key === 'ArrowRight') step(+1);
    });

    // Layout immediately and start the loop.
    layoutCards();
    tick();
  }

  /* =====================================================================
     7.  EXPERIENCE TIMELINE — render entries, observe for fade-up.
     ===================================================================== */
  function initTimeline() {
    const list = $('#experienceList');
    if (!list) return;

    EXPERIENCE.forEach((exp) => {
      const li = make('li', 'timeline__item');
      li.innerHTML = `
        <h3 class="timeline__role">${exp.role}</h3>
        <p class="timeline__meta">
          <strong>${exp.company}</strong>
          <span>· ${exp.location}</span>
          <span>· ${exp.duration}</span>
        </p>
        <p class="timeline__desc">${exp.description}</p>`;
      list.appendChild(li);
    });

    // IntersectionObserver fades entries in as they enter the viewport.
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });
    $$('.timeline__item').forEach((el) => io.observe(el));
  }

  /* =====================================================================
     8.  RECIPE BOOK — render the cards on projects.html.
     ===================================================================== */
  function initRecipeBook() {
    const grid = $('#recipebookGrid');
    if (!grid) return;

    // Sort: newest (highest id) first.
    const sorted = PROJECTS.slice().sort((a, b) => b.id - a.id);

    sorted.forEach((p) => {
      const li = document.createElement('li');
      const a = make('a', 'recipe-card');
      a.href = `./pages/project-detail-template.html?id=${p.id}`;
      const chips = p.tech.slice(0, 3)
        .map((t) => `<span class="recipe-card__chip">${t}</span>`).join('');
      a.innerHTML = `
        <img src="${p.image}" alt="${p.title} thumbnail" loading="lazy" />
        <div class="recipe-card__body">
          <p class="recipe-card__date">${p.date}</p>
          <h3 class="recipe-card__title">${p.title}</h3>
          <p class="recipe-card__tag">${p.short}</p>
          <div class="recipe-card__tags">${chips}</div>
          <span class="recipe-card__cta">View Recipe →</span>
        </div>`;
      li.appendChild(a);
      grid.appendChild(li);
    });
  }

  /* =====================================================================
     9.  PROJECT DETAIL — fill the template from ?id=N.
     ---------------------------------------------------------------------
     Reads the URL parameter, finds the project, applies the theme class
     to <body>, and fills in every data-* hook in the template.
     ===================================================================== */
  function initDetail() {
    if (!document.body.classList.contains('page-detail')) return;

    // Parse ?id=N from the URL. Default to the newest project.
    const params = new URLSearchParams(location.search);
    const id = parseInt(params.get('id'), 10);
    const project = PROJECTS.find((p) => p.id === id) || PROJECTS[0];

    // Apply theme class so the CSS variables for accents kick in.
    const theme = THEMES[project.id] || THEMES[5];
    document.body.classList.add(`theme-${theme.name}`);

    // Set <title>.
    document.title = `${project.title} · Catherine Boss`;

    // Header banner illustration.
    const themeImg = $('[data-theme-img]');
    if (themeImg) themeImg.src = theme.illo;

    // Text content hooks.
    $('[data-project-title]').textContent    = project.title;
    $('[data-project-date]').textContent     = project.date;
    $('[data-project-date-2]').textContent   = project.date;
    $('[data-project-short]').textContent    = project.short;
    $('[data-project-overview]').textContent = project.overview;
    $('[data-project-outcomes]').textContent = project.outcomes;

    // Body paragraphs (handle string OR string[]).
    const bodyHost = $('[data-project-body]');
    const body = Array.isArray(project.body) ? project.body : [project.body];
    body.forEach((para) => bodyHost.appendChild(make('p', null, para)));

    // Tag chips.
    const tagsHost = $('[data-project-tags]');
    project.tech.forEach((t) => {
      const chip = make('li', null, t);
      tagsHost.appendChild(chip);
    });

    // Optional PDF section.
    if (project.pdfUrl) {
      const pdfSec = $('[data-pdf-section]');
      pdfSec.hidden = false;
      $('[data-pdf-frame]').src = project.pdfUrl;
      const docBtn = $('[data-doc-link]');
      docBtn.hidden = false;
      docBtn.href = project.pdfUrl;
    }

    // Gallery.
    if (project.gallery && project.gallery.length) {
      initDetailGallery(project.gallery);
    } else {
      // Hide gallery section if no images.
      const gs = $('[data-gallery-section]');
      if (gs) gs.style.display = 'none';
    }
  }

  /* Gallery sub-renderer used by initDetail. */
  function initDetailGallery(images) {
    let i = 0;
    const main = $('[data-gallery-main]');
    const counter = $('[data-gallery-counter]');
    const thumbs = $('[data-gallery-thumbs]');

    function render() {
      main.src = images[i];
      counter.textContent = `${i + 1} / ${images.length}`;
      $$('li', thumbs).forEach((el, j) => el.classList.toggle('is-active', j === i));
    }

    images.forEach((src, j) => {
      const li = make('li');
      li.innerHTML = `<img src="${src}" alt="Thumbnail ${j + 1}" loading="lazy" />`;
      li.addEventListener('click', () => { i = j; render(); });
      thumbs.appendChild(li);
    });

    $('[data-gallery-prev]').addEventListener('click', () => {
      i = (i - 1 + images.length) % images.length; render();
    });
    $('[data-gallery-next]').addEventListener('click', () => {
      i = (i + 1) % images.length; render();
    });

    render();
  }

  /* =====================================================================
     10. NAV — hamburger toggle (mobile) and smooth scrolling.
     ===================================================================== */
  function initNav() {
    const btn = $('#hamburger');
    const links = $('#navLinks');
    if (btn && links) {
      btn.addEventListener('click', () => {
        const open = links.classList.toggle('is-open');
        btn.classList.toggle('is-open', open);
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      // Close menu when a link is tapped.
      $$('a', links).forEach((a) => a.addEventListener('click', () => {
        links.classList.remove('is-open');
        btn.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      }));
    }
  }

  /* =====================================================================
     11. PARALLAX — slow vertical shift for the hero basket.
     ---------------------------------------------------------------------
     Looks for [data-parallax="0.3"] and translates it by scroll * factor.
     We listen via requestAnimationFrame instead of a scroll event so this
     stays smooth even on slower machines.
     ===================================================================== */
  function initParallax() {
    const targets = $$('[data-parallax]');
    if (!targets.length) return;
    function frame() {
      const y = window.scrollY;
      targets.forEach((el) => {
        const factor = parseFloat(el.dataset.parallax) || 0.2;
        el.style.transform = `translateY(${y * factor}px)`;
      });
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* =====================================================================
     12. CLICK SPLASH — tiny lemon splash at the cursor on every click.
     ---------------------------------------------------------------------
     Inline SVG defined in JS (per the brief) so it doesn't require a file.
     ===================================================================== */
  function initClickSplash() {
    const svgMarkup = `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" stroke="#E0C547" stroke-linecap="round" stroke-width="1.8">
          <path d="M12 4v3"/>
          <path d="M12 17v3"/>
          <path d="M4 12h3"/>
          <path d="M17 12h3"/>
          <path d="M6.3 6.3l2 2"/>
          <path d="M15.7 15.7l2 2"/>
          <path d="M6.3 17.7l2-2"/>
          <path d="M15.7 8.3l2-2"/>
        </g>
        <circle cx="12" cy="12" r="2.6" fill="#F9E784" stroke="#E0C547" stroke-width="1.4"/>
      </svg>`;
    document.addEventListener('click', (e) => {
      // Skip splashes inside drag interactions and on form controls.
      if (e.target.closest('input, textarea')) return;
      const splash = make('span', 'click-splash', svgMarkup);
      splash.style.left = `${e.clientX}px`;
      splash.style.top  = `${e.clientY}px`;
      document.body.appendChild(splash);
      // Self-remove once the CSS animation finishes.
      setTimeout(() => splash.remove(), 480);
    });
  }

  /* =====================================================================
     13. TOAST — small floating message used by easter eggs.
     ===================================================================== */
  function toast(message, durationMs) {
    const el = $('#toast');
    if (!el) return;
    el.textContent = message;
    el.classList.add('is-on');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove('is-on'), durationMs || 2400);
  }

  /* =====================================================================
     14. EASTER EGG #1 — Pink Lemonade Mode (double-click pitcher).
     ===================================================================== */
  function initPinkMode() {
    const pitcher = $('#pitcher');
    if (!pitcher) return;
    pitcher.addEventListener('dblclick', () => {
      const html = document.documentElement;
      const wasPink = html.classList.toggle('pink-mode');
      // Swap the pitcher illustration src so the lemonade itself changes color.
      // (Other assets stay the same per the brief.)
      const img = pitcher.querySelector('img');
      if (img) img.src = wasPink ? './img/pitcher-pink.png' : './img/pitcher.png';
      toast(wasPink ? '🌸 Pink lemonade mode unlocked!' : '🍋 Back to classic lemonade');
    });
  }

  /* =====================================================================
     15. EASTER EGG #2 — Lemon counter.
     ---------------------------------------------------------------------
     Every element with [data-lemon-counter] increments a counter on click.
     At 10 clicks → confetti burst. At 25 clicks → secret message.
     ===================================================================== */
  function initLemonCounter() {
    let n = 0;
    let secretShown = false;
    $$('[data-lemon-counter]').forEach((el) => {
      el.addEventListener('click', () => {
        n += 1;
        if (n === 10) burstConfetti();
        else if (n === 25 && !secretShown) {
          secretShown = true;
          toast("🍋 Twenty-five lemons. You really mean business.", 4500);
        }
      });
    });

    function burstConfetti() {
      // Make ~50 colored pieces, throw them down with random horizontal drift.
      const colors = ['#F9E784', '#FFB3C6', '#B5C99A', '#FF7B54', '#FFF59B'];
      for (let i = 0; i < 50; i++) {
        const p = make('span', 'confetti-piece');
        p.style.left = `${Math.random() * 100}%`;
        p.style.background = colors[i % colors.length];
        p.style.animationDuration = `${1.8 + Math.random() * 1.2}s`;
        p.style.transform = `translateX(${(Math.random() - 0.5) * 80}px)`;
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 2600);
      }
      toast('🎉 Ten lemons — that\'s a whole jug!');
    }
  }

  /* =====================================================================
     16. EASTER EGG #3 — Chef hat on long-hover (3s) of the headshot.
     ===================================================================== */
  function initChefHat() {
    const wrap = $('#headshot');
    if (!wrap) return;
    let timer = null;
    wrap.addEventListener('mouseenter', () => {
      timer = setTimeout(() => wrap.classList.add('is-chef'), 3000);
    });
    wrap.addEventListener('mouseleave', () => {
      clearTimeout(timer);
      // Keep the hat on once earned for the rest of the session.
    });
  }

  /* =====================================================================
     17. EASTER EGG #4 — Triple-click wordmark reveals a hidden joke.
     ===================================================================== */
  function initWordmarkSecret() {
    const word = $('#wordmark');
    if (!word) return;
    let clicks = 0;
    let resetT = null;
    word.addEventListener('click', (e) => {
      // Always preventDefault — we'll handle navigation manually after a
      // 650ms idle window. That way fast triple-clicks can fire the easter
      // egg without the browser jumping to the link target on click #1.
      e.preventDefault();
      clicks += 1;
      clearTimeout(resetT);
      // If three clicks land within the window, reveal the secret.
      if (clicks >= 3) {
        clicks = 0;
        const joke = $('#lemonJoke');
        if (joke) {
          joke.classList.add('is-revealed');
          joke.scrollIntoView({ behavior: 'smooth', block: 'center' });
          toast('🤫 You found the secret stand.');
        }
        return;
      }
      // After the window passes with fewer than three clicks, treat it as
      // a normal navigation — go to the wordmark link's href.
      resetT = setTimeout(() => {
        if (clicks === 1) {
          const href = word.getAttribute('href');
          if (href && href.startsWith('#')) {
            const t = document.querySelector(href);
            if (t) t.scrollIntoView({ behavior: 'smooth' });
          } else if (href) {
            window.location.href = href;
          }
        }
        clicks = 0;
      }, 650);
    });
  }

  /* =====================================================================
     18. BOOTSTRAP — page detection + everything wires up here.
     ===================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    // Initializers are safe to call on every page; each one no-ops if the
    // elements it needs aren't present.
    initNav();
    initClickSplash();
    initCarousel();
    initTimeline();
    initRecipeBook();
    initDetail();
    initParallax();
    initPinkMode();
    initLemonCounter();
    initChefHat();
    initWordmarkSecret();
  });

})();
ref = href;
          }
        }
        clicks = 0;
      }, 650);
    });
  }

  /* =====================================================================
     18. BOOTSTRAP — page detection + everything wires up here.
     ===================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    // Initializers are safe to call on every page; each one no-ops if the
    // elements it needs aren't present.
    initNav();
    initClickSplash();
    initCarousel();
    initTimeline();
    initRecipeBook();
    initDetail();
    initParallax();
    initPinkMode();
    initLemonCounter();
    initChefHat();
    initWordmarkSecret();
  });

})();
