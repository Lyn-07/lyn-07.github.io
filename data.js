/* =====================================================================
   ALL EDITABLE CONTENT LIVES HERE.
   - Keep the quote marks and the commas between items.
   - Wrap words in **double asterisks** to make them bold. That's the
     only formatting allowed, which keeps the site safe.
   - Thumbnails: put image files in the repository ROOT (next to index.html)
     and write just the filename, e.g. thumb: "thumb-cny-walkthrough-reel.jpg".
     If a file is missing, the card shows a designed text cover instead.
   ===================================================================== */
window.PORTFOLIO = {

  site: {
    name: "Cheah Lyn Lin",
    email: "lynlin7@hotmail.com",
    linkedin: "https://www.linkedin.com/in/lyn07",
    resume: "Cheah-Lyn-Lin-Resume.pdf",
    resumeNote: "Two pages, text-based PDF. Updated October 2026.",
    showPlaceholders: false,   // set to false before sharing: hides setup notes and unverified links
    searchQueries: ["coffee rental", "e-invoice date", "ga4 ai referrals"]
  },

  /* Homepage highlights. Numbers count up automatically; words (like "Multilingual Video") don't. */
  proofs: [
    { value: "4", text: "**B2B client websites** in my monthly SEO delivery", note: "Freelance, since July 2026" },
    { value: "242,634", text: "**Instagram views** on an event account I set up from scratch", note: "First 30 days: 26 Dec 2025 to 24 Jan 2026" },
    { value: "929K+", text: "**Facebook views recorded** during a vehicle-listing posting period", note: "Six months: 29 Mar to 15 Sep 2025" },
    { value: "Multilingual Video", text: "Production in Mandarin and Malay, including AI-assisted video", note: "Freelance, project-based" }
  ],

  /* Studio objects. id must match data-obj="..." in index.html.
     caseId opens a case study; go opens a homepage section. */
  room: [
    { id: "computer", caseId: "seo", name: "Desktop Computer", label: "SEO and Analytics", line: "Where the monthly SEO work happens: research, fixes, writing and reports." },
    { id: "board", caseId: "cny", name: "Campaign Board", label: "Social Campaign", line: "The content plan behind a brand-new event account." },
    { id: "camera", caseId: "video", name: "Camera", label: "Video Production", line: "Short video in Mandarin and Malay, including AI-assisted productions." },
    { id: "wall", caseId: "auto", name: "Results Screen", label: "Performance", line: "A part-time posting and Facebook-group distribution role." },
    { id: "window", go: "photography", name: "Window", label: "Photography", title: "Through My Lens", line: "A small, separate set of event, portrait and graduation photography.", points: [], cta: "Open the Gallery" },
    { id: "shelf", go: "about", name: "Bookshelf", label: "About Me", title: "About Me", line: "Languages, background and the path that led me into digital marketing.", points: ["English, Mandarin, Malay, Cantonese and Hokkien", "English Language Studies and Communication, USM"], cta: "Read About Me" }
  ],

  /* ---------- Case studies ----------
     cover      = image on the homepage card (fallback = text shown until the image exists)
     workIntro  = one line under "Selected Work" in the case study
     work       = the deliverable cards shown right after the case header
                  kind: "video" | "demo" | "preview"   (articles come from the articles list below)
                  group: "later" puts a card under the matching workGroups heading
     workGroups = optional headings and notes for each group */
  cases: [
    {
      id: "seo",
      discipline: "SEO and Analytics",
      title: "Monthly SEO for Four B2B Websites",
      short: "Keyword research, on-page fixes, articles and reporting across four industries, plus GA4 AI referral tracking.",
      period: "Jul 2026 – Present",
      org: "VeecoTech Solutions (Freelance)",
      role: "SEO Specialist (Freelance)",
      tools: "Google Analytics 4, Tag Manager, Search Console, Bing Webmaster Tools, Clarity, Keyword.com, Looker Studio, Claude",
      summary: "Since July 2026 I've run the monthly SEO cycle for **four B2B websites** in ERP consulting, Islamic finance, B2B coffee solutions, and oil, gas and power engineering. Plans go through our SEO Lead before anything ships.",
      highlights: ["Four B2B sites, four industries, one monthly cycle", "AI-assisted keyword research, reviewed by an SEO Lead", "GA4 AI Referral Tracking"],
      cover: { src: "thumb-blackoak-einvoice.jpg", position: "50% 0%", fallback: "Published SEO articles and GA4 AI referral tracking" },
      workIntro: "Published articles from my SEO delivery, plus a demonstration of the GA4 AI-referral setup built with made-up settings.",
      workFromArticles: true,   // every published article below becomes a card automatically
      work: [
        { kind: "demo", title: "GA4 AI Referral Channel", source: "Demonstration · made-up settings",
          description: "How the custom channel group separates AI-assistant referrals. Built from scratch for this portfolio; not a client configuration.",
          rows: ["Direct", "Organic Search", "AI assistants", "Referral"], highlight: "AI assistants",
          cta: "View the Demonstration", target: "ga4-demo" }
      ],
      challenge: "Each client speaks a different language. ERP buyers, Islamic finance customers, café owners and engineers all search differently. Every month needs a plan, published work, and a report a non-specialist can follow.",
      process: [
        { title: "Keyword Research and Content Planning", text: "I own the **SEO keyword research and content planning** deliverables. I use Claude to speed up research and SERP review, check what it gives me, and submit the plan to our SEO Lead for review before anything goes live." },
        { title: "On-Page and Technical Fixes", text: "Title tags, meta descriptions, heading structure, URL slugs, image alt text, internal links and schema on WordPress and Elementor sites, plus XML sitemaps and index monitoring." },
        { title: "Writing", text: "Long-form articles written from approved briefs, following Google's E-E-A-T guidelines." },
        { title: "Tracking and Reporting", text: "GA4, Search Console, Tag Manager, Bing Webmaster Tools and Microsoft Clarity. **100+ target keywords** tracked in Keyword.com, and monthly Looker Studio reports presented to client stakeholders." },
        { title: "GA4 AI Referral Tracking", text: "Built a custom GA4 channel group so visits from ChatGPT, Perplexity, Gemini, Copilot and Claude show up as their own channel instead of disappearing into Referral." }
      ],
      evidence: [
        { value: "4", label: "client websites", note: "Monthly delivery since July 2026" },
        { value: "100+", label: "target keywords tracked", note: "Across clients, in Keyword.com" },
        { value: "auto:articles", label: "published writing samples", note: "Shown in Selected Work above" } // counts the articles list automatically
      ],
      figures: [{
        type: "ga4demo",
        flag: "Demonstration with made-up settings. Not a client configuration.",
        groupName: "Channel group: AI-aware channels (demo)",
        order: ["Direct", "Paid Search", "Organic Search", "AI assistants", "Referral", "Organic Social", "Email"],
        highlight: "AI assistants",
        condition: "Session source matches regex",
        regex: "^(chatgpt\\.com|chat\\.openai\\.com|perplexity\\.ai|gemini\\.google\\.com|copilot\\.microsoft\\.com|claude\\.ai)$",
        caption: "Order matters: GA4 puts each session in the first channel whose rules match, so the AI channel has to sit above Referral. Anchoring the pattern to full domains stops it catching unrelated sites whose names happen to contain a word like gemini."
      }],
      limits: "This work began in July 2026. Rankings and traffic from before then aren't mine to claim, and a few months is too short for a fair before-and-after. Client dashboards, keyword lists and GA4 settings stay private. The diagram above is a demonstration built from scratch, and the channel only measures AI referrals. It doesn't create them.",
      lessons: [
        "Language skills transfer directly. Keyword research is mostly working out which words a buyer actually uses, and how they differ from the words a company uses about itself.",
        "AI tools make research faster, but the review step is where mistakes get caught. Keeping a human sign-off in the workflow is part of the job, not a formality."
      ]
    },

    {
      id: "cny",
      discipline: "Social Campaign",
      title: "Launching a Community Event's Instagram from Scratch",
      short: "A new account for a Gen-Z-run Chinese New Year event: **242,634 Instagram views** and 14,577 interactions in its **first 30 days**.",
      period: "Dec 2025 – Jan 2026",
      org: "Bayan Baru Chinese New Year Celebration 2026",
      role: "Created and Managed @genz_bayanbaru (Freelance)",
      tools: "Instagram, Facebook, Meta Business Suite, Meta Ads Manager",
      summary: "A community Chinese New Year celebration organised by a Gen-Z team needed an online presence in under a month. I created the Instagram account on 24 December 2025 (it launched as @cny_bayanbaru and is now @genz_bayanbaru) and ran it through the event, alongside the Facebook page.",
      highlights: ["242,634 Instagram views in the first 30 days", "75.5% of views from non-followers", "One Reel at about 70.6K organic views"],
      cover: { src: "thumb-cny-walkthrough-reel.jpg", position: "50% 35%", fallback: "242,634 Instagram views in the first 30 days" },
      workIntro: "The campaign Reel from the event account, followed by two later Reels on the same account.",
      workGroups: {
        main: { title: "CNY Campaign" },
        later: { title: "Later Community Projects", note: "These Reels covered an SPM awards ceremony, not the Chinese New Year event. Their views aren't included in the 30-day campaign figures." }
      },
      work: [
        { kind: "video", platform: "instagram", title: "The Event Walkthrough Reel", source: "Instagram Reel · @genz_bayanbaru",
          description: "Mandarin Reel built on a hook, value, reward structure to promote the Chinese New Year event.",
          stats: "67,940 views at day 5 (Instagram + Facebook)",
          url: "https://www.instagram.com/reel/DT0QS24ErVt/", cta: "Watch Reel",
          thumb: "thumb-cny-walkthrough-reel.jpg", ratio: "1/1", position: "50% 35%" },
        { kind: "video", platform: "instagram", group: "later", title: "Where Did RM20,000 Go? — SPM Excellence Awards", source: "Instagram Reel · @genz_bayanbaru",
          description: "Mandarin explainer about the SPM Chinese-language excellence awards and SSPN savings.",
          stats: "34.4K views · 837 likes · 684 shares", statsNote: "Recorded 25 Oct 2026",
          url: "https://www.instagram.com/reel/DXWloeikVtl/", cta: "Watch Reel",
          thumb: "thumb-spm-rm20000-reel.jpg", ratio: "1/1", position: "50% 35%" },
        { kind: "video", platform: "instagram", group: "later", title: "SPM Top Scorers Speak — Student Interviews", source: "Instagram Reel · @genz_bayanbaru",
          description: "Student reactions and questions about the awards, SSPN registration and SPM study tips.",
          stats: "22.7K views · 357 likes · 320 shares", statsNote: "Recorded 25 Oct 2026",
          url: "https://www.instagram.com/reel/DXjGGiJkW65/", cta: "Watch Reel",
          thumb: "thumb-spm-top-scorers-reel.jpg", ratio: "1/1", position: "50% 35%" }
      ],
      challenge: "Make a traditional community event feel worth attending for younger locals, starting with no followers and less than a month to go.",
      process: [
        { title: "Set Up the Account and Its Voice", text: "Created the account and wrote in a playful, Gen-Z Mandarin voice that still respected the occasion." },
        { title: "Let the Data Pick the Formats", text: "Insights showed **posters and Reels earned almost all interactions** (55.9% and 40.2%), so the calendar leaned on both." },
        { title: "Write Reels to Be Shared", text: "Reels followed a hook, value, reward structure: a reason to stop scrolling, the event details, then a payoff worth sending to a friend." },
        { title: "Keep Paid Support Small and Tracked", text: "A few boosted posts ran through Meta Ads Manager. In the reporting window, ads accounted for 3.1% of Instagram views." },
        { title: "Run Facebook in Parallel", text: "Wrote captions, scheduled posts and produced Reels for the event's Facebook page." }
      ],
      evidence: [
        { value: "242,634", label: "Instagram views", note: "Instagram Insights, 26 Dec 2025 – 24 Jan 2026. 3.1% from ads." },
        { value: "14,577", label: "Instagram interactions", note: "Instagram Insights, 26 Dec 2025 – 24 Jan 2026. 0.7% from ads." },
        { value: "70,264", label: "accounts reached", note: "Instagram Insights, 26 Dec 2025 – 24 Jan 2026." },
        { value: "75.5%", label: "of views from non-followers", note: "Instagram Insights, 26 Dec 2025 – 24 Jan 2026." },
        { value: "≈70.6K", label: "organic views on one Reel", note: "Self-reported total. A day-5 snapshot showed 67,940 views (50,871 Instagram, 17,069 Facebook) and 3.5K shares." }
      ],
      figures: [
        { type: "bars", percent: true, title: "Share of Instagram Interactions by Format",
          rows: [{ label: "Posters", value: 55.9 }, { label: "Reels", value: 40.2 }, { label: "Everything else", value: 3.9 }],
          caption: "Instagram Insights, 26 Dec 2025 – 24 Jan 2026." },
        { type: "bars", percent: true, title: "Who Saw the Content",
          rows: [{ label: "Non-followers", value: 75.5 }, { label: "Followers", value: 24.5 }],
          caption: "Share of Instagram views, 26 Dec 2025 – 24 Jan 2026." }
      ],
      limits: "Views count every time content is shown, including repeat views by the same person, so they aren't unique people. Instagram and Facebook figures come from separate tools and shouldn't be added together. Event attendance can't be attributed to the account.",
      lessons: [
        "**Non-followers accounted for 75.5% of Instagram views** during the reporting period, according to Instagram Insights.",
        "Format data beat gut feel. Posters and Reels earned almost all interactions, so that's where the effort went."
      ]
    },

    {
      id: "video",
      discipline: "Video Production",
      title: "Multilingual Short Video for Community and Public-Affairs Accounts",
      short: "**Multilingual video production** in Mandarin and Malay, including three AI-generated productions and two Malay adaptations.",
      period: "Apr – Jul 2026",
      org: "Freelance, community and public-affairs accounts",
      role: "Digital Content Creator & Video Producer (Freelance)",
      tools: "Kling AI, Dora AI",
      summary: "Short videos for community and public-affairs social accounts in Mandarin and Malay. This case covers selected work, including **3 AI-generated video productions and 2 Malay-language adaptations**. It isn't a count of everything I've produced.",
      highlights: ["Multilingual video production in Mandarin and Malay", "3 AI-generated videos + 2 Malay adaptations", "AI-assisted video published by Oriental Daily News Malaysia"],
      cover: { src: "thumb-saifuddin-ai-video.jpg", position: "50% 40%", fallback: "Multilingual video in Mandarin and Malay" },
      workIntro: "Selected productions, credited to the original accounts and outlets that published them.",
      work: [
        { kind: "video", platform: "facebook", title: "AI-Assisted Video (Kling AI)", source: "Facebook · Published by Oriental Daily News Malaysia",
          description: "AI-assisted production published on Oriental Daily News Malaysia's Facebook page.",
          stats: "About 40K views · 452 likes · 294 comments", statsNote: "Recorded 25 Oct 2026",
          url: "https://www.facebook.com/watch/?v=2277798306087706", cta: "Watch on Facebook",
          thumb: "thumb-oriental-daily-ai-video.jpg", ratio: "1/1", position: "50% 0%" },
        { kind: "video", platform: "facebook", title: "AI-Assisted Video", source: "Facebook · Posted by Saifuddin Nasution Ismail",
          description: "A public-affairs video featuring scripting, localisation and production work.",
          stats: "7.7K views · 155 likes · 165 shares", statsNote: "Recorded 25 Oct 2026",
          url: "https://www.facebook.com/share/r/19if7jYZYW/?mibextid=wwXIfr", cta: "Watch on Facebook",
          thumb: "thumb-saifuddin-ai-video.jpg", ratio: "1/1", position: "50% 40%" },
        { kind: "video", platform: "youtube", title: "8TV Mandarin News Live Segment", source: "YouTube · 8TV Mandarin News Live",
          description: "My video appears from 35:42 to 37:42 in this Mandarin news segment.",
          url: "https://www.youtube.com/watch?v=vkVxZNNH6ew&t=2142s", cta: "Watch on YouTube",
          thumb: "thumb-8tv-news-segment.jpg", ratio: "1/1", position: "50% 50%" }
      ],
      challenge: "Public information has to survive the scroll. These videos needed a hook in the first seconds, clear captions, and versions that worked for both Mandarin and Malay speakers.",
      process: [
        { title: "Concept and Hook", text: "Agreed the message, then wrote an opening that earns the next five seconds." },
        { title: "Script and Interview Planning", text: "Scripts, interview questions and shot lists, where a piece needed them." },
        { title: "Filming and Editing", text: "Shot and cut for vertical, sound-off viewing first." },
        { title: "Captions and Localisation", text: "Captions and language versions in Mandarin and Malay." },
        { title: "AI-Assisted Production", text: "Used **Kling AI and Dora AI** for three core AI-generated productions, then adapted two of them into Malay-language versions." }
      ],
      evidence: [
        { value: "3", label: "core AI-generated video productions", note: "Made with Kling AI and Dora AI." },
        { value: "2", label: "Malay-language adaptations", note: "Versions of those videos, so 5 delivered AI-video versions in total. Not a count of all my video work." }
      ],
      coverage: "One AI-assisted video was published by Oriental Daily News Malaysia on Facebook (about 40K views, 452 likes and 294 comments, recorded 25 Oct 2026), and footage was referenced in an 8TV Mandarin News Live segment.",
      limits: "The views belong to the accounts that published these videos and to their audiences. I'm showing scripting, localisation and production work, not claiming a channel's reach. These projects don't represent a political position.",
      lessons: [
        "Localising is rewriting, not converting. A hook that works in Mandarin often needs a different angle for Malay-speaking viewers, not just a translated caption.",
        "AI video tools are fastest at the start, for concepts and visual drafts, and need the most human attention at the end: checking accuracy, timing, and whether it feels trustworthy."
      ]
    },

    {
      id: "auto",
      discipline: "Social Media Operations",
      title: "Posting Vehicle Listings for a Car Importer",
      short: "Part-time posting and Facebook-group distribution for a car importer; platform-reported **929,359 views** during the six-month period.",
      period: "Mar – Sep 2025",
      org: "Direct Import Concept Sdn. Bhd.",
      role: "Social Media Assistant (Part-time)",
      tools: "Facebook, Meta Business Suite",
      summary: "My part-time responsibility was mostly **publishing vehicle listings** and sharing selected posts in Facebook groups. The reported metrics describe the account during that period, not growth that I can attribute to myself.",
      highlights: ["929,359 organic views over six months", "Around three posts a day, every day", "Vehicle listings shared through relevant Facebook groups"],
      cover: { src: "", fallback: "Around three vehicle-listing posts a day" },   // add "thumb-auto-post.jpg" ONLY if you have an approved public post screenshot
      challenge: "Help keep the dealership's vehicle listings up to date through regular posting and Facebook-group sharing.",
      process: [
        { title: "Follow a Consistent Posting Schedule", text: "Published vehicle listings regularly, typically **around three posts a day**." },
        { title: "Post and Distribute Listings", text: "Uploaded vehicle photos and listing details, and manually shared selected Facebook posts in relevant groups." },
        { title: "Track Platform Activity", text: "Compiled reported Facebook views and engagement figures across the posting period without attributing them solely to my work." }
      ],
      evidence: [
        { value: "929,359", label: "organic views", note: "Facebook, 29 Mar – 15 Sep 2025." },
        { value: "87,791", label: "engagements", note: "Facebook's engagement metric, same window." },
        { value: "13,538", label: "recorded shares", note: "Includes my manual Facebook-group distribution; not evidence of independent virality." },
        { value: "1,703", label: "reactions", note: "Plus 60 comments, same window." }
      ],
      figures: [
        { type: "bars", title: "Reported Facebook Activity",
          rows: [{ label: "Shares", value: 13538 }, { label: "Reactions", value: 1703 }, { label: "Comments", value: 60 }],
          caption: "Facebook insights, 29 Mar – 15 Sep 2025. Bars are scaled to the largest value (shares). A substantial share of group distribution was done manually by me; recorded shares should not be interpreted as independent virality." }
      ],
      limits: "These are platform-reported totals for the account, not results I can attribute solely to my part-time posting role. **I personally shared many posts into Facebook groups**, so the share count is not independent audience sharing or proof of viral performance. No sales or leads can be verified from this dataset.",
      lessons: [
        "**Consistent execution matters.** This was primarily an operational role: keeping listings current and distributing them to relevant Facebook groups.",
        "**Report numbers need context.** Shares included manual group distribution, and account-level views do not tell me how many customers or sales resulted."
      ]
    }
  ],

  /* ---------- Published SEO articles ----------
     To add one: copy a block, paste it, edit. Only status "published" with a url appears.
     Each published article also becomes a card in the SEO case automatically.
     thumb = screenshot filename in the repository root (16:10 works best). */
  articles: [
    { title: "Which E-Invoice Implementation Date Applies to You in 2027", url: "https://blackoak-consulting.com/insights/e-invoice-implementation-date/", publisher: "BlackOak Consulting", date: "23 Oct 2026", status: "published",
      thumb: "thumb-blackoak-einvoice.jpg", position: "50% 0%",
      description: "Explains which LHDN e-invoice deadline applies to a Malaysian business, based on turnover, ownership links and when it started trading." },
    { title: "How to Choose a Coffee Machine Rental in Malaysia", url: "https://likemecoffee.com/insights-news/how-to-choose-coffee-machine-rental-malaysia/", publisher: "Like Me Coffee", date: "6 Oct 2026", status: "published",
      thumb: "thumb-likemecoffee-rental.jpg", position: "50% 0%",
      description: "A buyer's guide for office and facility managers: who pays per cup, estimating daily cups, tabletop versus vending, and questions to ask providers." }
    // { title: "Next article", url: "https://...", publisher: "Client", date: "", status: "draft", thumb: "thumb-next-article.jpg", description: "..." }
  ],

  localisation: [
    { title: "Kuo Dental — English to Mandarin Website Localisation", url: "https://kuodental.com/zh-hans/", publisher: "Kuo Dental", date: "VeecoTech internship", status: "published",
      description: "Translated **11 website pages** from English into Mandarin during my internship, including the homepage, About, Contact and eight service pages." }
  ],

  about: {
    portrait: { src: "about-portrait.jpeg", alt: "Cheah Lyn Lin sitting on a wooden bench with arms crossed, smiling", ratio: "3/4", w: 768, h: 1024, position: "50% 28%" },
    atWork: { src: "about-at-work-camera.jpeg", alt: "Lyn kneeling in a darkened event hall holding a camera, with the audience seated behind her", ratio: "4/3", w: 1024, h: 768, position: "55% 45%", caption: "" },
    paragraphs: [
      "I'm Lyn Lin, an early-career digital marketer with hands-on experience in **SEO, analytics, content creation and digital campaigns**.",
      "Since July 2026, I've handled monthly SEO delivery for **four B2B websites**, with guidance and review from an SEO Lead. I've also worked on **community campaigns, automotive social content and multilingual video production**.",
      "My background in **English Language Studies and Communication** shapes how I think about search intent, storytelling and audience needs.",
      "I'm curious about emerging digital tools and enjoy learning through real projects."
    ],
    timeline: [
      { when: "Jul 2026 – Present", role: "SEO Specialist (Freelance)", org: "VeecoTech Solutions" },
      { when: "Mar – Jul 2026", role: "Marketing Specialist (Intern)", org: "VeecoTech Solutions", detail: "SEO articles, Reels, event marketing and website localisation." },
      { when: "Dec 2025 – Present (Project-based)", role: "Digital Content Creator & Video Producer (Freelance)", org: "Freelance", detail: "Selected projects: Bayan Baru CNY social campaign; community and public-affairs content; multilingual and AI-assisted video." },
      { when: "Mar – Sep 2025", role: "Social Media Assistant (Part-time)", org: "Direct Import Concept" }
    ],
    education: [
      { when: "2022 – 2026", role: "BA English Language Studies (Hons)", org: "Universiti Sains Malaysia", detail: "Minor in Communication. CGPA 3.62. Dean's List for five semesters." }
    ],
    tools: ["Google Analytics 4", "Google Tag Manager", "Search Console", "Looker Studio", "Keyword.com", "Ahrefs", "Microsoft Clarity", "Rank Math", "WordPress", "Elementor", "Meta Business Suite", "Meta Ads Manager", "CapCut", "Adobe Illustrator", "Photoshop", "Lightroom", "Claude", "ChatGPT", "Kling AI", "Dora AI"]
  },

  /* ---------- Photography, separate from marketing work ----------
     Personal photography is categorised by subject, never as marketing deliverables.
     Obtain parental/guardian permission for identifiable children before public launch. */
  photography: {
    intro: "A small selection of my photography beyond marketing work, grouped by subject.",
    categories: [
      { id: "event", label: "Event & Cultural", photos: [
        { src: "photography-opera-performer.jpeg", alt: "Traditional Chinese opera performer with blue fan under red stage lighting", ratio: "3/2", position: "50% 48%", ready: true },
        { src: "photography-dragon-dance.jpeg", alt: "Dragon dance against dramatic yellow-green stage beams", ratio: "3/2", position: "50% 50%", ready: true },
        { src: "photography-stage-performers.jpeg", alt: "Group of performers singing together under colourful stage lights", ratio: "3/2", position: "50% 50%", ready: true }
      ]},
      { id: "graduation", label: "Graduation", photos: [
        { src: "graduation-field-portrait.jpeg", alt: "Graduate in a purple gown extending a hand while holding flowers", ratio: "3/4", position: "50% 45%", ready: true },
        { src: "graduation-bubble-portrait.jpeg", alt: "Graduate framed by an oversized soap bubble", ratio: "3/4", position: "50% 45%", ready: true },
        { src: "graduation-group.jpeg", alt: "Group of graduates celebrating together in purple gowns", ratio: "3/2", position: "50% 50%", ready: true },
        { src: "graduation-flowers.jpeg", alt: "Creative overhead graduation portrait with flowers against green grass", ratio: "2/3", position: "50% 48%", ready: true },
        { src: "graduation-laying.jpeg", alt: "Graduate resting on green grass with a pastel floral bouquet", ratio: "2/3", position: "50% 50%", ready: true },
        { src: "graduation-children-on-stage.jpg", alt: "Kindergarten graduates performing together on stage in navy-and-red gowns", ratio: "3/2", position: "50% 45%", ready: true },
        { src: "graduation-child-cap.jpeg", alt: "Young child in a navy-and-red graduation gown, adjusting his mortarboard", ratio: "2/3", position: "50% 45%", ready: true }
      ]},
      { id: "portrait", label: "Portraits", photos: [
        { src: "portrait-family-group.jpeg", alt: "Outdoor family portrait across several generations, including two young children", ratio: "3/2", position: "50% 48%", ready: true },
        { src: "portrait-family-parents-children.jpeg", alt: "Parents with their two young children in a sunlit park", ratio: "3/2", position: "50% 50%", ready: true },
        { src: "portrait-family-generations.jpeg", alt: "Four women and a baby photographed together outdoors", ratio: "3/2", position: "50% 50%", ready: true }
      ]}
    ]
  }
};
