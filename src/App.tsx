import { useState, useEffect, useRef } from 'react'

/* ══════════════════════════════════════════════════════════════════
   SUBHAVIVAHAM — Tamil Matrimony
   Chettinad Vintage Design System, no background images
══════════════════════════════════════════════════════════════════ */

// ── Brand ─────────────────────────────────────────────────────────
const B = {
  name:     'Subhavivaham',
  owner:    'R. Viswanathan',
  title:    'Proprietor',
  wa:       '8508630290',
  waDisp:   '85086 30290',
  gstin:    '33ANJPV5847N1Z5',
  phone:    '04630 - 261186',
  site:     'www.subhavivaham.com',
  addrs: [
    { lbl: 'Murappanadu Office', line: '1-56/1, Sub Register Off Street, Murappanadu, Tuticorin — 628 252' },
    { lbl: 'Vallanadu Office',   line: '3/58, Natarajar Sannathi Street, Vallanadu, Tuticorin — 628 252' },
  ],
  certs: ['ISO 9001:2015', 'QRO Certified'],
}

// ── Data ──────────────────────────────────────────────────────────
const BRIDES = [
  { id:1,  name:'Priya Subramanian',  age:26, caste:'Iyer',     job:'Software Engineer',    loc:'Tuticorin',   edu:'B.Tech – Noorul Islam University', h:"5'4\"", rasi:'Rishabam',  star:'Rohini',       photo:'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=480&fit=crop&crop=face', ok:true,  vip:true  },
  { id:2,  name:'Kavitha Natarajan',  age:24, caste:'Mudaliar', job:'Doctor — MBBS',        loc:'Tirunelveli', edu:'MBBS – Tirunelveli Medical College', h:"5'3\"", rasi:'Mithunam',  star:'Thiruvathirai', photo:'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=480&fit=crop&crop=face', ok:true,  vip:false },
  { id:3,  name:'Meenakshi Krishnan', age:27, caste:'Nadar',    job:'Chartered Accountant', loc:'Tuticorin',   edu:'CA Final – ICAI',                   h:"5'5\"", rasi:'Katakam',   star:'Poosam',        photo:'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=480&fit=crop&crop=face', ok:true,  vip:true  },
  { id:4,  name:'Aarthi Venkatesh',   age:25, caste:'Vellalar', job:'Government Teacher',   loc:'Tuticorin',   edu:'BEd – Manonmaniam Sundaranar Univ.', h:"5'2\"", rasi:'Simmam',    star:'Makam',         photo:'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=480&fit=crop&crop=face', ok:false, vip:false },
  { id:5,  name:'Suganya Rajendran',  age:23, caste:'Thevar',   job:'Nursing Officer',      loc:'Tuticorin',   edu:'BSc Nursing – Govt. Medical College', h:"5'3\"", rasi:'Thulam',    star:'Swathi',        photo:'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=480&fit=crop&crop=face', ok:true,  vip:false },
  { id:6,  name:'Divya Annamalai',    age:28, caste:'Chettiar', job:'Bank Manager',         loc:'Chennai',     edu:'MBA – Bharathidasan University',     h:"5'4\"", rasi:'Meenam',    star:'Revathi',       photo:'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=400&h=480&fit=crop&crop=face', ok:true,  vip:true  },
]
const GROOMS = [
  { id:7,  name:'Karthik Raghunathan', age:29, caste:'Iyer',    job:'Govt. Engineer',       loc:'Tuticorin',   edu:'B.Tech – Coimbatore Inst. of Tech.',  h:"5'10\"",rasi:'Mesham',    star:'Bharani',      photo:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=480&fit=crop&crop=face', ok:true,  vip:true  },
  { id:8,  name:'Vijay Annamalai',     age:31, caste:'Nadar',   job:'Doctor — MBBS',        loc:'Tirunelveli', edu:'MBBS – Tirunelveli Medical College',  h:"5'9\"", rasi:'Kadagam',   star:'Poosam',       photo:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=480&fit=crop&crop=face', ok:true,  vip:true  },
  { id:9,  name:'Aravind Murugesan',   age:28, caste:'Thevar',  job:'Software Engineer',    loc:'Chennai',     edu:'B.Tech – Anna University',           h:"5'8\"", rasi:'Thulam',    star:'Swathi',       photo:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=480&fit=crop&crop=face', ok:true,  vip:false },
  { id:10, name:'Senthil Durai',       age:30, caste:'Mudaliar',job:'Advocate – High Court',loc:'Tuticorin',   edu:'LLB – Madurai Kamaraj University',   h:"5'7\"", rasi:'Meenam',    star:'Poorattathi',  photo:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=480&fit=crop&crop=face', ok:false, vip:false },
  { id:11, name:'Murugan Pillai',      age:27, caste:'Pillai',  job:'Marine Engineer',      loc:'Tuticorin',   edu:'B.Tech Marine – Noorul Islam Univ.',  h:"5'11\"",rasi:'Rishabam',  star:'Rohini',       photo:'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=480&fit=crop&crop=face', ok:true,  vip:true  },
  { id:12, name:'Rajesh Govindan',     age:32, caste:'Gounder', job:'Business Owner',       loc:'Coimbatore',  edu:'B.Com – PSG College of Arts',        h:"5'8\"", rasi:'Simmam',    star:'Magam',        photo:'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=480&fit=crop&crop=face', ok:true,  vip:false },
]

const RASIS = [
  { name:'Mesham',    tamil:'மேஷம்',      sym:'♈', lord:'Chevvai' },
  { name:'Rishabam',  tamil:'ரிஷபம்',    sym:'♉', lord:'Sukran'  },
  { name:'Mithunam',  tamil:'மிதுனம்',   sym:'♊', lord:'Budhan'  },
  { name:'Katakam',   tamil:'கடகம்',     sym:'♋', lord:'Chandran'},
  { name:'Simmam',    tamil:'சிம்மம்',   sym:'♌', lord:'Sooryan' },
  { name:'Kanni',     tamil:'கன்னி',     sym:'♍', lord:'Budhan'  },
  { name:'Thulam',    tamil:'துலாம்',    sym:'♎', lord:'Sukran'  },
  { name:'Viruchigam',tamil:'விருச்சிகம்',sym:'♏', lord:'Chevvai' },
  { name:'Dhanusu',   tamil:'தனுசு',     sym:'♐', lord:'Guru'    },
  { name:'Makaram',   tamil:'மகரம்',     sym:'♑', lord:'Sani'    },
  { name:'Kumbam',    tamil:'கும்பம்',   sym:'♒', lord:'Sani'    },
  { name:'Meenam',    tamil:'மீனம்',     sym:'♓', lord:'Guru'    },
]

const TESTI = [
  { bride:'Lakshmi',  groom:'Rajesh',  caste:'Nadar',    loc:'Murappanadu → Vallanadu',  dt:'March 2024',    txt:'Subhavivaham made our match possible! Viswanathan sir personally guided our families through jathagam matching. We got married in a beautiful ceremony in Tuticorin. Forever grateful!', photo:'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=200&h=200&fit=crop' },
  { bride:'Saranya',  groom:'Murugan', caste:'Mudaliar', loc:'Tuticorin → Tirunelveli',  dt:'November 2023', txt:'ISO certified service gave us full confidence. Within 2 months we found each other and our horoscopes matched perfectly. Thank you Viswanathan sir — we are very happy!', photo:'https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=200&h=200&fit=crop' },
  { bride:'Nithya',   groom:'Sathish', caste:'Iyer',     loc:'Tuticorin → Tuticorin',    dt:'August 2024',   txt:'We wanted a trusted local matrimony service. Subhavivaham gave us personal attention, genuine profiles, and complete transparency. Our families are deeply blessed.', photo:'https://images.unsplash.com/photo-1519741497674-611481863552?w=200&h=200&fit=crop' },
]

const STATS = [
  { n:25000, suf:'+', lbl:'Registered Profiles', icon:'👥' },
  { n:8500,  suf:'+', lbl:'Marriages Fixed',      icon:'💍' },
  { n:20,    suf:'+', lbl:'Tamil Communities',    icon:'🏛️' },
  { n:15,    suf:'+', lbl:'Years of Trust',       icon:'⭐' },
]

const COMMUNITIES = ['Iyer','Iyengar','Mudaliar','Pillai','Nadar','Vellalar','Thevar','Gounder','Naicker','Yadavar','Chettiar','Maravar','Agamudayar','Konar','Asari','Kusavar']

const TICKER = [
  '🎊 Lakshmi & Rajesh — Successfully Married!',
  '💍 Saranya & Murugan — Now a Happy Couple!',
  '🌺 24 New Profiles Added Today',
  '✅ Nithya & Sathish — Jathagam Matched!',
  '📍 New Members from Murappanadu & Vallanadu',
  '🎉 18 New Successful Matches This Month!',
  '⭐ 500+ ISO-Verified Profiles Available',
]

// ── Hooks ─────────────────────────────────────────────────────────

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal,.reveal-l,.reveal-r')
    const ob  = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('on') }),
      { threshold: .1 }
    )
    els.forEach(el => ob.observe(el))
    return () => ob.disconnect()
  }, [])
}

function useCounter(target: number, go: boolean) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!go) return
    let cur = 0
    const step = target / 90
    const t = setInterval(() => {
      cur += step
      if (cur >= target) { setN(target); clearInterval(t) }
      else setN(Math.floor(cur))
    }, 18)
    return () => clearInterval(t)
  }, [go, target])
  return n
}

function useTyper(words: string[], spd = 75, pause = 2600) {
  const [txt, setTxt] = useState('')
  const [wi, setWi]   = useState(0)
  const [ci, setCi]   = useState(0)
  const [del, setDel] = useState(false)
  useEffect(() => {
    const cur   = words[wi]
    const delay = del ? spd / 2 : ci === cur.length ? pause : spd
    const t = setTimeout(() => {
      if (!del && ci < cur.length)         { setTxt(cur.slice(0,ci+1)); setCi(c=>c+1) }
      else if (!del && ci === cur.length)  { setDel(true) }
      else if (del && ci > 0)             { setTxt(cur.slice(0,ci-1)); setCi(c=>c-1) }
      else                                 { setDel(false); setWi(i=>(i+1)%words.length) }
    }, delay)
    return () => clearTimeout(t)
  }, [txt, ci, del, wi, words, spd, pause])
  return txt
}

// ── SVG Decorations ───────────────────────────────────────────────

function Kolam({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style} aria-hidden>
      <circle cx="100" cy="100" r="92" stroke="currentColor" strokeWidth="1" opacity=".2"/>
      <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth=".8" opacity=".15"/>
      <circle cx="100" cy="100" r="48" stroke="currentColor" strokeWidth=".6" opacity=".12"/>
      {[0,45,90,135,180,225,270,315].map((d,i)=>(
        <g key={i} transform={`rotate(${d} 100 100)`}>
          <path d="M100 10 Q109 55 100 100 Q91 55 100 10" fill="currentColor" opacity=".08"/>
          <circle cx="100" cy="18" r="3.5" fill="currentColor" opacity=".25"/>
        </g>
      ))}
      {[0,60,120,180,240,300].map((d,i)=>(
        <circle key={i} cx={100+36*Math.cos(d*Math.PI/180)} cy={100+36*Math.sin(d*Math.PI/180)} r="4" fill="currentColor" opacity=".2"/>
      ))}
      <circle cx="100" cy="100" r="7" fill="currentColor" opacity=".35"/>
    </svg>
  )
}

/* Decorative arch SVG for section headers */
function Arch({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <path d="M0 48 Q90 0 180 0 Q270 0 360 48" stroke="currentColor" strokeWidth="1.2" fill="none" opacity=".4"/>
      <path d="M20 48 Q100 8 180 8 Q260 8 340 48" stroke="currentColor" strokeWidth=".6" fill="none" opacity=".2"/>
      {[0,.25,.5,.75,1].map((t,i)=>{
        const x = 20 + t*320, y = 48 - 40*Math.sin(t*Math.PI)
        return <circle key={i} cx={x} cy={y} r="2.5" fill="currentColor" opacity=".35"/>
      })}
      <circle cx="180" cy="0" r="5" fill="currentColor" opacity=".4"/>
    </svg>
  )
}

/* Floating petals */
function Petals() {
  const list = Array.from({length:10},(_,i)=>({
    id:i, e:['🌸','🌺','🪷','✿'][i%4],
    left:`${(i*10.3)%98}%`, sz:`${.85+(i%3)*.35}rem`,
    dur:`${9+(i%5)*2.8}s`, dl:`${(i*1.4)%10}s`,
    tx:`${-35+(i%5)*18}px`, rot:`${-150+i*28}deg`,
  }))
  return <>{list.map(p=>(
    <span key={p.id} className="petal"
      style={{left:p.left,fontSize:p.sz,animationDuration:p.dur,animationDelay:p.dl,'--tx':p.tx,'--rot':p.rot} as React.CSSProperties}>
      {p.e}
    </span>
  ))}</>
}

// ── Shared Section Head ───────────────────────────────────────────

type HeadProps = { title:string; sub?:string; tamil?:string; light?:boolean }
function Head({title,sub,tamil,light=false}:HeadProps) {
  const head = light?'text-[#FAF4E6]':'text-[#1E0E12]'
  const tx   = light?'text-[#FAF4E6]/55':'text-[#7A5A60]'
  const acc  = light?'text-[#DEB84A]/60':'text-[#8B6914]/60'
  return (
    <div className="text-center mb-14 reveal">
      <div className="divider max-w-[200px] mx-auto mb-3">
        <span className="text-[#B8870C] text-lg">✦</span>
      </div>
      {tamil && <p className={`f-tamil text-sm mb-2 ${acc}`}>{tamil}</p>}
      <h2 className={`f-yatra text-3xl sm:text-4xl lg:text-5xl leading-tight mb-3 ${head}`}>{title}</h2>
      {sub && <p className={`f-baloo text-sm sm:text-[.9375rem] max-w-lg mx-auto leading-relaxed ${tx}`}>{sub}</p>}
    </div>
  )
}

// ── Navbar ────────────────────────────────────────────────────────

function Navbar() {
  const [sc, setSc] = useState(false)
  const [op, setOp] = useState(false)
  useEffect(()=>{
    const fn = ()=>setSc(window.scrollY>60)
    window.addEventListener('scroll',fn)
    return ()=>window.removeEventListener('scroll',fn)
  },[])
  const nav = [['#browse','Profiles'],['#jathagam','Jathagam'],['#works','How It Works'],['#stories','Stories'],['#contact','Contact']]
  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${sc?'shadow-2xl':'bg-transparent'}`}
      style={sc?{background:'#5C1220'}:{backdropFilter:'blur(6px)'}}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-[64px] sm:h-[72px]">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 flex-shrink-0">
              <Kolam className="absolute inset-0 text-[#B8870C] anim-spin-cw"/>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="f-tamil text-[#FAF4E6] text-[11px] font-bold">சு</span>
              </div>
            </div>
            <div className="leading-none">
              <div className="f-script text-[#FAF4E6] text-xl sm:text-[1.35rem] group-hover:text-[#DEB84A] transition-colors">{B.name}</div>
              <div className="f-baloo text-[#FAF4E6]/45 text-[9px] tracking-[.12em] uppercase">Tamil Matrimony</div>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {nav.map(([h,l])=><a key={l} href={h} className="nav-link">{l}</a>)}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-2.5">
            <a href="#browse" className="btn btn-ghost-ivory px-5 py-2 rounded-full text-sm">Browse profiles</a>
            <a href="#contact" className="btn btn-teal px-5 py-2 rounded-full text-sm shadow-lg">Free Register</a>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden text-[#FAF4E6] p-1.5" onClick={()=>setOp(!op)} aria-label="Menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {op ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {op && (
          <div className="md:hidden border-t border-white/12 py-3 anim-down" style={{background:'#5C1220'}}>
            {nav.map(([h,l])=>(
              <a key={l} href={h} className="block px-4 py-2.5 f-baloo text-[#FAF4E6]/80 hover:text-[#DEB84A] hover:bg-white/6 rounded-lg transition-colors"
                onClick={()=>setOp(false)}>{l}</a>
            ))}
            <div className="px-4 pt-3 flex gap-2.5">
              <a href="#browse" onClick={()=>setOp(false)} className="flex-1 btn btn-ghost-ivory py-2.5 rounded-full text-sm">Browse</a>
              <a href="#contact" onClick={()=>setOp(false)} className="flex-1 btn btn-teal py-2.5 rounded-full text-sm">Register</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

// ── Hero (no background image) ────────────────────────────────────

function Hero() {
  const [gen, setGen] = useState<'bride'|'groom'>('bride')

  return (
    <section className="hero-section relative min-h-screen flex flex-col justify-center overflow-hidden surf-maroon">
      {/* Large decorative Kolams — CSS-only background art */}
      <Kolam className="absolute -top-20 -right-20 w-[360px] h-[360px] text-[#B8870C] opacity-[.09] anim-spin-cw pointer-events-none" />
      <Kolam className="absolute -bottom-24 -left-24 w-[400px] h-[400px] text-[#B8870C] opacity-[.07] anim-spin-ccw pointer-events-none" />

      {/* Diagonal silk stripe */}
      <div className="absolute inset-0 pointer-events-none tex-kolam opacity-40"/>

      {/* Left vertical gold bar accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-transparent via-[#B8870C] to-transparent opacity-50"/>

      <div className="relative z-10 pt-20 pb-14">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">

          <div className="flex items-center gap-3 mb-10 sm:mb-12">
            <span className="block h-px w-10 bg-[#DEB84A]/70"/>
            <p className="f-baloo text-[#DEB84A] text-[11px] sm:text-xs font-bold tracking-[.18em] uppercase">Tamil matrimony · Tuticorin</p>
          </div>

          <div className="grid lg:grid-cols-[1.15fr_.85fr] gap-10 xl:gap-20 items-center">
            {/* ── Left: Copy ─────────────────────────────── */}
            <div className="text-center lg:text-left">
              {/* Live badge */}
              <div className="inline-flex items-center gap-2 bg-[#1E0E12]/40 border border-[#B8870C]/30 rounded-full px-4 py-1.5 mb-7 backdrop-blur-sm">
                <span className="anim-dot w-2 h-2 bg-[#DEB84A] rounded-full inline-block"/>
                <span className="f-baloo text-[#FAF4E6]/80 text-xs">Personal introductions · Verified Tamil families</span>
              </div>

              {/* Headline */}
              <h1 className="f-yatra text-[2.8rem] sm:text-6xl lg:text-[4.2rem] text-[#FAF4E6] leading-[1.02] mb-5 max-w-xl">
                A thoughtful beginning<br/>for your <span className="text-brass">family.</span>
              </h1>

              {/* Tamil subtitle */}
              <p className="f-tamil text-[#DEB84A]/90 text-base mb-4">
                உங்கள் வாழ்க்கைத் துணையை நம்பிக்கையுடன் கண்டறியுங்கள்
              </p>

              <p className="f-baloo text-[#FAF4E6]/70 text-sm sm:text-[.9375rem] leading-relaxed mb-9 max-w-[520px] mx-auto lg:mx-0">
                A personal matrimony service led by <span className="text-[#DEB84A] font-semibold">{B.owner}</span>. We bring families together with care, discretion and complete horoscope guidance.
              </p>

              {/* Stat grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-9 max-w-[640px]">
                {STATS.map(s=>(
                  <div key={s.lbl} className="text-left bg-[#1E0E12]/35 border border-[#B8870C]/20 rounded-lg p-3 hover:bg-[#1E0E12]/55 hover:border-[#B8870C]/40 transition-all">
                    <div className="f-yatra text-[#DEB84A] text-2xl leading-none">{s.n.toLocaleString()}{s.suf}</div>
                    <div className="f-baloo text-[#FAF4E6]/50 text-[10px] mt-1.5 leading-tight">{s.lbl}</div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <a href="#contact" className="btn btn-brass px-8 py-3 rounded-full text-sm shadow-xl">
                  <span>Register Free Today</span>
                </a>
                <a href={`https://wa.me/91${B.wa}`}
                  className="flex items-center gap-2 bg-[#25D366] text-white f-baloo font-bold px-6 py-3 rounded-full text-sm hover:bg-[#1DA851] transition-colors shadow-lg">
                  <WaIcon className="w-4 h-4 fill-white flex-shrink-0"/>
                  {B.waDisp}
                </a>
              </div>
            </div>

            {/* ── Right: Search card ──────────────────────── */}
            <div className="w-full max-w-sm mx-auto lg:max-w-none">
              <div className="bg-[#FFFCF6] rounded-[1.5rem] shadow-2xl overflow-hidden"
                style={{border:'1px solid rgba(217,184,102,.75)'}}>
                {/* Card header */}
                <div className="bg-gradient-to-r from-[#24161A] to-[#5A1B2A] px-6 py-5 flex items-center justify-between">
                  <div>
                    <div className="f-yatra text-[#FAF4E6] text-2xl leading-none">Find a profile</div>
                    <div className="f-baloo text-[#DEB84A]/80 text-[11px] mt-1">Begin with your family’s preferences</div>
                  </div>
                  <Kolam className="w-12 h-12 text-[#B8870C] opacity-30"/>
                </div>

                <div className="p-5">
                  {/* Gender toggle */}
                  <div className="flex bg-[#E6D4A8] rounded-xl p-1 mb-4">
                    {(['bride','groom'] as const).map(g=>(
                      <button key={g} onClick={()=>setGen(g)}
                        className={`flex-1 py-2.5 rounded-lg f-baloo font-bold text-sm transition-all ${gen===g?'bg-[#5C1220] text-[#FAF4E6] shadow-md':'text-[#7A5A60] hover:text-[#5C1220]'}`}>
                        {g==='bride'?'🌸 Bride':'🤵 Groom'}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      {['Min Age','Max Age'].map((lbl,idx)=>(
                        <div key={lbl}>
                          <label className="f-baloo text-[#7A5A60] text-[10px] font-bold uppercase tracking-wider block mb-1">{lbl}</label>
                          <select className="field">{Array.from({length:22},(_,i)=>i+(idx===0?18:21)).map(a=><option key={a}>{a} yrs</option>)}</select>
                        </div>
                      ))}
                    </div>
                    {[
                      {l:'Community',    o:['All Communities',...COMMUNITIES]},
                      {l:'Horoscope',    o:['Any Rasi',...RASIS.map(r=>r.name)]},
                      {l:'Location',     o:['All Locations','Tuticorin','Murappanadu','Vallanadu','Tirunelveli','Madurai','Chennai','NRI - Abroad']},
                    ].map(({l,o})=>(
                      <div key={l}>
                        <label className="f-baloo text-[#7A5A60] text-[10px] font-bold uppercase tracking-wider block mb-1">{l}</label>
                        <select className="field">{o.map(v=><option key={v}>{v}</option>)}</select>
                      </div>
                    ))}
                    <a href="#browse" className="btn btn-primary w-full py-3 rounded-xl text-sm shadow-md">
                      <span>🔍 Search {gen==='bride'?'Brides':'Grooms'}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 inset-x-0 pointer-events-none">
        <svg viewBox="0 0 1440 72" preserveAspectRatio="none" className="w-full h-9 sm:h-12" fill="#5A1B2A">
          <path d="M0 72L80 60C160 48 320 24 480 16C640 8 800 16 960 24C1120 32 1280 40 1360 44L1440 48V72H0Z"/>
        </svg>
      </div>
    </section>
  )
}

// ── Ticker ────────────────────────────────────────────────────────

function Ticker() {
  const d = [...TICKER,...TICKER]
  return (
    <div className="surf-maroon py-2.5 border-y border-[#D9B866]/20">
      <div className="ticker-wrap">
        <div className="ticker-track">
          {d.map((item,i)=>(
            <span key={i} className="inline-flex items-center gap-2 mx-8 f-baloo text-sm text-[#FAF4E6]/88 whitespace-nowrap">
              {item}<span className="text-[#DEB84A]/50 text-xs">◆</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Stats ─────────────────────────────────────────────────────────

function Stats() {
  const [go, setGo] = useState(false)
  const ref = useRef<HTMLElement>(null)
  useEffect(()=>{
    const ob = new IntersectionObserver(([e])=>{ if(e.isIntersecting) setGo(true) },{threshold:.3})
    if(ref.current) ob.observe(ref.current)
    return ()=>ob.disconnect()
  },[])
  const n0 = useCounter(STATS[0].n, go)
  const n1 = useCounter(STATS[1].n, go)
  const n2 = useCounter(STATS[2].n, go)
  const n3 = useCounter(STATS[3].n, go)
  const ns = [n0, n1, n2, n3]

  return (
    <section ref={ref} className="site-section surf-parchment tex-silk py-16 sm:py-20 relative overflow-hidden">
      <Kolam className="absolute -right-14 -top-14 w-52 h-52 text-[#8B6914] opacity-10 anim-spin-cw pointer-events-none"/>
      <Kolam className="absolute -left-14 -bottom-14 w-52 h-52 text-[#8B6914] opacity-8 anim-spin-ccw pointer-events-none"/>
      <div className="relative max-w-5xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
          {STATS.map((s,i)=>(
            <div key={s.lbl} className={`text-center reveal d${i+1}`}>
              <div className="text-4xl mb-3 anim-float" style={{animationDelay:`${i*.6}s`}}>{s.icon}</div>
              <div className="f-yatra text-[#5C1220] text-3xl sm:text-5xl leading-none">
                {go?ns[i].toLocaleString():'0'}{s.suf}
              </div>
              <div className="f-baloo text-[#7A5A60] text-xs sm:text-sm mt-2">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Profile card ──────────────────────────────────────────────────

type P = typeof BRIDES[0]
function ProfileCard({p}:{p:P}) {
  const [liked, setLiked] = useState(false)
  return (
    <div className="flip-card card-h">
      <div className="flip-inner">
        {/* Front */}
        <div className="flip-front surf-white border-brass-md shadow-sm"
          style={{border:'1.5px solid rgba(184,135,12,.3)'}}>
          {/* Tags */}
          <div className="absolute top-3 left-3 z-10 flex gap-1.5">
            {p.vip && <span className="tag bg-gradient-to-r from-[#8B6914] to-[#B8870C] text-[#FAF4E6]">★ Premium</span>}
          </div>
          {p.ok && (
            <div className="absolute top-3 right-3 z-10">
              <span className="tag bg-[#0D4A48] text-[#FAF4E6]">✓ Verified</span>
            </div>
          )}

          {/* Photo */}
          <div className="h-56 overflow-hidden relative bg-[#E6D4A8]">
            <img src={p.photo} alt={p.name} className="w-full h-full object-cover object-top"/>
            <div className="absolute inset-0" style={{background:'linear-gradient(to top,rgba(30,14,18,.78) 0%,transparent 52%)'}}/>
            <div className="absolute bottom-3 inset-x-3">
              <div className="f-yatra text-[#FAF4E6] text-xl leading-tight">{p.name}</div>
              <div className="f-baloo text-[#DEB84A] text-xs mt-0.5">{p.age} yrs · {p.h} · {p.caste}</div>
            </div>
          </div>

          {/* Details */}
          <div className="p-4 flex-1">
            <div className="grid grid-cols-2 gap-2 mb-3">
              {[['📍',p.loc],['💼',p.job],['🪐',p.rasi],['⭐',p.star]].map(([ic,v])=>(
                <div key={v as string} className="bg-[#F4E8C8] rounded-lg p-2 flex items-center gap-1.5 min-w-0">
                  <span className="text-sm flex-shrink-0">{ic}</span>
                  <span className="f-baloo text-[#1E0E12] text-[11px] font-medium truncate">{v}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <button onClick={()=>setLiked(!liked)}
                className={`w-10 h-9 flex-shrink-0 rounded-lg border transition-all text-base ${liked?'bg-[#5C1220] border-[#5C1220] text-white':'border-[#E6D4A8] text-[#B8870C] hover:border-[#B8870C]'}`}>
                {liked?'♥':'♡'}
              </button>
              <a href="#contact" className="btn btn-primary flex-1 py-2 rounded-lg text-xs">
                <span>Express Interest</span>
              </a>
            </div>
            <p className="f-baloo text-[#B8870C]/60 text-[10px] text-center mt-2">Verified profile · Details shared with family consent</p>
          </div>
        </div>

        {/* Back */}
        <div className="flip-back flex flex-col items-center justify-between p-5 text-center text-[#FAF4E6]"
          style={{background:'linear-gradient(150deg,#5C1220 0%,#7A1A2E 45%,#0D4A48 100%)'}}>
          <div/>
          <div>
            <div className="w-20 h-20 rounded-full mx-auto overflow-hidden border-4 border-[#B8870C]/50 shadow-xl mb-3">
              <img src={p.photo} alt={p.name} className="w-full h-full object-cover object-top"/>
            </div>
            <div className="f-yatra text-[#FAF4E6] text-2xl mb-0.5">{p.name}</div>
            <div className="f-baloo text-[#DEB84A]/70 text-xs mb-4">{p.caste} · {p.age} yrs</div>
            <div className="space-y-2 w-full text-left bg-white/6 rounded-xl p-4 mb-4">
              {[['Education',p.edu],['Profession',p.job],['Rasi / Star',`${p.rasi} · ${p.star}`],['Location',p.loc]].map(([k,v])=>(
                <div key={k as string} className="flex justify-between gap-2 text-xs">
                  <span className="f-baloo text-[#FAF4E6]/45 flex-shrink-0">{k}</span>
                  <span className="f-baloo text-[#DEB84A] font-semibold text-right">{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2 w-full">
            <a href="#contact" className="flex-1 bg-[#DEB84A] text-[#1E0E12] f-baloo font-bold py-2.5 rounded-xl text-xs hover:bg-[#F0DC9A] transition-colors text-center">♥ Interest</a>
            <a href="#contact" className="flex-1 bg-white/12 text-[#FAF4E6] f-baloo font-bold py-2.5 rounded-xl text-xs hover:bg-white/22 transition-colors border border-white/20 text-center">Full Profile</a>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Browse ────────────────────────────────────────────────────────

function Browse() {
  const [tab, setTab] = useState<'bride'|'groom'>('bride')
  const [pg,  setPg]  = useState(0)
  const list = tab==='bride'?BRIDES:GROOMS
  const pages = Math.ceil(list.length/4)
  const shown = list.slice(pg*4,pg*4+4)
  useEffect(()=>setPg(0),[tab])

  return (
    <section id="browse" className="site-section surf-ivory tex-silk py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Head title="Featured Profiles" tamil="சிறப்பு சுயவிவரங்கள்"
          sub="Hover a card to see full details. All profiles are verified Tamil families from Tuticorin district."/>

        {/* Tab switcher */}
        <div className="flex justify-center mb-10 reveal">
          <div className="inline-flex bg-[#E6D4A8] rounded-2xl p-1.5 gap-1">
            {(['bride','groom'] as const).map(t=>(
              <button key={t} onClick={()=>setTab(t)}
                className={`px-9 py-2.5 rounded-xl f-baloo font-bold text-sm transition-all ${tab===t?'bg-[#5C1220] text-[#FAF4E6] shadow-lg':'text-[#7A5A60] hover:text-[#5C1220]'}`}>
                {t==='bride'?'🌸 Brides':'🤵 Grooms'}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {shown.map((p,i)=>(
            <div key={p.id} className={`reveal d${i+1}`}><ProfileCard p={p}/></div>
          ))}
        </div>

        {/* Pagination */}
        {pages>1 && (
          <div className="flex justify-center gap-2 mb-8">
            {Array.from({length:pages}).map((_,i)=>(
              <button key={i} onClick={()=>setPg(i)}
                className={`rounded-full transition-all ${i===pg?'w-8 h-3 bg-[#5C1220]':'w-3 h-3 bg-[#5C1220]/22 hover:bg-[#5C1220]/45'}`}/>
            ))}
          </div>
        )}
        <div className="text-center reveal">
          <a href="#contact" className="btn btn-primary px-12 py-3.5 rounded-full text-sm shadow-lg"><span>Request full profile access →</span></a>
        </div>
      </div>
    </section>
  )
}

// ── Jathagam ──────────────────────────────────────────────────────

function Jathagam() {
  const [sel, setSel] = useState<number|null>(null)
  const r = sel!==null ? RASIS[sel] : null
  return (
    <section id="jathagam" className="site-section surf-ink py-20 relative overflow-hidden">
      <Kolam className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] text-[#B8870C] opacity-5 anim-spin-cw pointer-events-none"/>
      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8">
        <Head title="Jathagam Porutham" tamil="ஜாதக பொருத்தம்"
          sub="Click your Rasi to see compatibility details. Our expert astrologers provide complete 10-porutham analysis." light/>

        {/* Thirukkural */}
        <div className="max-w-2xl mx-auto mb-12 reveal">
          <div className="rounded-2xl px-6 py-5 text-center" style={{background:'rgba(255,255,255,.04)',border:'1px solid rgba(184,135,12,.2)'}}>
            <div className="f-tamil text-[#DEB84A] text-base sm:text-lg leading-relaxed mb-2">
              இல்வாழ்வான் என்பான் இயல்புடைய மூவர்க்கும்<br/>நல்லாற்றின் நின்ற துணை.
            </div>
            <div className="f-baloo text-[#FAF4E6]/40 text-xs italic">
              The householder who lives rightly is the pillar of the other three orders.
            </div>
            <div className="f-baloo text-[#8B6914] text-[10px] mt-1">Thirukkural — Kural #41</div>
          </div>
        </div>

        {/* Rasi grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 mb-10">
          {RASIS.map((rasi,i)=>(
            <button key={rasi.name} onClick={()=>setSel(sel===i?null:i)}
              className={`rasi-cell rounded-xl p-3 sm:p-4 text-center reveal d${(i%6)+1} ${sel===i?'bg-[#5C1220] border-[#B8870C]':'border border-white/10 hover:border-[#B8870C]/50'}`}
              style={sel===i?{border:'1.5px solid rgba(184,135,12,.7)'}:{}}>
              <div className="text-2xl sm:text-3xl mb-1">{rasi.sym}</div>
              <div className={`f-yatra text-sm leading-tight ${sel===i?'text-[#FAF4E6]':'text-[#FAF4E6]/85'}`}>{rasi.name}</div>
              <div className={`f-tamil text-[10px] mt-0.5 ${sel===i?'text-[#DEB84A]/80':'text-[#FAF4E6]/30'}`}>{rasi.tamil}</div>
            </button>
          ))}
        </div>

        {/* Rasi detail */}
        {r && (
          <div className="max-w-md mx-auto rounded-2xl p-6 text-center anim-stamp"
            style={{background:'rgba(255,255,255,.06)',border:'1.5px solid rgba(184,135,12,.35)'}}>
            <div className="text-5xl mb-2">{r.sym}</div>
            <div className="f-yatra text-[#FAF4E6] text-2xl">{r.name}</div>
            <div className="f-tamil text-[#DEB84A] text-sm mb-4">{r.tamil}</div>
            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
              <div className="rounded-xl p-3" style={{background:'rgba(255,255,255,.05)'}}>
                <div className="f-baloo text-[#FAF4E6]/40 text-xs mb-1">Lord Planet</div>
                <div className="f-baloo text-[#DEB84A] font-semibold">{r.lord}</div>
              </div>
              <div className="rounded-xl p-3" style={{background:'rgba(255,255,255,.05)'}}>
                <div className="f-baloo text-[#FAF4E6]/40 text-xs mb-1">Free Analysis</div>
                <div className="f-baloo text-[#DEB84A] font-semibold">Call Us →</div>
              </div>
            </div>
            <a href="#contact" className="btn btn-brass w-full py-3 rounded-xl text-sm"><span>Get Free Jathagam Matching</span></a>
          </div>
        )}

        <p className="text-center f-baloo text-[#FAF4E6]/35 text-sm mt-8 reveal">
          WhatsApp <a href={`https://wa.me/91${B.wa}`} className="text-[#DEB84A] hover:text-[#F0DC9A] transition-colors font-semibold">{B.waDisp}</a> for a free jathagam consultation
        </p>
      </div>
    </section>
  )
}

// ── How It Works ──────────────────────────────────────────────────

function Works() {
  const steps = [
    {ic:'📞',t:'Contact Us',        tam:'தொடர்பு கொள்ளுங்கள்',       d:`Call or WhatsApp ${B.owner} at ${B.waDisp}. Visit our Tuticorin offices in Murappanadu or Vallanadu anytime.`},
    {ic:'📝',t:'Register Profile',  tam:'பதிவு செய்யுங்கள்',          d:'Share your details, horoscope, family background and preferences. Our team creates your profile personally — no agents involved.'},
    {ic:'🪐',t:'Jathagam Matching', tam:'ஜாதக பொருத்தம்',            d:'Our experienced team conducts a complete 10-porutham horoscope analysis to ensure genuine compatibility before any introduction.'},
    {ic:'💍',t:'Meet & Marry',      tam:'சந்தித்து திருமணம் செய்யுங்கள்', d:'Arrange family meetings and finalize the match. We support you throughout — from first introduction to your Tamil wedding day.'},
  ]
  return (
    <section id="works" className="site-section surf-parchment tex-silk py-20 relative overflow-hidden">
      <Kolam className="absolute top-6 right-6 w-52 h-52 text-[#8B6914] opacity-8 anim-spin-cw pointer-events-none"/>
      <div className="relative max-w-4xl mx-auto px-5 sm:px-8">
        <Head title="How It Works" tamil="எவ்வாறு செயல்படுகிறது"
          sub={`A personal, trust-based process — the ${B.name} way from Tuticorin`}/>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
          {steps.map((s,i)=>(
            <article key={s.t} className={`relative overflow-hidden rounded-2xl bg-[#FFF9F6]/80 border border-[#E5C8BC] p-6 sm:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl reveal d${i+1}`}>
              <div className="absolute top-3 right-5 f-yatra text-[#74243A]/10 text-6xl leading-none select-none">{String(i+1).padStart(2,'0')}</div>
              <div className="relative flex items-start gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0 shadow-md"
                  style={{background:'linear-gradient(135deg,#5A1B2A,#963750)'}}>{s.ic}</div>
                <div className="min-w-0">
                  <h3 className="f-yatra text-[#24161A] text-2xl leading-tight mb-1">{s.t}</h3>
                  <div className="f-tamil text-[#8A651D] text-xs mb-3">{s.tam}</div>
                  <p className="f-baloo text-[#765961] text-sm leading-relaxed">{s.d}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Community ─────────────────────────────────────────────────────

function Community() {
  const [hov, setHov] = useState<string|null>(null)
  return (
    <section className="site-section surf-teal py-16 relative overflow-hidden">
      <Kolam className="absolute -left-10 -bottom-10 w-56 h-56 text-[#B8870C] opacity-10 pointer-events-none"/>
      <Kolam className="absolute -right-10 -top-10 w-56 h-56 text-[#B8870C] opacity-8 anim-spin-ccw pointer-events-none"/>
      <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
        <Head title="All Tamil Communities" tamil="அனைத்து தமிழ் சமூகங்கள்"
          sub="Proudly serving all Tamil sub-communities from Tuticorin and across Tamil Nadu" light/>
        <div className="flex flex-wrap justify-center gap-3">
          {COMMUNITIES.map((c,i)=>(
            <button key={c}
              onMouseEnter={()=>setHov(c)} onMouseLeave={()=>setHov(null)}
              className={`px-5 py-2 rounded-full f-baloo font-semibold text-sm transition-all reveal d${(i%6)+1} ${hov===c?'bg-[#FAF4E6] text-[#5C1220] border-[#FAF4E6] shadow-lg scale-105':'border text-[#FAF4E6]/80'}`}
              style={{borderColor:hov===c?undefined:'rgba(250,244,230,.25)'}}>
              {c}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Testimonials ──────────────────────────────────────────────────

function Stories() {
  const [idx, setIdx] = useState(0)
  useEffect(()=>{
    const t = setInterval(()=>setIdx(i=>(i+1)%TESTI.length),5800)
    return ()=>clearInterval(t)
  },[])
  const t = TESTI[idx]

  return (
    <section id="stories" className="site-section surf-ivory tex-silk py-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <Head title="Success Stories" tamil="வெற்றிக் கதைகள்"
          sub="Real couples from Tuticorin who found their life partners through Subhavivaham"/>

        {/* Active testimonial */}
        <div className="max-w-3xl mx-auto mb-10 reveal">
          <div className="surf-white rounded-3xl p-7 sm:p-10 shadow-xl relative overflow-hidden"
            style={{border:'1.5px solid rgba(184,135,12,.3)'}}>
            {/* Decorative quote mark */}
            <div className="absolute top-4 right-6 f-yatra text-[#8B6914]/7 text-[140px] leading-none select-none pointer-events-none">"</div>

            <div className="relative flex flex-col sm:flex-row gap-5 items-center sm:items-start mb-6">
              <div className="relative flex-shrink-0">
                <img src={t.photo} alt="" className="w-[72px] h-[72px] sm:w-20 sm:h-20 rounded-full object-cover shadow-lg"
                  style={{border:'3px solid rgba(139,105,20,.35)'}}/>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#0D4A48] rounded-full flex items-center justify-center shadow">
                  <span className="text-[#FAF4E6] text-[9px] font-bold">✓</span>
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="f-yatra text-[#1E0E12] text-xl sm:text-2xl">{t.bride} & {t.groom}</div>
                <div className="f-baloo text-[#8B6914] text-sm font-semibold">{t.caste}</div>
                <div className="f-baloo text-[#7A5A60] text-xs mt-0.5">{t.loc} · {t.dt}</div>
              </div>
            </div>

            <p className="f-baloo text-[#3A1E26] text-sm sm:text-base leading-relaxed italic">"{t.txt}"</p>
            <div className="mt-4 text-[#B8870C] text-lg tracking-wider">★★★★★</div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-5">
            {TESTI.map((_,i)=>(
              <button key={i} onClick={()=>setIdx(i)}
                className={`rounded-full transition-all ${i===idx?'w-8 h-2.5 bg-[#5C1220]':'w-2.5 h-2.5 hover:bg-[#5C1220]/40'}`}
                style={{background:i===idx?undefined:'rgba(92,18,32,.2)'}}/>
            ))}
          </div>
        </div>

        {/* Small cards row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {TESTI.map((tc,i)=>(
            <div key={tc.bride} onClick={()=>setIdx(i)}
              className={`surf-white rounded-2xl p-5 cursor-pointer transition-all reveal d${i+1} ${i===idx?'shadow-lg':'hover:shadow-md'}`}
              style={{border:i===idx?'1.5px solid rgba(139,105,20,.7)':'1.5px solid rgba(230,212,168,.8)'}}>
              <div className="flex items-center gap-3 mb-3">
                <img src={tc.photo} alt="" className="w-11 h-11 rounded-full object-cover flex-shrink-0"
                  style={{border:'2px solid rgba(184,135,12,.3)'}}/>
                <div>
                  <div className="f-yatra text-[#1E0E12] text-base leading-tight">{tc.bride} & {tc.groom}</div>
                  <div className="f-baloo text-[#8B6914] text-xs">{tc.dt}</div>
                </div>
              </div>
              <p className="f-baloo text-[#7A5A60] text-xs leading-relaxed line-clamp-3">{tc.txt}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Contact & Register ────────────────────────────────────────────

function Contact() {
  const [gen, setGen] = useState<'bride'|'groom'>('bride')
  const [f, setF] = useState({name:'',phone:'',caste:'',rasi:'',note:''})
  const [ok, setOk] = useState(false)

  return (
    <section id="contact" className="site-section surf-parchment tex-silk py-20 relative overflow-hidden">
      <Kolam className="absolute bottom-0 left-0 w-72 h-72 text-[#8B6914] opacity-10 pointer-events-none"/>
      <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
        <Head title="Register & Contact" tamil="பதிவு செய்யுங்கள்"
          sub={`Fill the form or WhatsApp directly — ${B.owner} will reply personally within 24 hours`}/>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* ── Brand card column ── */}
          <div className="reveal-l space-y-4">
            {/* Main info card */}
            <div className="rounded-3xl overflow-hidden shadow-2xl"
              style={{background:'linear-gradient(150deg,#1E0E12 0%,#3A1E26 50%,#0D4A48 100%)',border:'1.5px solid rgba(184,135,12,.3)'}}>
              {/* Card header strip */}
              <div className="px-6 pt-6 pb-4 relative">
                <Kolam className="absolute top-3 right-3 w-20 h-20 text-[#B8870C] opacity-14 pointer-events-none"/>
                <div className="f-script text-[#FAF4E6] text-4xl sm:text-5xl leading-none"
                  style={{textShadow:'0 2px 16px rgba(0,0,0,.4)'}}>{B.name}</div>
                <div className="f-tamil text-[#FAF4E6]/30 text-[11px] mt-0.5">சுபவிவாஹம் — Tamil Matrimony</div>
              </div>

              <div className="px-6 pb-6 space-y-3">
                <div className="border-t border-[#B8870C]/18 pt-4">
                  <div className="f-yatra text-[#FAF4E6] text-xl leading-tight">{B.owner}</div>
                  <div className="f-baloo text-[#FAF4E6]/55 text-sm">{B.title}</div>
                </div>

                {/* WhatsApp row */}
                <a href={`https://wa.me/91${B.wa}`}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 transition-colors"
                  style={{background:'rgba(37,211,102,.12)',border:'1px solid rgba(37,211,102,.28)'}}>
                  <WaIcon className="w-6 h-6 fill-[#25D366] flex-shrink-0"/>
                  <div>
                    <div className="f-baloo text-[#FAF4E6]/45 text-xs">WhatsApp</div>
                    <div className="f-baloo text-[#FAF4E6] font-bold text-lg leading-none">{B.waDisp}</div>
                  </div>
                </a>

                {/* Other contacts */}
                {[{ic:'📞',l:'Phone',v:B.phone},{ic:'🌐',l:'Website',v:B.site},{ic:'🏛️',l:'GSTIN',v:B.gstin}].map(row=>(
                  <div key={row.l} className="flex items-center gap-3 rounded-xl px-4 py-2.5"
                    style={{background:'rgba(255,255,255,.05)'}}>
                    <span className="text-xl flex-shrink-0">{row.ic}</span>
                    <div>
                      <div className="f-baloo text-[#FAF4E6]/38 text-[10px] uppercase tracking-wider">{row.l}</div>
                      <div className="f-baloo text-[#FAF4E6] text-sm font-semibold">{row.v}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Addresses */}
            {B.addrs.map((a,i)=>(
              <div key={i} className="flex items-start gap-3 bg-white rounded-2xl p-4 shadow-sm"
                style={{border:'1.5px solid rgba(230,212,168,.9)'}}>
                <span className="text-[#8B6914] text-2xl flex-shrink-0 mt-0.5">📍</span>
                <div>
                  <div className="f-baloo text-[#7A5A60] text-[10px] font-bold uppercase tracking-wider mb-1">{a.lbl}</div>
                  <p className="f-baloo text-[#1E0E12] text-sm leading-relaxed">{a.line}</p>
                  {i===0 && <div className="f-baloo text-[#7A5A60] text-xs mt-1">Ph: {B.phone}</div>}
                </div>
              </div>
            ))}

            {/* Cert badges */}
            <div className="flex gap-3">
              {B.certs.map(c=>(
                <div key={c} className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 shadow-sm"
                  style={{border:'1.5px solid rgba(13,74,72,.2)'}}>
                  <span className="text-[#0D4A48] font-bold text-sm">✓</span>
                  <span className="f-baloo text-[#0D4A48] text-xs font-bold">{c}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Form column ── */}
          <div className="reveal-r">
            {ok ? (
              <div className="rounded-3xl p-10 text-center shadow-2xl"
                style={{background:'linear-gradient(135deg,#0D4A48,#1A6663)',border:'1.5px solid rgba(184,135,12,.3)'}}>
                <div className="text-7xl mb-4 anim-float">🎊</div>
                <div className="f-tamil text-[#DEB84A] text-xl mb-1">நன்றி!</div>
                <div className="f-yatra text-[#FAF4E6] text-3xl mb-3">Thank You!</div>
                <p className="f-baloo text-[#FAF4E6]/65 text-sm mb-7">
                  {B.owner} will WhatsApp you at <span className="text-[#DEB84A] font-semibold">{B.waDisp}</span> within 24 hours.
                </p>
                <button onClick={()=>setOk(false)} className="btn btn-brass px-10 py-3 rounded-full text-sm"><span>Register Another</span></button>
              </div>
            ):(
              <form onSubmit={e=>{e.preventDefault();setOk(true)}}
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl"
                style={{border:'1.5px solid rgba(184,135,12,.35)'}}>
                <div className="text-center mb-1">
                  <h3 className="f-yatra text-[#1E0E12] text-2xl">Free Registration</h3>
                  <p className="f-baloo text-[#7A5A60] text-xs mt-1">{B.owner} contacts you personally — no agents, no middlemen</p>
                </div>
                <div className="divider my-5 max-w-[160px] mx-auto"/>

                {/* Gender */}
                <div className="flex bg-[#E6D4A8] rounded-xl p-1 mb-5">
                  {(['bride','groom'] as const).map(g=>(
                    <button key={g} type="button" onClick={()=>setGen(g)}
                      className={`flex-1 py-2.5 rounded-lg f-baloo font-bold text-sm transition-all ${gen===g?'bg-[#5C1220] text-[#FAF4E6] shadow-md':'text-[#7A5A60] hover:text-[#5C1220]'}`}>
                      {g==='bride'?'🌸 I am a Bride':'🤵 I am a Groom'}
                    </button>
                  ))}
                </div>

                <div className="space-y-3.5">
                  <div>
                    <label className="f-baloo text-[#7A5A60] text-[10px] font-bold uppercase tracking-wider block mb-1">Full Name</label>
                    <input required type="text" placeholder="Your full name" value={f.name}
                      onChange={e=>setF(p=>({...p,name:e.target.value}))} className="field"/>
                  </div>
                  <div>
                    <label className="f-baloo text-[#7A5A60] text-[10px] font-bold uppercase tracking-wider block mb-1">WhatsApp / Mobile</label>
                    <input required type="tel" placeholder="+91 _____ _____" value={f.phone}
                      onChange={e=>setF(p=>({...p,phone:e.target.value}))} className="field"/>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="f-baloo text-[#7A5A60] text-[10px] font-bold uppercase tracking-wider block mb-1">Community</label>
                      <select value={f.caste} onChange={e=>setF(p=>({...p,caste:e.target.value}))} className="field">
                        <option value="">Select</option>{COMMUNITIES.map(c=><option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="f-baloo text-[#7A5A60] text-[10px] font-bold uppercase tracking-wider block mb-1">Horoscope</label>
                      <select value={f.rasi} onChange={e=>setF(p=>({...p,rasi:e.target.value}))} className="field">
                        <option value="">Rasi</option>{RASIS.map(r=><option key={r.name}>{r.name}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="f-baloo text-[#7A5A60] text-[10px] font-bold uppercase tracking-wider block mb-1">Additional Details</label>
                    <textarea rows={3} placeholder="Education, profession, location, preferences..." value={f.note}
                      onChange={e=>setF(p=>({...p,note:e.target.value}))} className="field resize-none"/>
                  </div>
                  <button type="submit" className="btn btn-primary w-full py-3.5 rounded-xl text-sm shadow-lg">
                    <span>Submit Registration →</span>
                  </button>
                  <p className="text-center f-baloo text-[#7A5A60] text-xs">
                    Or WhatsApp directly: <strong className="text-[#5C1220]">{B.waDisp}</strong>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="py-14 relative overflow-hidden"
      style={{background:'#0F0608',backgroundImage:'radial-gradient(ellipse at 18% 28%, rgba(92,18,32,.65) 0,transparent 50%),radial-gradient(ellipse at 82% 72%, rgba(13,74,72,.4) 0,transparent 55%)'}}>
      <Kolam className="absolute bottom-0 left-0 w-72 h-72 text-[#B8870C] opacity-5 pointer-events-none"/>
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="f-script text-[#B8870C] text-4xl leading-none mb-0.5">{B.name}</div>
            <div className="f-tamil text-[#FAF4E6]/22 text-[11px] mb-4">சுபவிவாஹம்</div>
            <p className="f-baloo text-[#FAF4E6]/40 text-sm leading-relaxed mb-4">
              Tuticorin's most trusted Tamil matrimony. Personally managed by {B.owner}. ISO 9001:2015 certified.
            </p>
            <div className="flex gap-2 flex-wrap">
              {B.certs.map(c=><span key={c} className="f-baloo text-[10px] bg-white/5 text-[#FAF4E6]/45 border border-white/10 px-3 py-1 rounded-full">✓ {c}</span>)}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="f-baloo text-[#B8870C] font-bold text-xs uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5 f-baloo text-sm">
              {['Browse Brides','Browse Grooms','Register Free','Jathagam Matching','Success Stories','Contact Us'].map(l=>(
                <li key={l}><a href="#" className="text-[#FAF4E6]/40 hover:text-[#DEB84A] transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Communities */}
          <div>
            <h4 className="f-baloo text-[#B8870C] font-bold text-xs uppercase tracking-wider mb-4">Communities</h4>
            <ul className="space-y-2.5 f-baloo text-sm">
              {COMMUNITIES.slice(0,6).map(c=><li key={c}><a href="#" className="text-[#FAF4E6]/40 hover:text-[#DEB84A] transition-colors">{c} Matrimony</a></li>)}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="f-baloo text-[#B8870C] font-bold text-xs uppercase tracking-wider mb-4">Contact</h4>
            <div className="space-y-3 f-baloo text-sm">
              <a href={`https://wa.me/91${B.wa}`} className="flex items-center gap-2 text-[#25D366] hover:text-[#1DA851] transition-colors">
                <WaIcon className="w-4 h-4 fill-current flex-shrink-0"/>{B.waDisp}
              </a>
              <div className="text-[#FAF4E6]/38">{B.phone}</div>
              <div className="text-[#FAF4E6]/38">{B.site}</div>
              {B.addrs.map((a,i)=><div key={i} className="text-[#FAF4E6]/28 text-xs leading-relaxed">{a.line}</div>)}
            </div>
          </div>
        </div>

        <div className="border-t border-white/6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="f-baloo text-[#FAF4E6]/22 text-xs">© 2025 Subhavivaham · GSTIN: {B.gstin}</p>
          <p className="f-baloo text-[#FAF4E6]/22 text-xs">Made with ♥ in Tuticorin, Tamil Nadu</p>
        </div>
      </div>
    </footer>
  )
}

// ── Floating action buttons ───────────────────────────────────────

function Fabs() {
  const [v, setV] = useState(false)
  useEffect(()=>{
    const fn = ()=>setV(window.scrollY>220)
    window.addEventListener('scroll',fn)
    return ()=>window.removeEventListener('scroll',fn)
  },[])
  return <>
    {/* WhatsApp */}
    <a href={`https://wa.me/91${B.wa}?text=Hi%20Subhavivaham%2C%20I%20want%20to%20register.`}
      target="_blank" rel="noopener noreferrer"
      className={`wa-fab transition-all duration-300 ${v?'opacity-100 translate-y-0':'opacity-0 translate-y-8 pointer-events-none'}`}>
      <WaIcon className="w-7 h-7 fill-white"/>
    </a>

    {/* Back to top */}
    <button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}
      className={`fixed bottom-24 right-6 z-50 w-11 h-11 text-[#FAF4E6] rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:-translate-y-1 ${v?'opacity-100':'opacity-0 pointer-events-none'}`}
      style={{background:'linear-gradient(135deg,#5C1220,#7A1A2E)'}}>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7"/>
      </svg>
    </button>
  </>
}

// ── Icon helpers ──────────────────────────────────────────────────

function WaIcon({className}:{className?:string}) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

// ── App ───────────────────────────────────────────────────────────

export default function App() {
  useReveal()
  return (
    <div className="min-h-screen">
      <Navbar/>
      <Hero/>
      <Ticker/>
      <Stats/>
      <Browse/>
      <Jathagam/>
      <Works/>
      <Community/>
      <Stories/>
      <Contact/>
      <Footer/>
      <Fabs/>
    </div>
  )
}
