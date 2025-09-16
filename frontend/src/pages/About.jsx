import React from "react";
import TypingCode from "./TypingCode"; // Adjust path if necessary
import "./TypingCode.css"; // Ensure you have the CSS for typing effect
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <section className="grid grid-cols-3 gap-8 items-start">
      <div className="col-span-2">
        <h1 className="text-6xl font-extrabold leading-tight tracking-tight">
          Featuring New Technology{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-600">
            BlockID
          </span>
          !
        </h1>
        {/* <pre className="mt-6 text-slate-400 text-lg max-w-xl"> LOL </pre> */}
        <h2 className="mt-6 text-slate-400 text-lg max-w-xl">About Us</h2>
        <p className="mt-6 text-slate-400 text-lg max-w-xl">About content...</p>
      </div>

      <div className="col-span-1">
        <div
          className="rounded-3xl p-4"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
            boxShadow:
              "0 10px 40px rgba(124,58,237,0.35), inset 0 0 40px rgba(124,58,237,0.06)",
          }}
        >
          <div
            className="bg-black rounded-2xl p-6"
            style={{
              border: "6px solid rgba(124,58,237,0.12)",
              height: "33rem",
              widows: "468.800px",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="text-xs text-slate-500">Live Coding</div>
            </div>
            {/* Animated typing effect */}
            <TypingCode />
          </div>
        </div>
      </div>
    </section>
  );
}
