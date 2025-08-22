import React, { useEffect, useState } from "react";
import ShimmerButton from "../../ui/ShimmerButton";
import { Card, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { features } from "../../../mock/mock";
import FloatingShapes from "../FloatingShapes";
import { ShieldCheck } from "lucide-react";
import SectionWrap from "./SectionWrap";

// Helper component specifically for this section
const OracleMessage = ({ children }) => {
  const handleMouseMove = (e) => {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--x", `${x}px`);
    target.style.setProperty("--y", `${y}px`);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="shimmer-button self-start max-w-[85%] rounded-2xl border border-blue-400/30 bg-blue-950/40 p-4 text-sm text-neutral-200 shadow-sm"
    >
      {children}
    </div>
  );
};

const UserMessage = ({ children }) => (
  <div className="self-end max-w-[85%] rounded-2xl border border-neutral-700 bg-neutral-800 p-4 text-sm text-neutral-200 shadow-sm">
    {children}
  </div>
);

const chatMessages = [
  {
    type: "user",
    content: `"Explain the difference between aerobic and anaerobic respiration."`,
  },
  {
    type: "oracle",
    content: (
      <>
        {features.oracle.oracleExample}
        <div className="mt-3 flex flex-wrap gap-2">
          {features.oracle.citations.map((c, i) => (
            <span key={i} className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-1 text-[11px]">
              <ShieldCheck size={14} /> {c.label}
              <span className="opacity-60">{c.meta}</span>
            </span>
          ))}
        </div>
      </>
    ),
  },
  {
    type: "user",
    content: `"Can you give me a study guide for the upcoming midterm?"`,
  },
  {
    type: "oracle",
    content: (
      <>
        Of course. I've generated a study guide focusing on key concepts from Lecture 01-05 and your uploaded readings. I've prioritized topics you've previously asked about.
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-1 text-[11px]">
            <ShieldCheck size={14} /> Midterm_Study_Guide.pdf
          </span>
        </div>
      </>
    ),
  },
  {
    type: "user",
    content: `"What are the main points from last week's reading on photosynthesis?"`,
  },
  {
    type: "oracle",
    content: (
      <>
        The reading &quot;Photosynthesis Unveiled&quot; (Ch. 4) emphasizes two main stages: the light-dependent reactions that produce ATP and NADPH, and the Calvin cycle, which uses that energy to synthesize glucose.
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-1 text-[11px]">
            <ShieldCheck size={14} /> Photosynthesis...
            <span className="opacity-60">Ch. 4, p. 12</span>
          </span>
        </div>
      </>
    ),
  },
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <div className="relative pt-28 md:pt-32 bg-primary text-primary-foreground h-[750px] md:h-[650px] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <FloatingShapes />
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 -translate-x-1/2 -top-24 h-[720px] w-[720px] rounded-full border border-neutral-700" />
        <div className="absolute left-1/2 -translate-x-1/2 -top-24 h-[720px] w-[720px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_60%)]" />
      </div>

      <SectionWrap className="relative z-10">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className={`transition-all duration-700 ${mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
            <h1 className="text-4xl md:text-6xl leading-[1.05] tracking-tight font-light text-white">
              The comprehensive AI copilot for education
            </h1>
            <p className="mt-5 text-neutral-300 text-lg max-w-[44ch]">
              Stop searching the entire web for answers. Get instant, accurate, and citable responses
              directly from your course materials.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <a href="https://dashboard.eido-ai.com" target="_blank" rel="noopener noreferrer">
                <ShimmerButton
                  className="border border-blue-500 bg-blue-950/80 text-neutral-100 hover:border-blue-400"
                >
                  Start for Free
                </ShimmerButton>
              </a>
              <ShimmerButton
                variant="outline"
                onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })}
                className="border-neutral-400 text-neutral-200 hover:bg-blue-950/80 hover:border-blue-500 hover:text-neutral-100"
              >
                Learn more
              </ShimmerButton>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <Badge className="bg-white/10 text-white border-none">Private by default</Badge>
              <Badge variant="secondary" className="bg-white/10 text-white border-none">Citations included</Badge>
              <Badge variant="secondary" className="bg-white/10 text-white border-none">Chrome extension</Badge>
            </div>
          </div>
          <div>
            <div className="max-h-[430px] overflow-hidden rounded-xl">
              <Card className={`border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-700 ${
                mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}>
                <CardContent className="p-6">
                  <div className="h-[380px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_85%,transparent_100%)] group">
                    <div className="flex flex-col space-y-4 animate-marquee-up group-hover:[animation-play-state:paused] [&_>_*]:shrink-0">
                      {[...chatMessages, ...chatMessages].map((msg, i) =>
                        msg.type === "user" ? (
                          <UserMessage key={i}>{msg.content}</UserMessage>
                        ) : (
                          <OracleMessage key={i}>{msg.content}</OracleMessage>
                        )
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SectionWrap>
    </div>
  );
}
