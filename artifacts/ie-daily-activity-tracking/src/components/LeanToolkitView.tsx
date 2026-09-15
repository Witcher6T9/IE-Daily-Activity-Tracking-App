import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  ClipboardCheck,
  Gauge,
  GitBranch,
  Layers3,
  Lightbulb,
  ListChecks,
  MoveRight,
  RotateCcw,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  TimerReset,
  Wrench
} from 'lucide-react';

type ToolkitIcon = React.ComponentType<{ className?: string }>;

interface LeanTool {
  id: string;
  title: string;
  description: string;
  purpose: string;
  icon: ToolkitIcon;
  index: string;
  accent: string;
}

const LEAN_TOOLS: LeanTool[] = [
  {
    id: '5s-audit',
    title: '5S Audit',
    description: 'Workplace organisation scored by area',
    purpose: 'Create a consistent floor check for sort, set in order, shine, standardise, and sustain across each work area.',
    icon: ClipboardCheck,
    index: '01',
    accent: 'teal'
  },
  {
    id: '7-wastes',
    title: '7 Wastes',
    description: 'TIMWOOD+T observations and Pareto',
    purpose: 'Capture the waste seen during a production walk and surface the few causes creating the most lost time.',
    icon: BarChart3,
    index: '02',
    accent: 'orange'
  },
  {
    id: 'kaizen-pdca',
    title: 'Kaizen PDCA',
    description: 'Improvement cards across Plan-Do-Check-Act',
    purpose: 'Keep improvement work visible from the first idea through the check that proves the change on the floor.',
    icon: RotateCcw,
    index: '03',
    accent: 'gold'
  },
  {
    id: 'smed-changeover',
    title: 'SMED Changeover',
    description: 'Internal vs external style-change time',
    purpose: 'Separate internal and external changeover work to reveal practical minutes that can be recovered between styles.',
    icon: TimerReset,
    index: '04',
    accent: 'slate'
  },
  {
    id: 'takt-yamazumi',
    title: 'Takt & Yamazumi',
    description: 'Takt time vs operator load stacks',
    purpose: 'Compare station work content with takt and make uneven operator load easy to spot before it becomes a bottleneck.',
    icon: Activity,
    index: '05',
    accent: 'teal'
  },
  {
    id: 'andon-board',
    title: 'Andon Board',
    description: 'Live line calls for quality, machine, material',
    purpose: 'Give quality, machine, and material calls one visible place so the right response can start without delay.',
    icon: AlertTriangle,
    index: '06',
    accent: 'orange'
  },
  {
    id: 'oee-tpm',
    title: 'OEE / TPM',
    description: 'Availability × Performance × Quality',
    purpose: 'Frame equipment losses through availability, performance, and quality for a clearer maintenance conversation.',
    icon: Gauge,
    index: '07',
    accent: 'gold'
  },
  {
    id: 'a3-problem-solving',
    title: 'A3 Problem Solving',
    description: 'One-page root cause and countermeasures',
    purpose: 'Move from problem definition to root cause and countermeasure in one focused, reviewable problem-solving story.',
    icon: Layers3,
    index: '08',
    accent: 'slate'
  },
  {
    id: 'kanban-wip',
    title: 'Kanban / WIP',
    description: 'Pull system with WIP limits by process',
    purpose: 'Make work-in-process limits visible by process and support a steadier pull through the sewing floor.',
    icon: GitBranch,
    index: '09',
    accent: 'teal'
  },
  {
    id: 'gemba-walk',
    title: 'Gemba Walk',
    description: 'Go to the floor, record what you see',
    purpose: 'Turn direct floor observation into a concise record of what is really happening at the point of work.',
    icon: MoveRight,
    index: '10',
    accent: 'orange'
  },
  {
    id: 'standard-work',
    title: 'Standard Work',
    description: 'Cycle, walk, wait vs takt',
    purpose: 'Compare cycle, walk, and wait against takt to make the current method and its gaps visible.',
    icon: ListChecks,
    index: '11',
    accent: 'gold'
  },
  {
    id: 'poka-yoke',
    title: 'Poka-Yoke',
    description: 'Error-proofing registry by station',
    purpose: 'Keep error-proofing methods connected to the station where they protect quality every day.',
    icon: ShieldCheck,
    index: '12',
    accent: 'slate'
  }
];

const ACCENT_STYLES: Record<string, { icon: string; marker: string; wash: string }> = {
  teal: {
    icon: 'bg-[#dceceb] text-[#176f78]',
    marker: 'bg-[#176f78]',
    wash: 'group-hover:bg-[#f0f8f6]'
  },
  orange: {
    icon: 'bg-[#f8e5d7] text-[#b85f2b]',
    marker: 'bg-[#e6813e]',
    wash: 'group-hover:bg-[#fff7f1]'
  },
  gold: {
    icon: 'bg-[#f5e9c8] text-[#926a1f]',
    marker: 'bg-[#c9982f]',
    wash: 'group-hover:bg-[#fffbef]'
  },
  slate: {
    icon: 'bg-[#e5eaeb] text-[#3f5a60]',
    marker: 'bg-[#527078]',
    wash: 'group-hover:bg-[#f5f8f8]'
  }
};

export const LeanToolkitView: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<LeanTool | null>(null);

  return (
    <section className="min-h-[calc(100dvh-72px)] px-3 py-5 sm:px-5 sm:py-7 lg:px-8" data-testid="page-lean-toolkit">
      <div className="mx-auto max-w-[1320px]">
        <div className="surface-grid relative overflow-hidden rounded-[1.6rem] border border-[#d9d2c2] bg-[#f1eee6] px-4 py-5 shadow-[0_10px_36px_rgba(23,52,58,0.06)] sm:px-7 sm:py-7 lg:px-9">
          <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full border-[22px] border-[#e6813e]/10" />
          <div className="pointer-events-none absolute right-12 top-12 hidden h-24 w-24 rounded-full border border-[#176f78]/10 sm:block" />
          <div className="relative flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#176f78]" data-testid="text-lean-kicker">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span>Floor methods / IE toolkit</span>
              </div>
              <h1 className="font-display text-[2.55rem] font-bold uppercase leading-[0.88] tracking-[-0.02em] text-[#17343a] sm:text-5xl" data-testid="text-lean-title">
                Lean Toolkit
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[#527078] sm:text-[15px]" data-testid="text-lean-intro">
                Twelve practical methods for the production walk — built to keep the next action clear at the point of work.
              </p>
            </div>
            <div className="flex items-center gap-3 self-start rounded-xl border border-[#d9d2c2] bg-[#fbfaf6]/80 px-3 py-2 md:self-end" data-testid="status-lean-toolkit">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e6813e]/50" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#e6813e]" />
              </span>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#527078]">12 methods / ready to map</span>
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" data-testid="lean-toolkit-grid">
          {LEAN_TOOLS.map((tool, index) => {
            const Icon = tool.icon;
            const accent = ACCENT_STYLES[tool.accent];
            return (
              <button
                key={tool.id}
                type="button"
                onClick={() => setSelectedTool(tool)}
                data-testid={`lean-tool-card-${tool.id}`}
                aria-label={`Open ${tool.title}`}
                className={`group animate-rise-in relative flex min-h-[166px] flex-col overflow-hidden rounded-2xl border border-[#d9d2c2] bg-[#fbfaf6] p-4 text-left shadow-[0_4px_14px_rgba(23,52,58,0.045)] transition-all duration-200 hover:-translate-y-1 hover:border-[#8bb7b7] hover:shadow-[0_12px_24px_rgba(23,52,58,0.11)] active:translate-y-0 ${accent.wash}`}
                style={{ animationDelay: `${index * 45}ms` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${accent.icon}`}>
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                  </span>
                  <span className="font-mono text-[10px] font-semibold tracking-[0.16em] text-[#9aa9a9]">{tool.index}</span>
                </div>
                <div className="mt-5 flex flex-1 flex-col">
                  <h2 className="font-display text-[1.35rem] font-bold uppercase leading-none tracking-tight text-[#17343a]" data-testid={`text-lean-tool-title-${tool.id}`}>
                    {tool.title}
                  </h2>
                  <p className="mt-2 text-[12px] leading-[1.45] text-[#527078]" data-testid={`text-lean-tool-description-${tool.id}`}>
                    {tool.description}
                  </p>
                </div>
                <span className="mt-3 flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#176f78] opacity-70 transition-opacity group-hover:opacity-100">
                  View method <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
                <span className={`absolute bottom-0 left-0 h-1 w-12 rounded-r-full ${accent.marker} transition-all duration-200 group-hover:w-20`} />
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex items-center gap-2 px-1 text-[11px] text-[#527078]" data-testid="text-lean-footer-note">
          <Wrench className="h-3.5 w-3.5 text-[#e6813e]" />
          <span>Select a method to see its working purpose. Tool workflows will be connected in a future release.</span>
        </div>
      </div>

      {selectedTool && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-[#17343a]/35 p-3 backdrop-blur-[2px] sm:items-center sm:p-5"
          role="presentation"
          onMouseDown={event => {
            if (event.target === event.currentTarget) setSelectedTool(null);
          }}
          data-testid="lean-tool-detail-backdrop"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lean-tool-detail-title"
            className="animate-rise-in w-full max-w-md overflow-hidden rounded-[1.4rem] border border-[#d9d2c2] bg-[#fbfaf6] shadow-[0_24px_70px_rgba(23,52,58,0.24)]"
            data-testid={`lean-tool-detail-${selectedTool.id}`}
          >
            <div className="flex items-start justify-between border-b border-[#e7e1d5] bg-[#f1eee6] px-5 py-4">
              <div className="flex items-center gap-3">
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${ACCENT_STYLES[selectedTool.accent].icon}`}>
                  {React.createElement(selectedTool.icon, { className: 'h-[18px] w-[18px]' })}
                </span>
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#527078]">Lean method {selectedTool.index}</p>
                  <h2 id="lean-tool-detail-title" className="mt-1 font-display text-2xl font-bold uppercase leading-none text-[#17343a]" data-testid="text-lean-detail-title">
                    {selectedTool.title}
                  </h2>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTool(null)}
                aria-label="Close lean tool detail"
                data-testid="button-close-lean-tool-detail"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-xl leading-none text-[#527078] hover:bg-[#dceceb] hover:text-[#176f78]"
              >
                ×
              </button>
            </div>
            <div className="px-5 py-5">
              <p className="text-sm font-semibold leading-5 text-[#17343a]" data-testid="text-lean-detail-description">
                {selectedTool.description}
              </p>
              <div className="mt-4 rounded-xl border border-[#d9d2c2] bg-[#f7f5ef] p-3.5">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#176f78]">
                  <Lightbulb className="h-3.5 w-3.5" />
                  Purpose
                </div>
                <p className="mt-2 text-[13px] leading-5 text-[#527078]" data-testid="text-lean-detail-purpose">
                  {selectedTool.purpose}
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between rounded-xl border border-dashed border-[#d9d2c2] px-3.5 py-3" data-testid="status-lean-tool-coming-soon">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#e6813e]" />
                  <span className="text-xs font-bold text-[#17343a]">Coming soon</span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#9aa9a9]">Workflow not connected</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};