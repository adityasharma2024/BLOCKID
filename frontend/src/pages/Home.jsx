import React from "react";
import myImage from "./image/Screenshot 2025-09-17 091406.png";
import "./footer.css"; // Ensure you have the CSS for typing effect
import TypingCode from "./TypingCode"; // Adjust path if necessary
import "./TypingCode.css"; // Ensure you have the CSS for typing effect
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <main style={{}}>
        {/*part-1*/}
        <div className="flex justify-between" style={{}}>
          {/* OTHER THINGS */}
          <div
            className="col-span-1"
            style={{ transform: "translateX(5rem)", width: "" }}
          >
            <h1 className="text-6xl font-extrabold leading-tight tracking-tight mt-6">
              Featuring New Technology{" "}
              <span className="text-transparent mt-4 bg-clip-text bg-gradient-to-r from-purple-400 to-violet-600 block">
                BlockID !
              </span>
            </h1>
            <br />
            <section
              className="bg-gradient-to-r from-violet-100 to-purple-50 rounded-xl mb-8 shadow-lg border border-violet-200"
              style={{ padding: "1.5rem", marginRight: "2rem", width: "800px" }}
            >
              <h2 className="text-4xl font-bold text-violet-700 mb-2 flex items-center gap-2">
                🌐 Evault (BLOCK ID)
              </h2>
              <p className="text-xl text-slate-700 mb-4">
                A Blockchain-based Unified Digital ID for Lifetime Record
                Management
              </p>
              <h3 className="text-2xl font-semibold text-violet-800 mb-2">
                One ID. Lifetime Trust.
              </h3>
              <p className="text-lg text-slate-700 mb-4">
                Evault (BLOCK ID) is a blockchain-powered digital identity
                platform that secures your education, healthcare, financial, and
                government records for life.
              </p>
              <ul className="flex flex-wrap gap-4 mb-4">
                <li className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                  ✅ Tamper-proof
                </li>
                <li className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-semibold">
                  ✅ Fraud-resistant
                </li>
                <li className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
                  ✅ Globally verifiable
                </li>
              </ul>
              <div className="flex gap-4 mt-4">
                <Link
                  to="/dashboard"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-violet-500 font-semibold shadow-lg hover:scale-105 transform transition"
                >
                  Get Started
                </Link>
                <Link
                  to="/about"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 font-semibold shadow-lg hover:scale-105 transform transition"
                >
                  Learn More
                </Link>
              </div>
            </section>
          </div>

          {/* ANIMATION DIV */}
          <div
            className="col-span-2"
            style={{
              transform: "translateX(-3rem)",
              marginLeft: "80px",
              width: "",
            }}
          >
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
                  width: "420.8px", // fixed property name and value
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
        </div>
        <br />
        {/*part-2*/}
        <div
          className="flex flex-row gap-8 justify-evenly items-stretch mb-8"
          style={{ width: "" }}
        >
          {/* About BLOCK ID */}
          <div
            className="flex-grow w-[220px] p-6 rounded-xl bg-gradient-to-r from-violet-50 to-purple-100 shadow border border-violet-100 flex flex-col"
            style={{ marginLeft: "5rem" }}
          >
            <h3 className="text-2xl font-bold text-violet-700 mb-2">
              About BLOCK ID
            </h3>
            <p className="text-lg text-slate-700 mb-4">
              Your identity should be secure, simple, and lifelong. With BLOCK
              ID, every citizen gets a unique blockchain-based ID, assigned at
              birth and valid for a lifetime. This ID ensures:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Verified education certificates.</li>
              <li>Secure medical history.</li>
              <li>Seamless financial KYC.</li>
              <li>Transparent access to welfare schemes.</li>
            </ul>
          </div>
          {/* Key Features */}
          <div
            className="flex-grow w-[220px] p-6 rounded-xl bg-gradient-to-r from-violet-50 to-purple-100 shadow border border-violet-100 flex flex-col"
            style={{ margin: "" }}
          >
            <h3 className="text-2xl font-bold text-violet-700 mb-4">
              Key Features
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-700">
              <li>
                🔐 <b>Blockchain Security</b> → Decentralized, tamper-proof
                ledger.
              </li>
              <li>
                📜 <b>Immutable Records</b> → Degrees, medical reports, and
                financial data secured forever.
              </li>
              <li>
                🌍 <b>Global Access</b> → Carry your verified digital identity
                anywhere.
              </li>
              <li>
                ⚡ <b>Smart Contracts</b> → Automated certificate issuance &
                record updates.
              </li>
              <li>
                🛡 <b>Privacy First</b> → Encrypted, accessible only with
                authorized keys.
              </li>
            </ul>
          </div>
          {/* How It Works */}
          <div
            className="flex-grow w-[220px] p-6 rounded-xl bg-gradient-to-r from-violet-50 to-purple-100 shadow border border-violet-100 flex flex-col"
            style={{ marginRight: "3rem" }}
          >
            <h3 className="text-2xl font-bold text-violet-700 mb-4">
              How It Works
            </h3>
            <ol className="list-decimal pl-6 text-slate-700 space-y-2">
              <li>Birth Registration → Unique blockchain ID assigned.</li>
              <li>
                Education Records → Schools & universities upload certificates.
              </li>
              <li>
                Healthcare Records → Hospitals update medical history securely.
              </li>
              <li>
                Finance & Governance → Banks & govt agencies link services.
              </li>
              <li>
                Verification → Scan QR / blockchain explorer to validate records
                instantly.
              </li>
            </ol>
          </div>
        </div>
        {/*part-3*/}
        <div
          className="flex flex-row gap-4 justify-evenly items-stretch mb-8"
          style={{ marginLeft: "5rem", marginRight: "3rem" }}
        >
          <div className="mb-8 w-full p-6 rounded-xl bg-gradient-to-r from-violet-50 to-purple-100 shadow border border-violet-100">
            <h3 className="text-2xl font-bold text-violet-700 mb-4">
              Why BLOCK ID?
            </h3>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>✔ Eliminates fake certificates & ghost beneficiaries.</li>
              <li>✔ Protects from identity theft & record tampering.</li>
              <li>
                ✔ One digital ID for a lifetime → secure, transparent, scalable.
              </li>
              <li>✔ Aligned with Digital India & India Stack vision.</li>
            </ul>
          </div>

          <div className="mb-8  w-full p-6 rounded-xl bg-white/80 shadow border border-slate-200 text-center">
            <h3 className="text-2xl font-bold text-violet-700 mb-2">
              Ready to step into a secure digital future?
            </h3>
            <p className="text-lg text-slate-700 mb-4">
              With BLOCK ID, your identity is for life, on blockchain.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/beta"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-400 to-blue-500 font-semibold shadow-lg hover:scale-105 transform transition"
              >
                Join the Beta
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-violet-500 font-semibold shadow-lg hover:scale-105 transform transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer class="academic-footer">
        <div class="footer-top" style={{marginBottom:" "}}>
          <p class="footer-title" >
            <span>
              🚀 Revolutionary Blockchain-Based Academic Certificate Issuence
              and Verification System
            </span>
          </p>
          <p class="footer-desc">
            Ensuring authenticity, preventing fraud, and providing tamper-proof
            verification through cutting-edge unique NFT technology and smart
            contract innovation.
          </p>
          <div class="footer-icons">
            <span>⚡ Instant Verification</span>
            <span>🛡 Tamper-Proof Security</span>
            <span>🌎 Global Accessibility</span>
          </div>
        </div>
        <div class="footer-middle">
          <div class="footer-col">
            <h1>🏦SUST</h1>
            <h6 style={{ marginLeft: "10px" }}> E-Certificate System</h6>
            <p style={{ marginTop: "10px" }}>
              This system utilizes blockchain technology to ensure the
              authenticity and integrity of academic certificates by providing
              permanent verification and preventing fraud.
            </p>
          </div>
          <div class="footer-col quick-links">
            <h4 style={{ marginLeft: "100px" }}>Quick Links</h4>
            <ul>
              <li>
                <a href="#" style={{ marginLeft: "100px" }}>
                  🔐 Admin Portal
                </a>
              </li>
              <li>
                <a href="#" style={{ marginLeft: "100px" }}>
                  🎓 Student Portal
                </a>
              </li>
              <li>
                <a href="#" style={{ marginLeft: "100px" }}>
                  ✅ Verify Certificate
                </a>
              </li>
            </ul>
          </div>
          <div class="footer-col" style={{ display: "" }}>
            <h4 style={{ marginLeft: "100px" }}>Technology</h4>
            <ul>
              <li style={{ marginLeft: "100px" }}>⚡ Blockchain Powered</li>
              <li style={{ marginLeft: "100px" }}>🛡️ NFT Certificates</li>
              <li style={{ marginLeft: "100px" }}>🔒 Tamper Proof</li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <div style={{ marginLeft: "10px" }}>
            <p>
              <h1>© 2025 Block Id.</h1>
              <h1>All rights reserved.</h1>
            </p>
          </div>
          <div id="item">
            <div>
              <h5>Powered by </h5>
              <h1>🦊MetaMask</h1>
            </div>
            <div style={{ marginLeft: "30px" }}>
              <h5>Built on</h5>
              <h1>⚡Ethereum</h1>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
