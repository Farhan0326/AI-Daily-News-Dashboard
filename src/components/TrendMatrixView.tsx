import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Terminal, 
  MapPin, 
  GitBranch, 
  Check, 
  Minus,
  Sparkles
} from 'lucide-react';

export const TrendMatrixView: React.FC = () => {
  const codingToolsComparison = [
    {
      name: 'Cursor',
      type: 'Agentic Editor',
      localModelSupport: 'Yes (via Ollama/OpenAI spec)',
      multiFileEdit: 'Native (Composer)',
      terminalExecution: 'Semi-Autonomous',
      primaryStrength: 'Index caching & fast diff review',
      momentum: '+42% adoption'
    },
    {
      name: 'Windsurf (Codeium)',
      type: 'Cascade Agent IDE',
      localModelSupport: 'Cloud + Custom Endpoints',
      multiFileEdit: 'Autonomous Flow',
      terminalExecution: 'Native Shell Sandbox',
      primaryStrength: 'Supercomplete & real-time AST awareness',
      momentum: '+58% adoption'
    },
    {
      name: 'Cline / Roo-Code',
      type: 'Open-Source Extension',
      localModelSupport: 'Full Native (vLLM / LM Studio)',
      multiFileEdit: 'Autonomous Workspace Loop',
      terminalExecution: 'Full Headless Terminal',
      primaryStrength: 'Zero vendor lock-in & tool calling',
      momentum: '+120% GitHub stars'
    },
    {
      name: 'Devin (Cognition)',
      type: 'Autonomous Cloud Agent',
      localModelSupport: 'Cloud Sandbox Only',
      multiFileEdit: 'Full Repository Sync',
      terminalExecution: 'Dedicated Remote Container',
      primaryStrength: 'Long-horizon bug reproduction',
      momentum: 'Enterprise Pilots'
    },
  ];

  const openSourceWeightsComparison = [
    {
      name: 'DeepSeek-R1 / V3',
      developer: 'DeepSeek AI',
      parameters: '671B MoE (37B active)',
      contextWindow: '128K tokens',
      license: 'MIT (Permissive Open Weights)',
      codingSWEBench: '49.2% Verified',
      sweetSpot: 'Complex reasoning & distillation'
    },
    {
      name: 'Qwen 2.5-Coder',
      developer: 'Alibaba Cloud',
      parameters: '32B Dense / 14B Dense',
      contextWindow: '128K tokens',
      license: 'Apache 2.0',
      codingSWEBench: '45.8% Verified',
      sweetSpot: 'Single-GPU local IDE backend'
    },
    {
      name: 'Mistral Large 2',
      developer: 'Mistral AI',
      parameters: '123B Dense',
      contextWindow: '128K tokens',
      license: 'Mistral Research / Commercial',
      codingSWEBench: '44.0% Verified',
      sweetSpot: 'Multilingual codebase refactoring'
    },
    {
      name: 'Gemma 2 (27B)',
      developer: 'Google DeepMind',
      parameters: '27B Dense',
      contextWindow: '8K tokens',
      license: 'Gemma Open Terms',
      codingSWEBench: '41.2% Verified',
      sweetSpot: 'Extremely efficient inference latency'
    },
  ];

  const indianStartupEcosystem = [
    {
      name: 'Sarvam AI',
      headquarters: 'Bengaluru',
      focusArea: 'Indic Sovereign LLMs & Sub-cent Voice',
      languages: '10+ Indian Languages',
      keyMilestone: 'Custom tokenizers with 3.8x compression for Hindi, Tamil, Telugu',
      backer: 'Lightspeed India, Peak XV'
    },
    {
      name: 'Krutrim AI',
      headquarters: 'Bengaluru / Chennai',
      focusArea: 'Full-stack AI Cloud & Compute Silicon',
      languages: '22 Official Languages',
      keyMilestone: 'Domestic GPU clusters & localized API pricing tiers',
      backer: 'Ola Group, Matrix Partners'
    },
    {
      name: 'Project Bhashini',
      headquarters: 'New Delhi (MeitY)',
      focusArea: 'Public Digital Infrastructure (DPI) & Translation',
      languages: 'All Scheduled Languages',
      keyMilestone: 'Unified translation protocol for public services and banking apps',
      backer: 'Government of India / National Digital Mission'
    },
    {
      name: 'BharatGen',
      headquarters: 'IIT Bombay / Consortium',
      focusArea: 'Multimodal Academic & Enterprise Consortium',
      languages: 'Indic Multimodal',
      keyMilestone: 'Open dataset curation and public research foundation models',
      backer: 'DST & IndiaAI Mission'
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      {/* Top Banner */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
          <BarChart3 className="h-4 w-4" />
          <span>Longitudinal Intelligence Analysis</span>
          <span aria-hidden="true">·</span>
          <span>Updated Daily</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          AI Radar Trend Matrix
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Cross-cutting benchmarks, market dynamics, and technological inflection points across your three focal vectors.
        </p>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 shadow-sm">
          <div className="text-xs font-mono text-slate-400 mb-1">Open Weights vs Closed Gap</div>
          <div className="text-2xl font-bold font-mono text-cyan-400 tabular-nums">4.2%</div>
          <p className="text-xs text-slate-400 mt-1">Delta on SWE-bench Verified coding tests</p>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 shadow-sm">
          <div className="text-xs font-mono text-slate-400 mb-1">Indic Token Compression</div>
          <div className="text-2xl font-bold font-mono text-amber-400 tabular-nums">3.8x</div>
          <p className="text-xs text-slate-400 mt-1">Sarvam custom tokenizer vs vanilla BPE</p>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 shadow-sm">
          <div className="text-xs font-mono text-slate-400 mb-1">Local Inference Cost Reduction</div>
          <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">78.5%</div>
          <p className="text-xs text-slate-400 mt-1">Self-hosted vLLM vs Commercial API tokens</p>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 shadow-sm">
          <div className="text-xs font-mono text-slate-400 mb-1">Bengaluru GenAI VC Inflow</div>
          <div className="text-2xl font-bold font-mono text-purple-400 tabular-nums">$140M+</div>
          <p className="text-xs text-slate-400 mt-1">Deployed in Developer Tooling & Sovereign AI</p>
        </div>
      </div>

      {/* Trend 1: AI Coding Agent Architecture Comparison */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-cyan-400" />
            <h2 className="text-base font-bold text-white tracking-tight">
              Developer Tooling: Autonomous Agent Capabilities
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            SWE-bench & Terminal Execution Matrix
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono">
                <th className="py-2.5 px-3">Tool</th>
                <th className="py-2.5 px-3">Architecture</th>
                <th className="py-2.5 px-3">Local Model Support</th>
                <th className="py-2.5 px-3">Multi-File Edit</th>
                <th className="py-2.5 px-3">Primary Ergonomics</th>
                <th className="py-2.5 px-3 text-right">Momentum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {codingToolsComparison.map((tool, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-3 font-semibold text-white">{tool.name}</td>
                  <td className="py-3 px-3 font-mono text-slate-400">{tool.type}</td>
                  <td className="py-3 px-3">{tool.localModelSupport}</td>
                  <td className="py-3 px-3 text-cyan-300">{tool.multiFileEdit}</td>
                  <td className="py-3 px-3 text-slate-400">{tool.primaryStrength}</td>
                  <td className="py-3 px-3 text-right font-mono text-emerald-400 tabular-nums">{tool.momentum}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Trend 2: Open-Source Models Comparison */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white tracking-tight">
              Open Weights Frontier: Performance vs Hardware Efficiency
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Licensing & Context Metrics
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono">
                <th className="py-2.5 px-3">Model</th>
                <th className="py-2.5 px-3">Developer</th>
                <th className="py-2.5 px-3">Parameters</th>
                <th className="py-2.5 px-3">Context Window</th>
                <th className="py-2.5 px-3">License</th>
                <th className="py-2.5 px-3 text-right">SWE-bench Verified</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {openSourceWeightsComparison.map((model, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-3 font-semibold text-white">{model.name}</td>
                  <td className="py-3 px-3 text-slate-400">{model.developer}</td>
                  <td className="py-3 px-3 font-mono">{model.parameters}</td>
                  <td className="py-3 px-3 font-mono tabular-nums">{model.contextWindow}</td>
                  <td className="py-3 px-3 text-slate-400">{model.license}</td>
                  <td className="py-3 px-3 text-right font-mono text-cyan-400 tabular-nums font-semibold">{model.codingSWEBench}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Trend 3: Indian Foundational AI Ecosystem */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-amber-400" />
            <h2 className="text-base font-bold text-white tracking-tight">
              Indian Tech Innovation Corridor: Sovereign Models & Infrastructure
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Indic Languages & Compute
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono">
                <th className="py-2.5 px-3">Organization</th>
                <th className="py-2.5 px-3">Hub</th>
                <th className="py-2.5 px-3">Specialization</th>
                <th className="py-2.5 px-3">Language Scope</th>
                <th className="py-2.5 px-3">Key Breakthrough</th>
                <th className="py-2.5 px-3 text-right">Backers</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {indianStartupEcosystem.map((startup, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-3 font-semibold text-white">{startup.name}</td>
                  <td className="py-3 px-3 font-mono text-slate-400">{startup.headquarters}</td>
                  <td className="py-3 px-3 text-amber-300">{startup.focusArea}</td>
                  <td className="py-3 px-3 font-mono">{startup.languages}</td>
                  <td className="py-3 px-3 text-slate-300">{startup.keyMilestone}</td>
                  <td className="py-3 px-3 text-right text-slate-400 font-mono">{startup.backer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
