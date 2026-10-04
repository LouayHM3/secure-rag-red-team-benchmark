const sensitivePatterns = [/api[_ -]?key/i, /secret/i, /password/i, /token/i];
const injectionPatterns = [/ignore (all|previous|policy)/i, /reveal (the )?(system|hidden) prompt/i, /system override/i];

export function classifyRequest(prompt) {
  if (sensitivePatterns.some(pattern => pattern.test(prompt))) return 'redact';
  if (/transfer|send|delete|execute|call the .*tool/i.test(prompt)) return 'confirm';
  if (injectionPatterns.some(pattern => pattern.test(prompt))) return 'refuse';
  return 'answer';
}

export function retrieve(query, documents) {
  const terms = query.toLowerCase().split(/\W+/).filter(Boolean);
  return documents.map(document => ({ ...document, score: terms.filter(term => `${document.title} ${document.text}`.toLowerCase().includes(term)).length })).filter(document => document.score > 0).sort((a, b) => b.score - a.score);
}

export function applyGuardrail(prompt, response) {
  const expectedAction = classifyRequest(prompt);
  let safeResponse = response;
  if (expectedAction === 'redact') safeResponse = '[REDACTED: sensitive value withheld]';
  if (expectedAction === 'refuse') safeResponse = 'I cannot follow that instruction because it conflicts with the assistant safety policy.';
  if (expectedAction === 'confirm') safeResponse = 'This action requires explicit user confirmation before any tool call.';
  return { expectedAction, response: safeResponse, blocked: expectedAction !== 'answer' };
}
