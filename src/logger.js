export function log(level, message, fields = {}) {
  process.stdout.write(`${JSON.stringify({ timestamp: new Date().toISOString(), level, message, ...fields })}\n`);
}
