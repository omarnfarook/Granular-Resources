import { useState, useRef, useEffect, useCallback } from "react";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function callClaude(messages, system) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("Missing VITE_ANTHROPIC_API_KEY environment variable");
  }
  const res = await fetch("/api/anthropic/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system,
      messages,
    }),
  });
  const data = await res.json();
  return data.content?.[0]?.text || "";
}

async function generateCarouselJSON(topic, dump, imageStyle) {
  const system = `You are a social media expert. Generate carousel slide content as JSON only. No markdown. No explanation.
Return an array of 5-7 slides. Each slide: { "headline": "short punchy headline", "body": "2-3 sentence insight", "caption": "engaging caption for this slide", "imageQuery": "unsplash search query for the image", "imageUrl": "" }
Also return a "postCaption" field at root level with an engaging Instagram/LinkedIn caption for the whole post including hashtags.
Format: { "postCaption": "...", "slides": [...] }`;
  const prompt = `Topic: ${topic}\nBrain dump: ${dump}\nImage style preference: ${imageStyle}\nCreate an optimized carousel post.`;
  const text = await callClaude(
    [{ role: "user", content: prompt }],
    system
  );
  try {
    return JSON.parse(text.replace(/```json|```/g, "").trim());
  } catch {
    return null;
  }
}

async function refineSlide(slide, instruction) {
  const system = `You are a social media expert. Refine this carousel slide based on user instruction. Return JSON only with same structure: { "headline": "...", "body": "...", "caption": "...", "imageQuery": "...", "imageUrl": "${slide.imageUrl}" }`;
  const prompt = `Current slide: ${JSON.stringify(slide)}\nInstruction: ${instruction}`;
  const text = await callClaude(
    [{ role: "user", content: prompt }],
    system
  );
  try {
    return {
      ...slide,
      ...JSON.parse(text.replace(/```json|```/g, "").trim()),
    };
  } catch {
    return slide;
  }
}

async function agentChat(history, userMsg, carouselContext) {
  const system = `You are a warm, ethereal creative agent called Muse. You help creators build stunning carousel posts. Be concise, insightful, and inspiring. ${carouselContext ? `Current carousel context: ${carouselContext}` : ""}`;
  return await callClaude(
    [...history, { role: "user", content: userMsg }],
    system
  );
}

async function fetchUnsplashImage(query) {
  return `https://source.unsplash.com/800x600/?${encodeURIComponent(query)}&sig=${Math.random()}`;
}

const SLIDE_GRADIENTS = [
  "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
  "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
  "linear-gradient(135deg, #0d0d0d, #1a1a1a, #2d1b69)",
  "linear-gradient(135deg, #0a0a0f, #1e1e2e, #16213e)",
  "linear-gradient(135deg, #0f0c29, #1a0533, #24243e)",
  "linear-gradient(135deg, #0d1117, #161b22, #0f3460)",
  "linear-gradient(135deg, #1a1033, #0d0a1e, #251a4a)",
];

function TypingIndicator() {
  return (
    <div
      style={{
        display: "flex",
        gap: 4,
        padding: "10px 14px",
        alignItems: "center",
      }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "rgba(180,160,255,0.7)",
            animation: `typingBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function EtherealOrb({ pulse }) {
  return (
    <div style={{ position: "relative", width: 72, height: 72, flexShrink: 0 }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 35% 35%, #c4b5fd, #7c3aed, #1e1b4b)",
          boxShadow: pulse
            ? "0 0 0 0 rgba(139,92,246,0.4), 0 0 30px rgba(139,92,246,0.5)"
            : "0 0 20px rgba(139,92,246,0.3)",
          animation: pulse
            ? "orbPulse 2s ease-in-out infinite"
            : "orbFloat 4s ease-in-out infinite",
          transition: "all 0.5s ease",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "22%",
            width: "28%",
            height: "18%",
            background: "rgba(255,255,255,0.4)",
            borderRadius: "50%",
            filter: "blur(3px)",
          }}
        />
      </div>
    </div>
  );
}

function AgentMessage({ msg, isUser }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: 12,
        animation: "fadeSlideUp 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: "80%",
          padding: "10px 14px",
          borderRadius: isUser
            ? "18px 18px 4px 18px"
            : "18px 18px 18px 4px",
          background: isUser
            ? "linear-gradient(135deg, #7c3aed, #5b21b6)"
            : "rgba(255,255,255,0.06)",
          border: isUser ? "none" : "1px solid rgba(255,255,255,0.08)",
          color: "#e8e0ff",
          fontSize: 14,
          lineHeight: 1.6,
          backdropFilter: isUser ? "none" : "blur(10px)",
          whiteSpace: "pre-wrap",
        }}
      >
        {msg.content}
      </div>
    </div>
  );
}

function SlideCard({ slide, index, isActive, isGrid, onClick }) {
  const grad = SLIDE_GRADIENTS[index % SLIDE_GRADIENTS.length];
  return (
    <div
      onClick={onClick}
      style={{
        position: "relative",
        borderRadius: isGrid ? 12 : 20,
        overflow: "hidden",
        cursor: "pointer",
        border: isActive
          ? "2px solid rgba(139,92,246,0.8)"
          : "2px solid transparent",
        transition: "all 0.3s ease",
        boxShadow: isActive
          ? "0 0 20px rgba(139,92,246,0.4)"
          : "0 4px 20px rgba(0,0,0,0.4)",
        flexShrink: 0,
        width: "100%",
        aspectRatio: "1/1",
        background: grad,
      }}
    >
      {slide.imageUrl && (
        <img
          src={slide.imageUrl}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.25,
          }}
          onError={(e) => (e.target.style.display = "none")}
        />
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.7))",
          padding: isGrid ? 14 : 24,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <div
          style={{
            fontSize: isGrid ? 11 : 13,
            color: "rgba(180,160,255,0.8)",
            marginBottom: 4,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Slide {index + 1}
        </div>
        <div
          style={{
            fontSize: isGrid ? 13 : 20,
            fontWeight: 700,
            color: "#f0eaff",
            lineHeight: 1.3,
            marginBottom: isGrid ? 4 : 8,
            fontFamily: "'Playfair Display', Georgia, serif",
          }}
        >
          {slide.headline}
        </div>
        {!isGrid && (
          <div
            style={{
              fontSize: 13,
              color: "rgba(220,210,255,0.75)",
              lineHeight: 1.6,
            }}
          >
            {slide.body}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CarouselAgent() {
  const [view, setView] = useState("agent");
  const [agentPhase, setAgentPhase] = useState("intro");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [orbPulse, setOrbPulse] = useState(true);
  const [topic, setTopic] = useState("");
  const [dump, setDump] = useState("");
  const [carousel, setCarousel] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [agentOpen, setAgentOpen] = useState(false);
  const [agentInput, setAgentInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isRefining, setIsRefining] = useState(false);
  const [showCaption, setShowCaption] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const addAgentMsg = (content) => {
    setMessages((m) => [...m, { role: "assistant", content }]);
    setOrbPulse(false);
    setTimeout(() => setOrbPulse(true), 2000);
  };

  useEffect(() => {
    if (agentPhase === "intro") {
      setTimeout(() => {
        addAgentMsg(
          "Hello, I'm Muse \u2726\n\nYour creative companion for carousel posts that stop the scroll.\n\nWhat topic are you creating a carousel about today?"
        );
        setAgentPhase("topic");
      }, 800);
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((m) => [...m, { role: "user", content: userMsg }]);
    setIsTyping(true);
    await sleep(600);
    if (agentPhase === "topic") {
      setTopic(userMsg);
      addAgentMsg(
        `"${userMsg}" \u2014 love it. \u2726\n\nNow give me a brain dump. Raw thoughts, angles, insights \u2014 anything rattling around in your head about this topic.`
      );
      setAgentPhase("dump");
    } else if (agentPhase === "dump") {
      setDump(userMsg);
      addAgentMsg(
        "Perfect. What visual style for the images?\n\n\u2022 Editorial photography\n\u2022 Minimalist abstract\n\u2022 Bold lifestyle shots\n\u2022 Illustrated / graphic\n\u2022 No images, text-only\n\nOr describe what feels right."
      );
      setAgentPhase("images");
    } else if (agentPhase === "images") {
      addAgentMsg(
        "\u2726 Crafting your carousel now \u2014 structuring slides, sourcing visuals. Give me a moment..."
      );
      setAgentPhase("generating");
      setIsTyping(false);
      await generateCarousel(topic, dump, userMsg);
      return;
    }
    setIsTyping(false);
  };

  const generateCarousel = async (t, d, imgStyle) => {
    setIsTyping(true);
    try {
      const result = await generateCarouselJSON(t, d, imgStyle);
      if (!result?.slides) {
        addAgentMsg(
          "Something went wrong. Let's try again \u2014 what's your topic?"
        );
        setAgentPhase("topic");
        setIsTyping(false);
        return;
      }
      const noImg =
        imgStyle.toLowerCase().includes("no image") ||
        imgStyle.toLowerCase().includes("text");
      const slides = await Promise.all(
        result.slides.map(async (slide) => ({
          ...slide,
          imageUrl: noImg
            ? ""
            : await fetchUnsplashImage(slide.imageQuery || t),
        }))
      );
      setCarousel({ ...result, slides });
      setIsTyping(false);
      addAgentMsg(
        "\u2726 Your carousel is ready.\n\nSwipe through each slide. Tap the orb anytime to refine a specific slide or make sweeping changes."
      );
      setAgentPhase("done");
      await sleep(1200);
      setView("carousel");
    } catch {
      addAgentMsg("Something went wrong. Let's try again.");
      setAgentPhase("topic");
      setIsTyping(false);
    }
  };

  const handleAgentSend = async () => {
    if (!agentInput.trim() || isRefining) return;
    const msg = agentInput.trim();
    setAgentInput("");
    const newHistory = [...chatHistory, { role: "user", content: msg }];
    setChatHistory(newHistory);
    setIsRefining(true);
    const context = `User is on slide ${activeSlide + 1}. Slide: ${JSON.stringify(carousel.slides[activeSlide])}`;
    const reply = await agentChat(newHistory, msg, context);
    setChatHistory([...newHistory, { role: "assistant", content: reply }]);
    const editWords = [
      "change",
      "make",
      "update",
      "rewrite",
      "adjust",
      "fix",
      "improve",
      "shorter",
      "longer",
      "punchier",
      "simpler",
    ];
    if (editWords.some((w) => msg.toLowerCase().includes(w))) {
      const refined = await refineSlide(
        carousel.slides[activeSlide],
        msg
      );
      setCarousel((c) => {
        const slides = [...c.slides];
        slides[activeSlide] = refined;
        return { ...c, slides };
      });
    }
    setIsRefining(false);
  };

  const inputStyle = {
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 24,
    padding: "10px 16px",
  };

  const sendBtn = (active) => ({
    width: 34,
    height: 34,
    borderRadius: "50%",
    background: active
      ? "linear-gradient(135deg,#7c3aed,#5b21b6)"
      : "rgba(255,255,255,0.05)",
    border: "none",
    color: "white",
    fontSize: 16,
    cursor: active ? "pointer" : "default",
    flexShrink: 0,
    transition: "all 0.2s",
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050508",
        color: "#e8e0ff",
        fontFamily: "'DM Sans',-apple-system,sans-serif",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@400;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        textarea,input{outline:none;background:transparent;border:none;color:inherit;font-family:inherit;resize:none}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(139,92,246,0.3);border-radius:4px}
        @keyframes orbFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes orbPulse{0%,100%{box-shadow:0 0 0 0 rgba(139,92,246,0.4),0 0 30px rgba(139,92,246,0.5)}50%{box-shadow:0 0 0 12px rgba(139,92,246,0),0 0 50px rgba(139,92,246,0.6)}}
        @keyframes fadeSlideUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes typingBounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}}
        @keyframes slideIn{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}
      `}</style>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 60% 50% at 50% -10%,rgba(124,58,237,0.15) 0%,transparent 70%),radial-gradient(ellipse 40% 30% at 80% 80%,rgba(91,33,182,0.08) 0%,transparent 70%)",
        }}
      />
      {/* Header */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px",
          backdropFilter: "blur(20px)",
          background: "rgba(5,5,8,0.8)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div
          style={{
            fontSize: 17,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            background: "linear-gradient(135deg,#c4b5fd,#7c3aed)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          ✦ Muse
        </div>
        {carousel && (
          <div style={{ display: "flex", gap: 6 }}>
            {["carousel", "grid", "agent"].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 20,
                  border: "1px solid",
                  borderColor:
                    view === v
                      ? "rgba(139,92,246,0.6)"
                      : "rgba(255,255,255,0.08)",
                  background:
                    view === v ? "rgba(139,92,246,0.15)" : "transparent",
                  color:
                    view === v ? "#c4b5fd" : "rgba(255,255,255,0.4)",
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  textTransform: "capitalize",
                }}
              >
                {v}
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Agent View */}
      {view === "agent" && (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            paddingTop: 72,
            paddingBottom: 80,
            maxWidth: 540,
            margin: "0 auto",
            width: "100%",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "32px 20px 16px",
            }}
          >
            <EtherealOrb pulse={orbPulse} />
            <div
              style={{
                marginTop: 12,
                fontSize: 12,
                color: "rgba(180,160,255,0.5)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {isTyping ? "Thinking..." : "Muse \u00b7 Your Creative Agent"}
            </div>
          </div>
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "0 20px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {messages.map((msg, i) => (
              <AgentMessage
                key={i}
                msg={msg}
                isUser={msg.role === "user"}
              />
            ))}
            {isTyping && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "18px 18px 18px 4px",
                  }}
                >
                  <TypingIndicator />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div
            style={{
              position: "fixed",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
              maxWidth: 540,
              padding: "12px 16px",
              backdropFilter: "blur(20px)",
              background: "rgba(5,5,8,0.9)",
              borderTop: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div style={inputStyle}>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Type your message..."
                rows={1}
                disabled={isTyping || agentPhase === "generating"}
                style={{
                  flex: 1,
                  fontSize: 14,
                  lineHeight: 1.5,
                  maxHeight: 100,
                  overflowY: "auto",
                  opacity:
                    isTyping || agentPhase === "generating" ? 0.4 : 1,
                }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                style={sendBtn(!!input.trim() && !isTyping)}
              >
                ↑
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Carousel View */}
      {view === "carousel" && carousel && (
        <div
          style={{
            flex: 1,
            paddingTop: 72,
            display: "flex",
            flexDirection: "column",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: 380,
                position: "relative",
              }}
            >
              <SlideCard
                slide={carousel.slides[activeSlide]}
                index={activeSlide}
                isActive={true}
                isGrid={false}
              />
              <button
                onClick={() =>
                  setActiveSlide((s) => Math.max(0, s - 1))
                }
                disabled={activeSlide === 0}
                style={{
                  position: "absolute",
                  left: -16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background:
                    activeSlide === 0
                      ? "rgba(255,255,255,0.03)"
                      : "rgba(139,92,246,0.3)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "white",
                  fontSize: 16,
                  cursor: activeSlide === 0 ? "default" : "pointer",
                  opacity: activeSlide === 0 ? 0.3 : 1,
                  transition: "all 0.2s",
                }}
              >
                ‹
              </button>
              <button
                onClick={() =>
                  setActiveSlide((s) =>
                    Math.min(carousel.slides.length - 1, s + 1)
                  )
                }
                disabled={activeSlide === carousel.slides.length - 1}
                style={{
                  position: "absolute",
                  right: -16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background:
                    activeSlide === carousel.slides.length - 1
                      ? "rgba(255,255,255,0.03)"
                      : "rgba(139,92,246,0.3)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "white",
                  fontSize: 16,
                  cursor:
                    activeSlide === carousel.slides.length - 1
                      ? "default"
                      : "pointer",
                  opacity:
                    activeSlide === carousel.slides.length - 1
                      ? 0.3
                      : 1,
                  transition: "all 0.2s",
                }}
              >
                ›
              </button>
            </div>
            <div style={{ display: "flex", gap: 6, marginTop: 16 }}>
              {carousel.slides.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  style={{
                    width: i === activeSlide ? 20 : 6,
                    height: 6,
                    borderRadius: 3,
                    background:
                      i === activeSlide
                        ? "#7c3aed"
                        : "rgba(255,255,255,0.15)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>
            <button
              onClick={() => setShowCaption(!showCaption)}
              style={{
                marginTop: 16,
                padding: "8px 18px",
                borderRadius: 20,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(220,210,255,0.7)",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              {showCaption ? "Hide caption" : "View caption \u2193"}
            </button>
            {showCaption && (
              <div
                style={{
                  marginTop: 12,
                  maxWidth: 380,
                  width: "100%",
                  padding: "14px 16px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 14,
                  fontSize: 13,
                  color: "rgba(220,210,255,0.75)",
                  lineHeight: 1.7,
                  animation: "fadeSlideUp 0.3s ease",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(180,160,255,0.5)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  Slide Caption
                </div>
                {carousel.slides[activeSlide].caption}
              </div>
            )}
          </div>
          <div
            style={{
              padding: "12px 20px 20px",
              borderTop: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: "rgba(180,160,255,0.4)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 6,
              }}
            >
              Post Caption
            </div>
            <div
              style={{
                fontSize: 13,
                color: "rgba(220,210,255,0.6)",
                lineHeight: 1.6,
                maxHeight: 80,
                overflowY: "auto",
              }}
            >
              {carousel.postCaption}
            </div>
          </div>
          <button
            onClick={() => setAgentOpen(true)}
            style={{
              position: "fixed",
              bottom: 24,
              right: 20,
              width: 56,
              height: 56,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 35% 35%,#c4b5fd,#7c3aed,#1e1b4b)",
              border: "none",
              cursor: "pointer",
              boxShadow:
                "0 0 20px rgba(139,92,246,0.5),0 4px 20px rgba(0,0,0,0.4)",
              animation: "orbFloat 4s ease-in-out infinite",
              zIndex: 100,
              fontSize: 22,
              color: "white",
            }}
          >
            ✦
          </button>
        </div>
      )}
      {/* Grid View */}
      {view === "grid" && carousel && (
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "88px 16px 100px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ marginBottom: 16 }}>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                fontFamily: "'Playfair Display',serif",
              }}
            >
              All Slides
            </div>
            <div
              style={{
                fontSize: 13,
                color: "rgba(180,160,255,0.5)",
                marginTop: 4,
              }}
            >
              {carousel.slides.length} slides \u00b7 Tap to jump to slide
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
          >
            {carousel.slides.map((slide, i) => (
              <div
                key={i}
                onClick={() => {
                  setActiveSlide(i);
                  setView("carousel");
                }}
              >
                <SlideCard
                  slide={slide}
                  index={i}
                  isActive={false}
                  isGrid={true}
                />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24, textAlign: "center" }}>
            <button
              onClick={() =>
                alert(
                  "In a native app, this exports all slides as images to your camera roll."
                )
              }
              style={{
                padding: "14px 32px",
                borderRadius: 28,
                background:
                  "linear-gradient(135deg,#7c3aed,#5b21b6)",
                border: "none",
                color: "white",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(124,58,237,0.4)",
              }}
            >
              Export Slides \u2193
            </button>
          </div>
          <button
            onClick={() => setAgentOpen(true)}
            style={{
              position: "fixed",
              bottom: 24,
              right: 20,
              width: 56,
              height: 56,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 35% 35%,#c4b5fd,#7c3aed,#1e1b4b)",
              border: "none",
              cursor: "pointer",
              boxShadow:
                "0 0 20px rgba(139,92,246,0.5),0 4px 20px rgba(0,0,0,0.4)",
              animation: "orbFloat 4s ease-in-out infinite",
              zIndex: 100,
              fontSize: 22,
              color: "white",
            }}
          >
            ✦
          </button>
        </div>
      )}
      {/* Floating Agent Sheet */}
      {agentOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(4px)",
            }}
            onClick={() => setAgentOpen(false)}
          />
          <div
            style={{
              position: "relative",
              background: "linear-gradient(180deg,#0d0b1a,#0a0812)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "24px 24px 0 0",
              padding: "0 0 20px",
              maxHeight: "70vh",
              display: "flex",
              flexDirection: "column",
              animation: "slideIn 0.3s ease",
            }}
          >
            <div
              style={{
                padding: "12px 0 4px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 4,
                  borderRadius: 2,
                  background: "rgba(255,255,255,0.15)",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "8px 20px 12px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle at 35% 35%,#c4b5fd,#7c3aed,#1e1b4b)",
                  flexShrink: 0,
                }}
              />
              <div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>Muse</div>
                <div
                  style={{
                    fontSize: 12,
                    color: "rgba(180,160,255,0.5)",
                  }}
                >
                  Slide {activeSlide + 1} \u00b7 Ask for changes
                </div>
              </div>
              <button
                onClick={() => setAgentOpen(false)}
                style={{
                  marginLeft: "auto",
                  background: "none",
                  border: "none",
                  color: "rgba(255,255,255,0.3)",
                  fontSize: 22,
                  cursor: "pointer",
                  lineHeight: 1,
                }}
              >
                \u00d7
              </button>
            </div>
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "12px 20px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                minHeight: 80,
              }}
            >
              {chatHistory.length === 0 && (
                <div
                  style={{
                    fontSize: 13,
                    color: "rgba(180,160,255,0.4)",
                    lineHeight: 1.6,
                  }}
                >
                  Tell me what to change on slide {activeSlide + 1}, or
                  ask for adjustments across the whole carousel.
                </div>
              )}
              {chatHistory.map((msg, i) => (
                <AgentMessage
                  key={i}
                  msg={msg}
                  isUser={msg.role === "user"}
                />
              ))}
              {isRefining && (
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 14,
                    }}
                  >
                    <TypingIndicator />
                  </div>
                </div>
              )}
            </div>
            <div style={{ padding: "8px 16px 0" }}>
              <div style={inputStyle}>
                <input
                  value={agentInput}
                  onChange={(e) => setAgentInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAgentSend();
                    }
                  }}
                  placeholder="e.g. Make the headline punchier..."
                  disabled={isRefining}
                  style={{
                    flex: 1,
                    fontSize: 14,
                    opacity: isRefining ? 0.4 : 1,
                  }}
                />
                <button
                  onClick={handleAgentSend}
                  disabled={!agentInput.trim() || isRefining}
                  style={{
                    ...sendBtn(!!agentInput.trim() && !isRefining),
                    width: 30,
                    height: 30,
                    fontSize: 15,
                  }}
                >
                  ↑
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
