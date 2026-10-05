# Evaluation methodology

1. Load structured cases with expected actions and severity.
2. Retrieve candidate documents and preserve their IDs, trust flags, and scores.
3. Apply the request guardrail before any model or tool call.
4. Validate the model response against the expected action.
5. Report aggregate and per-category scores for CI.

The vector-store and model-gateway modules define provider-neutral request shapes. A real implementation can replace them with OpenSearch k-NN, pgvector, or an LLM gateway without changing the benchmark contract.
