import React, { useState, useEffect } from "react";
import "./TypingCode.css";

const codeString = ` 
  BlockID demo code snippet
  void startCoding() {
  welcome
  void calculate_hash(char *output, const char *input) {
    In a real project, this would be a SHA-256 hash 
    function.
    Here, we just use a simple mock to produce a "hash".
    sprintf(output, "mock_hash_%ld", time(NULL));
  }

  
  Block structure
  typedef struct Block {
      int index;
      long timestamp;
      char data[256];
      char previous_hash[65];
      char hash[65];
      int nonce;
      struct Block *next;
  } Block;`;

const COLORS = ["color1", "color2", "color3"];
const lines = codeString.split("\n");

export default function TypingCode() {
  const [displayLines, setDisplayLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [direction, setDirection] = useState("down");
  const [colorIdx, setColorIdx] = useState(0);

  useEffect(() => {
    let timeout;

    if (direction === "down") {
      if (currentLineIndex < lines.length) {
        const line = lines[currentLineIndex];
        if (currentCharIndex <= line.length) {
          timeout = setTimeout(() => {
            setDisplayLines((prev) => {
              const updated = [...prev];
              updated[currentLineIndex] = line.slice(0, currentCharIndex);
              return updated;
            });
            setCurrentCharIndex((ch) => ch + 1);
          }, 10); // typing speed per character
        } else {
          timeout = setTimeout(() => {
            setCurrentLineIndex((line) => line + 1);
            setCurrentCharIndex(0);
          }, 200); // pause before next line
        }
      } else {
        // Switch to erasing
        timeout = setTimeout(() => {
          setDirection("up");
          setCurrentLineIndex(lines.length - 1);
          setCurrentCharIndex(lines[lines.length - 1].length);
        }, 500);
      }
    } else if (direction === "up") {
      if (currentLineIndex >= 0) {
        if (currentCharIndex > 0) {
          timeout = setTimeout(() => {
            setDisplayLines((prev) => {
              const updated = [...prev];
              updated[currentLineIndex] = updated[currentLineIndex].slice(
                0,
                -1
              );
              return updated;
            });
            setCurrentCharIndex((ch) => ch - 1);
          }, 10); // erase speed per character
        } else {
          timeout = setTimeout(() => {
            setCurrentLineIndex((line) => line - 1);
            setCurrentCharIndex(
              currentLineIndex - 1 >= 0 ? lines[currentLineIndex - 1].length : 0
            );
          }, 100); // pause between lines erasing
        }
      } else {
        // Restart typing and change color
        timeout = setTimeout(() => {
          setDirection("down");
          setCurrentLineIndex(0);
          setCurrentCharIndex(0);
          setDisplayLines([]);
          setColorIdx((c) => (c + 1) % COLORS.length);
        }, 800);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentLineIndex, currentCharIndex, direction]);

  return (
    <pre className={`typing-pre ${COLORS[colorIdx]}`}>
      {displayLines.map((line = "", idx) => (
        <div key={idx}>{line}</div>
      ))}
      <span className="caret" />
    </pre>
  );
}
