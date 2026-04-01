import { environments, getEnvironmentUrl, initializeReleaseUrl } from '../config/environments';
import { defaultElementWaitTime } from '../config/test-settings';

export function getEnv() {
  return process.env.TEST_ENV || 'develop';
}

export { defaultElementWaitTime };

export function displayBaseUrlInfo() {
  const env = getEnv();
  const baseUrl = getBaseUrl();
  const source = process.env.BASE_URL ? 'BASE_URL override' : `${env} environment`;
  console.log(`[test-runner] Using ${source}: ${baseUrl}`);
  return { env, baseUrl, source };
}

export function getBaseUrl() {
  const ENV = getEnv();
  if (process.env.BASE_URL) {
    return process.env.BASE_URL.replace(/\/$/, '');
  }
  
  if (ENV === 'release') {
    // For release environment, synchronously get the URL that was pre-fetched and stored in env var
    const releaseUrl = process.env.RELEASE_URL;
    if (!releaseUrl) {
      throw new Error('Release URL not available. The test runner should have set RELEASE_URL environment variable.');
    }
    return releaseUrl.replace(/\/$/, '');
  }
  
  return (environments[ENV] || environments.develop).replace(/\/$/, '');
}

export async function getBaseUrlAsync(): Promise<string> {
  const ENV = getEnv();
  if (process.env.BASE_URL) {
    return process.env.BASE_URL.replace(/\/$/, '');
  }
  
  if (ENV === 'release') {
    await initializeReleaseUrl();
  }
  
  const envUrl = await getEnvironmentUrl(ENV);
  return envUrl.replace(/\/$/, '');
}

// Helper to append flags as URL parameters
export function appendFlagsToUrl(url: string): string {
  const flags = process.env.TEST_FLAGS;
  if (!flags) {
    return url;
  }
  // Parse existing params from url
  let [base, query = ''] = url.split('?');
  const urlParams = new URLSearchParams(query);
  // Split flags on comma, space, or plus (robust for shell quirks)
  flags.split(/[\s,+]+/).filter(Boolean).forEach(f => {
    const [k, v] = f.split('=');
    if (k) urlParams.set(k, v ?? '');
  });
  const paramStr = urlParams.toString();
  const finalUrl = paramStr ? `${base}?${paramStr}` : base;
  return finalUrl;
}
