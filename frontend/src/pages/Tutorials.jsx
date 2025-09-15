import React from 'react'
export default function Tutorials(){ return <div className='prose prose-invert'>
      <h1 className="text-6xl font-extrabold leading-tight tracking-tight">
          Featuring New Technology <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-600">BlockID</span>!
        </h1>
        <span className="flex justify-between flex-row-reverse ml-10">

        <div className="rounded-3xl p-4" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))", boxShadow: "0 10px 40px rgba(124,58,237,0.35), inset 0 0 40px rgba(124,58,237,0.06)" }}>
          <div className="bg-black rounded-2xl p-6" style={{ border: "6px solid rgba(124,58,237,0.12)" , height: "33rem"}}>
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
} Block;`}
            </pre>
          </div>
        </div>
                    <div>
                        <br /><br /><br /><br />
                <h2 className="mt-6 text-slate-400 text-lg max-w-xl">Tutorial</h2 ><p className="mt-6 text-slate-400 text-lg max-w-xl">About content...</p>
            </div>
      </span>


        
</div> }
 
