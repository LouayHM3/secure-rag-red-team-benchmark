export function buildChatCompletionRequest(messages, model = 'security-copilot-model') {
  return { model, temperature: 0, messages, response_format: { type: 'json_object' }, metadata: { application: 'secure-rag-benchmark', policy: 'grounded-only-v1' } };
}

export function parseModelResponse(payload) {
  const content = payload?.choices?.[0]?.message?.content ?? '{}';
  try { return JSON.parse(content); } catch { return { answer: content, parseError: true }; }
}
