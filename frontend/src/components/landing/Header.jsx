import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { NavigationMenu } from "../../components/ui/navigation-menu"; // eslint-disable-line

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[backdrop-filter,box-shadow,background-color] duration-300 ${
        scrolled ? "backdrop-blur-xl bg-white/70 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 shadow-md" />
          <span className="text-[18px] font-semibold tracking-tight">Eido AI</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-[14px]">
          {navItems.map((n) => (
            <button
              key={n.id}
              onClick={() => scrollTo(n.id)}
              className="text-neutral-700 hover:text-black transition-colors"
            >
              {n.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => scrollTo("cta")}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20"
          >
            Create your free account
          </Button>
        </div>
      </div>
    </header>
  );
}