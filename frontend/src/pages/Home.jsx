import React from "react";
import myImage from "./image/Screenshot 2025-09-17 091406.png";
import TypingCode from "./TypingCode"; // Adjust path if necessary
import "./TypingCode.css"; // Ensure you have the CSS for typing effect
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div className="container" style={{ width:"100vw"}}>
    <section className="grid grid-cols-3 gap-8 items-start" style={{ width:"100vw"}}>
      <div className="col-span-2" style={{ transform: `translateX(5rem)` }}>
        <h1 className="text-6xl font-extrabold leading-tight tracking-tight mt-6">
          Featuring New Technology{" "}
          <h1 className="text-transparent mt-4 bg-clip-text bg-gradient-to-r from-purple-400 to-violet-600">
            BlockID !
          </h1>
          
        </h1>
        {/* <pre className="mt-6 text-slate-400 text-lg max-w-xl"> LOL </pre> */}
        <div className="mt-8 flex items-center gap-4">
          <Link
            to="/dashboard"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-violet-500 font-semibold shadow-lg hover:scale-105 transform transition"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>

      <div className="col-span-1" style={{ transform: `translateX(-3rem)` }}>
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
      <br />
      <br />
      
    </section>
        <footer
          className="mt-16 py-8 px-6 rounded-xl bg-slate-900/80 text-white grid grid-cols-1 md:grid-cols-4 gap-8 shadow-lg"style={{width:"100vw"}}>
          <div>
            <img src={myImage} alt="BlockID logo" className="w-32 mb-4 rounded-xl" />
            <div className="font-bold text-xl mb-2">BlockID</div>
            <div className="text-slate-400 text-sm">Empowering identity with blockchain technology.</div>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-sky-400">Get to know us</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="#" className="hover:underline">About BlockID</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Press & News</a></li>
              <li><a href="#" className="hover:underline">BlockID Science</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-sky-400">Connect with us</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="#" className="hover:underline">Facebook</a></li>
              <li><a href="#" className="hover:underline">Twitter</a></li>
              <li><a href="#" className="hover:underline">Instagram</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-sky-400">Industry Solutions</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="#" className="hover:underline">Banking & Finance</a></li>
              <li><a href="#" className="hover:underline">Education</a></li>
              <li><a href="#" className="hover:underline">Technology</a></li>
              <li><a href="#" className="hover:underline">Medical</a></li>
              <li><a href="#" className="hover:underline">Government</a></li>
              <li><a href="#" className="hover:underline">Legal</a></li>
            </ul>
          </div>
        </footer>
      </div>
  );
}
