export interface ExecutionResult {
  stdout: string;
  stderr: string;
  executionTimeMs: number;
  exitCode: number;
  runtimeStatus: 'ready' | 'loading' | 'cached' | 'error' | 'disabled';
}

export type SupportedLanguage = 'javascript' | 'python' | 'cpp' | 'java' | 'go';

export interface CodeRunner {
  run(
    code: string,
    language: SupportedLanguage,
    onStatusChange?: (status: string) => void
  ): Promise<ExecutionResult>;
}

// Feature flag: Compiled languages are disabled in zero-cost client sandbox
export const FEATURE_EXTERNAL_PISTON_ENABLED = false;

// Pyodide CDN configuration
const PYODIDE_VERSION = '0.26.4';
const PYODIDE_CDN_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

export class ClientCodeRunner implements CodeRunner {
  private pyodideWorker: Worker | null = null;
  private isPyodideReady = false;
  private isPyodideLoading = false;
  private pyodideInitPromise: Promise<void> | null = null;

  async run(
    code: string,
    language: SupportedLanguage,
    onStatusChange?: (status: string) => void
  ): Promise<ExecutionResult> {
    const startTime = performance.now();

    if (language === 'javascript') {
      return this.runJavaScriptWorker(code, startTime);
    }

    if (language === 'python') {
      return this.runPythonWorker(code, startTime, onStatusChange);
    }

    if (['cpp', 'java', 'go'].includes(language)) {
      return {
        stdout: '',
        stderr: `[HireRoom Sandbox] Language '${language}' is marked 'Coming soon' under academic free-tier mode. Only JavaScript (Web Worker) and Python (Pyodide WebAssembly) run in zero-cost client sandbox.`,
        executionTimeMs: 0,
        exitCode: 1,
        runtimeStatus: 'disabled',
      };
    }

    return {
      stdout: '',
      stderr: `[HireRoom Sandbox] Unsupported execution target: ${language}`,
      executionTimeMs: 0,
      exitCode: 1,
      runtimeStatus: 'error',
    };
  }

  // Safe isolated JavaScript Web Worker execution with 10s timeout
  private runJavaScriptWorker(code: string, startTime: number): Promise<ExecutionResult> {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') {
        resolve({
          stdout: '',
          stderr: 'Server-side execution disabled for safety',
          executionTimeMs: 0,
          exitCode: 1,
          runtimeStatus: 'disabled',
        });
        return;
      }

      const workerCode = `
        self.onmessage = function(e) {
          const logs = [];
          const errors = [];
          const customConsole = {
            log: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
            error: (...args) => errors.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
            warn: (...args) => logs.push('[WARN] ' + args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
            info: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '))
          };
          try {
            const runner = new Function('console', e.data);
            const result = runner(customConsole);
            if (result !== undefined) {
              logs.push(String(result));
            }
            self.postMessage({ stdout: logs.join('\\n'), stderr: errors.join('\\n'), exitCode: 0 });
          } catch (err) {
            self.postMessage({ stdout: logs.join('\\n'), stderr: (err && err.message) || String(err), exitCode: 1 });
          }
        };
      `;

      const blob = new Blob([workerCode], { type: 'application/javascript' });
      const worker = new Worker(URL.createObjectURL(blob));
      const timeoutId = setTimeout(() => {
        worker.terminate();
        resolve({
          stdout: '',
          stderr: '[HireRoom Sandbox] Execution timed out: exceeded 10,000ms safety threshold',
          executionTimeMs: Math.round(performance.now() - startTime),
          exitCode: 124,
          runtimeStatus: 'error',
        });
      }, 10000);

      worker.onmessage = (e) => {
        clearTimeout(timeoutId);
        worker.terminate();
        resolve({
          stdout: e.data.stdout || '',
          stderr: e.data.stderr || '',
          executionTimeMs: Math.round(performance.now() - startTime),
          exitCode: e.data.exitCode,
          runtimeStatus: 'ready',
        });
      };

      worker.onerror = (e) => {
        clearTimeout(timeoutId);
        worker.terminate();
        resolve({
          stdout: '',
          stderr: e.message || 'Worker runtime initialization error',
          executionTimeMs: Math.round(performance.now() - startTime),
          exitCode: 1,
          runtimeStatus: 'error',
        });
      };

      worker.postMessage(code);
    });
  }

  // Real Pyodide WebAssembly execution inside dedicated Web Worker
  private async runPythonWorker(
    code: string,
    startTime: number,
    onStatusChange?: (status: string) => void
  ): Promise<ExecutionResult> {
    if (typeof window === 'undefined') {
      return {
        stdout: '',
        stderr: 'Server-side Python execution disabled for safety',
        executionTimeMs: 0,
        exitCode: 1,
        runtimeStatus: 'disabled',
      };
    }

    return new Promise((resolve) => {
      onStatusChange?.('Initializing Pyodide WebAssembly worker...');

      const pyodideWorkerSource = `
        let pyodideInstance = null;
        let isInitializing = false;

        async function initPyodide() {
          if (pyodideInstance) return pyodideInstance;
          if (isInitializing) {
            while (isInitializing) {
              await new Promise(r => setTimeout(r, 100));
            }
            return pyodideInstance;
          }
          isInitializing = true;
          try {
            importScripts("${PYODIDE_CDN_URL}pyodide.js");
            self.postMessage({ type: 'STATUS', status: 'Downloading Python WebAssembly runtime...' });
            pyodideInstance = await loadPyodide({
              indexURL: "${PYODIDE_CDN_URL}"
            });
            self.postMessage({ type: 'STATUS', status: 'Python WebAssembly runtime ready' });
            isInitializing = false;
            return pyodideInstance;
          } catch (err) {
            isInitializing = false;
            throw err;
          }
        }

        self.onmessage = async function(e) {
          if (e.data.type === 'INIT') {
            try {
              await initPyodide();
              self.postMessage({ type: 'READY' });
            } catch (err) {
              self.postMessage({ type: 'ERROR', error: (err && err.message) || String(err) });
            }
            return;
          }

          if (e.data.type === 'RUN') {
            try {
              const py = await initPyodide();
              let stdoutBuf = [];
              let stderrBuf = [];

              py.setStdout({ batched: (str) => stdoutBuf.push(str) });
              py.setStderr({ batched: (str) => stderrBuf.push(str) });

              await py.runPythonAsync(e.data.code);

              self.postMessage({
                type: 'RESULT',
                stdout: stdoutBuf.join('\\n'),
                stderr: stderrBuf.join('\\n'),
                exitCode: 0
              });
            } catch (err) {
              self.postMessage({
                type: 'RESULT',
                stdout: '',
                stderr: (err && err.message) || String(err),
                exitCode: 1
              });
            }
          }
        };
      `;

      let worker: Worker;
      try {
        const blob = new Blob([pyodideWorkerSource], { type: 'application/javascript' });
        worker = new Worker(URL.createObjectURL(blob));
      } catch (err: any) {
        resolve({
          stdout: '',
          stderr: `[HireRoom Sandbox] Failed to spawn Pyodide Web Worker: ${err?.message || String(err)}`,
          executionTimeMs: Math.round(performance.now() - startTime),
          exitCode: 1,
          runtimeStatus: 'error',
        });
        return;
      }

      // Strict 10-second timeout
      const timeoutId = setTimeout(() => {
        worker.terminate();
        resolve({
          stdout: '',
          stderr: '[HireRoom Sandbox] Python execution timed out: exceeded 10,000ms safety threshold',
          executionTimeMs: Math.round(performance.now() - startTime),
          exitCode: 124,
          runtimeStatus: 'error',
        });
      }, 10000);

      worker.onmessage = (event) => {
        const msg = event.data;
        if (msg.type === 'STATUS') {
          onStatusChange?.(msg.status);
        } else if (msg.type === 'RESULT') {
          clearTimeout(timeoutId);
          worker.terminate();
          resolve({
            stdout: msg.stdout || '',
            stderr: msg.stderr || '',
            executionTimeMs: Math.round(performance.now() - startTime),
            exitCode: msg.exitCode,
            runtimeStatus: msg.exitCode === 0 ? 'ready' : 'error',
          });
        } else if (msg.type === 'ERROR') {
          clearTimeout(timeoutId);
          worker.terminate();
          resolve({
            stdout: '',
            stderr: `[HireRoom Sandbox] Pyodide initialization failed: ${msg.error}`,
            executionTimeMs: Math.round(performance.now() - startTime),
            exitCode: 1,
            runtimeStatus: 'error',
          });
        }
      };

      worker.onerror = (e) => {
        clearTimeout(timeoutId);
        worker.terminate();
        resolve({
          stdout: '',
          stderr: `[HireRoom Sandbox] Worker load error: ${e.message || 'Network blocked or CDN unavailable'}`,
          executionTimeMs: Math.round(performance.now() - startTime),
          exitCode: 1,
          runtimeStatus: 'error',
        });
      };

      worker.postMessage({ type: 'RUN', code });
    });
  }
}

export const codeRunner = new ClientCodeRunner();
