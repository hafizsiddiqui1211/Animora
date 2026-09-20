import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import {
  ArrowUpRight, ChevronRight, Clapperboard, Globe2, Heart, Instagram,
  Linkedin, Menu, Play, Sparkles, X, Youtube, Facebook
} from "lucide-react";
import "./styles.css";

const socials = [
  { name: "TikTok", href: "https://www.tiktok.com/@_animora__?lang=en", icon: Sparkles },
  { name: "YouTube", href: "https://www.youtube.com/@animora_pk_official", icon: Youtube },
  { name: "Facebook", href: "https://facebook.com/animorapkofficial", icon: Facebook },
  { name: "Instagram", href: "https://instagram.com/animora_pk_official", icon: Instagram },
  { name: "LinkedIn", href: "https://linkedin.com/company/animora-studios", icon: Linkedin },
];

const stories = [
  { no: "01", title: "Poor Potato", tag: "Heartwarming", text: "A tiny potato, a giant dream, and a world that keeps saying no.", emoji: "🥔" },
  { no: "02", title: "Black Diamond", tag: "Mystery", text: "Two diamonds. One impossible choice. A secret buried beneath the glow.", emoji: "💎" },
  { no: "03", title: "Treasure Map", tag: "Adventure", text: "Milo, Ducko and Rocky follow a map that was never meant to be found.", emoji: "🗺️" },
  { no: "04", title: "Golden Tokri", tag: "Fantasy", text: "A golden basket appears — and suddenly everyone has a reason to chase it.", emoji: "🧺" },
];

const features = [
  { icon: Clapperboard, title: "AI Animated Stories", text: "Dialogue-first stories built for short-form attention and emotional payoff." },
  { icon: Globe2, title: "New Worlds & Adventures", text: "Original characters, strange places and cinematic worlds that feel alive." },
  { icon: Heart, title: "Emotional & Heartwarming", text: "Funny, surprising and human moments — even when the heroes aren't human." },
  { icon: Sparkles, title: "Original AI Animation", text: "A visual universe where every story can become a new adventure." },
];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo({ top: 0, behavior: "instant" }), [pathname]);
  return null;
}

function NeuralField() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current, ctx = canvas.getContext("2d");
    let raf, w = 0, h = 0;
    const points = Array.from({ length: 70 }, (_, i) => ({
      x: Math.random(), y: Math.random(), z: Math.random(),
      speed: 0.0005 + Math.random() * 0.0012, phase: Math.random() * Math.PI * 2,
      size: 0.4 + Math.random() * 1.7
    }));
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      const cy = h * .43;
      points.forEach((p, i) => {
        p.phase += p.speed * 16;
        const drift = Math.sin(p.phase + i) * 12;
        const x = p.x * w + drift, y = p.y * h + Math.cos(p.phase * 1.4 + i) * 8;
        ctx.beginPath(); ctx.fillStyle = `rgba(255,255,255,${.14 + p.z * .5})`;
        ctx.arc(x, y, p.size, 0, Math.PI * 2); ctx.fill();
      });
      for (let band = 0; band < 4; band++) {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 10) {
          const y = cy + Math.sin(x * .008 + t * .00055 + band) * (26 + band * 11) + (x-w*.5)*.08;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(255,255,255,${.025 + band*.012})`; ctx.lineWidth = 1; ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    };
    resize(); window.addEventListener("resize", resize); raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas className="neural-field" ref={ref} aria-hidden="true" />;
}

function DepthOrb() {
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [10, -10]), { stiffness: 80, damping: 18 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-14, 14]), { stiffness: 80, damping: 18 });
  return <motion.div className="orb-stage"
    onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); mx.set((e.clientX-r.left)/r.width*2-1); my.set((e.clientY-r.top)/r.height*2-1); }}
    onPointerLeave={() => { mx.set(0); my.set(0); }} style={{ rotateX: rx, rotateY: ry }}>
    <div className="orbit orbit-a"/><div className="orbit orbit-b"/><div className="orbit orbit-c"/>
    <motion.div className="orb-core" animate={{ rotate: 360 }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }}><div className="orb-inner"/><div className="orb-glint"/></motion.div>
    <motion.div className="orb-ring" animate={{ rotate: -360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}/>
    <motion.div className="orb-label" animate={{ y: [0,-7,0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}><span>ANIMORA</span><small>5D STORY ENGINE</small></motion.div>
  </motion.div>;
}

function SiteNav() {
  const [open,setOpen] = React.useState(false);
  const links=[["/","Home"],["/stories","Stories"],["/worlds","Worlds"],["/about","About"],["/connect","Connect"]];
  return <header className="nav">
    <Link to="/" className="brand" onClick={()=>setOpen(false)}><span className="brand-mark">A</span><span>ANIMORA</span><em>AI</em></Link>
    <nav className={open?"nav-links open":"nav-links"}>{links.map(([to,label])=><NavLink key={to} to={to} onClick={()=>setOpen(false)} className={({isActive})=>isActive?"active":""}>{label}</NavLink>)}<Link className="nav-cta" to="/connect" onClick={()=>setOpen(false)}>Enter the universe <ArrowUpRight size={15}/></Link></nav>
    <button className="menu-btn" onClick={()=>setOpen(v=>!v)} aria-label="Toggle menu">{open?<X/>:<Menu/>}</button>
  </header>;
}

function PageShell({children}){return <><SiteNav/><main>{children}</main><Footer/></>;}
function Reveal({children,delay=0,className=""}){return <motion.div className={className} initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-80px"}} transition={{duration:.7,delay,ease:[.22,1,.36,1]}}>{children}</motion.div>;}

function Home(){
  return <PageShell>
    <section className="hero"><NeuralField/><div className="hero-copy">
      <motion.div className="eyebrow" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:.2}}><span className="live-dot"/> ORIGINAL AI ANIMATION STUDIO</motion.div>
      <motion.h1 initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{delay:.3,duration:.8}}>New worlds.<br/><span>Endless stories.</span></motion.h1>
      <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.55}}>We create viral AI animated cartoons and stories that bring new worlds, characters, adventures, and emotions to life.</motion.p>
      <motion.div className="hero-actions" initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:.7}}><Link className="button primary" to="/stories">Explore stories <ChevronRight size={17}/></Link><a className="button ghost" href={socials[1].href} target="_blank" rel="noreferrer"><Play size={16} fill="currentColor"/> Watch on YouTube</a></motion.div>
      <div className="hero-meta"><span><strong>∞</strong> stories</span><i/><span><strong>AI</strong> animation</span><i/><span><strong>24/7</strong> imagination</span></div>
    </div><DepthOrb/><div className="scroll-hint"><span>SCROLL TO EXPLORE</span><div/></div></section>
    <section className="marquee"><div>ANIMORA ✦ AI CARTOONS ✦ NEW WORLDS ✦ ORIGINAL STORIES ✦ ANIMORA ✦ AI CARTOONS ✦ NEW WORLDS ✦</div></section>
    <section className="section feature-section"><Reveal><div className="section-kicker">01 / THE ANIMORA DNA</div><h2>Stories designed to <span>feel alive.</span></h2></Reveal><div className="feature-grid">{features.map((f,i)=>{const Icon=f.icon;return <Reveal key={f.title} delay={i*.08}><motion.article className="feature-card" whileHover={{y:-8,rotateX:2,rotateY:-2}} transition={{type:"spring",stiffness:220,damping:18}}><div className="icon-box"><Icon size={22}/></div><span className="card-no">0{i+1}</span><h3>{f.title}</h3><p>{f.text}</p><ArrowUpRight className="card-arrow" size={18}/></motion.article></Reveal>})}</div></section>
    <section className="section dark-section"><div className="split-head"><Reveal><div className="section-kicker">02 / LATEST UNIVERSES</div><h2>Meet the <span>stories.</span></h2></Reveal><Reveal delay={.1}><Link className="text-link" to="/stories">View all stories <ArrowUpRight size={17}/></Link></Reveal></div><div className="story-grid">{stories.slice(0,3).map((s,i)=><StoryCard story={s} key={s.no} delay={i*.1}/>)}</div></section>
    <section className="manifesto"><div className="manifesto-no">03</div><motion.div initial={{opacity:0,scale:.96}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{duration:1}}><p>“Every character deserves a world.<br/>Every world deserves a story.”</p><span>— THE ANIMORA MANIFESTO</span></motion.div></section>
    <section className="section final-cta"><Reveal><div className="cta-orb"><Sparkles size={24}/></div><h2>Ready to enter<br/><span>the universe?</span></h2><p>New cartoons. New worlds. Endless stories. 🚀</p><Link className="button primary" to="/connect">Follow Animora <ArrowUpRight size={17}/></Link></Reveal></section>
  </PageShell>;
}
function StoryCard({story,delay=0}){return <Reveal delay={delay}><Link to="/stories" className="story-card"><div className="story-art"><div className="story-no">{story.no}</div><motion.div animate={{y:[0,-9,0],rotate:[0,2,-2,0]}} transition={{duration:5,repeat:Infinity,ease:"easeInOut"}} className="story-emoji">{story.emoji}</motion.div><div className="scanline"/></div><div className="story-info"><span>{story.tag}</span><h3>{story.title}</h3><p>{story.text}</p><ArrowUpRight size={18}/></div></Link></Reveal>;}
function Stories(){return <PageShell><section className="page-hero"><div className="section-kicker">ANIMORA / STORIES</div><h1>Stories with<br/><span>a pulse.</span></h1><p>Funny moments, strange adventures and emotional twists — all born inside the Animora universe.</p></section><section className="section story-list">{stories.map((s,i)=><StoryCard key={s.no} story={s} delay={i*.05}/>)}</section><section className="section final-cta compact"><h2>More worlds are<br/><span>loading…</span></h2><Link className="button primary" to="/connect">Follow for new stories <ArrowUpRight size={17}/></Link></section></PageShell>;}
function Worlds(){const worlds=[["01","The Talking Kitchen","Where vegetables argue, dreams grow and every dinner has a plot twist.","🥕"],["02","Diamond District","A neon city where every crystal hides a memory.","💎"],["03","The Treasure Wilds","Three friends. One map. A forest that moves when nobody is watching.","🗺️"]];return <PageShell><section className="page-hero"><div className="section-kicker">ANIMORA / WORLDS</div><h1>Step beyond<br/><span>reality.</span></h1><p>Animora is a growing collection of original animated worlds. Each one has its own characters, rules and stories.</p></section><section className="section world-stack">{worlds.map((w,i)=><Reveal key={w[0]} delay={i*.08}><motion.article className="world-card" whileHover={{scale:1.015}}><div className="world-index">{w[0]}</div><div className="world-symbol">{w[3]}</div><div><span>WORLD</span><h2>{w[1]}</h2><p>{w[2]}</p></div><ArrowUpRight/></motion.article></Reveal>)}</section></PageShell>;}
function About(){return <PageShell><section className="page-hero"><div className="section-kicker">ANIMORA / ABOUT</div><h1>Imagination,<br/><span>engineered.</span></h1><p>We combine storytelling, character-driven comedy and AI animation to create original short-form entertainment.</p></section><section className="section about-grid"><Reveal><div className="section-kicker">OUR PURPOSE</div><h2>Build characters people remember — and worlds they want to revisit.</h2></Reveal><Reveal delay={.1}><p className="large-copy">Animora creates original AI animated cartoons and stories for audiences who love discovering something they have never seen before. Our workflow is built around characters, dialogue, emotion, visual continuity and fast-moving short-form culture.</p></Reveal></section><section className="section values">{["Originality","Emotion","Curiosity","Consistency"].map((x,i)=><Reveal key={x} delay={i*.08}><div className="value"><span>0{i+1}</span><h3>{x}</h3><p>Every release adds another piece to the universe.</p></div></Reveal>)}</section></PageShell>;}
function Connect(){return <PageShell><section className="connect-page"><div><div className="section-kicker">ANIMORA / CONNECT</div><h1>Find your<br/><span>next story.</span></h1><p>Subscribe and join us for a new animated world. Follow Animora wherever you watch, scroll and discover.</p></div><div className="social-grid">{socials.map((s)=>{const I=s.icon;return <motion.a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="social-card" whileHover={{x:8}}><I/><span>{s.name}</span><ArrowUpRight size={17}/></motion.a>})}</div></section></PageShell>;}
function Footer(){return <footer><div className="footer-top"><Link to="/" className="brand"><span className="brand-mark">A</span><span>ANIMORA</span><em>AI</em></Link><p>New cartoons. New worlds. Endless stories. 🚀</p></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Animora. Original AI animation.</span><div>{socials.map(s=><a key={s.name} href={s.href} target="_blank" rel="noreferrer">{s.name}</a>)}</div></div></footer>;}
function App(){return <BrowserRouter><ScrollToTop/><AnimatePresence mode="wait"><Routes><Route path="/" element={<Home/>}/><Route path="/stories" element={<Stories/>}/><Route path="/worlds" element={<Worlds/>}/><Route path="/about" element={<About/>}/><Route path="/connect" element={<Connect/>}/></Routes></AnimatePresence></BrowserRouter>;}
createRoot(document.getElementById("root")).render(<App/>);
