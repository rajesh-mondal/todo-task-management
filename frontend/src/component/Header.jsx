import { useState } from "react";

export default function Header() {
  const [greeting] = useState(() => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 12 && hour < 17) return "Noon";
    if (hour >= 17 && hour < 20) return "Evening";
    if (hour >= 20 || hour < 5) return "Night";
    return "Morning";
  });

  const [date] = useState(() => {
    const now = new Date();
    const options = { weekday: "long", month: "short", day: "numeric" };
    return now.toLocaleDateString("en-US", options);
  });

  return (
    <header className="border-b border-neutral-800 bg-linear-to-b from-neutral-950 via-neutral-900/80 to-transparent">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-400">
            To-Do List Management
          </p>

          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <h1 className="text-4xl font-semibold tracking-tight">
              Good {greeting}!
            </h1>

            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-800/80 bg-neutral-900/70 px-4 py-1 text-xs font-medium text-neutral-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              {date}
            </span>
          </div>

          <p className="text-sm text-neutral-400 max-w-2xl">
            Effortlessly Organize, Prioritize, and Conquer Tasks with Tasker -
            Your Personal Productivity Ally for Seamless Goal Achievement and
            Stress-Free Task Management.
          </p>
        </div>
      </div>
    </header>
  );
}
