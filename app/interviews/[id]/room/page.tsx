'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Code2,
  Play,
  Terminal,
  Activity,
  Mic,
  MicOff,
  Video,
  VideoOff,
  FileCheck2,
  Clock,
  Sparkles,
  ArrowLeft,
  Share2,
  Shield,
  Layers,
  AlertCircle,
} from 'lucide-react';
import { codeRunner } from '@/lib/code-runner/runner-adapter';

const DEFAULT_CODE_SNIPPET = `// HireRoom Live Interview: Distributed Cache & Sliding Window
// Language: JavaScript (Isolated Web Worker Sandbox)

function createSlidingWindowRateLimiter(limit, windowMs) {
  const timestamps = [];

  return function allowRequest(now = Date.now()) {
    // Evict timestamps outside the active window
    while (timestamps.length > 0 && timestamps[0] <= now - windowMs) {
      timestamps.shift();
    }

    if (timestamps.length < limit) {
      timestamps.push(now);
      return { allowed: true, remaining: limit - timestamps.length };
    }

    return { allowed: false, remaining: 0 };
  };
}

// Test assertions
const limiter = createSlidingWindowRateLimiter(3, 1000);
console.log("Req 1 (t=0):", limiter(100));
console.log("Req 2 (t=200):", limiter(200));
console.log("Req 3 (t=400):", limiter(400));
console.log("Req 4 (t=500, rejected):", limiter(500));
console.log("Req 5 (t=1200, evicted):", limiter(1200));
`;

export default function LiveRoomPage() {
  const params = useParams();
  const roomId = params?.id || 'room_demo_live';

  const [language, setLanguage] = useState<'javascript' | 'python'>('javascript');
  const [code, setCode] = useState(DEFAULT_CODE_SNIPPET);
  const [stdout, setStdout] = useState('');
  const [stderr, setStderr] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [execTime, setExecTime] = useState<number | null>(null);

  // Audio / Video Mock WebRTC Controls
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);

  // Co-Pilot On-Demand Suggestions
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([
    'Ask how the candidate would synchronize state across 10 distributed nodes.',
    'Probe memory consumption if timestamps array expands during high-volume spikes.',
  ]);

  const handleRunCode = async () => {
    setIsRunning(true);
    setStdout('Running in isolated sandbox...');
    setStderr('');

    const res = await codeRunner.run(code, language);
    setStdout(res.stdout);
    setStderr(res.stderr);
    setExecTime(res.executionTimeMs);
    setIsRunning(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-[var(--background)]">
      {/* Room Header Strip */}
      <div className="border-b border-[var(--surface-border)] bg-[var(--surface)] px-4 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1 font-semibold text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </Link>
          <div className="h-4 w-px bg-[var(--surface-border)]" />
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[var(--success)] animate-pulse" />
            <span className="font-bold text-[var(--foreground)]">Staff Frontend Architecture</span>
            <span className="text-[11px] text-[var(--muted-foreground)]">• Room #{roomId}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Objective Audio Dynamics Badge */}
          <div className="hidden md:flex items-center gap-2 rounded-lg border border-[var(--surface-border)] bg-[var(--surface-subtle)] px-2.5 py-1 text-[11px]">
            <Activity className="h-3.5 w-3.5 text-[var(--primary)]" />
            <span>Talk Balance: <strong>Elena 42%</strong> / <strong>Alex 58%</strong></span>
          </div>

          <div className="flex items-center gap-1 rounded-lg border border-[var(--surface-border)] bg-[var(--surface-subtle)] px-2 py-1 font-mono text-[11px] text-[var(--foreground)]">
            <Clock className="h-3.5 w-3.5 text-[var(--warning)]" />
            <span>44:18 remaining</span>
          </div>

          <button
            type="button"
            onClick={() => alert(`Guest invitation link: ${window.location.origin}/interviews/${roomId}/room?token=guest_demo_772`)}
            className="inline-flex items-center gap-1 rounded-lg border border-[var(--surface-border)] bg-[var(--surface-subtle)] px-2.5 py-1 text-xs font-semibold text-[var(--foreground)] hover:bg-[var(--surface-muted)]"
          >
            <Share2 className="h-3.5 w-3.5" /> Invite
          </button>
        </div>
      </div>

      {/* Main Workspace Layout: 3 Columns */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Column 1: Video Feeds & Objective Telemetry (3 cols) */}
        <div className="lg:col-span-3 border-r border-[var(--surface-border)] bg-[var(--surface)] p-3 flex flex-col gap-3 overflow-y-auto">
          {/* Video 1: Interviewer */}
          <div className="relative rounded-xl border border-[var(--surface-border)] bg-[var(--surface-subtle)] aspect-video overflow-hidden flex items-center justify-center">
            <div className="flex flex-col items-center text-center p-2">
              <div className="h-10 w-10 rounded-full bg-[var(--primary-light)] text-[var(--primary)] font-bold flex items-center justify-center text-sm mb-1">
                ER
              </div>
              <span className="text-xs font-semibold text-[var(--foreground)]">Elena Rostova</span>
              <span className="text-[10px] text-[var(--muted-foreground)]">Interviewer (Host)</span>
            </div>
            <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white">
              <Mic className="h-3 w-3 text-emerald-400" /> Speaking (42%)
            </div>
          </div>

          {/* Video 2: Candidate */}
          <div className="relative rounded-xl border border-[var(--surface-border)] bg-[var(--surface-subtle)] aspect-video overflow-hidden flex items-center justify-center">
            <div className="flex flex-col items-center text-center p-2">
              <div className="h-10 w-10 rounded-full bg-[var(--accent-light)] text-[var(--accent)] font-bold flex items-center justify-center text-sm mb-1">
                AC
              </div>
              <span className="text-xs font-semibold text-[var(--foreground)]">Alex Chen</span>
              <span className="text-[10px] text-[var(--muted-foreground)]">Candidate</span>
            </div>
            <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white">
              <Mic className="h-3 w-3 text-emerald-400" /> Active (58%)
            </div>
          </div>

          {/* User A/V Controls */}
          <div className="flex items-center justify-center gap-2 py-1">
            <button
              type="button"
              onClick={() => setMicOn(!micOn)}
              className={`p-2 rounded-lg border text-xs font-semibold transition-colors ${
                micOn
                  ? 'border-[var(--surface-border)] bg-[var(--surface-subtle)] text-[var(--foreground)]'
                  : 'border-[var(--destructive)] bg-[var(--destructive-light)] text-[var(--destructive)]'
              }`}
              title="Toggle Microphone"
            >
              {micOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={() => setVideoOn(!videoOn)}
              className={`p-2 rounded-lg border text-xs font-semibold transition-colors ${
                videoOn
                  ? 'border-[var(--surface-border)] bg-[var(--surface-subtle)] text-[var(--foreground)]'
                  : 'border-[var(--destructive)] bg-[var(--destructive-light)] text-[var(--destructive)]'
              }`}
              title="Toggle Camera"
            >
              {videoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
            </button>
          </div>

          {/* Objective Audio Metrics Box */}
          <div className="rounded-lg border border-[var(--surface-border)] bg-[var(--surface-subtle)] p-3 space-y-2 text-xs">
            <div className="flex items-center justify-between font-bold text-[var(--foreground)]">
              <span>Objective Dynamics</span>
              <span className="text-[10px] text-[var(--muted-foreground)] font-normal">Physical signals</span>
            </div>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between text-[var(--muted-foreground)]">
                <span>Interviewer share:</span>
                <span className="font-semibold text-[var(--foreground)]">42%</span>
              </div>
              <div className="flex justify-between text-[var(--muted-foreground)]">
                <span>Candidate share:</span>
                <span className="font-semibold text-[var(--foreground)]">58%</span>
              </div>
              <div className="flex justify-between text-[var(--muted-foreground)]">
                <span>Silence / Pauses:</span>
                <span className="font-semibold text-[var(--foreground)]">8% (Normal)</span>
              </div>
              <div className="flex justify-between text-[var(--muted-foreground)]">
                <span>Code Executions:</span>
                <span className="font-semibold text-[var(--primary)]">3 runs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Code Editor & Console Output (6 cols) */}
        <div className="lg:col-span-6 border-r border-[var(--surface-border)] flex flex-col bg-[var(--surface)] overflow-hidden">
          {/* Editor Action Bar */}
          <div className="flex items-center justify-between border-b border-[var(--surface-border)] bg-[var(--surface-subtle)] px-3 py-2 text-xs">
            <div className="flex items-center gap-2">
              <Code2 className="h-4 w-4 text-[var(--primary)]" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="rounded border border-[var(--surface-border)] bg-[var(--surface)] px-2 py-1 text-xs font-semibold text-[var(--foreground)]"
              >
                <option value="javascript">JavaScript (WebWorker)</option>
                <option value="python">Python (Pyodide WASM)</option>
              </select>
            </div>

            <button
              type="button"
              disabled={isRunning}
              onClick={handleRunCode}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--primary)] px-3 py-1.5 text-xs font-bold text-[var(--primary-foreground)] shadow-xs hover:bg-[var(--primary-hover)] transition-all disabled:opacity-50"
            >
              <Play className="h-3 w-3 fill-current" />
              {isRunning ? 'Executing...' : 'Run Code'}
            </button>
          </div>

          {/* Editor Textarea with syntax line numbers */}
          <div className="flex-1 flex overflow-hidden">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full flex-1 p-4 font-mono text-xs leading-relaxed bg-[var(--surface)] text-[var(--foreground)] outline-none resize-none border-none"
              spellCheck={false}
            />
          </div>

          {/* Console Output Drawer */}
          <div className="h-44 border-t border-[var(--surface-border)] bg-[var(--surface-subtle)] flex flex-col">
            <div className="flex items-center justify-between border-b border-[var(--surface-border-subtle)] px-3 py-1.5 text-[11px] font-semibold text-[var(--muted-foreground)]">
              <span className="flex items-center gap-1">
                <Terminal className="h-3.5 w-3.5" /> Console Execution Output
              </span>
              {execTime !== null && (
                <span className="text-[10px] font-mono text-[var(--success)]">
                  Completed in {execTime}ms
                </span>
              )}
            </div>
            <div className="flex-1 p-3 font-mono text-xs overflow-y-auto whitespace-pre-wrap text-[var(--foreground)]">
              {stdout || (stderr ? null : <span className="text-[var(--muted-foreground)] italic">Press &apos;Run Code&apos; to execute in browser sandbox...</span>)}
              {stderr && <span className="text-[var(--destructive)]">{stderr}</span>}
            </div>
          </div>
        </div>

        {/* Column 3: AI Co-Pilot & Rubric Assistant (3 cols) */}
        <div className="lg:col-span-3 bg-[var(--surface)] p-3 flex flex-col gap-3 overflow-y-auto">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--surface-border-subtle)]">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--foreground)]">
              <Sparkles className="h-4 w-4 text-[var(--primary)]" />
              <span>Interviewer Co-Pilot</span>
            </div>
            <span className="rounded bg-[var(--accent-light)] px-1.5 py-0.5 text-[10px] font-semibold text-[var(--accent)]">
              Advisory Only
            </span>
          </div>

          {/* On-Demand Suggestion Generator */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[11px] text-[var(--muted-foreground)]">Suggested Follow-ups</span>
              <button
                type="button"
                className="text-[11px] font-semibold text-[var(--primary)] hover:underline"
                onClick={() => {
                  setAiSuggestions([
                    ...aiSuggestions,
                    'Ask how the solution behaves under an unexpected network partition.',
                  ]);
                }}
              >
                + Suggest follow-up
              </button>
            </div>

            <div className="space-y-2">
              {aiSuggestions.map((s, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-[var(--surface-border)] bg-[var(--surface-subtle)] p-2.5 text-xs text-[var(--foreground)] leading-relaxed space-y-1"
                >
                  <p>{s}</p>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="text-[10px] text-[var(--primary)] hover:underline"
                      onClick={() => alert(`Copied probe question to private notes`)}
                    >
                      Pin to Scorecard
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fast-Scoring Dimensions Preview */}
          <div className="rounded-lg border border-[var(--surface-border)] bg-[var(--surface-subtle)] p-3 space-y-2 text-xs">
            <p className="font-bold text-[var(--foreground)]">Active Rubric Calibration</p>
            <div className="space-y-1.5 text-[11px] text-[var(--muted-foreground)]">
              <div className="flex justify-between items-center">
                <span>Code Correctness (30%):</span>
                <span className="font-bold text-[var(--foreground)]">4 / 5</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Time Complexity (25%):</span>
                <span className="font-bold text-[var(--foreground)]">5 / 5</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Verification Testing (20%):</span>
                <span className="font-bold text-[var(--foreground)]">4 / 5</span>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-2">
            <Link
              href="/dashboard"
              className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg border border-[var(--surface-border)] bg-[var(--surface-subtle)] py-2 text-xs font-semibold text-[var(--foreground)] hover:bg-[var(--surface-muted)] transition-colors"
            >
              Conclude Session &amp; Submit Scorecard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
