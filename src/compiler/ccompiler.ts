import type { ExerciseResult, TestCase } from '../types';

const GODBOLT_API = 'https://godbolt.org/api/compiler/cg141/compile';
const WANDBOX_API = 'https://wandbox.org/api/compile.json';

interface GodboltLine { text: string }

async function executeGodbolt(code: string, stdin: string): Promise<{ output: string; error: string }> {
  const resp = await fetch(GODBOLT_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({
      source: code,
      options: {
        userArguments: '-Wall -std=c17 -lm',
        executeParameters: { stdin },
        compilerOptions: { executorRequest: true },
        filters: { execute: true },
      },
    }),
  });

  if (!resp.ok) throw new Error(`Godbolt: ${resp.status}`);

  const data = await resp.json();

  const stripAnsi = (s: string) => s.replace(/\x1b\[[0-9;]*[a-zA-Z]/g, '');

  if (!data.didExecute && data.buildResult?.stderr?.length) {
    const err = (data.buildResult.stderr as GodboltLine[]).map((l: GodboltLine) => stripAnsi(l.text)).join('\n');
    return { output: '', error: err };
  }

  const stderr = (data.stderr as GodboltLine[] ?? []).map((l: GodboltLine) => stripAnsi(l.text)).join('\n');
  if (stderr) {
    const stdout = (data.stdout as GodboltLine[] ?? []).map((l: GodboltLine) => l.text).join('\n');
    return { output: stdout, error: stderr };
  }

  const stdout = (data.stdout as GodboltLine[] ?? []).map((l: GodboltLine) => l.text).join('\n');
  return { output: stdout, error: '' };
}

async function executeWandbox(code: string, stdin: string): Promise<{ output: string; error: string }> {
  const resp = await fetch(WANDBOX_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      code,
      compiler: 'gcc-head-c',
      stdin,
      options: '-Wall -std=c17',
      'compiler-option-raw': '-lm',
    }),
  });

  if (!resp.ok) throw new Error(`Wandbox: ${resp.status}`);

  const data = await resp.json();

  if (data.compiler_error) {
    return { output: '', error: data.compiler_error };
  }

  if (data.program_error) {
    return { output: data.program_output ?? '', error: data.program_error };
  }

  return { output: data.program_output ?? '', error: '' };
}

async function executeC(code: string, stdin: string): Promise<{ output: string; error: string }> {
  try {
    return await executeGodbolt(code, stdin);
  } catch {
    try {
      return await executeWandbox(code, stdin);
    } catch (e) {
      return { output: '', error: `Error de conexión: ${(e as Error).message}` };
    }
  }
}

export async function compileAndRun(code: string, stdin: string = ''): Promise<{ output: string; error: string }> {
  return executeC(code, stdin);
}

export async function runTestCases(code: string, testCases: TestCase[]): Promise<ExerciseResult> {
  const testResults: ExerciseResult['testResults'] = [];
  let allPassed = true;
  let lastOutput = '';
  let lastError = '';

  for (const tc of testCases) {
    const { output, error } = await compileAndRun(code, tc.input);
    lastOutput = output;
    lastError = error;

    if (error) {
      testResults.push({
        passed: false,
        description: tc.description,
        expected: tc.expectedOutput,
        got: `Error: ${error}`,
      });
      allPassed = false;
      continue;
    }

    if (tc.expectedOutput === '') {
      testResults.push({
        passed: true,
        description: tc.description,
        expected: '(compilación exitosa)',
        got: output,
      });
      continue;
    }

    const normalizedOutput = output.trim();
    const normalizedExpected = tc.expectedOutput.trim();
    const passed = normalizedOutput === normalizedExpected;

    testResults.push({
      passed,
      description: tc.description,
      expected: tc.expectedOutput,
      got: output,
    });

    if (!passed) allPassed = false;
  }

  return {
    passed: allPassed,
    output: lastOutput,
    error: lastError,
    testResults,
  };
}
