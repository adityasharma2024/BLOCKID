import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="grid grid-cols-3 gap-8 items-start">
      <div className="col-span-2">
        <h1 className="text-6xl font-extrabold leading-tight tracking-tight">
          Be a part of our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-600">Army</span>!
        </h1>
        <p className="mt-6 text-slate-400 text-lg max-w-xl">A community of coders, making the world a better place. Learn, build, and grow with the best developers in the industry.</p>
        <div className="mt-8 flex items-center gap-4">
          <Link to="/dashboard" className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-violet-500 font-semibold shadow-lg hover:scale-105 transform transition">Go to Dashboard</Link>
          <button className="px-5 py-3 rounded-xl bg-slate-800/40 border border-slate-700 hover:bg-slate-800">Watch Demo</button>
        </div>
      </div>

      <div className="col-span-1">
        <div className="rounded-3xl p-4" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))", boxShadow: "0 10px 40px rgba(124,58,237,0.35), inset 0 0 40px rgba(124,58,237,0.06)" }}>
          <div className="bg-black rounded-2xl p-6" style={{ border: "6px solid rgba(124,58,237,0.12)" }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="text-xs text-slate-500">Live Coding</div>
            </div>
            <pre className="text-xs leading-6" style={{ color: "#66ffe6", fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, 'Roboto Mono', monospace" }}>
{`// BlockID demo code snippet
void startCoding() {
  // welcome
}`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}
