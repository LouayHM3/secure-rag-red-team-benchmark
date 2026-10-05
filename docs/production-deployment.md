# Production deployment

1. Populate the provider URLs and signing key from a secret manager.
2. Run the benchmark as a release gate before changing model or retrieval configuration.
3. Persist case results with model version, prompt policy version, retrieved document IDs, and timestamps.
4. Block external tool calls by default and require explicit approval for medium-risk actions.
5. Publish only aggregate reports; never store raw secrets or customer content in CI logs.
