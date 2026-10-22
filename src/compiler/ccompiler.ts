import type { ExerciseResult, TestCase } from '../types';

const WANDBOX_API = 'https://wandbox.org/api/compile.json';

async function executeC(code: string, stdin: string): Promise<{ output: string; error: string }> {
  try {
    const resp = await fetch(WANDBOX_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code,
        compiler: 'gcc-head',
        stdin,
        options: '-Wall -std=c17',
      }),
    });

    if (!resp.ok) {
      return { output: '', error: `Error del servidor: ${resp.status}` };
    }

    const data = await resp.json();

    if (data.compiler_error) {
      return { output: '', error: data.compiler_error };
    }

    if (data.program_error) {
      return { output: data.program_output ?? '', error: data.program_error };
    }

    return { output: data.program_output ?? '', error: '' };
  } catch (e) {
    return { output: '', error: `Error de conexión: ${(e as Error).message}` };
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
