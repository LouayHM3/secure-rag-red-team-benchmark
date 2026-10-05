import { withRetry } from './retry.js';

export function createProviderClient({ modelUrl, modelApiKey, vectorUrl, vectorApiKey, fetchImpl = fetch }) {
  async function post(url, key, body) {
    return withRetry(async () => {
      const response = await fetchImpl(url, { method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` }, body: JSON.stringify(body) });
      if (!response.ok) throw new Error(`Provider request failed: ${response.status}`);
      return response.json();
    });
  }
  return { complete: body => post(modelUrl, modelApiKey, body), search: body => post(vectorUrl, vectorApiKey, body) };
}
