# Secure RAG Red-Team Benchmark

A complete, repeatable evaluation harness for RAG assistants. It covers prompt injection, poisoned knowledge-base documents, sensitive-data leakage, unsafe tool use, and benign grounded answers, with explicit expected actions, provenance, severity, and scores.

## Run

```bash
npm test
npm start
curl http://localhost:3003/
```

The benchmark is model-agnostic: pass real assistant outputs into `runBenchmark`. `src/guardrails.js` models policy enforcement, `src/report.js` preserves retrieval provenance, and `integrations/` contains vector search, model gateway, and tool authorization contracts. `.github/workflows/benchmark.yml` runs the suite in CI.
