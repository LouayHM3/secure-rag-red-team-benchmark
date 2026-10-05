import test from 'node:test';
import assert from 'node:assert/strict';
import { loadConfig, requireProductionConfig } from '../src/config.js';

test('production config rejects missing provider contracts', () => assert.throws(() => requireProductionConfig(loadConfig({ NODE_ENV: 'production' })), /Missing production configuration/));
test('production config accepts complete provider contracts', () => assert.equal(requireProductionConfig(loadConfig({ NODE_ENV: 'production', MODEL_GATEWAY_URL: 'model', VECTOR_STORE_URL: 'vector', BENCHMARK_SIGNING_KEY: 'key' })), true));
