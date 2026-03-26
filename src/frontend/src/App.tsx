import { useCallback, useEffect, useRef, useState } from "react";

const HEART_EMOJIS = ["❤️", "💕", "💗", "💓", "🌸", "💝", "💖", "🌺"];

const LOVE_MESSAGES = [
  "I'm sorry ❤️",
  "I love you ❤️",
  "Please forgive me ❤️",
  "You are my everything",
  "I miss you",
  "I was wrong",
  "Please come back",
  "You mean the world to me",
  "I'll do better",
  "I promise",
  "You are my happiness",
  "Never leaving you",
  "My heart aches",
  "I'm so sorry Momo",
  "Forgive me please",
  "I love you so much",
  "You are enough",
  "I need you",
  "Don't give up on us",
  "2 years ❤️",
  "I cherish every moment",
  "You complete me",
  "I'm lost without you",
  "Please believe me",
  "My love for you is real",
  "I'll be better",
  "You deserve the best",
  "I'm here for you",
  "Always and forever",
  "You are my home",
  "Momo ❤️",
  "I adore you",
  "I treasure you",
  "You light up my life",
  "My heart is yours",
  "I'm genuinely sorry",
  "Please don't leave",
  "I need your forgiveness",
  "You are irreplaceable",
  "Together forever",
  "I won't give up on us",
  "You are my sunshine",
  "My love, my life",
  "I'm begging you",
  "Just you and me",
  "I'll fix this",
  "You are worth it",
  "Please stay",
  "My darling Momo",
  "I was stupid",
  "I regret it deeply",
  "You are beautiful",
  "Inside and out",
  "My heart beats for you",
  "I'll make it right",
  "You are my peace",
  "Tujhse pyaar hai",
  "Maafi maangta hoon",
  "Tere bina adhoora hoon",
  "Meri jaan",
  "Saath rehna",
  "Tera hi hoon main",
  "Kabhi nahi chodunga",
  "Bahut pyaar hai",
  "Sorry baby",
  "I miss your smile",
  "I miss your voice",
  "I miss everything about you",
  "You are my calm",
  "My safe place is you",
  "Please forgive Avesh",
  "He loves you so much",
  "Two souls, one heart",
  "You are my favorite person",
  "Thank you for 2 years",
  "And for every year to come",
  "I promise to be better",
  "I won't let you down",
  "You believed in me",
  "I believe in us",
  "Please give me another chance",
  "I'll earn your trust",
  "You are my greatest gift",
  "Never stopping loving you",
  "My only one",
  "Forever yours, Avesh",
];

const QUOTES = [
  { text: "You are my happiness", sub: "always and forever" },
  { text: "I never want to lose you", sub: "not even for a single day" },
  { text: "Home is wherever you are", sub: "you are my safe place" },
  {
    text: "You changed my life for the better",
    sub: "in ways I can't even count",
  },
  { text: "With you, everything makes sense", sub: "you are my clarity" },
  {
    text: "Two years of you — and I'd choose it all again",
    sub: "every single moment",
  },
];

const BUBBLE_COLORS = [
  "oklch(0.92 0.06 5)",
  "oklch(0.90 0.07 300)",
  "oklch(0.93 0.05 20)",
  "oklch(0.88 0.08 350)",
  "oklch(0.91 0.06 280)",
];

const BUBBLE_MESSAGES = LOVE_MESSAGES.slice(0, 20).map((msg, i) => ({
  id: `bubble-${i}`,
  msg,
  idx: i,
}));
const MARQUEE_ROW1_DOUBLED = [
  ...LOVE_MESSAGES.slice(20, 55).map((msg, i) => ({
    id: `m1a-${i}`,
    msg,
    idx: i,
  })),
  ...LOVE_MESSAGES.slice(20, 55).map((msg, i) => ({
    id: `m1b-${i}`,
    msg,
    idx: i,
  })),
];
const MARQUEE_ROW2_DOUBLED = [
  ...LOVE_MESSAGES.slice(55).map((msg, i) => ({
    id: `m2a-${i}`,
    msg,
    idx: i + 2,
  })),
  ...LOVE_MESSAGES.slice(55).map((msg, i) => ({
    id: `m2b-${i}`,
    msg,
    idx: i + 2,
  })),
];

const PARTICLES_CONFIG = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  size: 4 + (i % 5) * 3,
  left: `${(i * 4.2 + 1) % 98}%`,
  top: `${(i * 7.1 + 3) % 92}%`,
  duration: 4 + (i % 6) * 1.2,
  delay: -(i * 0.5),
  color:
    i % 3 === 0
      ? "oklch(0.82 0.1 5 / 0.4)"
      : i % 3 === 1
        ? "oklch(0.75 0.1 300 / 0.35)"
        : "oklch(0.88 0.07 30 / 0.4)",
}));

// ---- Scroll fade hook ----
function useFadeIn(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.unobserve(el);
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

function FadeSection({
  children,
  className = "",
  delay = 0,
}: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transitionDelay = `${delay}ms`;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.unobserve(el);
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={`fade-in-up ${className}`}>
      {children}
    </div>
  );
}

// ---- Floating Hearts Background ----
function FloatingHeartsBackground() {
  const hearts = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    emoji: HEART_EMOJIS[i % HEART_EMOJIS.length],
    left: `${(i * 5.5 + 2) % 100}%`,
    size: 16 + (i % 5) * 8,
    duration: 10 + (i % 7) * 1.5,
    delay: -(i * 0.9),
  }));
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden z-0"
      aria-hidden="true"
    >
      {hearts.map((h) => (
        <span
          key={h.id}
          className="floating-heart absolute"
          style={{
            left: h.left,
            bottom: "-10%",
            fontSize: `${h.size}px`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}

// ---- Hero Section ----
function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.97 0.018 15) 0%, oklch(0.96 0.022 5) 50%, oklch(0.97 0.015 310) 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {Array.from({ length: 10 }, (_, i) => ({ id: `hh${i}`, i })).map(
          ({ id, i }) => (
            <span
              key={id}
              className="floating-heart absolute"
              style={{
                left: `${i * 10 + 3}%`,
                bottom: "-5%",
                fontSize: `${14 + i * 4}px`,
                animationDuration: `${9 + i * 1.2}s`,
                animationDelay: `${-i * 1.1 - 1}s`,
              }}
            >
              {HEART_EMOJIS[i % HEART_EMOJIS.length]}
            </span>
          ),
        )}
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="hero-title mb-2 text-4xl">🌸</div>
        <h1
          className="hero-title font-script leading-tight mb-4"
          style={{
            fontSize: "clamp(48px, 10vw, 72px)",
            color: "oklch(0.38 0.08 5)",
          }}
        >
          I'm Truly Sorry ❤️
        </h1>
        <p
          className="hero-sub font-body italic text-lg md:text-xl mb-10 leading-relaxed"
          style={{ color: "oklch(0.47 0.06 10)" }}
        >
          I never meant to hurt you, Momo…
        </p>
        <button
          type="button"
          data-ocid="hero.primary_button"
          onClick={() =>
            document
              .getElementById("apology")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="hero-btn forgive-btn text-white font-sans font-medium text-base md:text-lg px-8 py-4 rounded-full cursor-pointer border-0"
        >
          Please Read My Heart 💌
        </button>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        style={{ color: "oklch(0.63 0.09 5 / 0.5)" }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          role="img"
          aria-label="scroll down"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}

// ---- Apology Letter ----
const LETTER_PARAGRAPHS = [
  { text: "Dear Momo,", type: "greeting" },
  {
    text: "I'm really sorry for what I said… I know my words hurt you, and I hate myself for that. You didn't deserve any of it.",
    type: "body",
  },
  {
    text: "You mean everything to me. Every single day with you has been a gift I never take for granted. Two years and more — that's not just time, that's a life we built together, full of memories, laughter, fights, and love.",
    type: "body",
  },
  {
    text: "I hate that I hurt you. I hate that I made you feel anything less than the most important person in my world. Because that's what you are — my world.",
    type: "body",
  },
  {
    text: "I was wrong. I take full responsibility. No excuses. Just a promise that I see you, I hear you, and I love you more than I know how to say.",
    type: "body",
  },
  {
    text: "Aur sun — 2 saal se zyada ho gaye hain saath mein. Itni aadat ho gayi hai tujhse… tere bina sochna bhi nahi chahta. Please mat jaana.",
    type: "body",
  },
  { text: "With all my love, Avesh 💙", type: "signature" },
];

function ApologySection() {
  return (
    <section
      id="apology"
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: "oklch(0.975 0.01 35 / 0.6)" }}
    >
      <div className="max-w-3xl mx-auto">
        <FadeSection className="text-center mb-14">
          <h2
            className="font-serif text-4xl md:text-5xl mb-3"
            style={{ color: "oklch(0.32 0.07 10)" }}
          >
            A Letter to You
          </h2>
          <div className="flex justify-center gap-2 text-2xl">💌 🌸 💌</div>
        </FadeSection>
        <FadeSection>
          <div
            className="relative rounded-2xl p-8 md:p-14"
            style={{
              background: "oklch(0.985 0.006 40)",
              border: "1px solid oklch(0.89 0.025 20)",
              boxShadow:
                "0 8px 48px oklch(0.65 0.09 5 / 0.14), inset 0 1px 0 oklch(1 0 0 / 0.8)",
            }}
          >
            <span className="absolute top-4 left-5 text-2xl opacity-40">
              🌸
            </span>
            <span className="absolute top-4 right-5 text-2xl opacity-40">
              💕
            </span>
            <span className="absolute bottom-4 left-5 text-2xl opacity-40">
              💕
            </span>
            <span className="absolute bottom-4 right-5 text-2xl opacity-40">
              🌸
            </span>
            <div className="space-y-6">
              {LETTER_PARAGRAPHS.map((p, i) => (
                <FadeSection key={p.type} delay={i * 120}>
                  <p
                    className={`font-body leading-relaxed ${
                      p.type === "greeting"
                        ? "text-2xl font-script"
                        : p.type === "signature"
                          ? "text-2xl font-script text-right"
                          : "text-base md:text-lg"
                    }`}
                    style={{
                      color:
                        p.type !== "body"
                          ? "oklch(0.42 0.09 5)"
                          : "oklch(0.28 0.03 30)",
                      lineHeight: 1.85,
                    }}
                  >
                    {p.text}
                  </p>
                </FadeSection>
              ))}
            </div>
          </div>
        </FadeSection>
      </div>
    </section>
  );
}

// ---- Love Messages ----
function LoveMessagesSection() {
  return (
    <section id="love-messages" className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <FadeSection className="text-center mb-16">
          <h2
            className="font-serif text-4xl md:text-5xl mb-3"
            style={{ color: "oklch(0.32 0.07 10)" }}
          >
            Everything I Want to Say to You
          </h2>
          <p
            className="font-body italic text-lg"
            style={{ color: "oklch(0.5 0.06 10)" }}
          >
            every word from my heart to yours ❤️
          </p>
        </FadeSection>

        {/* Floating bubbles */}
        <FadeSection className="mb-16">
          <div className="relative h-72 md:h-80 overflow-hidden">
            {BUBBLE_MESSAGES.map((item) => (
              <div
                key={item.id}
                className="bubble-float absolute px-4 py-2 rounded-full font-body font-medium shadow-card"
                style={{
                  background: BUBBLE_COLORS[item.idx % BUBBLE_COLORS.length],
                  color: "oklch(0.3 0.06 10)",
                  left: `${(item.idx * 4.8 + 1) % 80}%`,
                  top: `${(item.idx * 14.3 + 5) % 70}%`,
                  animationDuration: `${3 + (item.idx % 4)}s`,
                  animationDelay: `${-item.idx * 0.4}s`,
                  fontSize: `${12 + (item.idx % 3) * 2}px`,
                  whiteSpace: "nowrap",
                  boxShadow: "0 2px 12px oklch(0.65 0.08 5 / 0.2)",
                }}
              >
                {item.msg}
              </div>
            ))}
          </div>
        </FadeSection>

        {/* Marquee */}
        <div className="space-y-4 overflow-hidden">
          <div className="overflow-hidden">
            <div className="marquee-left">
              {MARQUEE_ROW1_DOUBLED.map((item) => (
                <span
                  key={item.id}
                  className="inline-block px-5 py-2 rounded-full mr-3 font-body text-sm whitespace-nowrap"
                  style={{
                    background: BUBBLE_COLORS[item.idx % BUBBLE_COLORS.length],
                    color: "oklch(0.3 0.06 10)",
                    boxShadow: "0 2px 8px oklch(0.65 0.08 5 / 0.15)",
                  }}
                >
                  {item.msg}
                </span>
              ))}
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="marquee-right">
              {MARQUEE_ROW2_DOUBLED.map((item) => (
                <span
                  key={item.id}
                  className="inline-block px-5 py-2 rounded-full mr-3 font-body text-sm whitespace-nowrap"
                  style={{
                    background: BUBBLE_COLORS[item.idx % BUBBLE_COLORS.length],
                    color: "oklch(0.3 0.06 10)",
                    boxShadow: "0 2px 8px oklch(0.65 0.08 5 / 0.15)",
                  }}
                >
                  {item.msg}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Emotion Quotes ----
function EmotionQuotesSection() {
  return (
    <section
      id="quotes"
      className="relative py-24 px-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.97 0.012 300 / 0.4) 0%, oklch(0.96 0.018 10 / 0.3) 100%)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {PARTICLES_CONFIG.map((p) => (
          <span
            key={p.id}
            className="particle"
            style={{
              width: p.size,
              height: p.size,
              left: p.left,
              top: p.top,
              background: p.color,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>
      <div className="relative max-w-4xl mx-auto z-10">
        <FadeSection className="text-center mb-14">
          <h2
            className="font-serif text-4xl md:text-5xl mb-3"
            style={{ color: "oklch(0.32 0.07 10)" }}
          >
            From My Heart
          </h2>
          <div className="text-2xl">🌸 💜 🌸</div>
        </FadeSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {QUOTES.map((q, i) => (
            <FadeSection key={q.text} delay={i * 100}>
              <div
                className="rounded-2xl p-7 text-center"
                style={{
                  background: "oklch(0.985 0.006 40 / 0.85)",
                  border: "1px solid oklch(0.89 0.025 20)",
                  boxShadow: "0 4px 24px oklch(0.65 0.09 5 / 0.1)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <p
                  className="font-serif italic text-xl md:text-2xl mb-2 leading-snug"
                  style={{ color: "oklch(0.35 0.08 10)" }}
                >
                  “{q.text}”
                </p>
                <p
                  className="font-body text-sm"
                  style={{ color: "oklch(0.55 0.06 20)" }}
                >
                  — {q.sub}
                </p>
              </div>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Final Message ----
function FinalMessageSection() {
  const ref = useFadeIn();
  return (
    <section
      id="final"
      className="relative py-28 px-6 text-center overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.96 0.02 5 / 0.5) 0%, oklch(0.97 0.015 20) 100%)",
      }}
    >
      <div className="max-w-2xl mx-auto">
        <FadeSection className="mb-10">
          <div
            className="heartbeat text-7xl md:text-8xl mb-8 inline-block"
            role="img"
            aria-label="beating heart"
          >
            ❤️
          </div>
        </FadeSection>
        <div ref={ref} className="fade-in-up">
          <p
            className="font-body text-xl md:text-2xl leading-loose mb-6"
            style={{ color: "oklch(0.28 0.04 20)", lineHeight: 1.9 }}
          >
            I know I made a mistake… but I truly love you, Momo. I'll do better.
            I'll be better — for you, for us. Please forgive me.
          </p>
          <p
            className="font-script text-3xl"
            style={{ color: "oklch(0.42 0.09 5)" }}
          >
            — Avesh 💙
          </p>
        </div>
      </div>
    </section>
  );
}

// ---- Forgive Section ----
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    confetti: any;
  }
}

function ForgiveSection() {
  const [forgiven, setForgiven] = useState(false);

  const triggerBurst = useCallback(() => {
    const emojis = ["❤️", "💕", "💖", "💗", "🌸", "💝"];
    for (let i = 0; i < 18; i++) {
      const el = document.createElement("span");
      el.className = "burst-heart";
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.left = `${30 + Math.random() * 40}vw`;
      el.style.bottom = "30vh";
      el.style.animationDelay = `${Math.random() * 0.5}s`;
      el.style.fontSize = `${20 + Math.random() * 24}px`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 2200);
    }
    if (typeof window.confetti === "function") {
      window.confetti({
        particleCount: 120,
        spread: 80,
        origin: { x: 0.5, y: 0.65 },
        colors: ["#F3B8C3", "#E7A0B0", "#BBA9D6", "#C7B3F0", "#F2A8B5"],
        startVelocity: 35,
      });
    }
  }, []);

  const handleForgive = useCallback(() => {
    setForgiven(true);
    triggerBurst();
  }, [triggerBurst]);

  return (
    <section
      id="forgive"
      className="relative py-28 px-6 text-center"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.97 0.015 20) 0%, oklch(0.96 0.02 300 / 0.5) 100%)",
      }}
    >
      <div className="max-w-xl mx-auto">
        <FadeSection className="mb-10">
          <h2
            className="font-serif text-4xl md:text-5xl mb-4"
            style={{ color: "oklch(0.32 0.07 10)" }}
          >
            Will You Forgive Me?
          </h2>
          <p
            className="font-body text-lg italic"
            style={{ color: "oklch(0.5 0.06 10)" }}
          >
            One click is all I need from you, Momo…
          </p>
        </FadeSection>
        <FadeSection delay={200}>
          {!forgiven ? (
            <button
              type="button"
              data-ocid="forgive.primary_button"
              onClick={handleForgive}
              className="forgive-btn text-white font-sans font-semibold text-xl px-12 py-5 rounded-full border-0 cursor-pointer"
            >
              Forgive Me? ❤️
            </button>
          ) : (
            <div>
              <button
                type="button"
                disabled
                className="font-sans font-semibold text-xl px-12 py-5 rounded-full border-0 cursor-default opacity-90"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.12 145), oklch(0.68 0.14 160))",
                  color: "white",
                  boxShadow: "0 4px 20px oklch(0.68 0.14 160 / 0.4)",
                }}
              >
                She said yes! 💖
              </button>
              <div
                data-ocid="forgive.success_state"
                className="mt-8 fade-in-up visible"
              >
                <p
                  className="font-script text-3xl md:text-4xl leading-relaxed"
                  style={{ color: "oklch(0.42 0.09 5)" }}
                >
                  Thank you for giving me another chance, Momo.
                  <br />I love you so much ❤️
                </p>
              </div>
            </div>
          )}
        </FadeSection>
      </div>
    </section>
  );
}

// ---- Music Toggle ----
function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    );
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  return (
    <button
      type="button"
      data-ocid="music.toggle"
      onClick={toggle}
      aria-label={playing ? "Pause music" : "Play music"}
      className="music-btn fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-2xl border-0 cursor-pointer"
    >
      {playing ? "🔇" : "🎵"}
    </button>
  );
}

// ---- Footer ----
function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );
  return (
    <footer
      className="py-8 text-center font-body text-sm"
      style={{
        color: "oklch(0.6 0.05 20)",
        borderTop: "1px solid oklch(0.89 0.02 20)",
      }}
    >
      <p>
        © {year}. Built with{" "}
        <span style={{ color: "oklch(0.63 0.09 5)" }}>❤️</span> using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "oklch(0.55 0.09 5)", textDecoration: "underline" }}
        >
          caffeine.ai
        </a>
      </p>
    </footer>
  );
}

// ---- App Root ----
export default function App() {
  return (
    <div className="relative min-h-screen">
      <FloatingHeartsBackground />
      <main className="relative z-10">
        <HeroSection />
        <ApologySection />
        <LoveMessagesSection />
        <EmotionQuotesSection />
        <FinalMessageSection />
        <ForgiveSection />
      </main>
      <Footer />
      <MusicToggle />
    </div>
  );
}
