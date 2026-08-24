require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const DEMO_POSTS = [
  {
    id: "demo-1",
    text: "Looking for someone who can build an AI workflow that automatically turns incoming leads into personalized follow-ups. DM me if you can build this.",
    author: "demo_builder",
    authorName: "Demo Founder",
    created_at: new Date(Date.now() - 3 * 60000).toISOString(),
    url: "https://x.com/search?q=AI%20workflow",
    public_metrics: { like_count: 8, reply_count: 4, repost_count: 1 }
  },
  {
    id: "demo-2",
    text: "Need an AI UGC video creator for a product launch. Looking for realistic short-form videos at scale.",
    author: "demo_marketer",
    authorName: "Demo Marketer",
    created_at: new Date(Date.now() - 11 * 60000).toISOString(),
    url: "https://x.com/search?q=AI%20UGC",
    public_metrics: { like_count: 14, reply_count: 7, repost_count: 2 }
  },
  {
    id: "demo-3",
    text: "Does anyone know a developer who can automate our repetitive reporting process with AI?",
    author: "demo_ops",
    authorName: "Demo Ops",
    created_at: new Date(Date.now() - 26 * 60000).toISOString(),
    url: "https://x.com/search?q=AI%20automation",
    public_metrics: { like_count: 5, reply_count: 3, repost_count: 0 }
  },
  {
    id: "demo-4",
    text: "Looking to hire someone to build an AI customer support chatbot that can connect to our existing CRM.",
    author: "demo_support",
    authorName: "Demo Support",
    created_at: new Date(Date.now() - 35 * 60000).toISOString(),
    url: "https://x.com/search?q=AI%20chatbot",
    public_metrics: { like_count: 11, reply_count: 5, repost_count: 2 }
  },
  {
    id: "demo-5",
    text: "I need a developer to connect our internal app to several APIs and automate the data transfer between them.",
    author: "demo_api",
    authorName: "Demo API User",
    created_at: new Date(Date.now() - 48 * 60000).toISOString(),
    url: "https://x.com/search?q=API%20integration",
    public_metrics: { like_count: 6, reply_count: 2, repost_count: 1 }
  },
  {
    id: "demo-6",
    text: "Anyone know someone who can build an AI agent for handling appointment bookings and customer questions?",
    author: "demo_agent",
    authorName: "Demo Business",
    created_at: new Date(Date.now() - 55 * 60000).toISOString(),
    url: "https://x.com/search?q=AI%20agent",
    public_metrics: { like_count: 9, reply_count: 4, repost_count: 1 }
  },
  {
    id: "demo-7",
    text: "Looking for a freelancer who can automate our CRM follow-ups and lead management. Budget available for the right person.",
    author: "demo_crm",
    authorName: "Demo Sales Team",
    created_at: new Date(Date.now() - 67 * 60000).toISOString(),
    url: "https://x.com/search?q=CRM%20automation",
    public_metrics: { like_count: 12, reply_count: 6, repost_count: 3 }
  },
  {
    id: "demo-8",
    text: "Need someone to create AI-generated product videos for our ecommerce brand. We want short-form UGC-style content.",
    author: "demo_ecom",
    authorName: "Demo Ecommerce",
    created_at: new Date(Date.now() - 75 * 60000).toISOString(),
    url: "https://x.com/search?q=AI%20UGC%20video",
    public_metrics: { like_count: 10, reply_count: 5, repost_count: 2 }
  },
  {
    id: "demo-9",
    text: "Can someone help me build an automation that takes form submissions and automatically sends personalized emails to each lead?",
    author: "demo_leads",
    authorName: "Demo Startup",
    created_at: new Date(Date.now() - 88 * 60000).toISOString(),
    url: "https://x.com/search?q=lead%20automation",
    public_metrics: { like_count: 7, reply_count: 3, repost_count: 1 }
  },
  {
    id: "demo-10",
    text: "I am looking for a web developer to build a simple customer portal for our business. Paid project.",
    author: "demo_web",
    authorName: "Demo Business Owner",
    created_at: new Date(Date.now() - 95 * 60000).toISOString(),
    url: "https://x.com/search?q=web%20developer",
    public_metrics: { like_count: 4, reply_count: 2, repost_count: 0 }
  },

  // Low-intent posts — useful for demonstrating that the tool filters noise.
  {
    id: "demo-11",
    text: "AI automation is going to completely change the way businesses operate over the next few years.",
    author: "demo_commentary",
    authorName: "Demo Commentator",
    created_at: new Date(Date.now() - 105 * 60000).toISOString(),
    url: "https://x.com/search?q=AI%20automation",
    public_metrics: { like_count: 31, reply_count: 9, repost_count: 6 }
  },
  {
    id: "demo-12",
    text: "Here's my thread explaining how AI agents work and why companies should start experimenting with them.",
    author: "demo_thread",
    authorName: "Demo Educator",
    created_at: new Date(Date.now() - 120 * 60000).toISOString(),
    url: "https://x.com/search?q=AI%20agents",
    public_metrics: { like_count: 44, reply_count: 12, repost_count: 8 }
  },
  {
    id: "demo-13",
    text: "Just launched our new AI video platform today. Excited to finally share what we've been building.",
    author: "demo_launch",
    authorName: "Demo Founder",
    created_at: new Date(Date.now() - 135 * 60000).toISOString(),
    url: "https://x.com/search?q=AI%20video",
    public_metrics: { like_count: 27, reply_count: 8, repost_count: 5 }
  },
  {
    id: "demo-14",
    text: "What do you think about the future of AI UGC and short-form video content?",
    author: "demo_discussion",
    authorName: "Demo Creator",
    created_at: new Date(Date.now() - 150 * 60000).toISOString(),
    url: "https://x.com/search?q=AI%20UGC",
    public_metrics: { like_count: 19, reply_count: 11, repost_count: 3 }
  },
  {
    id: "demo-15",
    text: "AI agents are everywhere right now. Here's a tutorial showing how to create a basic customer service agent.",
    author: "demo_tutorial",
    authorName: "Demo Developer",
    created_at: new Date(Date.now() - 165 * 60000).toISOString(),
    url: "https://x.com/search?q=AI%20agent%20tutorial",
    public_metrics: { like_count: 22, reply_count: 7, repost_count: 4 }
  },
  {
    id: "demo-16",
    text: "Our team is discussing whether AI automation should become part of our workflow next year.",
    author: "demo_team",
    authorName: "Demo Team",
    created_at: new Date(Date.now() - 180 * 60000).toISOString(),
    url: "https://x.com/search?q=AI%20automation",
    public_metrics: { like_count: 8, reply_count: 2, repost_count: 1 }
  }
];

function buildQuery(userIntent, keywords="") {
  const source = `${userIntent||""} ${keywords||""}`.toLowerCase();
  const terms=[];
  const groups=[
    [["ai ugc","ugc video","ugc"],'("AI UGC" OR "UGC video" OR "AI video")'],
    [["workflow","automation","automate"],'(workflow OR automation OR automate)'],
    [["developer","build","builder"],'(developer OR "looking for someone" OR "need someone" OR "can someone build")'],
    [["ai"],'(AI OR "artificial intelligence")']
  ];
  for(const [needles,query] of groups) if(needles.some(n=>source.includes(n))) terms.push(query);
  if(!terms.length){
    const words=source.replace(/[^\w\s-]/g," ").split(/\s+/).filter(w=>w.length>3).slice(0,5);
    if(words.length) terms.push("("+words.map(w=>`"${w}"`).join(" OR ")+")");
  }
  const intentTerms='("looking for" OR "need someone" OR "need a developer" OR "anyone know" OR "can someone" OR "hire" OR "hiring" OR "help me" OR "who can")';
  return `${terms.join(" OR ")} ${intentTerms} -is:retweet lang:en`;
}

function scorePost(text, intent = "", keywords = "") {
  const t = text.toLowerCase();
  const request = `${intent} ${keywords}`.toLowerCase();

  let score = 15;
  const reasons = [];

  // Important service categories.
  // These are weighted more heavily when they appear in the user's request.
 const serviceTerms = [
  "ai",
  "automation",
  "workflow",
  "ugc",
  "video",
  "developer",
  "development",
  "agent",
  "chatbot",
  "bot",
  "integration",
  "api",
  "scrape",
  "website",
  "reporting",
  "crm"
];

const serviceAliases = {
  automation: ["automation", "automate", "automated", "automating"],
  workflow: ["workflow", "workflows"],
  ugc: ["ugc"],
  video: ["video", "videos"],
  developer: ["developer", "developers"],
  development: ["development"],
  ai: ["ai"],
  agent: ["agent", "agents"],
  chatbot: ["chatbot", "chatbots"],
  bot: ["bot", "bots"],
  integration: ["integration", "integrations"],
  api: ["api", "apis"],
  scrape: ["scrape", "scraping", "scraper"],
  website: ["website", "websites"],
  reporting: ["reporting", "reports"],
  crm: ["crm"]
};

const matchesConcept = (text, term) => {
  const aliases = serviceAliases[term] || [term];

  return aliases.some(alias => {
    const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`\\b${escaped}\\b`, "i").test(text);
  });
};

  const stopWords = new Set([
    "find", "people", "person", "someone", "looking", "look",
    "for", "who", "need", "needs", "want", "wants", "with",
    "from", "that", "this", "they", "their", "help", "helping",
    "build", "make", "get", "can", "the", "and", "are", "you",
    "your", "into", "about", "business", "businesses",
    "custom", "someone"
  ]);

  // Find the important service concepts requested by the user.
 

const requestedServices = serviceTerms.filter(term =>
  matchesConcept(request, term)
);
  // Find which requested services actually appear in the post.
const matchedRequestedServices = requestedServices.filter(term =>
  matchesConcept(t, term)
);

  // Strongly reward matching the actual requested service.
  if (matchedRequestedServices.length) {
    score += Math.min(45, matchedRequestedServices.length * 15);

    reasons.push(
      `Matches requested service: ${matchedRequestedServices.join(", ")}`
    );
  }

  // AI is useful context, but shouldn't overpower the actual service.
  if (
    requestedServices.includes("ai") &&
    /\bai\b/i.test(t)
  ) {
    score += 5;
  }

  // Direct request / hiring signals.
  const intentSignals = [
    "looking for",
    "need someone",
    "need a developer",
    "anyone know",
    "can someone",
    "who can",
    "hire",
    "hiring",
    "looking to hire",
    "need help",
    "seeking",
    "recommend someone",
    "dm me",
    "message me"
  ];

  const matchedIntent = intentSignals.filter(signal =>
    t.includes(signal)
  );

  if (matchedIntent.length) {
    score += 25;
    reasons.push("Request / hiring intent");
  }

  // Commercial signals.
  const commercialTerms = [
    "paid",
    "pay",
    "budget",
    "client",
    "project",
    "freelance",
    "rate",
    "contract"
  ];

  if (commercialTerms.some(term => {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`\\b${escaped}\\b`, "i").test(t);
  })) {
    score += 8;
    reasons.push("Possible commercial opportunity");
  }

  // Direct contact signal.
  if (/\b(dm|dms|message me|reach out)\b/i.test(t)) {
    score += 5;
    reasons.push("Open to contact");
  }

  // Penalize posts that discuss a topic instead of requesting help.
  const discussionSignals = [
    "what do you think",
    "thoughts on",
    "news",
    "announcement",
    "thread",
    "tutorial",
    "how to",
    "just launched",
    "excited to share"
  ];

if (discussionSignals.some(signal => t.includes(signal))) {
  score -= 55;
  reasons.push("General discussion rather than a direct request");
}

  // Small penalty when the post is clearly about a different service.
const postServices = serviceTerms.filter(term =>
  matchesConcept(t, term)
);

  const unrelatedServices = postServices.filter(
    term => !requestedServices.includes(term) && term !== "ai"
  );

  if (
    requestedServices.length > 0 &&
    matchedRequestedServices.length === 0 &&
    unrelatedServices.length > 0
  ) {
    score -= Math.min(20, unrelatedServices.length * 5);
  }

  return {
    relevance: Math.max(1, Math.min(99, score)),
    reasons
  };
}
function normalizePosts(data){
  const users=Object.fromEntries((data.includes?.users||[]).map(u=>[u.id,u]));
  return (data.data||[]).map(p=>{const u=users[p.author_id]||{};return {...p,author:u.username||"unknown",authorName:u.name||"",url:`https://x.com/${u.username||"i"}/status/${p.id}`};});
}

app.get("/api/health",(req,res)=>res.json({ok:true,mode:process.env.X_BEARER_TOKEN?"live":"demo"}));

app.post("/api/search",async(req,res)=>{
  try{
    const {intent,keywords}=req.body||{};
    if(!intent&&!keywords)return res.status(400).json({error:"Enter an intent or keywords."});
    const query=buildQuery(intent,keywords);
    const live=Boolean(process.env.X_BEARER_TOKEN)&&process.env.DEMO_MODE!=="true";
    if(!live){
      const posts=DEMO_POSTS.filter(p=>{
        const hay=`${p.text} ${intent||""} ${keywords||""}`.toLowerCase();
        return ["ai","automation","workflow","ugc","developer","video","build"].some(x=>hay.includes(x));
     }).map(p => {
  const scored = scorePost(p.text, intent, keywords);
  return {
    ...p,
    relevance: scored.relevance,
    reasons: scored.reasons
  };
}).sort((a, b) => b.relevance - a.relevance);
      return res.json({mode:"demo",query,posts,fetchedAt:new Date().toISOString()});
    }
    const url=new URL("https://api.x.com/2/tweets/search/recent");
    url.searchParams.set("query",query);url.searchParams.set("max_results","25");
    url.searchParams.set("tweet.fields","created_at,author_id,public_metrics");
    url.searchParams.set("expansions","author_id");url.searchParams.set("user.fields","username,name");
    const response=await fetch(url,{headers:{Authorization:`Bearer ${process.env.X_BEARER_TOKEN}`}});
    const data=await response.json();
    if(!response.ok)return res.status(response.status).json({error:data.detail||data.title||"X API request failed.",query});
    const posts = normalizePosts(data).map(p => {
  const scored = scorePost(p.text, intent, keywords);
  return {
    ...p,
    relevance: scored.relevance,
    reasons: scored.reasons
  };
}).sort((a, b) => b.relevance - a.relevance);
    res.json({mode:"live",query,posts,fetchedAt:new Date().toISOString()});
  }catch(e){res.status(500).json({error:e.message||"Unexpected server error."});}
});

app.get("*",(req,res)=>res.sendFile(path.join(__dirname,"public","index.html")));
app.listen(PORT,()=>console.log(`X Intent Listener running at http://localhost:${PORT}`));
