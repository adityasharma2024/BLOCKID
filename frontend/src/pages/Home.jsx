import React from "react";
import myImage from "./image/Screenshot 2025-09-17 091406.png";
import TypingCode from "./TypingCode"; // Adjust path if necessary
import "./TypingCode.css"; // Ensure you have the CSS for typing effect
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div className="container" style={{ width:"100vw"}}>
    <section className="grid grid-cols-3 gap-8 items-start" style={{}}>
      <div className="col-span-2" style={{ transform: `translateX(5rem)` }}>
        <h1 className="text-6xl font-extrabold leading-tight tracking-tight">
          Featuring New Technology{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-600">
            BlockID
          </span>
          !
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
        style={{
          bottom: "0",
          gridColumn: "1 / span 3",
          marginTop: "2rem",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          display: "flex",
          justifyContent: "space-between",
          padding: "1.5rem 2rem",
          borderRadius: "1rem",
          gap: "2rem",
          flexWrap: "wrap",
          alignItems: "flex-start", // Align columns from top
          width: "100vh",
        }}
      >
        <div className="image">
          <img src={myImage} alt="image" />
        </div>
        {[
          // Map over to avoid repetitive JSX if preferred, shown as literal for clarity
          {
            title: "Get to know us",
            links: [
              "About BlockId",
              "Careers",
              "Press news-releases",
              "BlockId science",
            ],
          },
          {
            title: "Connect with us",
            links: ["Facebook", "Twitter", "Instagram"],
          },
          {
            title: "Let Us Help You",
            links: ["Your Account", "BlockId App Download", "Help"],
          },
          {
            title: "Industry Solutions",
            links: [
              " Banking & Finance",
              " Education",
              "Technology",
              "Medical",
              "Government",
              "Legal",
            ],
          },
        ].map(({ title, links }, idx) => (
          <div
            key={idx}
            className="links"
            style={{ flex: "1 1 30%", minWidth: "250px" }}
          >
            <h3
              style={{
                color: "white",
                marginBottom: "1rem",
                textAlign: "left",
              }}
            >
              {title}
            </h3>
            {links.map((link, i) => (
              <div key={i} className="op" style={{ marginBottom: "0.5rem" }}>
                <a
                  href="#"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    display: "block",
                    textAlign: "left",
                  }}
                >
                  {link}
                </a>
              </div>
            ))}
          </div>
        ))}
      </footer>
      </div>
  );
}
