import React from "react";
import { Card, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { features } from "../../../mock/mock";
import {
  MessageSquare,
  Calendar as CalendarIcon,
  Chrome,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import SectionWrap from "./SectionWrap";

export default function Features() {
  const times = Array.from({ length: 10 }, (_, i) => `${i + 7 < 12 ? i + 7 : (i + 7) % 12 || 12} ${i + 7 < 12 ? 'AM' : 'PM'}`);
  const days = ["Sun 10", "Mon 11", "Tue 12", "Wed 13", "Thu 14", "Fri 15", "Sat 16"];
  return (
    <div id="features" className="py-24 bg-gradient-to-b from-black to-neutral-900">
      <SectionWrap>
        {/* Oracle */}
        <div className="grid md:grid-cols-2 gap-12 items-stretch">
          <div>
            <h3 className="text-2xl md:text-4xl font-light tracking-tight text-white">
              {features.oracle.title}
            </h3>
            <p className="mt-4 text-neutral-400">{features.oracle.subtitle}</p>
            <div className="mt-6 grid gap-4">
              <div className="rounded-xl border border-neutral-800 p-4 bg-neutral-950">
                <div className="text-xs uppercase text-neutral-400">Generic AI</div>
                <p className="mt-2 text-neutral-300">{features.oracle.genericExample}</p>
              </div>
              <div className="rounded-xl border border-blue-400/30 p-4 bg-gradient-to-b from-blue-950/50 to-neutral-950">
                <div className="text-xs uppercase text-blue-400 font-semibold">Oracle (Cited)</div>
                <p className="mt-2 text-neutral-200">{features.oracle.oracleExample}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {features.oracle.citations.map((c, i) => (
                    <Badge key={i} variant="secondary" className="bg-white/10 border-none text-neutral-200">
                      <ShieldCheck size={14} className="mr-1 text-blue-400" /> {c.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <Card className="h-full border-neutral-800 bg-white/5 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <MessageSquare size={18} className="text-blue-400" />
                  <div className="text-sm font-semibold text-white">Oracle Knowledge Base</div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  {["Slides", "Notes", "Assignments", "Readings"].map((t) => (
                    <div key={t} className="rounded-lg border border-neutral-800 p-3 bg-neutral-900 text-neutral-300">
                      {t}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Calendar */}
        <div className="mt-24 grid md:grid-cols-2 gap-12 items-stretch">
          <div className="h-full">
            <div className="h-full flex flex-col border border-neutral-800 rounded-xl bg-neutral-950/50">
              <div className="flex items-center justify-between p-4 border-b border-neutral-800">
                <div className="flex items-center gap-4">
                  <h4 className="font-semibold text-white text-sm">Aug 10 - Aug 16, 2025</h4>
                  <div className="flex items-center gap-2 text-neutral-400">
                    <button className="hover:text-white"><ChevronLeft size={16}/></button>
                    <button className="hover:text-white"><ChevronRight size={16}/></button>
                  </div>
                  <button className="text-xs font-semibold border border-neutral-700 rounded-md px-3 py-1 hover:bg-neutral-800 text-neutral-200">Today</button>
                </div>
                <div className="flex items-center text-xs font-semibold border border-neutral-800 rounded-md">
                   <button className="px-3 py-1 text-neutral-400 hover:bg-neutral-800 rounded-l-md">Day</button>
                   <button className="px-3 py-1 text-white bg-neutral-800 border-x border-neutral-700">Week</button>
                   <button className="px-3 py-1 text-neutral-400 hover:bg-neutral-800 rounded-r-md">Month</button>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] text-xs text-neutral-400 relative">
                <div className="row-start-2 pr-2 text-right">
                  {times.map(t => <div key={t} className="h-9 -mt-2">{t}</div>)}
                </div>
                <div className="col-start-2 grid grid-cols-7">
                   {days.map((d, i) => <div key={i} className={`p-2 text-center border-b border-l border-neutral-800 ${i === 0 ? 'border-l-0' : ''}`}>
                    <span className="text-white">{d.split(' ')[0]}</span>
                    <div className={`mt-1 h-7 w-7 flex items-center justify-center rounded-full mx-auto ${d.includes('12') ? 'bg-blue-600 text-white' : 'text-neutral-200'}`}>{d.split(' ')[1]}</div>
                   </div>)}
                </div>
                <div className="col-start-2 row-start-2 grid grid-cols-7 grid-rows-10 border-t border-neutral-800">
                  {Array.from({ length: 70 }).map((_, i) => <div key={i} className={`border-r border-b border-neutral-800 ${ (i + 1) % 7 === 0 ? 'border-r-0' : '' }`}></div>)}
                  <div className="absolute inset-0 grid grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
                    <div className="col-start-2 row-start-2 grid grid-cols-7 grid-rows-10">
                        <div className="col-start-2 row-start-3 row-span-2 bg-blue-900/70 border border-blue-500 rounded-lg p-2 overflow-hidden">
                        <p className="text-white font-semibold">Midterm Review</p>
                        <p className="text-blue-200">Biology 101</p>
                      </div>
                       <div className="col-start-4 row-start-5 row-span-1 bg-green-900/70 border border-green-500 rounded-lg p-2">
                        <p className="text-white font-semibold">Problem Set 3 Due</p>
                       </div>
                       <div className="col-start-6 row-start-7 row-span-2 bg-purple-900/70 border border-purple-500 rounded-lg p-2 overflow-hidden">
                        <p className="text-white font-semibold">Project Meeting</p>
                        <p className="text-purple-200">CS Capstone</p>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-2xl md:text-4xl font-light tracking-tight text-white">
              {features.calendar.title}
            </h3>
            <p className="mt-4 text-neutral-400">{features.calendar.subtitle}</p>
            <Card className="mt-6 border-neutral-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                   <CalendarIcon size={18} className="text-blue-400" />
                  <div className="text-sm font-semibold text-white">Auto-Populated Calendar</div>
                </div>
                <div className="mt-4 grid gap-3">
                  {features.calendar.sampleDates.map((d, i) => (
                     <div key={i} className="flex items-center justify-between rounded-lg border border-neutral-800 p-3 bg-neutral-950">
                      <span className="font-medium text-neutral-200">{d.label}</span>
                      <span className="text-blue-400 font-semibold">{d.date}</span>
                    </div>
                   ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Extension */}
        <div className="mt-24 grid md:grid-cols-2 gap-12 items-center">
           <div>
            <h3 className="text-2xl md:text-4xl font-light tracking-tight text-white">
              {features.extension.title}
            </h3>
            <p className="mt-4 text-neutral-400">{features.extension.subtitle}</p>
            <div className="mt-6 flex items-center gap-3 text-sm text-neutral-400">
              <Chrome className="text-blue-400" size={18} /> Chrome Extension (placeholder)
            </div>
          </div>
          <div>
            <Card className="border-neutral-800 bg-white/5 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="rounded-xl border border-neutral-800 p-4 bg-neutral-950">
                  <div className="text-sm font-semibold text-white">Browser Toolbar</div>
                  <div className="mt-3 h-10 rounded-md bg-neutral-900 border border-neutral-800 flex items-center px-3 gap-2">
                    <img src="/eido-icon.png" alt="Eido AI Logo" className="h-6 w-6 rounded-md" />
                    <span className="text-sm text-neutral-400">Oracle Quick Ask…</span>
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