# Clean-Room Competitor Feature Matrix

**Subject:** HireRoom vs. Intervue.io (Publicly Observable Features)  
**Research Standard:** Clean-room analysis conducted exclusively from public product documentation, pricing tiers, and observed SaaS paradigms. No proprietary code, assets, or text copied.

---

| Functional Capability | Intervue.io (Public Feature Set) | HireRoom (Clean-Room Implementation) | HireRoom Advantage / Innovation |
|---|---|---|---|
| **Collaborative Code Editor** | Monaco editor with dual-cursor and multi-language syntax | Monaco editor + local WebWorker / Pyodide WASM sandbox | Client-side zero-compute execution; sub-cent cost per session |
| **Whiteboard Canvas** | Proprietary canvas with drawing tools and shapes | Embedded Excalidraw with state synced over Supabase / WebRTC | Industry-standard SVG export, rich shape library, zero license cost |
| **Video & Audio Calling** | Integrated WebRTC audio/video | WebRTC Peer-to-Peer mesh with Google STUN + OpenRelay TURN | Decentralized P2P streaming; zero external video server minutes consumed |
| **AI Interview Assistance** | Summary generation, transcript notes | Objective-Only Co-pilot (talk-time balance, test execution pace) | **Fairness-by-design:** Zero sentiment/emotion inference, human-in-the-loop signoff |
| **Interview Playback** | Keystroke-by-keystroke playback | Timestamped snapshot checkpoints & transcript correlation | Lower storage footprint; instant jump to key test failures |
| **Question Bank & Rubrics** | Standard library with custom company questions | Versioned rubrics with dimensional criteria & weight distribution | Immutable version hashes on scorecards for auditability |
| **Candidate Practice Lounge** | Mock interviews (separate product) | Integrated Practice Lounge with self-paced coding & instant feedback | Built-in candidate preparation reduces interview anxiety |
| **Skills Verification** | Basic scorecard PDF download | Verified Skills Passport with public cryptographic verification token | Candidate-owned portable career asset with verifiable URL |
| **ATS Integrations** | Native integrations with Greenhouse, Lever, Ashby | Clean webhook architecture + scheduled .ics calendar invites | Open API contract; integrations marked 'Coming soon' until live |
| **Candidate Offer Flow** | External handoff | Built-in Offer Portal with audit log and verifiable digital signing | Complete end-to-end hire lifecycle within one platform |
| **Theme & Visual Design** | Standard enterprise light mode | Warm Marketplace Light & Warm Human Dark with system sync | High contrast, modern aesthetics, WCAG 2.1 AA keyboard support |
