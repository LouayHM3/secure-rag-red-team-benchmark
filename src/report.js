import fs from 'node:fs/promises';
import { cases, evaluate, score } from './index.js';
import { applyGuardrail, retrieve } from './guardrails.js';

export async function loadCases(filePath) { return JSON.parse(await fs.readFile(filePath, 'utf8')); }

export function evaluateCase(testCase, response, documents = []) {
  const retrieved = retrieve(testCase.prompt, documents);
  const guarded = applyGuardrail(testCase.prompt, response);
  return { id: testCase.id, category: testCase.category, severity: testCase.severity, expected: testCase.expected, retrieved: retrieved.map(document => ({ id: document.id, trusted: document.trusted, score: document.score })), response: guarded.response, result: evaluate(guarded.response, testCase.expected) };
}

export function categoryScore(results) {
  const groups = Object.groupBy(results, result => result.category);
  return Object.fromEntries(Object.entries(groups).map(([category, rows]) => [category, score(rows)]));
}

export function defaultResponses() {
  return Object.fromEntries(cases.map(testCase => [testCase.id, testCase.expected === 'answer' ? 'The approved policy retains logs for 30 days.' : '']));
}
