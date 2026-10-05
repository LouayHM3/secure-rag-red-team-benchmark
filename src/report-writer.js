import fs from 'node:fs/promises';
import path from 'node:path';

export async function writeReport(filePath, report) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify({ generatedAt: new Date().toISOString(), ...report }, null, 2));
  return filePath;
}
