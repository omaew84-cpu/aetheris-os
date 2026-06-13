import { useEffect, useState, useRef } from 'react'

type LogEntry = { ts: string; score: number; msg: string }
type RiskState = { app: number; net: number; perm: number; ads: number }

const STORAGE_KEY = 'aetheris_privacy_log_v6'

export default function PrivacySOC() {
  const [running, setRunning] = useState(true)
  const [risk, setRisk] = useState<RiskState>({ app: 0.3, net: 0.3, perm: 0.3, ads: 0.3 })
  const [score, setScore] = useState(72)
  const [log, setLog] = useState<LogEntry[]>(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch { return [] }
  })
  const scoreRef = useRef(score)
  scoreRef.current = score

  const analyze = (r: RiskState) => {
    const appRisk = r.app * 30
    const netRisk = r.net * 25
    const permRisk = r.perm * 25
    const adsRisk = r.ads * 20
    const raw = 100 - (appRisk + netRisk + permRisk + adsRisk)
    // EMA smoothing – ไม่แกว่งเหมือนตัว HTML เดิม
    const next = Math.round(scoreRef.current * 0.7 + raw * 0.3)
    setScore(next)
    return { appRisk, netRisk, permRisk, adsRisk, raw: next }
  }

  const aiExplain = (s: number) => {
    if (s > 80) return 'ระบบแยกตัวสูง พื้นผิวติดตามต่ำมาก'
    if (s > 60) return 'ความเป็นส่วนตัวระดับกลาง ยังมี tracking vector บางส่วน'
    if (s > 40) return 'ตรวจพบ tracking surface หลายจุด แนะนำ hardening'
    return 'เปิดเผยระดับวิกฤต อุปกรณ์ถูกติดตามได้ง่าย'
  }

  const getStatus = (s: number) => {
    if (s > 80) return { text: '🟢 SECURE', color: 'text-emerald-400' }
    if (s > 60) return { text: '🟡 STABLE', color: 'text-amber-400' }
    if (s > 40) return { text: '🟠 VULNERABLE', color: 'text-orange-400' }
    return { text: '🔴 CRITICAL', color: 'text-red-500' }
  }

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      // drift แบบนุ่ม ไม่สุ่มแรงเหมือนเวอร์ชัน HTML
      const drift = (v: number) => Math.max(0.05, Math.min(0.95, v + (Math.random() - 0.5) * 0.18))
      const nextRisk: RiskState = {
        app: drift(risk.app),
        net: drift(risk.net),
        perm: drift(risk.perm),
        ads: drift(risk.ads),
      }
      setRisk(nextRisk)
      const res = analyze(nextRisk)
      const entry: LogEntry = {
        ts: new Date().toLocaleTimeString('th-TH'),
        score: res.raw,
        msg: `AI cycle | score=${res.raw}`,
      }
      setLog(l => {
        const nl = [entry,...l].slice(0, 120)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nl))
        return nl
      })
    }, 3500)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, risk.app, risk.net, risk.perm, risk.ads])

  const appRisk = risk.app * 30
  const netRisk = risk.net * 25
  const permRisk = risk.perm * 25
  const adsRisk = risk.ads * 20
  const status = getStatus(score)

  const recs: string[] = []
  if (appRisk > 15) recs.push('AI: จำกัดแอปเสี่ยงสูง (background + data)')
  if (netRisk > 12) recs.push('AI: เปิด Encrypted DNS + VPN always-on')
  if (permRisk > 12) recs.push('AI: ลด permission อ่อนไหว (location/mic)')
  if (adsRisk > 10) recs.push('AI: รีเซ็ต Ads ID + ปิด personalization')
  if (recs.length === 0) recs.push('AI: ไม่พบรายการวิกฤต รักษาระดับปัจจุบัน')

  const exportCsv = () => {
    const rows = [['time', 'score', 'msg'],...log.map(e => [e.ts, String(e.score), e.msg])]
    const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `privacy-soc-log-${Date.now()}.csv`
    a.click()
  }

  const Card = ({ children, className = '' }: any) => (
    <div className={`bg-zinc-900/70 border border-zinc-800 rounded-2xl p-4 ${className}`}>{children}</div>
  )

  return (
    <div className="bg-black text-zinc-100 min-h-screen">
      <div className="max-w-xl mx-auto p-4 space-y-3">
        <div>
          <h1 className="text-xl font-bold">🧠🛡️ SOC v6 — AI Privacy System</h1>
          <p className="text-zinc-400 text-sm">Autonomous Privacy Intelligence Engine · AETHERIS OS Module</p>
        </div>

        <Card>
          <div className="text-sm text-zinc-400">AI Privacy Score</div>
          <div className="text-4xl font-bold text-emerald-400">{score}</div>
          <div className={`text-sm ${status.color}`}>{status.text}</div>
        </Card>

        <Card>
          <div className="font-semibold text-sm mb-1">AI Risk Interpretation</div>
          <div className="text-sm text-zinc-300">{aiExplain(score)}</div>
        </Card>

        <Card>
          <div className="space-y-1 text-sm font-mono">
            <div>📱 App Behavior Risk: {appRisk.toFixed(1)}</div>
            <div>🌐 Network Risk: {netRisk.toFixed(1)}</div>
            <div>🔐 Permission Exposure: {permRisk.toFixed(1)}</div>
            <div>🧲 Tracking Surface: {adsRisk.toFixed(1)}</div>
          </div>
        </Card>

        <Card>
          <div className="font-semibold text-sm mb-1">🧠 AI Recommendations</div>
          <div className="text-sm text-zinc-300 space-y-1">
            {recs.map((r, i) => <div key={i}>• {r}</div>)}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-bold">AI Event Log</div>
            <div className="flex gap-2">
              <button onClick={() => setRunning(!running)} className="text-xs px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700">
                {running? 'Pause' : 'Resume'}
              </button>
              <button onClick={exportCsv} className="text-xs px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-black font-semibold">
                Export CSV
              </button>
            </div>
          </div>
          <div className="h-48 overflow-auto text-xs text-zinc-400 font-mono space-y-1">
            {log.length === 0? <div>รอ AI cycle แรก...</div> : log.map((e, i) => (
              <div key={i}>[{e.ts}] {e.msg}</div>
            ))}
          </div>
        </Card>

        <div className="text-[11px] text-zinc-500 text-center pt-2">
          Privacy Shield · AETHERIS OS v0.9 · Pro Plan 1,490฿/ด
        </div>
      </div>
    </div>
  )
}
