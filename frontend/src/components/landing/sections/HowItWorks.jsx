import React from "react";
import { Card, CardContent } from "../../ui/card";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Paperclip } from "lucide-react";

// Helper component for Oracle/Answer messages
const AnswerBubble = ({ htmlContent }) => {
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
      className="shimmer-button self-start max-w-[90%] w-auto rounded-2xl border border-blue-400/30 bg-blue-950/40 p-4 text-sm text-neutral-200 shadow-sm"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

// Helper component for User/Question messages
const UserMessage = ({ text }) => (
  <div className="w-full flex justify-end">
    <p className="p-3 rounded-lg bg-neutral-800 border border-neutral-700 max-w-[80%]">
      {text}
    </p>
  </div>
);

// Component for the decorative background shapes
const ShapeDecorations = () => (
  <>
    {/* Tilted Square */}
    <svg
      viewBox="0 0 100 100"
      className="absolute w-[28rem] h-[28rem] text-black -left-40 top-10 transform -rotate-[30deg] z-0"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="10" y="10" width="80" height="80" stroke="currentColor" strokeWidth="8" />
    </svg>
    {/* Circle */}
    <svg
      viewBox="0 0 100 100"
      className="absolute w-[32rem] h-[32rem] text-black -top-32 -right-40 z-0"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" />
    </svg>
    {/* Triangle */}
    <svg
      viewBox="0 0 100 100"
      className="absolute w-[26rem] h-[26rem] text-black -bottom-32 right-16 z-0"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M50 10 L90 80 L10 80 Z" stroke="currentColor" strokeWidth="8" />
    </svg>
  </>
);


// Hard-coded data
const chatContent = [
    {
        type: "answer",
        html: `<strong>Direct Attacks on Domain Controllers:</strong> These can disrupt critical authentication and authorization services network-wide.`,
    },
    {
        type: "answer",
        html: `<strong>Upstream Infrastructure Attacks:</strong> Targeting related services like DNS can indirectly impact AD operations <span class="text-blue-400 font-medium">[Source 1]</span>, <span class="text-blue-400 font-medium">[Source 2]</span>.`,
    },
    {
        type: "question",
        text: "What are the different types of cloud delivery models?",
    },
    {
        type: "answer",
        html: `Key cloud models include:<br><br>
    1. <strong>IaaS (Infrastructure-as-a-Service):</strong> Provides raw infrastructure (servers, storage). You manage the OS and applications. Examples: AWS, Azure, Google Cloud <span class="text-blue-400 font-medium">[Source 3]</span>.<br><br>
    2. <strong>PaaS (Platform-as-a-Service):</strong> Offers a platform for development. The provider manages the infrastructure, while you provide the code. Examples: Azure, AWS, Google Cloud <span class="text-blue-400 font-medium">[Source 4]</span>.`,
    },
];

const sourcesData = [
  {
    id: 1,
    title: "L06_Active Directory.pdf (Page 4)",
    content:
      "Reduce attack surface: - Patch, patch, patch! - Deploy robust AV/antimalware software specific to AD protection, and configure it properly - Don’t run anything else on your domain controllers - Separate out domain administrator and other privileged access accounts AD Attack",
  },
  {
    id: 2,
    title: "itp457 - lesson 06 - Active Directory and GPOs - v2 20251.pdf (Page 21)",
    content: "Common Attack Vectors • Attacks against administrative hosts and accounts",
  },
];

export default function HowItWorks() {
  return (
    <div id="how" className="bg-gradient-to-b from-primary to-black pt-12 pb-24">
      <div className="mx-auto max-w-[1600px] px-12">
        <div className="grid grid-cols-5 gap-6">
          {/* Left Panel: Main container with new background shapes */}
          <div className="col-span-3 h-[500px] relative rounded-2xl border border-neutral-800 bg-neutral-900 overflow-hidden">
            <ShapeDecorations />
            
            {/* Inner, inset panel for the chatbot UI */}
            <div className="absolute top-12 bottom-12 left-16 right-16 z-10">
              <Card className="h-full w-full border border-white/10 bg-white/5 backdrop-blur-xl text-neutral-200 flex flex-col">
                <CardContent className="p-6 flex-grow overflow-y-auto no-scrollbar space-y-6 text-sm leading-relaxed">
                  {chatContent.map((item, index) =>
                    item.type === "question" ? (
                      <UserMessage key={index} text={item.text} />
                    ) : (
                      <AnswerBubble key={index} htmlContent={item.html} />
                    )
                  )}
                </CardContent>
                <div className="p-4 border-t border-white/10 flex items-center gap-3">
                  <Button variant="ghost" size="icon" className="text-neutral-400 hover:bg-white/10">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Input
                    placeholder="Ask about your documents, or attach a file..."
                    className="bg-neutral-900/50 border-neutral-600 text-base h-11"
                  />
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                    Send
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          {/* Right Panel: Sources UI */}
          <div className="col-span-2 h-[500px] flex flex-col gap-4">
            <Card className="flex-grow border border-white/10 bg-white/5 backdrop-blur-xl text-neutral-300 flex flex-col">
              <div className="p-3 border-b border-white/10">
                <h3 className="font-semibold text-base text-neutral-200">Sources</h3>
              </div>
              <CardContent className="p-3 pt-3 space-y-3 text-xs overflow-y-auto no-scrollbar">
                {sourcesData.map((source) => (
                  <div key={source.id} className="p-3 border border-neutral-700 rounded-lg bg-neutral-900/50">
                    <p className="font-semibold text-neutral-200">
                      Source {source.id}: {source.title}
                    </p>
                    <p className="mt-1 text-neutral-400">{source.content}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
                 <Card className="bg-neutral-900/50 border-neutral-700 text-neutral-300 p-3 text-xs">
                    <p className="font-semibold">L06_Active Directory.pdf</p>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-neutral-400">
                        <li>AD Attack/Defense - Part 2</li>
                        <li>Over-permissioning of attack paths</li>
                        <li>Common Attack Vectors</li>
                    </ul>
                 </Card>
                 <Card className="bg-neutral-900/50 border-neutral-700 text-neutral-300 p-3 text-xs">
                    <p className="font-semibold">itp457 - lesson 06 - Active Dire...</p>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-neutral-400">
                        <li>Common Attack Vectors</li>
                        <li>Attacks against administrative...</li>
                        <li>Attacks against regular users</li>
                    </ul>
                 </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}