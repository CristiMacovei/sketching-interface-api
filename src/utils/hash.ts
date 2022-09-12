import { config as envConfig } from 'dotenv';
import { sha256 } from 'js-sha256';

envConfig();

export function hash(a: string): string {
  return sha256(a + process.env.PASSWORD_ADDON);
}
