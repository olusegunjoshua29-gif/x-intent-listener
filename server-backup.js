require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const DEMO_POSTS = [
  {id:"demo-1",text:"Looking for someone who can build an AI workflow that automatically turns incoming leads into personalized follow-ups. DM me if you can build this.",author:"demo_builder",authorName:"Demo Founder",created_at:new Date(Date.now()-3*60000).toISOString(),url:"https://x.com/search?q=AI%20workflow",public_metrics:{like_count:8,reply_count:4,repost_count:1}},
  {id:"demo-2",text:"Need an AI UGC video creator for a product launch. Looking for realistic short-form videos at scale.",author:"demo_marketer",authorName:"Demo Marketer",created_at:new Date(Date.now()-11*60000).toISOString(),url:"https://x.com/search?q=AI%20UGC",public_metrics:{like_count:14,reply_count:7,repost_count:2}},
  {id:"demo-3",text:"Does anyone know a developer who can automate our repetitive reporting process with AI?",author:"demo_ops",authorName:"Demo Ops",created_at:new Date(Date.now()-26*60000).toISOString(),url:"https://x.com/search?q=AI%20automation",public_metrics:{like_count:5,reply_count:3,repost_count:0}}
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

function scorePost(text){
  const t=text.toLowerCase(); let score=35;
  for(const p of ["looking for someone","need someone","need a developer","hiring","hire","can someone build","who can build","help me","anyone know","looking for a developer"]) if(t.includes(p)) score+=10;
  for(const p of ["ai","automation","workflow","ugc","video","agent","bot","integration","scrape","api","website"]) if(t.includes(p)) score+=4;
  if(/\b(dm|dms)\b/.test(t)) score+=5;
  if(/\b(pay|paid|budget|client|project)\b/.test(t)) score+=6;
  return Math.min(99,score);
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
      }).map(p=>({...p,relevance:scorePost(p.text)})).sort((a,b)=>b.relevance-a.relevance);
      return res.json({mode:"demo",query,posts,fetchedAt:new Date().toISOString()});
    }
    const url=new URL("https://api.x.com/2/tweets/search/recent");
    url.searchParams.set("query",query);url.searchParams.set("max_results","25");
    url.searchParams.set("tweet.fields","created_at,author_id,public_metrics");
    url.searchParams.set("expansions","author_id");url.searchParams.set("user.fields","username,name");
    const response=await fetch(url,{headers:{Authorization:`Bearer ${process.env.X_BEARER_TOKEN}`}});
    const data=await response.json();
    if(!response.ok)return res.status(response.status).json({error:data.detail||data.title||"X API request failed.",query});
    const posts=normalizePosts(data).map(p=>({...p,relevance:scorePost(p.text)})).sort((a,b)=>b.relevance-a.relevance);
    res.json({mode:"live",query,posts,fetchedAt:new Date().toISOString()});
  }catch(e){res.status(500).json({error:e.message||"Unexpected server error."});}
});

app.get("*",(req,res)=>res.sendFile(path.join(__dirname,"public","index.html")));
app.listen(PORT,()=>console.log(`X Intent Listener running at http://localhost:${PORT}`));
