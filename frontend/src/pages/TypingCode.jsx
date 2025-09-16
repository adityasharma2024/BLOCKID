import React, { useState, useEffect } from 'react';
import './TypingCode.css';

const codeString = 
`// BlockID demo code snippet
void startCoding() {
  // welcome
  void calculate_hash(char *output, const char *input) {
    // In a real project, this would be a SHA-256 hash function.
    // Here, we just use a simple mock to produce a "hash".
    sprintf(output, "mock_hash_%ld", time(NULL));
  }

  // Block structure
  typedef struct Block {
      int index;
      long timestamp;
      char data[256];
      char previous_hash[65];
      char hash[65];
      int nonce;
      struct Block *next;
  } Block;`;

export default function TypingCode() {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < codeString.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + codeString[index]);
        setIndex(index + 1);
      }, 1); // Adjust typing speed here

      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <pre className="typing-pre">
      {displayedText}
      {index < codeString.length && <span className="caret" />}
    </pre>
  );
}
