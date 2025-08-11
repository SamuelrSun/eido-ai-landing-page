import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { useToast } from "../../hooks/use-toast";
import { howSteps, features, testimonials } from "../../mock/mock";
import {
  FileUp,
  MessageSquare,
  GraduationCap,
  Calendar as CalendarIcon,
  Chrome,
  Quote,
  ShieldCheck,
  Zap,
} from "lucide-react";

const iconMap = { FileUp, MessageSquare, GraduationCap };

const SectionWrap = ({ id, children, className = "" }) => (
  <section id={id} className={`mx-auto max-w-[1280px] px-6 md:px-10 ${className}`}>
    {children}
  </section>
);

export function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="relative pt-28 md:pt-32 pb-16 md:pb-24 bg-white">
      {/* Decorative ring */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 -translate-x-1/2 -top-24 h-[720px] w-[720px] rounded-full border border-black/5" />
        <div className="absolute left-1/2 -translate-x-1/2 -top-24 h-[720px] w-[720px] rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_60%)]" />
      </div>

      <SectionWrap>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl leading-[1.05] tracking-tight font-light text-black">
              Your personal education copilot
            </h1>
            <p className="mt-5 text-neutral-600 text-lg max-w-[44ch]">
              Stop searching the entire web for answers. Get instant, accurate, and citable responses
              directly from your course materials.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <Button
                onClick={() => document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25"
              >
                Create your free account
              </Button>
              <Button
                variant="outline"
                onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })}
                className="border-neutral-300 hover:bg-neutral-100"
              >
                See how it works
              </Button>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <Badge className="bg-black text-white">Private by default</Badge>
              <Badge variant="secondary" className="border border-neutral-200">Citations included</Badge>
              <Badge variant="secondary" className="border border-neutral-200">Chrome extension</Badge>
            </div>
          </div>
          <div>
            {/* Glass card mock */}
            <Card className={`border border-neutral-200/60 bg-white/70 backdrop-blur-xl transition-all duration-700 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700" />
                  <div>
                    <div className="text-sm font-semibold">Oracle Chat</div>
                    <div className="text-xs text-neutral-500">Eido AI</div>
                  </div>
                </div>
                <div className="mt-5 space-y-4">
                  <div className="rounded-2xl bg-neutral-50 border border-neutral-200 p-4 text-sm shadow-sm">
                    "Explain the difference between aerobic and anaerobic respiration."
                  </div>
                  <div className="rounded-2xl bg-blue-600 text-white p-4 text-sm shadow-sm">
                    {features.oracle.oracleExample}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {features.oracle.citations.map((c, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-1 text-[11px]"
                        >
                          <ShieldCheck size={14} /> {c.label}
                          <span className="opacity-60">{c.meta}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SectionWrap>
    </div>
  );
}

export function HowItWorks() {
  return (
    <SectionWrap id="how" className="py-24">
      <h2 className="text-3xl md:text-5xl font-light tracking-tight">How it works</h2>
      <div className="mt-12 grid md:grid-cols-3 gap-8">
        {howSteps.map((s) => {
          const Icon = iconMap[s.icon] || FileUp;
          return (
            <Card key={s.id} className="border-neutral-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center">
                  <Icon className="text-blue-600" size={22} />
                </div>
                <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-neutral-600">{s.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </SectionWrap>
  );
}

export function Features() {
  return (
    <div id="features" className="py-24 bg-neutral-50">
      <SectionWrap>
        {/* Oracle */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl md:text-4xl font-light tracking-tight">
              {features.oracle.title}
            </h3>
            <p className="mt-4 text-neutral-600">{features.oracle.subtitle}</p>
            <div className="mt-6 grid gap-4">
              <div className="rounded-xl border border-neutral-200 p-4 bg-white">
                <div className="text-xs uppercase text-neutral-500">Generic AI</div>
                <p className="mt-2 text-neutral-700">{features.oracle.genericExample}</p>
              </div>
              <div className="rounded-xl border border-blue-200 p-4 bg-gradient-to-b from-white to-blue-50">
                <div className="text-xs uppercase text-blue-600">Oracle (Cited)</div>
                <p className="mt-2 text-neutral-800">{features.oracle.oracleExample}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {features.oracle.citations.map((c, i) => (
                    <Badge key={i} variant="secondary" className="border-blue-200">
                      <ShieldCheck size={14} className="mr-1" /> {c.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <Card className="border-neutral-200 bg-white/70 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <MessageSquare size={18} className="text-blue-600" />
                  <div className="text-sm font-semibold">Oracle Knowledge Base</div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  {["Slides", "Notes", "Assignments", "Readings"].map((t) => (
                    <div key={t} className="rounded-lg border border-neutral-200 p-3 bg-neutral-50">
                      {t}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Calendar */}
        <div className="mt-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Card className="border-neutral-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <CalendarIcon size={18} className="text-blue-600" />
                  <div className="text-sm font-semibold">Auto-Populated Calendar</div>
                </div>
                <div className="mt-4 grid gap-3">
                  {features.calendar.sampleDates.map((d, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border border-neutral-200 p-3 bg-white">
                      <span className="font-medium">{d.label}</span>
                      <span className="text-blue-600 font-semibold">{d.date}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <h3 className="text-2xl md:text-4xl font-light tracking-tight">
              {features.calendar.title}
            </h3>
            <p className="mt-4 text-neutral-600">{features.calendar.subtitle}</p>
          </div>
        </div>

        {/* Extension */}
        <div className="mt-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl md:text-4xl font-light tracking-tight">
              {features.extension.title}
            </h3>
            <p className="mt-4 text-neutral-600">{features.extension.subtitle}</p>
            <div className="mt-6 flex items-center gap-3 text-sm text-neutral-600">
              <Chrome className="text-blue-600" size={18} /> Chrome Extension (placeholder)
            </div>
          </div>
          <div>
            <Card className="border-neutral-200 bg-white/70 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="rounded-xl border border-neutral-200 p-4 bg-neutral-50">
                  <div className="text-sm font-semibold">Browser Toolbar</div>
                  <div className="mt-3 h-10 rounded-md bg-white border border-neutral-200 flex items-center px-3 gap-2">
                    <div className="h-6 w-6 rounded bg-gradient-to-br from-blue-500 to-blue-700" />
                    <span className="text-sm text-neutral-700">Oracle Quick Ask…</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SectionWrap>
    </div>
  );
}

export function Testimonials() {
  return (
    <SectionWrap id="testimonials" className="py-24">
      <h2 className="text-3xl md:text-5xl font-light tracking-tight">What students say</h2>
      <div className="mt-12 grid md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <Card key={i} className="border-neutral-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Quote className="text-blue-600" size={20} />
              <p className="mt-4 text-neutral-700">{t.quote}</p>
              <div className="mt-6 text-sm font-semibold">{t.name}</div>
              <div className="text-xs text-neutral-500">{t.role}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionWrap>
  );
}

export function FAQ() {
  return (
    <SectionWrap className="py-24">
      <h2 className="text-3xl md:text-5xl font-light tracking-tight">Frequently asked questions</h2>
      <Accordion type="single" collapsible className="mt-10">
        {features.faqs.map((f, idx) => (
          <AccordionItem key={idx} value={`item-${idx}`}>
            <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
            <AccordionContent className="text-neutral-600">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </SectionWrap>
  );
}

export function FinalCTA() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const entry = { name, email, ts: Date.now() };
    const prev = JSON.parse(localStorage.getItem("eido_waitlist") || "[]");
    localStorage.setItem("eido_waitlist", JSON.stringify([entry, ...prev]));
    setName("");
    setEmail("");
    toast({ title: "You're on the list!", description: "We'll be in touch soon." });
  };

  return (
    <div id="cta" className="py-24 bg-gradient-to-b from-neutral-50 to-white">
      <SectionWrap>
        <div className="rounded-2xl border border-neutral-200 bg-white/70 backdrop-blur-xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />
          <h2 className="text-3xl md:text-5xl font-light tracking-tight">Elevate your education today</h2>
          <p className="mt-3 text-neutral-600 max-w-[52ch]">
            Join thousands of students studying smarter, not harder.
          </p>
          <form onSubmit={onSubmit} className="mt-8 flex flex-col md:flex-row gap-3">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="h-12"
              required
            />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="h-12"
              required
            />
            <Button type="submit" className="h-12 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25">
              Sign up for free
            </Button>
          </form>
          <div className="mt-3 text-xs text-neutral-500">We’ll never share your email.</div>
        </div>
      </SectionWrap>
    </div>
  );
}

export function Footer() {
  return (
    <footer id="contact" className="py-16 border-t border-neutral-200">
      <SectionWrap>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700" />
            <div>
              <div className="font-semibold">Eido AI</div>
              <div className="text-xs text-neutral-500">Your personal education copilot</div>
            </div>
          </div>
          <div className="text-sm text-neutral-600">© {new Date().getFullYear()} Eido AI. All rights reserved.</div>
        </div>
      </SectionWrap>
    </footer>
  );
}