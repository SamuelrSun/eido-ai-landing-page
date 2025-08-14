import React from "react";
import SectionWrap from "./SectionWrap";

export default function Footer() {
  return (
    <footer id="contact" className="py-16 bg-gradient-to-b from-neutral-900 to-black">
      <SectionWrap>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/eido-icon.png" alt="Eido AI Logo" className="h-8 w-8 rounded-md" />
            <div>
              <div className="font-semibold text-white">Eido AI</div>
              <div className="text-xs text-neutral-400">Your personal education copilot</div>
            </div>
          </div>
          <div className="text-sm text-neutral-400">© 2025 Eido AI. All rights reserved.</div>
        </div>
      </SectionWrap>
    </footer>
  );
}