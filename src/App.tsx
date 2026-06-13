import { useState } from 'react'
import PrivacySOC from './components/PrivacySOC'

const Placeholder = ({ name, desc }: { name: string, desc: string }) => (
  <div className="max-w-xl mx-auto p-6">
    <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6">
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-zinc-400 text-sm mt-1">{desc}</p>
    </div>
  </div>
)

const tabs = [
  { id: 'c0', label: 'C0 Governance', comp: () => <Placeholder name="C0 Governance" desc="Policy Engine / PII / Risk Guardrails" /> },
  { id: 'r0', label: 'R0 Execution', comp: () => <Placeholder name="R0 Execution" desc="Task Runner / Queue / Rollback" /> },
  { id: 'e0', label: 'E0 Economics', comp: () => <Placeholder name="E0 Economics" desc="ROI Calculator" /> },
  { id: 'privacy', label: '🛡️ Privacy Shield', comp: PrivacySOC },
]

export default function App() {
  const [tab, setTab] = useState('privacy')
  const Active = tabs.find(t => t.id === tab)?.comp || PrivacySOC
  return (
    <div className="bg-black text-zinc-100 min-h-screen">
      <header className="border-b border-zinc-800 px-4 py-3 flex justify-between">
        <h1 className="font-bold">AETHERIS OS v0.9</h1>
        <div className="text-xs text-emerald-400">Pro 1,490฿/ด</div>
      </header>
      <nav className="flex gap-2 px-4 py-2 border-b border-zinc-800 overflow-x-auto">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap ${tab === t.id ? 'bg-emerald-600 text-black font-semibold' : 'bg-zinc-900 hover:bg-zinc-800'}`}>
            {t.label}
          </button>
        ))}
      </nav>
      <main><Active /></main>
    </div>
  )
}
