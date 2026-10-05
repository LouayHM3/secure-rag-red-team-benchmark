export function loadConfig(env = process.env) {
  return { nodeEnv: env.NODE_ENV ?? 'development', port: Number(env.PORT ?? 3003), modelGatewayUrl: env.MODEL_GATEWAY_URL ?? '', vectorStoreUrl: env.VECTOR_STORE_URL ?? '', signingKey: env.BENCHMARK_SIGNING_KEY ?? '' };
}

export function requireProductionConfig(config = loadConfig()) {
  if (config.nodeEnv !== 'production') return true;
  const missing = ['modelGatewayUrl', 'vectorStoreUrl', 'signingKey'].filter(key => !config[key]);
  if (missing.length) throw new Error(`Missing production configuration: ${missing.join(', ')}`);
  return true;
}
