import { useState, useEffect, useRef, useCallback } from "react";

const LANGUAGES = ["Hindi", "Tamil", "Telugu", "Bengali", "Marathi", "Kannada", "Gujarati", "Malayalam", "Punjabi", "Odia", "English"];

const MOCK_POSTS = [
  {
    id: 1,
    author: "Priya Sharma",
    avatar: "PS",
    location: "Jaipur, Rajasthan",
    originalLang: "Hindi",
    voiceDuration: "0:23",
    timestamp: "2 min ago",
    text: {
      Hindi: "आज सुबह अम्बेर किले पर सूर्योदय देखा। ऐसा लगा जैसे पूरा आसमान सोने का हो गया हो। हर किसी को एक बार ज़रूर देखना चाहिए।",
      English: "Watched the sunrise at Amber Fort this morning. Felt like the entire sky turned to gold. Everyone must see this at least once.",
      Tamil: "இன்று காலை அம்பேர் கோட்டையில் சூரிய உதயத்தைப் பார்த்தேன். வானம் முழுவதும் தங்கமாக மாறியது போல் இருந்தது.",
      Telugu: "ఈ రోజు ఉదయం అంబేర్ కోటలో సూర్యోదయం చూశాను. ఆకాశం మొత్తం బంగారంగా మారినట్లు అనిపించింది.",
      Bengali: "আজ সকালে আমবের দুর্গে সূর্যোদয় দেখলাম। মনে হলো পুরো আকাশ সোনার হয়ে গেছে।",
    },
    aiVisual: "🏰",
    mood: "golden",
    likes: 342,
    echoes: 56,
    mehfilJoins: 23,
    tags: ["#AmberFort", "#Sunrise", "#Rajasthan"],
    aiInsight: "12,847 people in Jaipur also talked about sunrise this week",
  },
  {
    id: 2,
    author: "Karthik Nair",
    avatar: "KN",
    location: "Kochi, Kerala",
    originalLang: "Malayalam",
    voiceDuration: "0:41",
    timestamp: "18 min ago",
    text: {
      Malayalam: "ചായക്കടയിലെ ചർച്ച: AI വരുമ്പോൾ നമ്മുടെ ജോലികൾക്ക് എന്ത് സംഭവിക്കും? ചായക്കടക്കാരൻ പറഞ്ഞു — ചായ ഉണ്ടാക്കാൻ AI-ക്ക് പറ്റില്ല!",
      English: "Tea shop debate: What happens to our jobs when AI comes? The tea seller said — AI can't make chai!",
      Hindi: "चाय की दुकान पर बहस: AI आने पर हमारी नौकरियों का क्या होगा? चायवाले ने कहा — चाय बनाना AI के बस की बात नहीं!",
      Tamil: "தேநீர் கடை விவாதம்: AI வரும்போது நம் வேலைகளுக்கு என்ன ஆகும்? தேநீர் கடைக்காரர் சொன்னார் — AI-யால் சாய் போட முடியாது!",
      Telugu: "టీ షాప్ చర్చ: AI వచ్చినప్పుడు మన ఉద్యోగాలకు ఏమవుతుంది? టీ అమ్మేవాడు అన్నాడు — చాయ్ చేయడం AI వల్ల కాదు!",
    },
    aiVisual: "☕",
    mood: "warm",
    likes: 1203,
    echoes: 287,
    mehfilJoins: 156,
    tags: ["#ChaiPeCharcha", "#AIDebate", "#Kochi"],
    aiInsight: "This topic is trending in 43 cities across India right now",
  },
  {
    id: 3,
    author: "Ananya Das",
    avatar: "AD",
    location: "Kolkata, West Bengal",
    originalLang: "Bengali",
    voiceDuration: "0:35",
    timestamp: "1 hr ago",
    text: {
      Bengali: "দুর্গাপূজার প্যান্ডেল তৈরির কাজ শুরু হয়ে গেছে। এবার আমাদের পাড়ায় থিম হচ্ছে 'ভবিষ্যতের কলকাতা'। AI দিয়ে ডিজাইন করা হচ্ছে!",
      English: "Durga Puja pandal construction has started. This year our neighborhood theme is 'Future Kolkata'. Being designed with AI!",
      Hindi: "दुर्गा पूजा पंडाल का निर्माण शुरू हो गया है। इस बार हमारे मोहल्ले की थीम है 'भविष्य का कोलकाता'। AI से डिजाइन हो रहा है!",
      Tamil: "துர்கா பூஜா பந்தல் கட்டுமானம் தொடங்கிவிட்டது. இந்த ஆண்டு எங்கள் பகுதியின் தீம் 'எதிர்கால கொல்கத்தா'. AI-யால் வடிவமைக்கப்படுகிறது!",
      Telugu: "దుర్గా పూజ పందిరి నిర్మాణం ప్రారంభమైంది. ఈ సంవత్సరం మా ప్రాంతం థీమ్ 'భవిష్యత్ కోల్‌కతా'. AI తో డిజైన్ చేస్తున్నారు!",
    },
    aiVisual: "🎨",
    mood: "festive",
    likes: 876,
    echoes: 134,
    mehfilJoins: 89,
    tags: ["#DurgaPuja", "#Kolkata", "#AIDesign"],
    aiInsight: "2,341 pandal updates from Kolkata in the last hour",
  },
  {
    id: 4,
    author: "Ravi Kumar",
    avatar: "RK",
    location: "Varanasi, UP",
    originalLang: "Hindi",
    voiceDuration: "0:18",
    timestamp: "3 hr ago",
    text: {
      Hindi: "मेरी दादी ने पहली बार Awaaz पर अपनी आवाज़ रिकॉर्ड की। बोलीं — 'अरे ये तो जादू है! मैं बोलूं और सब पढ़ लें!'",
      English: "My grandmother recorded her voice on Awaaz for the first time. She said — 'This is magic! I speak and everyone can read it!'",
      Tamil: "என் பாட்டி முதல் முறையாக அவாஸில் குரல் பதிவு செய்தார். 'இது மந்திரம்! நான் பேசுகிறேன், எல்லோரும் படிக்கிறார்கள்!' என்றார்.",
      Bengali: "আমার দিদা প্রথমবার আওয়াজ়-এ নিজের গলা রেকর্ড করলেন। বললেন — 'অরে এ তো জাদু! আমি বলি আর সবাই পড়ে!'",
      Telugu: "మా నాయనమ్మ మొదటిసారి అవాజ్‌లో గొంతు రికార్డ్ చేసింది. 'ఇది మ్యాజిక్! నేను మాట్లాడతాను, అందరూ చదువుతారు!' అన్నది.",
    },
    aiVisual: "👵",
    mood: "heartfelt",
    likes: 4521,
    echoes: 892,
    mehfilJoins: 34,
    tags: ["#DadiOnAwaaz", "#DigitalIndia", "#VoiceFirst"],
    aiInsight: "67% of new users this week are 50+ years old from Tier 3 cities",
  },
];

const TRENDING_MEHFILS = [
  { id: 1, topic: "Should India have a 4-day work week?", participants: 12453, languages: 8, live: true },
  { id: 2, topic: "Best street food city in India?", participants: 8921, languages: 11, live: true },
  { id: 3, topic: "Cricket vs Kabaddi — which is truly India's sport?", participants: 6234, languages: 7, live: false },
];

const MOOD_COLORS = {
  golden: { bg: "linear-gradient(135deg, #FFF8E7, #FFE4B5)", accent: "#D4920B", border: "#F0C75E" },
  warm: { bg: "linear-gradient(135deg, #FFF5F0, #FFE8D6)", accent: "#C75B12", border: "#F0A875" },
  festive: { bg: "linear-gradient(135deg, #FFF0F5, #FFE0EB)", accent: "#C7126B", border: "#F075A8" },
  heartfelt: { bg: "linear-gradient(135deg, #F0F5FF, #E0EBFF)", accent: "#1247C7", border: "#758BF0" },
};

const WaveformVisualizer = ({ active, color = "#FF6B35" }) => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const bars = 32;
      const gap = W / bars;
      for (let i = 0; i < bars; i++) {
        const h = active
          ? (Math.sin(t * 0.05 + i * 0.4) * 0.5 + 0.5) * H * 0.8 + H * 0.1
          : H * 0.15;
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.6 + Math.sin(t * 0.03 + i * 0.2) * 0.4;
        const bw = gap * 0.55;
        ctx.beginPath();
        ctx.roundRect(i * gap + (gap - bw) / 2, (H - h) / 2, bw, h, bw / 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      t++;
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [active, color]);

  return <canvas ref={canvasRef} width={320} height={60} style={{ width: "100%", height: 40 }} />;
};

const VoiceRecorder = ({ onClose }) => {
  const [phase, setPhase] = useState("idle");
  const [seconds, setSeconds] = useState(0);
  const [selectedLang, setSelectedLang] = useState("Hindi");
  const [processingStep, setProcessingStep] = useState(0);
  const timerRef = useRef(null);

  const processingSteps = [
    "Listening to your voice...",
    "Detecting language: " + selectedLang,
    "Transcribing speech...",
    "Generating AI visuals...",
    "Translating to 11 languages...",
    "Matching mood & aesthetics...",
    "Your Awaaz is ready! ✨",
  ];

  useEffect(() => {
    if (phase === "recording") {
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [phase]);

  useEffect(() => {
    if (phase === "processing" && processingStep < processingSteps.length - 1) {
      const t = setTimeout(() => setProcessingStep((s) => s + 1), 800);
      return () => clearTimeout(t);
    }
    if (phase === "processing" && processingStep === processingSteps.length - 1) {
      const t = setTimeout(() => setPhase("done"), 600);
      return () => clearTimeout(t);
    }
  }, [phase, processingStep]);

  const startRecording = () => { setPhase("recording"); setSeconds(0); };
  const stopRecording = () => { setPhase("processing"); setProcessingStep(0); };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(12px)",
      zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center",
      animation: "fadeIn 0.3s ease"
    }}>
      <div style={{
        background: "#1A1A2E", borderRadius: 24, padding: "36px 28px", width: "min(90vw, 400px)",
        boxShadow: "0 25px 60px rgba(0,0,0,0.5)", position: "relative"
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: 14, right: 14, background: "rgba(255,255,255,0.1)",
          border: "none", color: "#fff", fontSize: 18, cursor: "pointer", borderRadius: "50%",
          width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center"
        }}>✕</button>

        <h3 style={{ color: "#FF6B35", margin: "0 0 6px", fontFamily: "'Playfair Display', serif", fontSize: 22 }}>
          {phase === "done" ? "Awaaz Published! 🎉" : "Record Your Awaaz"}
        </h3>
        <p style={{ color: "rgba(255,255,255,0.5)", margin: "0 0 20px", fontSize: 13 }}>
          {phase === "done" ? "Your voice is now live in 11 languages" : "Speak in any language — AI does the rest"}
        </p>

        {phase !== "done" && (
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>I'm speaking in</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
              {LANGUAGES.slice(0, 6).map((l) => (
                <button key={l} onClick={() => setSelectedLang(l)} style={{
                  padding: "5px 12px", borderRadius: 20, border: selectedLang === l ? "2px solid #FF6B35" : "1px solid rgba(255,255,255,0.15)",
                  background: selectedLang === l ? "rgba(255,107,53,0.15)" : "transparent",
                  color: selectedLang === l ? "#FF6B35" : "rgba(255,255,255,0.6)", fontSize: 12, cursor: "pointer"
                }}>{l}</button>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 16, padding: 20, marginBottom: 20 }}>
          {phase === "processing" ? (
            <div>
              {processingSteps.map((step, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "6px 0",
                  opacity: i <= processingStep ? 1 : 0.2, transition: "opacity 0.4s ease",
                  color: i === processingStep ? "#FF6B35" : i < processingStep ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)",
                  fontSize: 13
                }}>
                  <span style={{ width: 20, textAlign: "center" }}>
                    {i < processingStep ? "✓" : i === processingStep ? "⟳" : "○"}
                  </span>
                  {step}
                </div>
              ))}
            </div>
          ) : phase === "done" ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 8 }}>🎤</div>
              <p style={{ color: "#FF6B35", fontWeight: 600, margin: "0 0 4px" }}>Voice Post Created</p>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, margin: 0 }}>
                Translated to 11 languages · AI visuals generated · Live on feed
              </p>
            </div>
          ) : (
            <>
              <WaveformVisualizer active={phase === "recording"} />
              {phase === "recording" && (
                <p style={{ textAlign: "center", color: "#FF6B35", fontVariantNumeric: "tabular-nums", margin: "10px 0 0", fontSize: 20, fontWeight: 600 }}>
                  {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}
                </p>
              )}
            </>
          )}
        </div>

        {phase === "idle" && (
          <button onClick={startRecording} style={{
            width: "100%", padding: 14, borderRadius: 16, border: "none", cursor: "pointer",
            background: "linear-gradient(135deg, #FF6B35, #E8491D)", color: "#fff",
            fontSize: 16, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 8
          }}>
            <span style={{ fontSize: 20 }}>🎙️</span> Hold to Record
          </button>
        )}
        {phase === "recording" && (
          <button onClick={stopRecording} style={{
            width: "100%", padding: 14, borderRadius: 16, border: "2px solid #FF6B35", cursor: "pointer",
            background: "transparent", color: "#FF6B35", fontSize: 16, fontWeight: 600
          }}>
            ■ Stop & Process
          </button>
        )}
        {phase === "done" && (
          <button onClick={onClose} style={{
            width: "100%", padding: 14, borderRadius: 16, border: "none", cursor: "pointer",
            background: "linear-gradient(135deg, #FF6B35, #E8491D)", color: "#fff",
            fontSize: 16, fontWeight: 600
          }}>
            View on Feed →
          </button>
        )}
      </div>
    </div>
  );
};

const MehfilRoom = ({ mehfil, onClose }) => {
  const [messages, setMessages] = useState([
    { id: 1, author: "Sunita (Patna)", lang: "Hindi → English", text: "A 4-day week would transform small-town India. People could actually visit family.", time: "just now", side: "left" },
    { id: 2, author: "Vijay (Chennai)", lang: "Tamil → English", text: "Productivity matters more than hours. My team already does more in 4 days than most do in 5.", time: "1 min ago", side: "right" },
    { id: 3, author: "Fatima (Lucknow)", lang: "Urdu → English", text: "What about daily wage workers? This only benefits the privileged.", time: "2 min ago", side: "left" },
  ]);
  const [newMsg, setNewMsg] = useState("");

  const sendMessage = () => {
    if (!newMsg.trim()) return;
    setMessages((m) => [...m, {
      id: Date.now(), author: "You (Kharagpur)", lang: "English",
      text: newMsg, time: "just now", side: "right"
    }]);
    setNewMsg("");
    setTimeout(() => {
      setMessages((m) => [...m, {
        id: Date.now() + 1, author: "AI Moderator", lang: "System",
        text: "Great point! 47% of participants agree. Let me translate that to all 8 active languages...",
        time: "just now", side: "center"
      }]);
    }, 1500);
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "#0D0D1A", zIndex: 1000,
      display: "flex", flexDirection: "column", animation: "fadeIn 0.3s ease"
    }}>
      <div style={{
        padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)",
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div>
          <h3 style={{ color: "#fff", margin: 0, fontSize: 16, fontFamily: "'Playfair Display', serif" }}>{mehfil.topic}</h3>
          <p style={{ color: "rgba(255,255,255,0.4)", margin: "4px 0 0", fontSize: 12 }}>
            {mehfil.participants.toLocaleString()} people · {mehfil.languages} languages
            {mehfil.live && <span style={{ color: "#FF4444", marginLeft: 8 }}>● LIVE</span>}
          </p>
        </div>
        <button onClick={onClose} style={{
          background: "rgba(255,255,255,0.1)", border: "none", color: "#fff",
          borderRadius: 12, padding: "8px 16px", cursor: "pointer", fontSize: 13
        }}>Leave</button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{
            alignSelf: msg.side === "right" ? "flex-end" : msg.side === "center" ? "center" : "flex-start",
            maxWidth: msg.side === "center" ? "90%" : "75%",
            background: msg.side === "center" ? "rgba(255,107,53,0.1)" : msg.side === "right" ? "rgba(255,107,53,0.2)" : "rgba(255,255,255,0.06)",
            borderRadius: 16, padding: "12px 16px",
            border: msg.side === "center" ? "1px solid rgba(255,107,53,0.3)" : "none"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ color: msg.side === "center" ? "#FF6B35" : "rgba(255,255,255,0.6)", fontSize: 11, fontWeight: 600 }}>{msg.author}</span>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 10 }}>{msg.lang}</span>
            </div>
            <p style={{ color: "#fff", margin: 0, fontSize: 14, lineHeight: 1.5 }}>{msg.text}</p>
          </div>
        ))}
      </div>

      <div style={{ padding: 16, borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: 10 }}>
        <div style={{
          flex: 1, background: "rgba(255,255,255,0.06)", borderRadius: 16,
          display: "flex", alignItems: "center", padding: "0 16px"
        }}>
          <input value={newMsg} onChange={(e) => setNewMsg(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type or tap 🎙️ to speak..."
            style={{
              flex: 1, background: "transparent", border: "none", color: "#fff",
              fontSize: 14, outline: "none", padding: "12px 0"
            }} />
          <span style={{ cursor: "pointer", fontSize: 20, opacity: 0.6 }}>🎙️</span>
        </div>
        <button onClick={sendMessage} style={{
          background: "#FF6B35", border: "none", borderRadius: 16, width: 48, height: 48,
          color: "#fff", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"
        }}>↑</button>
      </div>
    </div>
  );
};

const PostCard = ({ post, viewLang }) => {
  const [liked, setLiked] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showLangs, setShowLangs] = useState(false);
  const [currentLang, setCurrentLang] = useState(viewLang);
  const mood = MOOD_COLORS[post.mood] || MOOD_COLORS.warm;

  useEffect(() => { setCurrentLang(viewLang); }, [viewLang]);

  const displayText = post.text[currentLang] || post.text["English"];

  return (
    <div style={{
      background: mood.bg, borderRadius: 20, padding: 0, marginBottom: 16,
      border: `1px solid ${mood.border}30`, overflow: "hidden",
      boxShadow: "0 4px 20px rgba(0,0,0,0.06)", transition: "transform 0.2s ease"
    }}>
      <div style={{ padding: "18px 20px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <div style={{
            width: 44, height: 44, borderRadius: "50%", background: mood.accent,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 700, fontSize: 15, fontFamily: "'Playfair Display', serif"
          }}>{post.avatar}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, color: "#1A1A2E", fontSize: 15 }}>{post.author}</div>
            <div style={{ color: "rgba(26,26,46,0.5)", fontSize: 12 }}>
              {post.location} · {post.timestamp}
            </div>
          </div>
          <div style={{
            background: `${mood.accent}18`, borderRadius: 12, padding: "4px 10px",
            fontSize: 11, color: mood.accent, fontWeight: 600
          }}>
            🎤 {post.voiceDuration} · {post.originalLang}
          </div>
        </div>

        <div style={{
          background: "rgba(255,255,255,0.5)", borderRadius: 14, padding: "14px 16px",
          marginBottom: 12, position: "relative"
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 6, marginBottom: 8
          }}>
            <span style={{ fontSize: 28 }}>{post.aiVisual}</span>
            <button onClick={() => setShowLangs(!showLangs)} style={{
              marginLeft: "auto", background: `${mood.accent}15`, border: `1px solid ${mood.accent}30`,
              borderRadius: 8, padding: "3px 10px", fontSize: 11, color: mood.accent,
              cursor: "pointer", fontWeight: 500
            }}>
              {currentLang} ▾
            </button>
          </div>
          {showLangs && (
            <div style={{
              position: "absolute", right: 16, top: 50, background: "#fff", borderRadius: 12,
              boxShadow: "0 8px 30px rgba(0,0,0,0.15)", zIndex: 10, overflow: "hidden", minWidth: 140
            }}>
              {Object.keys(post.text).map((l) => (
                <button key={l} onClick={() => { setCurrentLang(l); setShowLangs(false); }} style={{
                  display: "block", width: "100%", padding: "10px 16px", border: "none",
                  background: currentLang === l ? `${mood.accent}12` : "transparent",
                  color: currentLang === l ? mood.accent : "#333", textAlign: "left",
                  cursor: "pointer", fontSize: 13, borderBottom: "1px solid #f0f0f0"
                }}>{l} {l === post.originalLang && "🎤"}</button>
              ))}
            </div>
          )}
          <p style={{
            margin: 0, color: "#1A1A2E", fontSize: 15, lineHeight: 1.65,
            fontFamily: "'Noto Sans', sans-serif"
          }}>{displayText}</p>
        </div>

        <div style={{
          background: `${mood.accent}08`, borderRadius: 10, padding: "8px 12px",
          fontSize: 12, color: mood.accent, marginBottom: 14, display: "flex",
          alignItems: "center", gap: 6
        }}>
          <span>🤖</span> {post.aiInsight}
        </div>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
          {post.tags.map((t) => (
            <span key={t} style={{
              background: `${mood.accent}12`, borderRadius: 20, padding: "3px 10px",
              fontSize: 11, color: mood.accent, fontWeight: 500
            }}>{t}</span>
          ))}
        </div>
      </div>

      <div style={{
        display: "flex", borderTop: `1px solid ${mood.border}40`, padding: "0"
      }}>
        {[
          { icon: liked ? "❤️" : "🤍", label: liked ? post.likes + 1 : post.likes, action: () => setLiked(!liked) },
          { icon: "🔄", label: post.echoes, action: () => {} },
          { icon: "🏕️", label: `Mehfil (${post.mehfilJoins})`, action: () => {} },
          { icon: "🔊", label: "Listen", action: () => {} },
        ].map((btn, i) => (
          <button key={i} onClick={btn.action} style={{
            flex: 1, padding: "12px 0", border: "none", background: "transparent",
            color: "rgba(26,26,46,0.6)", fontSize: 12, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
            borderRight: i < 3 ? `1px solid ${mood.border}30` : "none"
          }}>
            <span style={{ fontSize: 15 }}>{btn.icon}</span>
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default function Awaaz() {
  const [tab, setTab] = useState("feed");
  const [viewLang, setViewLang] = useState("English");
  const [showRecorder, setShowRecorder] = useState(false);
  const [showMehfil, setShowMehfil] = useState(null);
  const [showLangPicker, setShowLangPicker] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { setLoaded(true); }, []);

  return (
    <div style={{
      maxWidth: 430, margin: "0 auto", minHeight: "100vh",
      background: "#FAFAF7", fontFamily: "'Noto Sans', sans-serif", position: "relative",
      overflow: "hidden"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Noto+Sans:wght@300;400;500;600;700&display=swap');
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes pulse { 0%,100% { transform: scale(1) } 50% { transform: scale(1.08) } }
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        input::placeholder { color: rgba(255,255,255,0.3); }
        ::-webkit-scrollbar { width: 0; }
      `}</style>

      <header style={{
        background: "linear-gradient(135deg, #1A1A2E, #16213E)", padding: "16px 20px 12px",
        position: "sticky", top: 0, zIndex: 100
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{
              margin: 0, fontSize: 26, fontFamily: "'Playfair Display', serif",
              background: "linear-gradient(135deg, #FF6B35, #FFB347)", WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent", fontWeight: 700, letterSpacing: -0.5
            }}>awaaz</h1>
            <p style={{ margin: 0, color: "rgba(255,255,255,0.4)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>
              your voice, every language
            </p>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button onClick={() => setShowLangPicker(!showLangPicker)} style={{
              background: "rgba(255,107,53,0.15)", border: "1px solid rgba(255,107,53,0.3)",
              borderRadius: 12, padding: "6px 12px", color: "#FF6B35", fontSize: 12,
              cursor: "pointer", fontWeight: 500
            }}>
              🌐 {viewLang}
            </button>
            <div style={{
              width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
              fontSize: 14, cursor: "pointer"
            }}>A</div>
          </div>
        </div>
        {showLangPicker && (
          <div style={{
            position: "absolute", right: 20, top: 70, background: "#1A1A2E",
            border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16,
            boxShadow: "0 12px 40px rgba(0,0,0,0.4)", zIndex: 200, padding: 8, minWidth: 160
          }}>
            {LANGUAGES.map((l) => (
              <button key={l} onClick={() => { setViewLang(l); setShowLangPicker(false); }} style={{
                display: "block", width: "100%", padding: "10px 14px", border: "none",
                background: viewLang === l ? "rgba(255,107,53,0.15)" : "transparent",
                color: viewLang === l ? "#FF6B35" : "rgba(255,255,255,0.7)",
                textAlign: "left", cursor: "pointer", fontSize: 13, borderRadius: 10
              }}>{l}</button>
            ))}
          </div>
        )}
      </header>

      <nav style={{
        display: "flex", background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.06)",
        position: "sticky", top: 76, zIndex: 99
      }}>
        {[
          { key: "feed", icon: "📢", label: "Feed" },
          { key: "mehfil", icon: "🏕️", label: "Mehfil" },
          { key: "discover", icon: "🔍", label: "Discover" },
          { key: "profile", icon: "👤", label: "Profile" },
        ].map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{
            flex: 1, padding: "10px 0", border: "none", background: "transparent",
            borderBottom: tab === t.key ? "2px solid #FF6B35" : "2px solid transparent",
            color: tab === t.key ? "#FF6B35" : "rgba(0,0,0,0.4)", cursor: "pointer",
            fontSize: 12, fontWeight: tab === t.key ? 600 : 400, display: "flex",
            flexDirection: "column", alignItems: "center", gap: 2
          }}>
            <span style={{ fontSize: 16 }}>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </nav>

      <main style={{ padding: "16px 16px 100px" }}>
        {tab === "feed" && (
          <div style={{ animation: "slideUp 0.4s ease" }}>
            <div style={{
              background: "linear-gradient(135deg, #FF6B35, #E8491D)", borderRadius: 20,
              padding: "20px 22px", marginBottom: 20, color: "#fff"
            }}>
              <h3 style={{ margin: "0 0 6px", fontFamily: "'Playfair Display', serif", fontSize: 18 }}>
                🎙️ What's on your mind?
              </h3>
              <p style={{ margin: "0 0 14px", fontSize: 13, opacity: 0.85 }}>
                Just speak — AI handles the rest. No typing needed.
              </p>
              <button onClick={() => setShowRecorder(true)} style={{
                background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: 14, padding: "10px 20px", color: "#fff", fontSize: 14,
                cursor: "pointer", fontWeight: 600, backdropFilter: "blur(10px)"
              }}>
                Tap to Record Your Awaaz →
              </button>
            </div>

            {MOCK_POSTS.map((post, i) => (
              <div key={post.id} style={{ animation: `slideUp ${0.4 + i * 0.1}s ease` }}>
                <PostCard post={post} viewLang={viewLang} />
              </div>
            ))}
          </div>
        )}

        {tab === "mehfil" && (
          <div style={{ animation: "slideUp 0.4s ease" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#1A1A2E", fontSize: 22, margin: "0 0 6px" }}>
              Mehfil — Live Gatherings
            </h2>
            <p style={{ color: "rgba(26,26,46,0.5)", fontSize: 13, margin: "0 0 20px" }}>
              Real-time debates across languages. AI translates everything live.
            </p>
            {TRENDING_MEHFILS.map((m) => (
              <div key={m.id} onClick={() => setShowMehfil(m)} style={{
                background: "#fff", borderRadius: 20, padding: 20, marginBottom: 14,
                border: "1px solid rgba(0,0,0,0.06)", cursor: "pointer",
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)", transition: "transform 0.2s ease"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  {m.live && <span style={{
                    background: "#FF4444", color: "#fff", fontSize: 10, padding: "2px 8px",
                    borderRadius: 10, fontWeight: 700, animation: "pulse 2s infinite"
                  }}>LIVE</span>}
                  <span style={{ color: "rgba(0,0,0,0.4)", fontSize: 12 }}>
                    {m.participants.toLocaleString()} participants
                  </span>
                </div>
                <h3 style={{ margin: "0 0 10px", color: "#1A1A2E", fontSize: 17, fontFamily: "'Playfair Display', serif" }}>
                  {m.topic}
                </h3>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ color: "rgba(0,0,0,0.5)", fontSize: 12 }}>🌐 {m.languages} languages active</span>
                  <span style={{ color: "#FF6B35", fontWeight: 600, fontSize: 13 }}>Join →</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "discover" && (
          <div style={{ animation: "slideUp 0.4s ease" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#1A1A2E", fontSize: 22, margin: "0 0 6px" }}>
              Discover India's Voices
            </h2>
            <p style={{ color: "rgba(26,26,46,0.5)", fontSize: 13, margin: "0 0 20px" }}>
              AI-curated content from across 28 states and 22 languages
            </p>
            {[
              { emoji: "🔥", title: "Trending in Your Language", desc: "Popular voices in English near Kharagpur", count: "2.3K posts" },
              { emoji: "🌏", title: "Cross-Language Bridges", desc: "Posts connecting Tamil & Bengali communities", count: "456 threads" },
              { emoji: "🎤", title: "New Voices Today", desc: "First-time creators from Tier 3 cities", count: "12K new voices" },
              { emoji: "⚡", title: "AI-Powered Debates", desc: "Most engaging Mehfils this week", count: "89 active" },
              { emoji: "🎭", title: "Culture Exchange", desc: "Festival stories from every state", count: "5.6K stories" },
            ].map((item, i) => (
              <div key={i} style={{
                background: "#fff", borderRadius: 18, padding: 18, marginBottom: 12,
                border: "1px solid rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: 14,
                cursor: "pointer", boxShadow: "0 2px 10px rgba(0,0,0,0.03)"
              }}>
                <div style={{
                  width: 50, height: 50, borderRadius: 14, background: "linear-gradient(135deg, #FF6B3520, #FFB34720)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0
                }}>{item.emoji}</div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: "0 0 3px", color: "#1A1A2E", fontSize: 15 }}>{item.title}</h4>
                  <p style={{ margin: 0, color: "rgba(26,26,46,0.5)", fontSize: 12 }}>{item.desc}</p>
                </div>
                <span style={{ color: "rgba(26,26,46,0.4)", fontSize: 11, whiteSpace: "nowrap" }}>{item.count}</span>
              </div>
            ))}
          </div>
        )}

        {tab === "profile" && (
          <div style={{ animation: "slideUp 0.4s ease", textAlign: "center" }}>
            <div style={{
              width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, #FF6B35, #E8491D)",
              display: "flex", alignItems: "center", justifyContent: "center", margin: "20px auto 14px",
              color: "#fff", fontSize: 30, fontFamily: "'Playfair Display', serif", fontWeight: 700
            }}>A</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#1A1A2E", margin: "0 0 4px" }}>Anshuman Arya</h2>
            <p style={{ color: "rgba(26,26,46,0.5)", fontSize: 13, margin: "0 0 20px" }}>IIT Kharagpur · Speaks English, Hindi</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 30, marginBottom: 24 }}>
              {[
                { num: "47", label: "Awaaz" },
                { num: "1.2K", label: "Echoes" },
                { num: "23", label: "Mehfils" },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: "#FF6B35" }}>{s.num}</div>
                  <div style={{ fontSize: 12, color: "rgba(26,26,46,0.5)" }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{
              background: "#fff", borderRadius: 18, padding: 18, textAlign: "left",
              border: "1px solid rgba(0,0,0,0.06)"
            }}>
              <h4 style={{ margin: "0 0 12px", color: "#1A1A2E", fontFamily: "'Playfair Display', serif" }}>Your Voice Stats</h4>
              {[
                { label: "Languages reached", value: "8 of 22" },
                { label: "States your voice reached", value: "14 of 28" },
                { label: "Longest Mehfil session", value: "43 minutes" },
                { label: "Most popular Awaaz", value: "892 echoes" },
              ].map((s, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between", padding: "10px 0",
                  borderBottom: i < 3 ? "1px solid rgba(0,0,0,0.05)" : "none"
                }}>
                  <span style={{ color: "rgba(26,26,46,0.6)", fontSize: 13 }}>{s.label}</span>
                  <span style={{ color: "#FF6B35", fontWeight: 600, fontSize: 13 }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <button onClick={() => setShowRecorder(true)} style={{
        position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)",
        width: 64, height: 64, borderRadius: "50%", border: "none",
        background: "linear-gradient(135deg, #FF6B35, #E8491D)",
        boxShadow: "0 8px 30px rgba(255,107,53,0.4)", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 28, color: "#fff", zIndex: 90, animation: "pulse 3s infinite"
      }}>
        🎙️
      </button>

      {showRecorder && <VoiceRecorder onClose={() => setShowRecorder(false)} />}
      {showMehfil && <MehfilRoom mehfil={showMehfil} onClose={() => setShowMehfil(null)} />}
    </div>
  );
}
