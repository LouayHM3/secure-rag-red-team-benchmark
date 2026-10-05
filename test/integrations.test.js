import test from 'node:test';
import assert from 'node:assert/strict';
import { buildVectorSearchRequest, cosineSimilarity, embedText } from '../integrations/vector-store.js';
import { buildChatCompletionRequest, parseModelResponse } from '../integrations/llm-gateway.js';
import { authorizeToolCall } from '../integrations/tool-policy.js';

test('builds a vector search request with normalized embeddings', () => {
  const request = buildVectorSearchRequest('retention policy');
  assert.equal(request.knn.k, 5);
  assert.ok(Math.abs(cosineSimilarity(embedText('a'), embedText('a')) - 1) < 0.001);
});
test('builds a deterministic JSON model request', () => assert.equal(buildChatCompletionRequest([]).response_format.type, 'json_object'));
test('requires confirmation and blocks critical tools', () => {
  assert.equal(authorizeToolCall('create_ticket').requiresConfirmation, true);
  assert.equal(authorizeToolCall('export_customer_data', true).allowed, false);
});
test('handles malformed model JSON safely', () => assert.equal(parseModelResponse({ choices: [{ message: { content: 'not-json' } }] }).parseError, true));
