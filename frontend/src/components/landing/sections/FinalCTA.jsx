import React, { useState } from "react";
import ShimmerButton from "../../ui/ShimmerButton";
import { Input } from "../../ui/input";
import { useToast } from "../../../hooks/use-toast";
import SectionWrap from "./SectionWrap";

export default function FinalCTA() {
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
    <div id="cta" className="py-24 bg-gradient-to-b from-black to-neutral-900">
      <SectionWrap>
        <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white">
            Transform your education, for <span className="underline">free</span>
          </h2>
          <p className="mt-3 text-neutral-400 max-w-[52ch]">
            Join thousands of students studying smarter, not harder.
          </p>
          <form onSubmit={onSubmit} className="mt-8 flex flex-col md:flex-row gap-3">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="h-12 bg-neutral-900 border-neutral-700 text-white"
              required
            />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="h-12 bg-neutral-900 border-neutral-700 text-white"
              required
            />
            <ShimmerButton 
              type="submit" 
              className="h-12 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/10"
            >
              Sign Up
            </ShimmerButton>
          </form>
           <div className="mt-3 text-xs text-neutral-500">We’ll never share your email.</div>
        </div>
      </SectionWrap>
    </div>
  );
}