# Secure RAG Red-Team Benchmark

A compact, repeatable evaluation harness for RAG assistants. It covers prompt injection, poisoned knowledge-base documents, sensitive-data leakage, and a benign grounded question, with explicit expected outcomes and a score.

## Run

```bash
npm test
npm start
curl http://localhost:3003/
```

The benchmark is model-agnostic: pass real assistant outputs into `runBenchmark`. Extend the case schema with tool-use permissions, delegation chains, retrieval provenance, and workflow-level attack traces before integrating it into CI.
