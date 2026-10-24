import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Video, Mic, Code, Award, CheckCircle2 } from 'lucide-react';

export default function CandidateConsentPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-[var(--muted-foreground)] hover:text-[var(--primary)] mb-6 transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to platform
      </Link>

      <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-6 sm:p-10 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <span className="rounded-full bg-[var(--accent-light)] px-2.5 py-0.5 text-xs font-semibold text-[var(--accent)]">
            Candidate Bill of Rights
          </span>
          <span className="text-xs text-[var(--muted-foreground)]">Fairness & Transparency</span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
          Candidate Consent & Telemetry Policy
        </h1>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          What happens when you enter a HireRoom live interview session.
        </p>

        <hr className="my-6 border-[var(--surface-border)]" />

        <div className="space-y-6 text-sm text-[var(--foreground)] leading-relaxed">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-subtle)] p-4 space-y-2">
              <div className="flex items-center gap-2 text-[var(--primary)] font-semibold">
                <Video className="h-4 w-4" />
                <span>WebRTC Audio & Video</span>
              </div>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                Direct peer-to-peer WebRTC streaming allows real-time face-to-face communication with your interviewer. Video feeds are never stored on public relays.
              </p>
            </div>

            <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-subtle)] p-4 space-y-2">
              <div className="flex items-center gap-2 text-[var(--primary)] font-semibold">
                <Mic className="h-4 w-4" />
                <span>Objective Talk-Time Share</span>
              </div>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                The co-pilot monitors conversational balance to protect candidates from interviewer monopolization. It detects speech volume activity, <strong>never sentiment or emotion</strong>.
              </p>
            </div>

            <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-subtle)] p-4 space-y-2">
              <div className="flex items-center gap-2 text-[var(--primary)] font-semibold">
                <Code className="h-4 w-4" />
                <span>Isolated Code Execution</span>
              </div>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                Your code runs in isolated browser WebWorkers or WebAssembly. No code execution logs are transmitted to external ad networks.
              </p>
            </div>

            <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-subtle)] p-4 space-y-2">
              <div className="flex items-center gap-2 text-[var(--primary)] font-semibold">
                <Award className="h-4 w-4" />
                <span>Candidate-Owned Passport</span>
              </div>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                Demonstrated skills earn cryptographic credentials on your Verified Skills Passport, which you control and can share publicly.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold text-[var(--foreground)] mb-2">
              Human Decision Guarantee
            </h2>
            <div className="rounded-lg border border-[var(--success)] bg-[var(--success-light)] p-4 text-xs text-[var(--foreground)] space-y-2">
              <div className="flex items-center gap-2 font-semibold text-[var(--success)]">
                <CheckCircle2 className="h-4 w-4" />
                <span>Zero Autonomous Automated Rejections</span>
              </div>
              <p className="text-[var(--muted-foreground)]">
                Under HireRoom governance, artificial intelligence is strictly restricted to an assistive advisory role. All hiring recommendations, offer releases, and candidate status advancements require direct review and signature by human interviewers.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold text-[var(--foreground)] mb-2">
              Withdrawal of Consent
            </h2>
            <p className="text-[var(--muted-foreground)]">
              Before entering any live room, you are presented with explicit toggles for camera, microphone, and transcript generation. You may leave the session or disable feeds at any moment. For inquiries, email{' '}
              <a href="mailto:sepalsagar1234@gmail.com" className="text-[var(--primary)] underline font-medium">
                sepalsagar1234@gmail.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
