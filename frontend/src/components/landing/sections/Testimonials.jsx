import React from "react";
import { Card, CardContent } from "../../ui/card";
import { testimonials } from "../../../mock/mock";
import { Quote } from "lucide-react";

// Helper component specifically for this section
const TestimonialCard = ({ t }) => {
  const handleMouseMove = (e) => {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--x", `${x}px`);
    target.style.setProperty("--y", `${y}px`);
  };

  return (
    <Card
      onMouseMove={handleMouseMove}
      className="shimmer-button w-[350px] shrink-0 border-neutral-800 bg-neutral-900 transition-colors hover:border-blue-400/30 hover:bg-blue-950/40"
    >
      <CardContent className="p-6">
        <Quote className="text-blue-400" size={20} />
        <p className="mt-4 text-neutral-300 h-20">{t.quote}</p>
        <div className="mt-6 text-sm font-semibold text-white">{t.name}</div>
        <div className="text-xs text-neutral-500">{t.role}</div>
      </CardContent>
    </Card>
  );
};

export default function Testimonials() {
  const firstRow = testimonials.slice(0, 6);
  const secondRow = testimonials.slice(6, 12);
  return (
    <section id="testimonials" className="py-24 space-y-6 bg-gradient-to-b from-neutral-900 to-black">
      <div className="overflow-hidden group">
        <div className="w-max flex gap-6 animate-marquee-right group-hover:[animation-play-state:paused]">
          {[...firstRow, ...firstRow].map((t, i) => <TestimonialCard t={t} key={`a-${i}`} />)}
        </div>
      </div>
      <div className="overflow-hidden group">
        <div className="w-max flex gap-6 animate-marquee-left group-hover:[animation-play-state:paused]">
          {[...secondRow, ...secondRow].map((t, i) => <TestimonialCard t={t} key={`c-${i}`} />)}
        </div>
      </div>
    </section>
  );
}