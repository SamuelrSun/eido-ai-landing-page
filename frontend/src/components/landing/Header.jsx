import React, { useEffect, useState } from "react";
import ShimmerButton from "../ui/ShimmerButton";
import { NavigationMenu } from "../ui/navigation-menu"; // eslint-disable-line

const navItems = [
  { id: "how", label: "How it works" },
  { id: "features", label: "Features" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-3 md:p-4 font-roboto">
      <div
        className={`relative mx-auto max-w-[1280px] flex items-center justify-between px-6 py-2 rounded-full border transition-all duration-300 ${
          scrolled
            ? "border-neutral-700/50 backdrop-blur-xl bg-gradient-to-b from-neutral-900/50 to-neutral-950/40 shadow-lg"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="flex items-center gap-3">
          <img src="/eido-icon.png" alt="Eido AI Logo" className="h-8 w-8 rounded-md" />
          <span className="text-[18px] font-semibold tracking-tight text-white">Eido AI</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navItems.map((n) => (
            <div key={n.id} className="flip-container" onClick={() => scrollTo(n.id)}>
              <button
                className="flipper text-neutral-300 hover:text-white transition-colors text-xs uppercase font-bold tracking-widest"
              >
                <span className="front">{n.label}</span>
                <span className="back">{n.label}</span>
              </button>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ShimmerButton
            onClick={() => scrollTo("cta")}
            variant="outline"
            className="border-neutral-400 text-neutral-200 hover:bg-blue-950/80 hover:border-blue-500 hover:text-neutral-100 rounded-full"
          >
            <span className="uppercase text-xs tracking-widest font-bold">
              Create your free account
            </span>
          </ShimmerButton>
        </div>
      </div>
    </header>
  );
}